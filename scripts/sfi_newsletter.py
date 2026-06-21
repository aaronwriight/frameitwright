#!/usr/bin/env python3
"""Create a Resend broadcast draft (or explicitly send it) for an SFI entry."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


PROJECT_ROOT = Path(__file__).resolve().parents[1]
NEWSLETTERS_DIR = PROJECT_ROOT / "content" / "scope-for-imagination" / "newsletters"


def load_local_environment() -> None:
    env_path = PROJECT_ROOT / ".env.local"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create or send the newsletter broadcast for an SFI entry.")
    parser.add_argument("--entry", required=True, help="four-digit SFI entry number")
    parser.add_argument("--send", action="store_true", help="send immediately instead of creating a draft")
    return parser.parse_args()


def main() -> int:
    arguments = parse_arguments()
    entry = arguments.entry.zfill(4)
    if not entry.isdigit() or len(entry) != 4:
        print("error: --entry must be a four-digit number", file=sys.stderr)
        return 1

    load_local_environment()
    api_key = os.environ.get("RESEND_API_KEY")
    segment_id = os.environ.get("RESEND_SFI_SEGMENT_ID")
    sender = os.environ.get("SFI_NEWSLETTER_FROM")
    site_url = (os.environ.get("NEXT_PUBLIC_SITE_URL") or "https://aaronwriight.vercel.app").rstrip("/")
    if not api_key or not segment_id or not sender:
        print("error: set RESEND_API_KEY, RESEND_SFI_SEGMENT_ID, and SFI_NEWSLETTER_FROM", file=sys.stderr)
        return 1

    template_path = NEWSLETTERS_DIR / f"{entry}.json"
    if not template_path.exists():
        print(f"error: newsletter template not found: {template_path}", file=sys.stderr)
        return 1

    template = json.loads(template_path.read_text(encoding="utf-8"))
    entry_url = f"{site_url}/scope-for-imagination/{entry}"
    payload = {
        "segment_id": segment_id,
        "from": sender,
        "name": template["name"],
        "subject": template["subject"],
        "preview_text": template["previewText"],
        "html": template["html"].replace("[[ENTRY_URL]]", entry_url),
        "text": template["text"].replace("[[ENTRY_URL]]", entry_url),
        "send": arguments.send,
    }
    request = Request(
        "https://api.resend.com/broadcasts",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=30) as response:
            result = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        print(f"error: Resend returned {error.code}: {error.read().decode('utf-8')}", file=sys.stderr)
        return 1

    action = "sent" if arguments.send else "created draft"
    print(f"{action} broadcast {result.get('id', '(unknown id)')} for entry {entry}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
