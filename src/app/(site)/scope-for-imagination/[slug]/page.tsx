import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalShell } from "@/components/site/site-content";
import { SfiPostList } from "@/components/site/sfi-post-list";
import { formatSfiHeaderDate, getAllSfiPosts, getSfiPost, getSfiYears } from "@/lib/sfi-posts";

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
    title: `${post.title} | scope for imagination`,
    description: post.subtitle || `A Scope for Imagination journal entry by Aaron Wright.`,
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
      <article className="not-prose max-w-2xl">
        <Link href="/scope-for-imagination/index" className="text-xs lowercase tracking-widest text-stone-500 hover:text-[#6f8200]">
          ← index
        </Link>

        <header className="mt-10 border-b border-stone-300 pb-7 dark:border-stone-700">
          <h1 className="font-serif text-sm font-normal leading-7 text-stone-900 dark:text-stone-100">
            scope for imagination: {post.title} <span className="text-stone-500">|</span>{" "}
            <time dateTime={`${post.date}T${post.time}`}>
              {formatSfiHeaderDate(post.date)} • {post.time}
            </time>{" "}
            <span className="text-stone-500">|</span> {post.location} • {post.entry}
          </h1>
          {post.subtitle && <p className="mt-3 font-serif text-sm italic leading-6 text-stone-500">{post.subtitle}</p>}
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] lowercase tracking-widest text-[#6f8200]">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </header>

        <div
          className="prose prose-stone mt-10 max-w-none font-serif text-sm leading-7 dark:prose-invert prose-headings:font-serif prose-a:text-[#6f8200] prose-img:my-10 prose-img:w-full"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </article>
    </JournalShell>
  );
}
