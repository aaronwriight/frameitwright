import type { Metadata } from "next";
import { JournalShell } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "scope for imagination",
  description: "Scope for Imagination",
};

export default function ScopeForImaginationPage() {
  return (
    <JournalShell title="scope for imagination">
      <p className="text-stone-500">coming soon</p>
    </JournalShell>
  );
}
