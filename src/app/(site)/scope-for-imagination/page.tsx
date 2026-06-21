import type { Metadata } from "next";
import { JournalShell } from "@/components/site/site-content";
import { getAllSfiPosts, getSfiYears } from "@/lib/sfi-posts";

export const metadata: Metadata = {
  title: "scope for imagination | aaron wright",
  description: "A digital journal for photographs, musings, life updates, and the occasional rant.",
};

export default async function ScopeForImaginationAboutPage() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);

  return (
    <JournalShell title="scope for imagination" years={years.length > 0 ? years : [new Date().getFullYear()]}>
      <p className="text-stone-500">A digital journal for photographs, musings, life updates, and the occasional rant.</p>
    </JournalShell>
  );
}
