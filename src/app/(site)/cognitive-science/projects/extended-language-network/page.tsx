import type { Metadata } from "next";
import { ExternalLink, ScienceShell } from "@/components/science/science-content";

export const metadata: Metadata = {
  title: "extended language network",
  description: "Extended language network project",
};

export default function ExtendedLanguageNetworkProjectPage() {
  return (
    <ScienceShell title="extended language network">
      <p>
        Language neuroscience has largely focused on core left frontal and temporal areas, but many other cortical, subcortical, and cerebellar areas
        have been implicated in linguistic processing. This project asks which of those areas respond reliably and selectively to language, and what
        their contributions may be.
      </p>
      <p>
        <ExternalLink href="https://doi.org/10.1101/2025.04.02.646835">preprint</ExternalLink> |{" "}
        <ExternalLink href="https://osf.io/7594t/">osf</ExternalLink>
      </p>
    </ScienceShell>
  );
}
