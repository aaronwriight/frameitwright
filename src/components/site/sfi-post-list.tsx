import Link from "next/link";
import type { SfiPost } from "@/lib/sfi-posts";
import { formatSfiDate, getSfiYears } from "@/lib/sfi-posts";

function PostRows({ posts }: { posts: SfiPost[] }) {
  if (posts.length === 0) {
    return <p className="border-t border-stone-300 pt-5 font-serif text-sm italic text-stone-500 dark:border-stone-700">No entries yet.</p>;
  }

  return (
    <div className="border-t border-stone-300 dark:border-stone-700">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="grid gap-3 border-b border-stone-300 py-6 dark:border-stone-700 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
        >
          <div className="space-y-1 text-xs text-stone-500">
            <time dateTime={post.date}>{formatSfiDate(post.date, false)}</time>
            <p>{post.entry}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg leading-snug text-stone-900 dark:text-stone-100">
              <Link href={`/scope-for-imagination/${post.slug}`} className="hover:text-[#6f8200]">
                {post.title}
              </Link>
            </h3>
            {post.subtitle && <p className="mt-1 max-w-xl text-sm leading-6 text-stone-500">{post.subtitle}</p>}
            <p className="mt-2 text-xs text-stone-500">
              {post.time} · {post.location}
            </p>
            {post.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] lowercase tracking-widest text-[#6f8200]">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function SfiPostList({ posts, groupByYear = true }: { posts: SfiPost[]; groupByYear?: boolean }) {
  if (!groupByYear) return <PostRows posts={posts} />;

  const years = getSfiYears(posts);

  return (
    <div className="space-y-16">
      {years.map((year) => (
        <section key={year}>
          <h2 className="mb-6 font-serif text-sm font-normal tracking-widest text-stone-500">{year}</h2>
          <PostRows posts={posts.filter((post) => post.date.startsWith(String(year)))} />
        </section>
      ))}
    </div>
  );
}
