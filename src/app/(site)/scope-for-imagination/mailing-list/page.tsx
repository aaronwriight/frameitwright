import type { Metadata } from "next";
import { SectionPageShell } from "@/components/site/site-content";
import { NewsletterSignup } from "@/components/site/newsletter-signup";

export const metadata: Metadata = {
  title: "mailing list | scope for imagination",
  description: "Subscribe to Scope for Imagination updates.",
};

const mailingListLinks = [
  ["contact", "/contact"],
  ["home", "/"],
];

export default function MailingListPage() {
  return (
    <SectionPageShell section="mailing list" links={mailingListLinks} title="mailing list">
      <p className="max-w-xl text-stone-500">Get an occasional email when a new entry finds its way into Scope for Imagination.</p>
      <div className="not-prose mt-8 max-w-2xl border-t border-stone-300 pt-7 dark:border-stone-700">
        <NewsletterSignup />
      </div>
    </SectionPageShell>
  );
}
