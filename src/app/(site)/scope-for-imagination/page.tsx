import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "scope for imagination",
  description: "Scope for Imagination",
};

export default function ScopeForImaginationPage() {
  return <ComingSoonPage title="scope for imagination" />;
}
