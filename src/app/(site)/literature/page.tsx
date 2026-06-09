import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "literature",
  description: "Literature",
};

export default function LiteraturePage() {
  return <ComingSoonPage title="literature" />;
}
