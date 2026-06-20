import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalShell } from "@/components/site/site-content";
import { formatSfiDate, getAllSfiPosts, getSfiPost, getSfiYears } from "@/lib/sfi-posts";

export async function generateStaticParams() {
  const posts = await getAllSfiPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSfiPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | scope for imagination`,
    description: post.subtitle || `A Scope for Imagination journal entry by Aaron Wright.`,
  };
}

export default async function ScopeForImaginationPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getSfiPost(slug), getAllSfiPosts()]);

  if (!post) notFound();

  const years = getSfiYears(allPosts);

  return (
    <JournalShell title={post.title} showTitle={false} years={years}>
      <article className="not-prose max-w-2xl">
        <Link href="/scope-for-imagination" className="text-xs lowercase tracking-widest text-stone-500 hover:text-[#6f8200]">
          ← index
        </Link>

        <header className="mt-10 border-b border-stone-300 pb-8 dark:border-stone-700">
          <time dateTime={post.date} className="text-xs lowercase tracking-widest text-stone-500">
            {formatSfiDate(post.date)}
          </time>
          <h1 className="mt-4 font-serif text-3xl font-normal leading-tight text-stone-900 dark:text-stone-100 sm:text-4xl">{post.title}</h1>
          {post.subtitle && <p className="mt-3 font-serif text-base italic leading-7 text-stone-500">{post.subtitle}</p>}
          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] lowercase tracking-widest text-[#6f8200]">
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
