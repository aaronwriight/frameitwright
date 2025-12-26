// ./components/Posts.tsx

import { SanityGuide, GuideIndexList } from "@/sanity/types/guides";
import { GuideThumbnail } from "./thumbnail";

export default function Guides({ guides }: { guides: SanityGuide[] }) {
  const dates = guides.map((item) => item.date_of_guide.split("-")[0]);
  const uniqeYears = [...new Set(dates)];
  const groupedGuidesByYear: Array<{ year: string; items: SanityGuide[] }> =
    uniqeYears.map((el) => {
      return {
        year: el,
        items: guides.filter((item) => item.date_of_guide.split("-")[0] === el),
      };
    });

  return (
    <main className="container mx-auto grid grid-cols-auto snap-proximity gap-1 px-6 py-11">

    <br />
    <br />
    <br />

    {/* portfolio */}

    <div className="flex items-baseline gap-2">
      <span className="font-serif text-sm lowercase tracking-widest">
        portfolio
      </span>
      <span className="font-serif text-sm lowercase tracking-widest">|</span>
      <span className="font-serif text-xs text-stone-500 lowercase tracking-wider">
        <i>hand-picked favorites</i>
      </span>
    </div>

    {/* client galleries */}
    {/* set up like SOI blog */}

    <div className="flex items-baseline gap-2">
      <span className="font-serif text-sm lowercase tracking-widest">
        galleries
      </span>
      <span className="font-serif text-sm lowercase tracking-widest">|</span>
      <span className="font-serif text-xs text-stone-500 lowercase tracking-wider">
        <i>minimal carousels</i> 
      </span>
    </div>

    {/* scope for imagination blog */}
    {/* set up like client galleries */}

    <div className="flex items-baseline gap-2">
      <span className="font-serif text-sm lowercase tracking-widest">
        scope for imagination
      </span>
      <span className="font-serif text-sm lowercase tracking-widest">|</span>
      <span className="font-serif text-xs text-stone-500 lowercase tracking-wider">
        <i>digital journal</i>
      </span>
    </div>

    {/* sand dollar hunting */}

    <div className="flex items-baseline gap-2">
      <span className="font-serif text-sm lowercase tracking-widest">
        sand dollar hunting
      </span>
      <span className="font-serif text-sm lowercase tracking-widest">|</span>
      <span className="font-serif text-xs text-stone-500 lowercase tracking-wider">
        <i>coming soon...</i>
      </span>
    </div>
 
    <br />
    <br />

    <p className="italic font-serif leading-relaxed text-sm text-stone-500 text-center">
      Well, that is one of the things to find out sometime. Isn't it splendid to
      think of all the things there are to find out about? It just makes me feel
      glad to be alive – it's such an interesting world. It wouldn't be half so
      interesting if we know all about everything, would it? There'd be no scope
      for imagination then, would there?
      <br />
      <span className="block italic font-serif leading-relaxed text-xs text-stone-400 text-right mr-30">– Anne of Green Gables, L. M. Montgomery</span>
    </p>

      {groupedGuidesByYear.map((year) => {
        return (
          <div
            key={`year-${year.year}`}
            className="flex flex-col gap-4 sm:flex-row sm:gap-8"
          >
            <h2 className="font-mono text-sm text-stone-600 dark:text-stone-500">
              {year.year}
            </h2>

            <div className="grid-cols grid flex-1 snap-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {year.items.map((guide) => {
                return (
                  <GuideThumbnail
                    key={guide._id}
                    title={guide.title}
                    slug={guide.slug}
                    hero_image={guide.hero_image}
                    lqip={guide.lqip}
                    bg={guide.palette?.vibrant?.background || "inherit"}
                    bgDark={guide.palette?.darkVibrant?.background || "inherit"}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
