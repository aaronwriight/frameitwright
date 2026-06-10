import type { Metadata } from "next";
import { ExternalLink, ScienceShell } from "@/components/science/science-content";

export const metadata: Metadata = {
  title: "tidy tuesday",
  description: "Tidy Tuesday visualizations by Aaron Wright",
};

export default function TidyTuesdayProjectPage() {
  return (
    <ScienceShell title="tidy tuesday">
      <p>
        coming soon
        {/* <ExternalLink href="https://aaronwriight.github.io/tidy_tuesday/">open tidy tuesday</ExternalLink> */}
      </p>
    </ScienceShell>
  );
}
