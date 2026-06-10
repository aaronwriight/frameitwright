import type { Metadata } from "next";
import Link from "next/link";
import { ScienceShell } from "@/components/science/science-content";

export const metadata: Metadata = {
  title: "science about",
  description: "Science background for Aaron Wright",
};

export default function CognitiveScienceAboutPage() {
  return (
    <ScienceShell title="about">
      <p>
        <strong>
          To me, science is <em>mentorship</em>.
        </strong>
      </p>
      <p>
        I&apos;ve been privileged to experience several wonderful scholars&apos; investments, and my scientific lens is as much a product of their
        wisdom and prompting as it is formed around my own desire to mentor future scholars.
      </p>
      <ul>
        <li>
          Beginning in the Fall, I will join the{" "}
          <Link href="https://fpetzschner.com/lab/">Psychiatry, Embodiment and Computation (PEAC) Lab</Link>, within the Department of{" "}
          <Link href="https://copsy.brown.edu">Cognitive and Psychological Sciences</Link> and{" "}
          <Link href="https://carney.brown.edu">Carney Institute for Brain Science</Link> Brown. I&apos;m thrilled to be work with{" "}
          <Link href="https://fpetzschner.com/about/">Frederike Petzschner</Link> and her team to study embodied intelligence –– how brain-body
          interactions shape learning, emotion, and psychiatric vulnerability –– using computational modeling, neuroimagining (EEG, fMRI), and
          behavioral methods.
        </li>
        <li>
          Currently, I&apos;m &quot;<em>discovering how minds and brains create language</em>&quot; as a{" "}
          <Link href="https://bcs.mit.edu/postbac1">post-baccalaureate research assistant</Link> in{" "}
          <Link href="https://www.evlab.mit.edu/about-ev">Evelina Fedorenko&apos;s</Link> language lab at MIT. I&apos;ve been working with{" "}
          <Link href="https://x.com/agata_wolna">Agata Wolna</Link>, using fMRI and other techniques to explore the neural signatures of language
          processing, including the broader language network and how monolinguals and bilinguals differ in production and comprehension.
          <ul>
            <li>
              Simultaneously, I&apos;ve been in collaboration with <Link href="https://yiyangteoh.com">Yi Yang Teoh</Link> in{" "}
              <Link href="https://www.feldmanhalllab.com">Oriel FeldmanHall&apos;s lab</Link> at Brown, thinking about individual differences in emotion
              semantics and their implications for behavioral wellbeing and decision making.
            </li>
          </ul>
        </li>
        <li>
          Previously, I received my B.S. from Gordon College, where <Link href="https://www.gordon.edu/susanbobb">Dr. Susan Bobb</Link> transformed
          my distinct appreciations for linguistic structure and the human mind into a unified love of language in the bilingual brain.{" "}
          <Link href="https://www.gordon.edu/peteriltis">Dr. Peter Iltis</Link> also fostered these passions by taking me on as a research assistant
          working with real-time MRI and acoustic data from brass instrumentalists.
          <ul>
            <li>
              During my undergraduate years, I also worked as a neuropsychology research assistant at the{" "}
              <Link href="https://www.bumc.bu.edu/fhs-bap/">Framingham Heart Study Brain Aging Program</Link>. Guidance from{" "}
              <Link href="https://heartbrain.hms.harvard.edu/people/julie-joyce-bs">Julie Joyce</Link> and{" "}
              <Link href="https://psychology.ku.edu/people/emma-muller">Emma Muller</Link> revealed to me the joy and importance of doing science
              with and for one&apos;s community.
            </li>
          </ul>
        </li>
      </ul>
    </ScienceShell>
  );
}
