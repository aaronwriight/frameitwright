import Link from "next/link";

const siteLinks = [
  ["cognitive science", "/cognitive-science"],
  ["photography", "/frame-it-wright-photography"],
  ["journal", "/scope-for-imagination"],
  ["literature", "/literature"],
  ["personal", "/personal"],
  ["contact", "/contact"],
];

const sectionLinks = {
  photography: [
    ["about", "/frame-it-wright-photography"],
    ["gallery", "/frame-it-wright-photography/gallery"],
    ["home", "/"],
  ],
  journal: [
    ["about", "/scope-for-imagination"],
    ["home", "/"],
  ],
  literature: [
    ["about", "/literature"],
    ["shared agency", "/literature/shared-agency"],
    ["sand dollar hunting", "/literature/sand-dollar-hunting"],
    ["home", "/"],
  ],
  personal: [
    ["about", "/personal"],
    ["home", "/"],
  ],
  contact: [
    ["about", "/contact"],
    ["home", "/"],
  ],
};

export function SitePageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex-1 px-6 py-11">
      <div
        className="grid items-start gap-y-8"
        style={{ columnGap: "4rem", gridTemplateColumns: "13rem minmax(0, 1fr)" }}
      >
        <SiteMenu />
        <article
          className="prose prose-stone w-full max-w-none self-start text-left text-sm dark:prose-invert prose-headings:font-serif prose-headings:lowercase prose-a:text-[#6f8200] prose-h2:text-sm prose-h2:font-medium prose-h2:tracking-normal prose-h2:normal-case"
          style={{ maxWidth: "56rem" }}
        >
          <h1 className="m-0 text-base font-medium lowercase tracking-widest">{title}</h1>
          <div className="mt-3 space-y-5">{children}</div>
        </article>
      </div>
    </main>
  );
}

export function SiteMenu() {
  return (
    <aside className="space-y-5">
      <Link href="/" className="block lowercase tracking-widest">
        home
      </Link>
      <nav className="flex flex-col items-start gap-1 text-xs lowercase tracking-wider text-stone-500">
        {siteLinks.map(([label, href]) => (
          <Link key={href} href={href} className="whitespace-nowrap hover:text-stone-900 dark:hover:text-stone-200">
            {label}
          </Link>
        ))}
        <Link href="/" className="whitespace-nowrap hover:text-stone-900 dark:hover:text-stone-200">
          home
        </Link>
      </nav>
    </aside>
  );
}

function SectionMenu({
  title,
  href,
  links,
}: {
  title: string;
  href: string;
  links: string[][];
}) {
  return (
    <aside className="space-y-5">
      <Link href={href} className="block lowercase tracking-widest">
        {title}
      </Link>
      <nav className="flex flex-col items-start gap-1 text-xs lowercase tracking-wider text-stone-500">
        {links.map(([label, linkHref]) => (
          <Link key={linkHref} href={linkHref} className="whitespace-nowrap hover:text-stone-900 dark:hover:text-stone-200">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function SectionPageShell({
  section,
  sectionHref,
  links,
  title,
  children,
}: {
  section: string;
  sectionHref: string;
  links: string[][];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex-1 px-6 py-11">
      <div
        className="grid items-start gap-y-8"
        style={{ columnGap: "4rem", gridTemplateColumns: "13rem minmax(0, 1fr)" }}
      >
        <SectionMenu title={section} href={sectionHref} links={links} />
        <article
          className="prose prose-stone w-full max-w-none self-start text-left text-sm dark:prose-invert prose-headings:font-serif prose-headings:lowercase prose-a:text-[#6f8200] prose-h2:text-sm prose-h2:font-medium prose-h2:tracking-normal prose-h2:normal-case"
          style={{ maxWidth: "56rem" }}
        >
          <h1 className="m-0 text-base font-medium lowercase tracking-widest">{title}</h1>
          <div className="mt-3 space-y-5">{children}</div>
        </article>
      </div>
    </main>
  );
}

export function PhotographyShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionPageShell section="photography" sectionHref="/frame-it-wright-photography" links={sectionLinks.photography} title={title}>
      {children}
    </SectionPageShell>
  );
}

export function JournalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionPageShell section="journal" sectionHref="/scope-for-imagination" links={sectionLinks.journal} title={title}>
      {children}
    </SectionPageShell>
  );
}

export function LiteratureShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionPageShell section="literature" sectionHref="/literature" links={sectionLinks.literature} title={title}>
      {children}
    </SectionPageShell>
  );
}

export function PersonalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionPageShell section="personal" sectionHref="/personal" links={sectionLinks.personal} title={title}>
      {children}
    </SectionPageShell>
  );
}

export function ContactShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionPageShell section="contact" sectionHref="/contact" links={sectionLinks.contact} title={title}>
      {children}
    </SectionPageShell>
  );
}

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <SitePageShell title={title}>
      <p className="text-stone-500">coming soon</p>
    </SitePageShell>
  );
}
