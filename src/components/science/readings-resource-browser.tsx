"use client";

import { useState } from "react";
import { ExternalLink } from "@/components/science/science-content";

const tags = [
  ["language", "#859901"],
  ["emotion", "#2AA198"],
  ["social", "#5B8FA8"],
  ["computational", "#6c71c4"],
  ["conversation", "#954F72"],
  ["behavioral", "#d693c4"],
  ["neuroimaging", "#e0519a"],
  ["culture", "#f4a825"],
] as const;

const readings = [
  {
    title: "Botch, T. L., & Finn, E. S. (2025). Sensory context as a universal principle of language in humans and LLMs. PsyArXiv Preprints.",
    href: "https://osf.io/preprints/psyarxiv/nz5eg_v1",
    tags: ["language", "computational"],
    favorite: true,
  },
  {
    title: "Celen, E., van Rijn, P., Lee, H., & Jacoby, N. (2025). Are Expressions for Music Emotions the Same Across Cultures?. arXiv preprint arXiv:2502.08744.",
    href: "https://arxiv.org/pdf/2502.08744",
    tags: ["language", "emotion", "computational", "culture"],
  },
  {
    title: "Dingemanse, M., & Enfield, N. J. (2024). Interactive repair and the foundations of language. Trends in Cognitive Sciences, 28(1), 30-42.",
    href: "https://pure.mpg.de/rest/items/item_3530697/component/file_3558979/content",
    tags: ["language", "computational", "behavioral"],
  },
  {
    title: "Fedorenko, E., Duncan, J., & Kanwisher, N. (2013). Broad domain generality in focal regions of frontal and parietal cortex. PNAS, 110(41), 16616-16621.",
    href: "https://www.pnas.org/doi/pdf/10.1073/pnas.1315235110",
    tags: ["neuroimaging"],
    favorite: true,
  },
  {
    title: "Fedorenko, E., Ivanova, A. A., & Regev, T. I. (2024). The language network as a natural kind within the broader landscape of the human brain. Nature Reviews Neuroscience, 25(5), 289-312.",
    href: "https://www.nature.com/articles/s41583-024-00802-4",
    tags: ["language", "neuroimaging"],
  },
  {
    title: "Fedorenko, E., Piantadosi, S. T., & Gibson, E. A. (2024). Language is primarily a tool for communication rather than thought. Nature, 630(8017), 575-586.",
    href: "https://www.nature.com/articles/s41586-024-07522-w",
    tags: ["language"],
  },
  {
    title: "FeldmanHall, O., & Heffner, J. (2022). A generalizable framework for assessing the role of emotion during choice. American Psychologist, 77(9), 1017.",
    href: "https://static1.squarespace.com/static/56100827e4b0a8aca363cc5f/t/63b86dad78612c089553c06f/1673031085505/2022_AP_GeneralFrameworkEmotion.pdf",
    tags: ["emotion", "computational"],
    favorite: true,
  },
  {
    title: "Heffner, J., & FeldmanHall, O. (2022). A probabilistic map of emotional experiences during competitive social interactions. Nature Communications, 13(1), 1718.",
    href: "https://www.nature.com/articles/s41467-022-29372-8.pdf",
    tags: ["emotion", "social", "computational"],
  },
  {
    title: "Houlihan, S. D., Kleiman-Weiner, M., Hewitt, L. B., Tenenbaum, J. B., & Saxe, R. (2023). Emotion prediction as computation over a generative theory of mind. Philosophical Transactions of the Royal Society A, 381(2251), 20220047.",
    href: "https://cbmm.mit.edu/sites/default/files/publications/houlihan2023computedappraisals_1.pdf",
    tags: ["emotion", "social", "computational"],
  },
  {
    title: "Hoemann, K., Lee, Y., Kuppens, P., Gendron, M., & Boyd, R. L. (2023). Emotional granularity is associated with daily experiential diversity. Affective Science, 4(2), 291-306.",
    href: "https://link.springer.com/article/10.1007/s42761-023-00185-2",
    tags: ["emotion", "behavioral"],
  },
  {
    title: "Jackson, J. C., Watts, J., Henry, T. R., List, J. M., Forkel, R., Mucha, P. J., et al. (2019). Emotion semantics show both cultural variation and universal structure. Science, 366(6472), 1517-1522.",
    href: "https://www.science.org/doi/10.1126/science.aaw8160",
    tags: ["language", "emotion", "culture"],
    favorite: true,
  },
  {
    title: "Jackson, J. C., Rand, D., Lewis, K., Norton, M. I., & Gray, K. (2017). Agent-based modeling: A guide for social psychologists. Social Psychological and Personality Science, 8(4), 387-395.",
    href: "https://journals.sagepub.com/doi/pdf/10.1177/1948550617691100",
    tags: ["social", "computational", "behavioral"],
    favorite: true,
  },
  {
    title: "Kroll, J. F., Bobb, S. C., & Hoshino, N. (2014). Two languages in mind: Bilingualism as a tool to investigate language, cognition, and the brain. Current Directions in Psychological Science, 23(3), 159-163.",
    href: "https://journals.sagepub.com/doi/pdf/10.1177/0963721414528511",
    tags: ["language"],
    favorite: true,
  },
  {
    title: "Malik-Moraleda, S., Ayyash, D., Gallee, J., Affourtit, J., Hoffmann, M., Mineroff, Z., et al. (2022). An investigation across 45 languages and 12 language families reveals a universal language network. Nature Neuroscience, 25(8), 1014-1019.",
    href: "https://www.nature.com/articles/s41593-022-01114-5",
    tags: ["language", "neuroimaging"],
  },
  {
    title: "Rubio-Fernandez, P., Berke, M. D., & Jara-Ettinger, J. (2025). Tracking minds in communication. Trends in Cognitive Sciences, 29(3), 269-281.",
    href: "https://pure.mpg.de/rest/items/item_3623483_2/component/file_3627375/content",
    tags: ["language", "social", "computational", "conversation"],
  },
  {
    title: "Tuckute, G., Kanwisher, N., & Fedorenko, E. (2024). Language in brains, minds, and machines. Annual Review of Neuroscience, 47, 277-301.",
    href: "https://www.annualreviews.org/content/journals/10.1146/annurev-neuro-120623-101142?TRACK=RSS",
    tags: ["language", "computational", "neuroimaging"],
  },
  {
    title: "Wolna, A., Szewczyk, J., Diaz, M., Domagalik, A., Szwed, M., & Wodniecka, Z. (2024). Domain-general and language-specific contributions to speech production in a second language. Scientific Reports, 14(1), 57.",
    href: "https://www.nature.com/articles/s41598-023-49375-9.pdf",
    tags: ["language", "neuroimaging"],
    favorite: true,
  },
];

const resources = [
  ["{here}", "A simpler way to find your files", "https://here.r-lib.org"],
  ["{tidypandas}", "A grammar of data manipulation for pandas inspired by tidyverse", "https://tidypyverse.github.io/tidypandas/_build/html/index.html"],
  ["Meaning Extraction Helper", "Text analysis, topic modeling, and language exploration", "https://www.ryanboyd.io/software/meh/"],
  ["MKernel", "A Jupyter Kernel for Matlab", "https://github.com/allefeld/mkernel"],
  ["Andy's Brain Book", "Neuroimaging walkthroughs", "https://andysbrainbook.readthedocs.io/en/latest/index.html"],
  ["BIDS", "Brain Imaging Data Structure", "https://bids.neuroimaging.io"],
  ["FreeSurferWiki", "Structural and functional MRI analysis", "https://surfer.nmr.mgh.harvard.edu/fswiki"],
  ["The R Graph Gallery", "A collection of charts made with R", "https://r-graph-gallery.com"],
  ["Cientifico Latino Writing Center", "STEM writing support and resources", "https://www.cientificolatino.com/writing-center"],
  ["3Blue1Brown", "Animated math by Grant Sanderson", "https://www.3blue1brown.com"],
];

export function ReadingsResourceBrowser() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const visibleReadings = readings.filter((reading) => {
    if (!activeTag) return false;
    if (activeTag === "all") return true;
    if (activeTag === "favorites") return reading.favorite;
    return reading.tags.includes(activeTag);
  });

  function toggleTag(tag: string) {
    setActiveTag((current) => (current === tag ? null : tag));
  }

  return (
    <>
      <details>
        <summary className="cursor-pointer list-none">
          <span className="text-[#6f8200] hover:underline">Articles and scholars</span>{" "}
          <span>that have captured my attention, challenged my scientific convictions, shaped my understanding, and inspired my favorite discussions.</span>
        </summary>
        <div className="mt-5 pl-5">
          <p>
            <strong>Legend</strong> (click tabs to filter)
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tags.map(([tag, color]) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="cursor-pointer bg-transparent p-0 font-serif text-sm hover:underline"
                style={{ color }}
              >
                {"{"}›{"}"} {tag}
              </button>
            ))}
            <button type="button" onClick={() => toggleTag("favorites")} className="cursor-pointer bg-transparent p-0 font-serif text-sm hover:underline">
              {"{"}›{"}"} <strong>fav</strong>
            </button>
            <button type="button" onClick={() => toggleTag("all")} className="cursor-pointer bg-transparent p-0 font-serif text-sm hover:underline">
              {"{"}›{"}"} all
            </button>
          </div>
          <ul className="mt-5">
            {visibleReadings.map((reading) => (
              <li key={reading.title}>
                {reading.favorite ? <strong>{reading.title}</strong> : reading.title}{" "}
                {reading.tags.map((tag) => {
                  const color = tags.find(([label]) => label === tag)?.[1] ?? "inherit";
                  return (
                    <span key={tag} style={{ color }}>
                      ›
                    </span>
                  );
                })}{" "}
                [<ExternalLink href={reading.href}>§</ExternalLink>]
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details>
        <summary className="cursor-pointer list-none">
          <span className="text-[#6f8200] hover:underline">A collection of useful materials</span>{" "}
          <span>I&apos;ve run into during my time in science, intended to help facilitate research, coding, and scientific exploration.</span>
        </summary>
        <div className="mt-5 pl-5">
          <ul>
            {resources.map(([name, description, href]) => (
              <li key={name}>
                <ExternalLink href={href}>{name}</ExternalLink> | {description}
              </li>
            ))}
          </ul>
        </div>
      </details>
    </>
  );
}
