import type { Metadata } from "next";
import { JournalShell } from "@/components/site/site-content";
import { getAllSfiPosts, getSfiYears } from "@/lib/sfi-posts";

export const metadata: Metadata = {
  title: "about | scope for imagination",
  description: "About Scope for Imagination, Aaron Wright's digital journal.",
};

export default async function ScopeForImaginationAboutPage() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);

  return (
    <JournalShell title="about" years={years.length > 0 ? years : [new Date().getFullYear()]}>
      <p className="text-stone-500">A minimal bio will live here.</p>
    </JournalShell>
  );
}
