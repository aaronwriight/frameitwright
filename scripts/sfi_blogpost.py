#!/usr/bin/env python3
"""Turn a Word, text, or HTML document into a Scope for Imagination post."""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
import unicodedata
import zipfile
from dataclasses import dataclass, field
from datetime import date, datetime
from pathlib import Path, PurePosixPath
from xml.etree import ElementTree as ET


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_POSTS_DIR = PROJECT_ROOT / "content" / "scope-for-imagination" / "posts"
DEFAULT_IMAGES_DIR = PROJECT_ROOT / "public" / "images" / "scope-for-imagination"

NAMESPACES = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
}
RELATIONSHIPS_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


def qname(namespace: str, name: str) -> str:
    return f"{{{NAMESPACES[namespace]}}}{name}"


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", normalized.lower()).strip("-")


def parse_tags(value: str) -> list[str]:
    tags: list[str] = []
    for raw_tag in value.split(","):
        tag = raw_tag.strip().lower()
        if tag and tag not in tags:
            tags.append(tag)
    return tags


def validate_date(value: str) -> str:
    try:
        return date.fromisoformat(value).isoformat()
    except ValueError as error:
        raise argparse.ArgumentTypeError("dates must use YYYY-MM-DD") from error


def validate_time(value: str) -> str:
    try:
        return datetime.strptime(value, "%H:%M").strftime("%H:%M")
    except ValueError as error:
        raise argparse.ArgumentTypeError("times must use 24-hour HH:MM format") from error


def normalize_entry(value: str) -> str:
    if not value.isdigit() or int(value) < 1:
        raise argparse.ArgumentTypeError("entry numbers must be positive integers")
    return value.zfill(4)


def next_entry(posts_directory: Path) -> str:
    entry_numbers: list[int] = []
    if posts_directory.exists():
        for post_path in posts_directory.glob("*.json"):
            try:
                post = json.loads(post_path.read_text(encoding="utf-8"))
                entry_numbers.append(int(post.get("entry", 0)))
            except (OSError, ValueError, TypeError, json.JSONDecodeError):
                continue
    return str(max(entry_numbers, default=0) + 1).zfill(4)


def paragraphs_from_text(source: str) -> str:
    blocks: list[str] = []

    for block in re.split(r"\n\s*\n", source.strip()):
        lines = [line.rstrip() for line in block.splitlines()]
        if not lines:
            continue

        if len(lines) == 1 and lines[0].startswith("### "):
            blocks.append(f"<h4>{html.escape(lines[0][4:])}</h4>")
        elif len(lines) == 1 and lines[0].startswith("## "):
            blocks.append(f"<h3>{html.escape(lines[0][3:])}</h3>")
        elif len(lines) == 1 and lines[0].startswith("# "):
            blocks.append(f"<h2>{html.escape(lines[0][2:])}</h2>")
        elif all(line.lstrip().startswith("- ") for line in lines):
            items = "".join(f"<li>{html.escape(line.lstrip()[2:])}</li>" for line in lines)
            blocks.append(f"<ul>{items}</ul>")
        else:
            escaped = "<br />".join(html.escape(line) for line in lines)
            blocks.append(f"<p>{escaped}</p>")

    return "\n".join(blocks)


def body_from_html(source: str) -> str:
    match = re.search(r"<body(?:\s[^>]*)?>(.*)</body\s*>", source, flags=re.IGNORECASE | re.DOTALL)
    return (match.group(1) if match else source).strip()


@dataclass
class WordRenderer:
    archive: zipfile.ZipFile
    relationships: dict[str, tuple[str, bool]]
    image_directory: Path
    image_web_root: str
    extracted_images: dict[str, str] = field(default_factory=dict)

    def image_html(self, relationship_id: str, alt: str) -> str:
        if relationship_id not in self.relationships:
            return ""

        target, external = self.relationships[relationship_id]
        if external:
            return ""

        if relationship_id not in self.extracted_images:
            archive_path = str(PurePosixPath("word") / PurePosixPath(target))
            suffix = PurePosixPath(target).suffix.lower() or ".jpg"
            file_name = f"image-{len(self.extracted_images) + 1}{suffix}"
            self.image_directory.mkdir(parents=True, exist_ok=True)
            (self.image_directory / file_name).write_bytes(self.archive.read(archive_path))
            self.extracted_images[relationship_id] = f"{self.image_web_root}/{file_name}"

        src = html.escape(self.extracted_images[relationship_id], quote=True)
        return f'<img src="{src}" alt="{html.escape(alt, quote=True)}" loading="lazy" />'

    def render_run(self, run: ET.Element) -> str:
        pieces: list[str] = []
        image_alt = ""
        doc_properties = run.find(".//wp:docPr", NAMESPACES)
        if doc_properties is not None:
            image_alt = (
                doc_properties.attrib.get("descr")
                or doc_properties.attrib.get("title")
                or doc_properties.attrib.get("name")
                or ""
            )

        for node in run.iter():
            if node.tag == qname("w", "t"):
                pieces.append(html.escape(node.text or ""))
            elif node.tag == qname("w", "tab"):
                pieces.append("&emsp;")
            elif node.tag in {qname("w", "br"), qname("w", "cr")}:
                pieces.append("<br />")
            elif node.tag == qname("a", "blip"):
                relationship_id = node.attrib.get(qname("r", "embed"), "")
                pieces.append(self.image_html(relationship_id, image_alt))

        rendered = "".join(pieces)
        properties = run.find("w:rPr", NAMESPACES)
        if properties is not None:
            if properties.find("w:i", NAMESPACES) is not None:
                rendered = f"<em>{rendered}</em>"
            if properties.find("w:b", NAMESPACES) is not None:
                rendered = f"<strong>{rendered}</strong>"

        return rendered

    def render_hyperlink(self, hyperlink: ET.Element) -> str:
        contents = "".join(self.render_run(run) for run in hyperlink.findall("w:r", NAMESPACES))
        relationship_id = hyperlink.attrib.get(qname("r", "id"), "")
        relationship = self.relationships.get(relationship_id)
        if not relationship:
            return contents

        target, _ = relationship
        return f'<a href="{html.escape(target, quote=True)}">{contents}</a>'

    def render_paragraph(self, paragraph: ET.Element) -> str:
        pieces: list[str] = []
        for child in paragraph:
            if child.tag == qname("w", "r"):
                pieces.append(self.render_run(child))
            elif child.tag == qname("w", "hyperlink"):
                pieces.append(self.render_hyperlink(child))

        contents = "".join(pieces).strip()
        if not contents:
            return ""

        properties = paragraph.find("w:pPr", NAMESPACES)
        style = ""
        is_list = False
        if properties is not None:
            style_node = properties.find("w:pStyle", NAMESPACES)
            style = style_node.attrib.get(qname("w", "val"), "") if style_node is not None else ""
            is_list = properties.find("w:numPr", NAMESPACES) is not None

        normalized_style = style.lower().replace(" ", "")
        heading_match = re.match(r"heading([1-6])", normalized_style)
        if heading_match:
            level = min(int(heading_match.group(1)) + 1, 6)
            return f"<h{level}>{contents}</h{level}>"
        if "quote" in normalized_style:
            return f"<blockquote><p>{contents}</p></blockquote>"
        if is_list:
            return f"<ul><li>{contents}</li></ul>"
        if re.fullmatch(r"(?:<img\b[^>]*>\s*)+", contents):
            return f"<figure>{contents}</figure>"
        return f"<p>{contents}</p>"


def relationships_from_docx(archive: zipfile.ZipFile) -> dict[str, tuple[str, bool]]:
    root = ET.fromstring(archive.read("word/_rels/document.xml.rels"))
    relationships: dict[str, tuple[str, bool]] = {}
    for relationship in root.findall(f"{{{RELATIONSHIPS_NS}}}Relationship"):
        relationship_id = relationship.attrib.get("Id")
        target = relationship.attrib.get("Target")
        if relationship_id and target:
            relationships[relationship_id] = (target, relationship.attrib.get("TargetMode") == "External")
    return relationships


def body_from_docx(document: Path, image_directory: Path, image_web_root: str) -> str:
    with zipfile.ZipFile(document) as archive:
        relationships = relationships_from_docx(archive)
        root = ET.fromstring(archive.read("word/document.xml"))
        renderer = WordRenderer(archive, relationships, image_directory, image_web_root)
        paragraphs = [renderer.render_paragraph(paragraph) for paragraph in root.findall(".//w:body/w:p", NAMESPACES)]
        return "\n".join(paragraph for paragraph in paragraphs if paragraph)


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create a Scope for Imagination post from a .docx, .txt, .html, or .htm file.",
    )
    parser.add_argument("--doc", required=True, type=Path, help="path to the source document")
    parser.add_argument("--title", required=True, help="post title")
    parser.add_argument("--subtitle", default="", help="optional post subtitle")
    parser.add_argument("--tags", default="", help="comma-separated tags, such as photography,science")
    parser.add_argument("--date", default=date.today().isoformat(), type=validate_date, help="publication date in YYYY-MM-DD format")
    parser.add_argument("--time", default=datetime.now().strftime("%H:%M"), type=validate_time, help="entry time in 24-hour HH:MM format")
    parser.add_argument("--location", required=True, help="location shown in the entry header")
    parser.add_argument("--entry", type=normalize_entry, help="entry number; defaults to the next available four-digit number")
    parser.add_argument("--slug", help="optional URL slug; defaults to a slug made from the title")
    parser.add_argument("--replace", action="store_true", help="replace a post with the same slug")
    parser.add_argument("--posts-dir", type=Path, default=DEFAULT_POSTS_DIR, help=argparse.SUPPRESS)
    parser.add_argument("--images-dir", type=Path, default=DEFAULT_IMAGES_DIR, help=argparse.SUPPRESS)
    return parser.parse_args()


def main() -> int:
    arguments = parse_arguments()
    document = arguments.doc.expanduser().resolve()
    if not document.is_file():
        print(f"error: source document does not exist: {document}", file=sys.stderr)
        return 1

    suffix = document.suffix.lower()
    if suffix not in {".docx", ".txt", ".html", ".htm"}:
        print("error: --doc must be a .docx, .txt, .html, or .htm file", file=sys.stderr)
        return 1

    slug = slugify(arguments.slug or arguments.title)
    if not slug:
        print("error: the title or --slug must contain letters or numbers", file=sys.stderr)
        return 1

    posts_directory = arguments.posts_dir.expanduser().resolve()
    images_root = arguments.images_dir.expanduser().resolve()
    post_path = posts_directory / f"{slug}.json"
    image_directory = images_root / slug

    if post_path.exists() and not arguments.replace:
        print(f"error: {post_path.name} already exists; pass --replace to overwrite it", file=sys.stderr)
        return 1

    entry = arguments.entry
    if entry is None and arguments.replace and post_path.exists():
        try:
            entry = normalize_entry(str(json.loads(post_path.read_text(encoding="utf-8")).get("entry", "")))
        except (OSError, ValueError, TypeError, json.JSONDecodeError, argparse.ArgumentTypeError):
            entry = None
    if entry is None:
        entry = next_entry(posts_directory)

    if arguments.replace and image_directory.exists():
        shutil.rmtree(image_directory)

    if suffix == ".docx":
        body_html = body_from_docx(document, image_directory, f"/images/scope-for-imagination/{slug}")
    else:
        source = document.read_text(encoding="utf-8")
        body_html = body_from_html(source) if suffix in {".html", ".htm"} else paragraphs_from_text(source)

    post = {
        "slug": slug,
        "title": arguments.title.strip(),
        "subtitle": arguments.subtitle.strip(),
        "date": arguments.date,
        "time": arguments.time,
        "location": arguments.location.strip(),
        "entry": entry,
        "tags": parse_tags(arguments.tags),
        "bodyHtml": body_html,
    }

    posts_directory.mkdir(parents=True, exist_ok=True)
    post_path.write_text(json.dumps(post, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    relative_post_path = post_path.relative_to(PROJECT_ROOT) if post_path.is_relative_to(PROJECT_ROOT) else post_path
    image_count = len(list(image_directory.iterdir())) if image_directory.exists() else 0
    print(f"created {relative_post_path}")
    print(f"entry: {entry} | slug: {slug} | tags: {', '.join(post['tags']) or 'none'} | images: {image_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
