import type { Metadata } from "next";
import { PhotographyShell } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "photography portfolio",
  description: "Photography portfolio by Aaron Wright",
};

export default function PhotographyPortfolioPage() {
  return (
    <PhotographyShell title="portfolio">
      <p className="text-stone-500">coming soon</p>
    </PhotographyShell>
  );
}
