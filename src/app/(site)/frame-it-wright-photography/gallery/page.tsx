import type { Metadata } from "next";
import { PhotographyShell } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "photography gallery",
  description: "Photography gallery by Aaron Wright",
};

export default function PhotographyGalleryPage() {
  return (
    <PhotographyShell title="gallery">
      <p className="text-stone-500">coming soon</p>
    </PhotographyShell>
  );
}
