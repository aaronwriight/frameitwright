import type { Metadata } from "next";
import Link from "next/link";
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

      <section className="not-prose mt-10 max-w-xl border-t border-stone-300 pt-6 dark:border-stone-700">
        <h2 className="font-serif text-sm font-normal lowercase tracking-widest text-stone-900 dark:text-stone-100">mailing list</h2>
        <p className="mt-3 font-serif text-sm leading-6 text-stone-500">
          An occasional note when something new finds its way into the journal.
        </p>
        <Link
          href="mailto:frameitwright@gmail.com?subject=Scope%20for%20Imagination%20mailing%20list&body=Hi%20Aaron%2C%0A%0APlease%20add%20me%20to%20the%20Scope%20for%20Imagination%20mailing%20list.%0A"
          className="mt-4 inline-block text-xs lowercase tracking-widest text-[#6f8200] hover:underline"
        >
          join the mailing list →
        </Link>
      </section>
    </JournalShell>
  );
}
