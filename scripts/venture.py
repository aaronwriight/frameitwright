#!/usr/bin/env python3
"""Safely log Venture peak ascents, national-park visits, and travels."""

from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
from datetime import date
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PEAKS_PATH = PROJECT_ROOT / "content" / "venture" / "trails" / "northeast-115.json"
PARKS_PATH = PROJECT_ROOT / "content" / "venture" / "parks" / "national-parks.json"
TRAVELS_PATH = PROJECT_ROOT / "content" / "venture" / "travels" / "travels.json"
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


class VentureError(Exception):
    """A user-facing Venture catalog error."""


def display_path(path: Path) -> str:
    try:
        return str(path.relative_to(PROJECT_ROOT))
    except ValueError:
        return str(path)


def read_catalog(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise VentureError(f"could not read {display_path(path)}: {error}") from error
    if not isinstance(value, dict):
        raise VentureError(f"{display_path(path)} must contain a JSON object")
    return value


def valid_date(value: str | None) -> bool:
    if value is None:
        return True
    try:
        return date.fromisoformat(value).isoformat() == value
    except ValueError:
        return False


def optional_text(value: str | None) -> str | None:
    cleaned = value.strip() if value else ""
    return cleaned or None


def require_slug(value: str, label: str = "slug") -> str:
    cleaned = value.strip().lower()
    if not SLUG_PATTERN.fullmatch(cleaned):
        raise VentureError(f"invalid {label}: {value!r}")
    return cleaned


def resolve_record(records: list[dict[str, Any]], target: str, kind: str) -> dict[str, Any]:
    normalized = target.strip().casefold()
    matches = [
        record
        for record in records
        if str(record.get("slug", "")).casefold() == normalized
        or str(record.get("name", "")).casefold() == normalized
    ]
    if len(matches) == 1:
        return matches[0]
    if not matches:
        raise VentureError(f"unknown {kind}: {target!r}")
    raise VentureError(f"ambiguous {kind}: {target!r}")


def assert_unique(records: list[dict[str, Any]], field: str, label: str) -> None:
    values = [record.get(field) for record in records]
    if len(values) != len(set(values)):
        raise VentureError(f"duplicate {label} {field}")


def validate_peak_catalog(catalog: dict[str, Any]) -> None:
    peaks = catalog.get("peaks")
    if not isinstance(peaks, list) or len(peaks) != 115:
        raise VentureError("Northeast 115 catalog must contain exactly 115 peaks")
    assert_unique(peaks, "slug", "peak")
    completion_numbers: list[int] = []
    for peak in peaks:
        ascents = peak.get("ascents")
        if not isinstance(ascents, list):
            raise VentureError(f"invalid ascent list for {peak.get('slug')}")
        for index, ascent in enumerate(ascents, start=1):
            if ascent.get("ordinal") != index or not valid_date(ascent.get("date")):
                raise VentureError(f"invalid ascent {index} for {peak.get('slug')}")
        times_hiked = peak.get("timesHiked")
        if (times_hiked is None and ascents) or (times_hiked is not None and times_hiked != len(ascents)):
            raise VentureError(f"hike count disagrees for {peak.get('slug')}")
        if not peak.get("completed") and (times_hiked != 0 or ascents):
            raise VentureError(f"completion status disagrees for {peak.get('slug')}")
        if peak.get("completed") and times_hiked == 0:
            raise VentureError(f"completion status disagrees for {peak.get('slug')}")
        completion_number = peak.get("completionNumber")
        if completion_number is not None:
            if not isinstance(completion_number, int) or not 1 <= completion_number <= 115:
                raise VentureError(f"invalid completion number for {peak.get('slug')}")
            completion_numbers.append(completion_number)
    if len(completion_numbers) != len(set(completion_numbers)):
        raise VentureError("Northeast 115 completion numbers must be unique")


def validate_park_catalog(catalog: dict[str, Any]) -> None:
    parks = catalog.get("parks")
    if not isinstance(parks, list) or len(parks) != 63:
        raise VentureError("national-parks catalog must contain exactly 63 parks")
    assert_unique(parks, "slug", "park")
    visit_numbers: list[int] = []
    for park in parks:
        visits = park.get("visits")
        if not isinstance(visits, list):
            raise VentureError(f"invalid visit list for {park.get('slug')}")
        if park.get("visited") != bool(visits):
            raise VentureError(f"visited status disagrees for {park.get('slug')}")
        for visit in visits:
            if not valid_date(visit.get("date")):
                raise VentureError(f"invalid visit date for {park.get('slug')}")
        visit_number = park.get("visitNumber")
        if visit_number is not None:
            if not isinstance(visit_number, int) or not 1 <= visit_number <= 63:
                raise VentureError(f"invalid visit number for {park.get('slug')}")
            visit_numbers.append(visit_number)
    if len(visit_numbers) != len(set(visit_numbers)):
        raise VentureError("national-park visit numbers must be unique")


def validate_travel_catalog(catalog: dict[str, Any]) -> None:
    destinations = catalog.get("destinations")
    if not isinstance(destinations, list):
        raise VentureError("travels catalog must contain a destinations list")
    assert_unique(destinations, "slug", "destination")
    for destination in destinations:
        visits = destination.get("visits")
        if not isinstance(visits, list) or not visits:
            raise VentureError(f"destination {destination.get('slug')} must have at least one visit")
        for index, visit in enumerate(visits, start=1):
            if visit.get("ordinal") != index or not valid_date(visit.get("date")):
                raise VentureError(f"invalid visit {index} for {destination.get('slug')}")


def write_catalog(path: Path, catalog: dict[str, Any], *, dry_run: bool) -> None:
    if dry_run:
        print(f"dry run: would update {display_path(path)}")
        return
    payload = json.dumps(catalog, ensure_ascii=False, indent=2) + "\n"
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as temporary:
            temporary.write(payload)
            temporary.flush()
            os.fsync(temporary.fileno())
        os.replace(temporary_name, path)
    except Exception:
        Path(temporary_name).unlink(missing_ok=True)
        raise
    print(f"updated {display_path(path)}")


def visit_record(arguments: argparse.Namespace) -> dict[str, Any]:
    record: dict[str, Any] = {
        "date": arguments.date,
        "trip": optional_text(arguments.trip),
    }
    if getattr(arguments, "entry_slug", None):
        record["entrySlug"] = require_slug(arguments.entry_slug, "entry slug")
    return record


def command_peak(arguments: argparse.Namespace) -> None:
    catalog = read_catalog(arguments.catalog)
    validate_peak_catalog(catalog)
    peaks = catalog["peaks"]
    selected = [resolve_record(peaks, target, "peak") for target in arguments.peaks]
    if len({peak["slug"] for peak in selected}) != len(selected):
        raise VentureError("each peak may be named only once per command")
    next_completion = max((peak["completionNumber"] or 0 for peak in peaks), default=0) + 1
    for peak in selected:
        ascent = {
            "ordinal": len(peak["ascents"]) + 1,
            "date": arguments.date,
            "trip": optional_text(arguments.trip),
            "note": optional_text(arguments.note),
            "entrySlug": require_slug(arguments.entry_slug, "entry slug") if arguments.entry_slug else None,
        }
        if not arguments.allow_duplicate and any(
            existing.get("date") == ascent["date"]
            and existing.get("trip") == ascent["trip"]
            and existing.get("entrySlug") == ascent["entrySlug"]
            for existing in peak["ascents"]
        ):
            raise VentureError(f"matching ascent already exists for {peak['name']}")
        first_completion = not peak["completed"]
        peak["ascents"].append(ascent)
        peak["timesHiked"] = len(peak["ascents"])
        peak["completed"] = True
        if first_completion:
            peak["completionNumber"] = next_completion
            next_completion += 1
        if arguments.rating is not None:
            peak["rating"] = arguments.rating
        print(
            f"logged {peak['name']} ascent #{ascent['ordinal']}"
            + (f" / Northeast 115 #{peak['completionNumber']}" if first_completion else "")
        )
    validate_peak_catalog(catalog)
    write_catalog(arguments.catalog, catalog, dry_run=arguments.dry_run)


def command_park(arguments: argparse.Namespace) -> None:
    catalog = read_catalog(arguments.catalog)
    validate_park_catalog(catalog)
    parks = catalog["parks"]
    park = resolve_record(parks, arguments.park, "park")
    visit = visit_record(arguments)
    if arguments.field_note:
        visit["fieldNote"] = arguments.field_note.strip()
    if not arguments.allow_duplicate and any(
        existing.get("date") == visit["date"]
        and existing.get("trip") == visit["trip"]
        and existing.get("entrySlug") == visit.get("entrySlug")
        for existing in park["visits"]
    ):
        raise VentureError(f"matching visit already exists for {park['name']}")
    park["visits"].append(visit)
    park["visited"] = True
    if arguments.visit_number is not None:
        park["visitNumber"] = arguments.visit_number
    print(f"logged {park['name']} visit #{len(park['visits'])}")
    validate_park_catalog(catalog)
    write_catalog(arguments.catalog, catalog, dry_run=arguments.dry_run)


def command_travel(arguments: argparse.Namespace) -> None:
    catalog = read_catalog(arguments.catalog)
    validate_travel_catalog(catalog)
    destinations = catalog["destinations"]
    normalized = arguments.destination.strip().casefold()
    matches = [
        item
        for item in destinations
        if str(item.get("slug", "")).casefold() == normalized
        or str(item.get("name", "")).casefold() == normalized
    ]
    if len(matches) > 1:
        raise VentureError(f"ambiguous destination: {arguments.destination!r}")
    if matches:
        destination = matches[0]
    else:
        if not all(value is not None for value in (arguments.name, arguments.region, arguments.latitude, arguments.longitude)):
            raise VentureError(
                "a new destination requires --name, --region, --latitude, and --longitude"
            )
        destination = {
            "slug": require_slug(arguments.destination, "destination slug"),
            "name": arguments.name.strip(),
            "region": arguments.region.strip(),
            "latitude": arguments.latitude,
            "longitude": arguments.longitude,
            "visits": [],
        }
        destinations.append(destination)
    visit = visit_record(arguments)
    visit["ordinal"] = len(destination["visits"]) + 1
    if not arguments.allow_duplicate and any(
        existing.get("date") == visit["date"]
        and existing.get("trip") == visit["trip"]
        and existing.get("entrySlug") == visit.get("entrySlug")
        for existing in destination["visits"]
    ):
        raise VentureError(f"matching visit already exists for {destination['name']}")
    destination["visits"].append(visit)
    print(f"logged {destination['name']} visit #{visit['ordinal']}")
    validate_travel_catalog(catalog)
    write_catalog(arguments.catalog, catalog, dry_run=arguments.dry_run)


def command_check(arguments: argparse.Namespace) -> None:
    validate_peak_catalog(read_catalog(arguments.peaks_catalog))
    validate_park_catalog(read_catalog(arguments.parks_catalog))
    validate_travel_catalog(read_catalog(arguments.travels_catalog))
    print("venture catalogs are valid")


def add_visit_arguments(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--date", required=True, help="visit date in YYYY-MM-DD format")
    parser.add_argument("--trip", help="public trip name")
    parser.add_argument("--entry-slug", help="published Venture entry slug")
    parser.add_argument("--allow-duplicate", action="store_true", help="allow an otherwise matching record")
    parser.add_argument("--dry-run", action="store_true", help="validate and preview without writing")


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)

    peak = commands.add_parser("peak", help="log one hike across one or more Northeast 115 peaks")
    peak.add_argument("peaks", nargs="+", help="peak slugs or exact names, in summit order")
    add_visit_arguments(peak)
    peak.add_argument("--note", help="public ascent note")
    peak.add_argument("--rating", type=float, choices=[number / 10 for number in range(0, 101)])
    peak.add_argument("--catalog", type=Path, default=PEAKS_PATH, help=argparse.SUPPRESS)
    peak.set_defaults(handler=command_peak)

    park = commands.add_parser("park", help="log a national-park visit")
    park.add_argument("park", help="park slug or exact name")
    add_visit_arguments(park)
    park.add_argument("--field-note", help="short public field note")
    park.add_argument("--visit-number", type=int, choices=range(1, 64), help="known first-visit chronology")
    park.add_argument("--catalog", type=Path, default=PARKS_PATH, help=argparse.SUPPRESS)
    park.set_defaults(handler=command_park)

    travel = commands.add_parser("travel", help="log a visit to an existing or new destination")
    travel.add_argument("destination", help="destination slug or exact name")
    add_visit_arguments(travel)
    travel.add_argument("--name", help="display name when creating a destination")
    travel.add_argument("--region", help="region when creating a destination")
    travel.add_argument("--latitude", type=float, help="latitude when creating a destination")
    travel.add_argument("--longitude", type=float, help="longitude when creating a destination")
    travel.add_argument("--catalog", type=Path, default=TRAVELS_PATH, help=argparse.SUPPRESS)
    travel.set_defaults(handler=command_travel)

    check = commands.add_parser("check", help="validate all Venture catalogs")
    check.add_argument("--peaks-catalog", type=Path, default=PEAKS_PATH, help=argparse.SUPPRESS)
    check.add_argument("--parks-catalog", type=Path, default=PARKS_PATH, help=argparse.SUPPRESS)
    check.add_argument("--travels-catalog", type=Path, default=TRAVELS_PATH, help=argparse.SUPPRESS)
    check.set_defaults(handler=command_check)
    return parser.parse_args()


def main() -> int:
    arguments = parse_arguments()
    if hasattr(arguments, "date") and not valid_date(arguments.date):
        print("error: --date must be a real date in YYYY-MM-DD format")
        return 1
    try:
        arguments.handler(arguments)
    except VentureError as error:
        print(f"error: {error}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
