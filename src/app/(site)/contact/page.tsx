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

      <div className="not-prose grid gap-5 sm:grid-cols-2">
        <section className="border border-t-2 border-stone-300 p-6 dark:border-stone-700" style={{ borderTopColor: "#2aa198" }}>
          <p className="text-[0.65rem] lowercase tracking-[0.2em] text-[#2aa198]">research &amp; academia</p>
          <h2 className="mt-2 font-serif text-base font-normal lowercase text-stone-900 dark:text-stone-100">science</h2>
          <p className="mt-4 text-xs leading-6 text-stone-500">Research questions, collaborations, mentorship, talks, and academic correspondence.</p>
          <p className="mt-5 font-serif text-sm text-[#2aa198]">aawva {"{at}"} mit {"{dot}"} edu</p>
          <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs lowercase tracking-wider">
            <Link href="https://github.com/aaronwriight" className="text-[#2aa198]">github</Link>
            <Link href="https://scholar.google.com/citations?user=2b1N4FcAAAAJ&hl=en" className="text-[#2aa198]">google scholar</Link>
            <Link href="https://orcid.org/0009-0003-2532-2866" className="text-[#2aa198]">orcid</Link>
          </nav>
        </section>

        <section className="border border-t-2 border-stone-300 p-6 dark:border-stone-700" style={{ borderTopColor: "#d33682" }}>
          <p className="text-[0.65rem] lowercase tracking-[0.2em] text-[#d33682]">visual work &amp; personal projects</p>
          <h2 className="mt-2 font-serif text-base font-normal lowercase text-stone-900 dark:text-stone-100">photography &amp; creative</h2>
          <p className="mt-4 text-xs leading-6 text-stone-500">Photography, bookings, creative collaborations, and other ideas looking for a home.</p>
          <p className="mt-5 font-serif text-sm">
            <Link href="mailto:frameitwright@gmail.com" className="text-[#d33682]">frameitwright@gmail.com</Link>
          </p>
          <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs lowercase tracking-wider">
            <Link href="https://www.instagram.com/frameitwrightphotography/" className="text-[#d33682]">instagram</Link>
            <Link href="https://www.buymeacoffee.com/aaronwriight" className="text-[#d33682]">buy me a coffee ;)</Link>
          </nav>
        </section>
      </div>

      <section className="not-prose border border-l-2 border-stone-300 p-6 dark:border-stone-700" style={{ borderLeftColor: "#b58900" }}>
        <p className="text-[0.65rem] lowercase tracking-[0.2em] text-[#b58900]">scope for imagination</p>
        <h2 className="mt-2 font-serif text-base font-normal lowercase text-stone-900 dark:text-stone-100">mailing list</h2>
        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <p className="max-w-xl text-xs leading-6 text-stone-500">An occasional note when something new finds its way into the journal.</p>
          <Link
            href="mailto:frameitwright@gmail.com?subject=Scope%20for%20Imagination%20mailing%20list&body=Hi%20Aaron%2C%0A%0APlease%20add%20me%20to%20the%20Scope%20for%20Imagination%20mailing%20list.%0A"
            className="whitespace-nowrap text-xs lowercase tracking-widest text-[#b58900] hover:underline"
          >
            join the list →
          </Link>
        </div>
      </section>

      <p>Looking forward to connecting!</p>
    </ContactShell>
  );
}
