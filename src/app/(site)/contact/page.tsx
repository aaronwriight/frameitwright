import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactShell } from "@/components/site/site-content";

export const metadata: Metadata = {
  title: "contact",
  description: "Contact Aaron Wright",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`)
};

export default function ContactPage() {
  return (
    <ContactShell title="contact" showTitle={false}>
      <div className="not-prose flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
        <Image
          src="/images/pfp/pfp6_2025_mit_sq.jpg"
          alt="Aaron Wright"
          width={144}
          height={144}
          className="h-36 w-36 rounded-sm object-cover"
          priority
        />
        <div className="min-w-0 leading-relaxed sm:-translate-y-1">
          <p className="m-0 font-serif text-sm lowercase tracking-widest">aaron wright</p>
          <p className="m-0 mt-2 text-xs text-stone-500">
            Post-Baccalaureate Research Scholar @ MIT Brain & Cognitive Sciences {"{EvLab}"} 🧠
          </p>
          <p className="m-0 mt-4 text-xs lowercase tracking-wider text-stone-500">
            cambridge, ma |{" "}
            <Link href="https://bcs.mit.edu" className="text-[#6f8200]">mit</Link>{" "}
            <Link href="https://www.evlab.mit.edu" className="text-[#6f8200]">evlab</Link>{" "}
            <Link href="https://scholar.google.com/citations?user=2b1N4FcAAAAJ&hl=en" className="text-[#6f8200]">google scholar</Link>{" "}
            <Link href="https://orcid.org/0009-0003-2532-2866" className="text-[#6f8200]">orcid</Link>{" "}
            <Link href="https://github.com/aaronwriight" className="text-[#6f8200]">github</Link>{" "}
            <Link href="https://www.linkedin.com/in/aaron-wriight" className="text-[#6f8200]">linkedin</Link>{" "}
            <Link href="https://bsky.app/profile/aaronwriight.bsky.social" className="text-[#6f8200]">bluesky</Link>
          </p>
          <p className="m-0 mt-2 text-xs lowercase tracking-wider text-stone-500">
            <Link href="/files/cv/WrightAaron_cv_2026_current.pdf" target="_blank" rel="noopener noreferrer" className="text-[#6f8200]">
              cv
            </Link>
          </p>
        </div>
      </div>

      <p>
        You can learn more about me and the work I do in a variety of places on this site or elsewhere. Feel free to reach out about{" "}
        <Link href="https://bcs.mit.edu/postbac1">MIT&apos;s post-bacc program</Link>, about my research, or just to have a chat.
      </p>

      <ul>
        <li>
          <strong>
            <em>email</em>
          </strong>{" "}
          : aawva {"{at}"} mit {"{dot}"} edu
        </li>
        <li>
          <strong>
            <em>github</em>
          </strong>{" "}
          : <Link href="https://github.com/aaronwriight">aaronwriight</Link>
        </li>
        <li>
          <strong>
            <em>alternatively</em>
          </strong>{" "}
          : <Link href="https://www.buymeacoffee.com/aaronwriight">buy me a coffee</Link>
        </li>
      </ul>

      <p>Looking forward to connecting!</p>
    </ContactShell>
  );
}
