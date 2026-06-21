import type { Metadata } from "next";
import { JournalShell } from "@/components/site/site-content";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { getAllSfiPosts, getSfiYears } from "@/lib/sfi-posts";

export const metadata: Metadata = {
  title: "mailing list | scope for imagination",
  description: "Subscribe to Scope for Imagination updates.",
};

export default async function MailingListPage() {
  const posts = await getAllSfiPosts();
  const years = getSfiYears(posts);

  return (
    <JournalShell title="mailing list" years={years}>
      <p className="max-w-xl text-stone-500">Get an occasional email when a new entry finds its way into Scope for Imagination.</p>
      <div className="not-prose mt-8 max-w-2xl border-t border-stone-300 pt-7 dark:border-stone-700">
        <NewsletterSignup />
      </div>
    </JournalShell>
  );
}
