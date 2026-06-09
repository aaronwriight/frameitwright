import Link from "next/link";

const siteLinks = [
  ["cognitive science", "/cognitive-science"],
  ["frame it wright photography", "/frame-it-wright-photography"],
  ["scope for imagination", "/scope-for-imagination"],
  ["literature", "/literature"],
  ["personal", "/personal"],
  ["contact", "/contact"],
];

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
      </nav>
    </aside>
  );
}

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <SitePageShell title={title}>
      <p className="text-stone-500">coming soon</p>
    </SitePageShell>
  );
}
