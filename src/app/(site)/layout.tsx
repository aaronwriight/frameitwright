import type { Metadata } from "next";

import LiveVisualEditing from "@/components/live-visual-editing";
import { draftMode } from "next/headers";

import SiteChrome from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "aaron wright | cognitive scientist, artist",
  description: "cognitive scientist, artist",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    title: "aaron wright | cognitive scientist, artist",
    description: "cognitive scientist, artist",
    images: ["/sand_dollar.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aaron wright | cognitive scientist, artist",
    description: "cognitive scientist, artist",
    images: ["/sand_dollar.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <SiteChrome>
            {children}
            {isDraftMode && <LiveVisualEditing />}
    </SiteChrome>
  );
}
