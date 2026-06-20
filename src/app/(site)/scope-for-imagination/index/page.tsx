import type { Metadata } from "next";
import { JournalShell } from "@/components/site/site-content";
import { SfiPostList } from "@/components/site/sfi-post-list";
import { getAllSfiPosts, getSfiYears } from "@/lib/sfi-posts";

export const metadata: Metadata = {
  title: "index | scope for imagination",
  description: "A complete index of Scope for Imagination journal entries.",
};

export default async function ScopeForImaginationIndexPage() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);

  return (
    <JournalShell title="index" years={years.length > 0 ? years : [new Date().getFullYear()]}>
      <div className="not-prose mt-10">
        <SfiPostList posts={posts} />
      </div>
    </JournalShell>
  );
}
