import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "aaron wright", /* top left corner */
  description: "an ode to slow living",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "frame it wright photography",
    description: "an ode to slow living",
    images: ["/images/sand_dollar.png"],
    authors: ["https://aaronwriight.github.io"],
  },
};

export default function about() {
  return (
    <main className="prose prose-stone dark:prose-invert prose-base container mx-auto  flex-1 space-y-7 px-6 py-11">
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>bio</b></h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          A creative endeavor by <Link href="https://aaronwriight.github.io">Aaron Wright</Link>.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>nav</b></h2>
        <p className="m-0 mt-2 text-sm  antialiased">

          <br />
          <br />
          galleries |
          <br />
          portfolio |
          <br />
          scope for imagination |
          <br />
          sand dollar hunting |

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
    </main>
  );
}
