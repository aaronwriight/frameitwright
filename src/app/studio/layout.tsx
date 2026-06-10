export const metadata = {
  title: "aaron wright | studio",
  description: "Sanity Studio for aaron wright",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
