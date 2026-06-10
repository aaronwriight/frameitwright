import Link from "next/link";
import type { Metadata } from "next";
import { WikiShell } from "@/components/site/site-content";
export const metadata: Metadata = {
  title: "wiki", /* top left corner */
  description: "an ode to slow living",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "aaron wright",
    description: "an ode to slow living",
    images: ["/images/sand_dollar.png"],
    authors: ["https://aaronwriight.github.io"],
  },
};

export default function AboutPage() {
  return (
    <WikiShell title="wiki">
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>bio</b></h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          A creative endeavor by <Link href="https://aaronwriight.github.io">Aaron Wright</Link>.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>nav</b></h2>
        <p className="m-0 mt-2 text-sm antialiased">
          This site gathers a few threads of my life, from cognitive science, mentorship, creative interests, writing, and photography, to all the
          little things that broaden my scope for imagination. I hope you enjoy!
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>dev</b></h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          Written in React via <Link href="https://nextjs.org">Next.js</Link>{" "}
          with <Link href="https://sanity.io">Sanity</Link> providing the CMS.
          Styling with <Link href="https://tailwindcss.com">Tailwind</Link>.
          Hosted on <Link href="https://vercel.com">Vercel</Link>. Analytics by
          privacy focussed <Link href="https://plausible.io">Plausible</Link>
        </p>
        <p className="m-0 mt-2 text-sm antialiasted">
          Forked from <Link href="https://github.com/tbrasington/the-post-chaise-site">Thomas Brasington</Link> on GitHub.
        </p>
      </div>
    </WikiShell>
  );
}
