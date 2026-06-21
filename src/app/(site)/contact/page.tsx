import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactShell } from "@/components/site/site-content";
import { NewsletterSignup } from "@/components/site/newsletter-signup";

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
        <div className="min-w-0 space-y-3 leading-relaxed sm:-translate-y-1">
          <p className="m-0 font-serif text-sm lowercase tracking-widest">aaron wright</p>
          <br></br>
          <p className="m-0 text-xs text-stone-500">
            Post-Baccalaureate Research Scholar @ MIT Brain & Cognitive Sciences {"{EvLab}"} 🧠
          </p>
          <br></br>
          <p className="m-0 text-xs lowercase tracking-wider text-stone-500">
            cambridge, ma |{" "}
            <Link href="https://bcs.mit.edu" className="text-[#6f8200]">mit</Link>{" "}
            <Link href="https://www.evlab.mit.edu" className="text-[#6f8200]">evlab</Link>{" "}
            <Link href="https://scholar.google.com/citations?user=2b1N4FcAAAAJ&hl=en" className="text-[#6f8200]">google scholar</Link>{" "}
            <Link href="https://orcid.org/0009-0003-2532-2866" className="text-[#6f8200]">orcid</Link>{" "}
            <Link href="https://github.com/aaronwriight" className="text-[#6f8200]">github</Link>{" "}
            <Link href="https://www.linkedin.com/in/aaron-wriight" className="text-[#6f8200]">linkedin</Link>{" "}
            <Link href="https://bsky.app/profile/aaronwriight.bsky.social" className="text-[#6f8200]">bluesky</Link>
          </p>
          <br></br>
          <p className="m-0 text-xs lowercase tracking-wider text-stone-500">
            <Link href="/files/cv/WrightAaron_cv_2026_current.pdf" target="_blank" rel="noopener noreferrer" className="text-[#6f8200]">
              cv
            </Link>
          </p>
        </div>
      </div>

      <p>
        You can learn more about me and the work I do in a variety of places on this site or elsewhere. Feel free to reach out about my communities,
        my research, creative efforts, or just to have a chat!
      </p>

      <div className="not-prose border-y border-stone-300 dark:border-stone-700">
        <div className="grid sm:grid-cols-2">
          <section className="py-7 sm:pr-8">
            <h2 className="font-serif text-sm font-normal lowercase tracking-widest text-stone-900 dark:text-stone-100">science</h2>
            <p className="mt-3 text-xs leading-6 text-stone-500">Research questions, collaborations, mentorship, talks, and academic correspondence.</p>
            <p className="mt-5 font-serif text-sm text-[#6f8200]">aawva {"{at}"} mit {"{dot}"} edu</p>
            <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs lowercase tracking-wider">
              <Link href="https://github.com/aaronwriight" className="text-[#6f8200]">github</Link>
              <Link href="https://scholar.google.com/citations?user=2b1N4FcAAAAJ&hl=en" className="text-[#6f8200]">google scholar</Link>
              <Link href="https://orcid.org/0009-0003-2532-2866" className="text-[#6f8200]">orcid</Link>
            </nav>
          </section>

          <section className="border-t border-stone-300 py-7 dark:border-stone-700 sm:border-l sm:border-t-0 sm:pl-8">
            <h2 className="font-serif text-sm font-normal lowercase tracking-widest text-stone-900 dark:text-stone-100">photography &amp; creative</h2>
            <p className="mt-3 text-xs leading-6 text-stone-500">Photography, bookings, creative collaborations, and other ideas looking for a home.</p>
            <p className="mt-5 font-serif text-sm">
              <Link href="mailto:frameitwright@gmail.com" className="text-[#6f8200]">frameitwright@gmail.com</Link>
            </p>
            <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs lowercase tracking-wider">
              <Link href="https://www.instagram.com/frameitwrightphotography/" className="text-[#6f8200]">instagram</Link>
              <Link href="https://www.buymeacoffee.com/aaronwriight" className="text-[#6f8200]">buy me a coffee ;)</Link>
            </nav>
          </section>
        </div>

        <section className="border-t border-stone-300 py-7 dark:border-stone-700">
          <h2 className="font-serif text-sm font-normal lowercase tracking-widest text-stone-900 dark:text-stone-100">mailing list</h2>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-stone-500">
            Get an occasional email when a new entry finds its way into Scope for Imagination.
          </p>
          <NewsletterSignup />
        </section>
      </div>

      <p>Looking forward to connecting!</p>
    </ContactShell>
  );
}
