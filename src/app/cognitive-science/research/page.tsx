import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "research",
  description: "research page for cognitive science module",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`)
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif lowercase tracking-widest">
        MODULE — PAGE
      </h1>

      <p className="mt-6 text-stone-700">
        Placeholder content for the MODULE / PAGE route. Replace this with real
        content, Sanity-driven data, or import a Markdown editor template later.
      </p>

      {/* For the digital journal new-post you might replace the paragraph above with an editor scaffold:
          <div contentEditable className="mt-6 prose max-w-none">Start writing your post…</div>
       */}
    </main>
  );
}