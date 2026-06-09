import type { Metadata } from "next";
import { ExternalLink, ScienceShell } from "@/components/science/science-content";

export const metadata: Metadata = {
  title: "publications",
  description: "Publications, preprints, posters, and presentations by Aaron Wright",
};

function PubDetails({ children }: { children: React.ReactNode }) {
  return (
    <details>
      <summary className="cursor-pointer list-none text-[#6f8200]">ABS</summary>
      <div className="mt-3 pl-5">{children}</div>
    </details>
  );
}

export default function PublicationsPage() {
  return (
    <ScienceShell title="publications">
      <p>
        These lists are updated periodically. You can also find my articles on{" "}
        <ExternalLink href="https://scholar.google.com/citations?user=2b1N4FcAAAAJ&hl=en">Google Scholar</ExternalLink>.
      </p>

      <section>
        <p className="m-0 font-medium">preprints</p>
        <ul>
          <li>
            <p>
              Wolna, A., <strong>Wright, A.</strong>, Casto, C., Hutchinson, S., Lipkin, B., & Fedorenko, E. (2025). The extended language
              network: Language selective brain areas whose contributions to language remain to be discovered. <em>bioRxiv.</em>
            </p>
            <p>
              <ExternalLink href="https://doi.org/10.1101/2025.04.02.646835">DOI</ExternalLink> |{" "}
              <ExternalLink href="https://www.biorxiv.org/content/10.1101/2025.04.02.646835v3.full.pdf">PDF</ExternalLink> |{" "}
              <ExternalLink href="https://osf.io/7594t/">OSF</ExternalLink>
            </p>
            <PubDetails>
              <p>
                Using fMRI data from 772 participants performing an extensively validated language localizer, this work delineates areas that respond
                reliably to language across written and auditory modalities and evaluates their selectivity relative to a demanding non-linguistic
                task. The newly identified extended language-selective network includes areas around the temporal poles, medial frontal cortex,
                hippocampus, and cerebellum.
              </p>
            </PubDetails>
          </li>
        </ul>
      </section>

      <section>
        <p className="m-0 font-medium">papers</p>
        <ul>
          <li>
            <p>
              Iltis, P. W., Frahm, J., Voit, D., <strong>Wright, A.</strong>, & Dever, A. (2024). A descriptive comparison of oral cavity movements
              between brass instrumentalists performing large interval slurs. <em>Medical Problems of Performing Artists, 39</em>(4), 169-176.
            </p>
            <p>
              <ExternalLink href="https://pubmed.ncbi.nlm.nih.gov/39641566/">DOI</ExternalLink>
            </p>
            <PubDetails>
              <p>
                Real-time MRI films were used to compare oral cavity movements in horn, trumpet, and trombone players. The study reports patterned
                tongue movements in horn and trumpet players during ascending and descending slurs, with implications for vocal-tract tuning in brass
                performance.
              </p>
            </PubDetails>
          </li>
        </ul>
      </section>

      <section>
        <p className="m-0 font-medium">posters & presentations</p>
        <ul>
          <li>
            Wolna, A., <strong>Wright, A.</strong>, Casto, C., Lipkin, B., & Fedorenko, E. (2025, March). The extended language network: Language
            selective brain areas whose contributions to language remain to be discovered. <em>McGovern Travel & Technology Awards Poster Session,
            Cambridge, MA.</em>{" "}
            <ExternalLink href="https://aaronwriight.github.io/files/posters/Wolna.Agata.Wright.Aaron_v2%20copy.pdf">PDF</ExternalLink>
          </li>
          <li>
            Wolna, A., <strong>Wright, A.</strong>, Wodniecka, Z., & Fedorenko. (2025, April). From Words to Stories: Engagement of
            language-specific and domain-general neural mechanisms in native and second language comprehension.{" "}
            <em>Annual Meeting of the Cognitive Neuroscience Society, Boston, MA.</em>{" "}
            <ExternalLink href="https://aaronwriight.github.io/files/posters/CNS_2025_poster%20copy.pdf">PDF</ExternalLink>
          </li>
        </ul>
      </section>
    </ScienceShell>
  );
}
