import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalShell } from "@/components/site/site-content";
import { SfiPostList } from "@/components/site/sfi-post-list";
import { SfiPostHeader } from "@/components/site/sfi-post-header";
import { formatSfiPostTitle, getAllSfiPosts, getSfiPost, getSfiYears } from "@/lib/sfi-posts";

export async function generateStaticParams() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);
  return [...posts.map((post) => ({ slug: post.slug })), ...years.map((year) => ({ slug: String(year) }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (/^\d{4}$/.test(slug)) {
    return {
      title: `${slug} | scope for imagination`,
      description: `Scope for Imagination journal entries from ${slug}.`,
    };
  }

  const post = await getSfiPost(slug);
  if (!post) return {};

  return {
    title: `${formatSfiPostTitle(post)} | aaron wright`,
    description: `A Scope for Imagination journal entry by Aaron Wright.`,
  };
}

export default async function ScopeForImaginationEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allPosts = await getAllSfiPosts();
  const years = getSfiYears(allPosts);

  if (/^\d{4}$/.test(slug)) {
    const year = Number(slug);
    const posts = allPosts.filter((post) => post.date.startsWith(slug));
    if (!years.includes(year)) notFound();

    return (
      <JournalShell title={slug} years={years}>
        <div className="not-prose mt-10">
          <SfiPostList posts={posts} groupByYear={false} />
        </div>
      </JournalShell>
    );
  }

  const post = await getSfiPost(slug);
  if (!post) notFound();

  return (
    <JournalShell title={post.title} showTitle={false} years={years}>
      <article className="not-prose w-full max-w-none">
        <Link href="/scope-for-imagination/index" className="text-xs lowercase tracking-widest text-stone-500 hover:text-[#6f8200]">
          ← index
        </Link>

        <SfiPostHeader post={post} large className="mt-10 border-b border-stone-300 pb-7 dark:border-stone-700" />

        <div
          className="prose prose-stone mt-10 max-w-none font-serif text-sm leading-7 dark:prose-invert prose-headings:font-serif prose-a:text-[#6f8200] prose-img:my-10 prose-img:w-full"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </article>
    </JournalShell>
  );
}
