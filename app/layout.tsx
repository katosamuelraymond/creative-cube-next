import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Creative Cube — Premium Furniture Store",
    template: "%s | Creative Cube",
  },
  description:
    "Discover handcrafted, premium furniture for every room. Creative Cube offers curated collections of chairs, tables, beds, sofas, and cabinets.",
  keywords: ["furniture", "home decor", "premium furniture", "creative cube"],
  openGraph: {
    title: "Creative Cube — Premium Furniture Store",
    description: "Discover handcrafted, premium furniture for every room.",
    type: "website",
    locale: "en_US",
    siteName: "Creative Cube",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

