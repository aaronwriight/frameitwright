import type { Metadata } from "next";
import Image from "next/image";
import { JournalShell } from "@/components/site/site-content";
import shellsImage from "../../../../images/shells.jpg";

export const metadata: Metadata = {
  title: "scope for imagination | aaron wright",
  description: "A digital journal of photographs, musings, life updates, and the occasional rant.",
  openGraph: {
    title: "scope for imagination | aaron wright",
    description: "A digital journal of photographs, musings, life updates, and the occasional rant.",
    images: ["/sand_dollar.png"],
  },
};

export default function ScopeForImaginationPage() {
  return (
    <JournalShell title="scope for imagination" showTitle={false}>
      <div className="not-prose -mt-2 space-y-16 sm:space-y-24">
        <section className="grid items-end gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(18rem,1.15fr)] md:gap-12">
          <div className="pb-1 md:pb-8">
            <p className="mb-5 text-[0.65rem] lowercase tracking-[0.3em] text-stone-500">a digital journal</p>
            <h1 className="max-w-md font-serif text-4xl font-normal lowercase leading-[0.9] tracking-[-0.035em] text-stone-900 dark:text-stone-100 sm:text-5xl lg:text-6xl">
              scope for <span className="italic text-[#6f8200]">imagination</span>
            </h1>
            <p className="mt-7 max-w-sm font-serif text-sm leading-7 text-stone-600 dark:text-stone-400">
              Photographs, musings, life updates, and the occasional rant—notes from an interesting world and a life still taking shape.
            </p>
          </div>

          <figure className="md:justify-self-end">
            <Image
              src={shellsImage}
              alt="A collection of sunlit seashells along the shore"
              className="aspect-[4/5] w-full max-w-xl object-cover grayscale-[12%]"
              sizes="(min-width: 1024px) 36rem, (min-width: 768px) 48vw, 100vw"
              priority
            />
            <figcaption className="mt-3 text-right font-serif text-[0.65rem] italic tracking-wide text-stone-500">
              little things worth noticing
            </figcaption>
          </figure>
        </section>

        <article id="opening-note" className="scroll-mt-16 border-t border-stone-300 pt-10 dark:border-stone-700 sm:pt-14">
          <div className="grid gap-5 sm:grid-cols-[8rem_minmax(0,34rem)] sm:gap-10">
            <p className="text-[0.65rem] lowercase tracking-[0.22em] text-stone-500">opening note · june 2026</p>
            <div>
              <h2 className="font-serif text-2xl font-normal lowercase leading-tight text-stone-900 dark:text-stone-100 sm:text-3xl">
                a place to think in public
              </h2>
              <div className="mt-5 space-y-4 font-serif text-sm leading-7 text-stone-600 dark:text-stone-400">
                <p>
                  Scope for Imagination is a home for the pieces that do not need to become projects: photographs, passing thoughts, stories,
                  questions, life updates, and the occasional lovingly considered rant.
                </p>
                <p>
                  This first page is intentionally spare. There is room here for the journal to find its own rhythm—one entry, image, and idea at a
                  time.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </JournalShell>
  );
}
