import Link from "next/link";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/site/site-content";
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
    <SitePageShell title="wiki">
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>bio</b></h2>
        <p className="m-0 mt-2 text-sm  antialiased">
          A creative endeavor by <Link href="https://aaronwriight.github.io">Aaron Wright</Link>.
        </p>
      </div>
      <div>
        <h2 className="m-0  text-sm  font-medium antialiased"><b>nav</b></h2>
        <div className="not-prose mt-2 text-sm leading-6 text-stone-900 dark:text-stone-200">
          <details>
            <summary className="cursor-pointer lowercase">site pages</summary>
            <div className="mt-2 space-y-1 pl-4">
              <p className="m-0">home</p>
              <details>
                <summary className="cursor-pointer lowercase">cognitive science</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>overview</li>
                  <li>about</li>
                  <li>publications</li>
                  <li>projects</li>
                  <li className="pl-4">extended language network</li>
                  <li className="pl-4">tidy tuesday</li>
                  <li>readings & resources</li>
                  <li>mentorship</li>
                  <li>cv</li>
                </ul>
              </details>
              <details>
                <summary className="cursor-pointer lowercase">photography</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>about</li>
                  <li>gallery</li>
                </ul>
              </details>
              <details>
                <summary className="cursor-pointer lowercase">journal</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>about</li>
                </ul>
              </details>
              <details>
                <summary className="cursor-pointer lowercase">literature</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>about</li>
                  <li>shared agency</li>
                  <li>sand dollar hunting</li>
                </ul>
              </details>
              <details>
                <summary className="cursor-pointer lowercase">personal</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>about</li>
                </ul>
              </details>
              <details>
                <summary className="cursor-pointer lowercase">contact</summary>
                <ul className="m-0 mt-1 list-none space-y-1 pl-4">
                  <li>home</li>
                </ul>
              </details>
              <p className="m-0">wiki</p>
            </div>
          </details>
        </div>
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
    </SitePageShell>
  );
}
