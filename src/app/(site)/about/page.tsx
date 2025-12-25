import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "scope for imagination",
  description: "an ode to slow living",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "scope for imagination",
    description: "an ode to slow living",
    images: ["/Users/aaronwright/Documents/GitHub/aaronwriight/frameitwright/images/sand_dollar.png"],
    authors: ["https://aaronwriight.github.io"],
  },
};

export default function about() {
  return (
    <main className="prose prose-stone dark:prose-invert prose-base container mx-auto  flex-1 space-y-7 px-6 py-11">
      <h1 className="m-0 text-sm font-medium antialiased"><b>about</b></h1>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">bio</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          A photographic archive by <Link href="https://aaronwriight.github.io">Aaron Wright</Link>. A 2025 iteration of a 2020 concept.
          A digital journal of sorts – something to keep my life in science balanced.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">typography</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          Set in <Link href="https://vercel.com/font/sans">Geist Sans</Link> and{" "}
          <Link href="https://vercel.com/font/mono">Geist Mono</Link> by Vercel.
          It has nice proportions for small text, and the niceities of classic
          grotesques and some of the more humanist/softer touchers in modern
          sans.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased">hosting</h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          Written in React via <Link href="https://nextjs.org">Next.js</Link>{" "}
          with <Link href="https://sanity.io">Sanity</Link> providing the CMS.
          Styling with <Link href="https://tailwindcss.com">Tailwind</Link>.
          Hosted on <Link href="https://vercel.com">Vercel</Link>. Analytics by
          privacy focussed <Link href="https://plausible.io">Plausible</Link>
        </p>
        <p className="m-0 mt-2 text-sm antialiasted">
          Forked on GitHub from <Link href="https://github.com/tbrasington/the-post-chaise-site">Thomas Brasington</Link>.
        </p>
      </div>
    </main>
  );
}
