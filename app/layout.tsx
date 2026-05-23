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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
