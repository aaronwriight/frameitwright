#!/usr/bin/env python3

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "venture.py"


class VentureCliTests(unittest.TestCase):
    def run_cli(self, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), *arguments],
            cwd=ROOT,
            check=False,
            text=True,
            capture_output=True,
        )

    def test_peak_log_updates_both_first_completions_in_order(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            catalog_path = Path(directory) / "peaks.json"
            before = json.loads((ROOT / "content/venture/trails/northeast-115.json").read_text())
            for peak in before["peaks"]:
                if peak["slug"] in {"mount-osceola", "mount-osceola-east-peak"}:
                    peak.update(
                        completed=False,
                        completionNumber=None,
                        timesHiked=0,
                        ascents=[],
                    )
            catalog_path.write_text(json.dumps(before))
            next_completion = max((peak["completionNumber"] or 0 for peak in before["peaks"])) + 1

            result = self.run_cli(
                "peak",
                "mount-osceola",
                "mount-osceola-east-peak",
                "--date",
                "2026-09-07",
                "--trip",
                "Osceolas with Tali",
                "--catalog",
                str(catalog_path),
            )

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            catalog = json.loads(catalog_path.read_text())
            peaks = {peak["slug"]: peak for peak in catalog["peaks"]}
            self.assertEqual(peaks["mount-osceola"]["completionNumber"], next_completion)
            self.assertEqual(peaks["mount-osceola-east-peak"]["completionNumber"], next_completion + 1)
            self.assertEqual(peaks["mount-osceola"]["ascents"][0]["date"], "2026-09-07")

    def test_peak_dry_run_does_not_write(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            catalog_path = Path(directory) / "peaks.json"
            original = (ROOT / "content/venture/trails/northeast-115.json").read_bytes()
            catalog_path.write_bytes(original)
            result = self.run_cli(
                "peak",
                "mount-osceola",
                "--date",
                "2026-09-07",
                "--dry-run",
                "--catalog",
                str(catalog_path),
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertEqual(catalog_path.read_bytes(), original)

    def test_new_travel_destination_is_created_with_first_visit(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            catalog_path = Path(directory) / "travels.json"
            catalog_path.write_bytes((ROOT / "content/venture/travels/travels.json").read_bytes())
            result = self.run_cli(
                "travel",
                "norway",
                "--name",
                "Norway",
                "--region",
                "Northern Europe",
                "--latitude",
                "60.472",
                "--longitude",
                "8.4689",
                "--date",
                "2026-09-07",
                "--catalog",
                str(catalog_path),
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            catalog = json.loads(catalog_path.read_text())
            norway = catalog["destinations"][-1]
            self.assertEqual(norway["slug"], "norway")
            self.assertEqual(norway["visits"], [{"date": "2026-09-07", "trip": None, "ordinal": 1}])


if __name__ == "__main__":
    unittest.main()
