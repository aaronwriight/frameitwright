import type { Metadata } from "next";
import Link from "next/link";
import { JournalShell } from "@/components/site/site-content";
import { formatSfiDate, getAllSfiPosts, getSfiYears } from "@/lib/sfi-posts";

export const metadata: Metadata = {
  title: "scope for imagination | aaron wright",
  description: "A digital journal of photographs, musings, life updates, and the occasional rant.",
};

export default async function ScopeForImaginationPage() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);
  const displayedYears = years.length > 0 ? years : [new Date().getFullYear()];

  return (
    <JournalShell title="scope for imagination" years={displayedYears}>
      <p className="max-w-xl text-stone-500">A digital journal for photographs, musings, life updates, and the occasional rant.</p>

      <div className="not-prose mt-12 space-y-16">
        {displayedYears.map((year) => {
          const yearPosts = posts.filter((post) => post.date.startsWith(String(year)));

          return (
            <section key={year} id={String(year)} className="scroll-mt-12">
              <h2 className="mb-6 font-serif text-sm font-normal tracking-widest text-stone-500">{year}</h2>

              {yearPosts.length > 0 ? (
                <div className="border-t border-stone-300 dark:border-stone-700">
                  {yearPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="grid gap-3 border-b border-stone-300 py-6 dark:border-stone-700 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
                    >
                      <time dateTime={post.date} className="text-xs text-stone-500">
                        {formatSfiDate(post.date, false)}
                      </time>
                      <div>
                        <h3 className="font-serif text-lg leading-snug text-stone-900 dark:text-stone-100">
                          <Link href={`/scope-for-imagination/${post.slug}`} className="hover:text-[#6f8200]">
                            {post.title}
                          </Link>
                        </h3>
                        {post.subtitle && <p className="mt-1 max-w-xl text-sm leading-6 text-stone-500">{post.subtitle}</p>}
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
              ) : (
                <p className="border-t border-stone-300 pt-5 font-serif text-sm italic text-stone-500 dark:border-stone-700">
                  No entries yet.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </JournalShell>
  );
}
