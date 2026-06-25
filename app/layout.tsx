import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { businessVerticals } from "@/data/businessVerticals";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const verticalKeywords = businessVerticals.flatMap((v) => v.seoKeywords);
const allKeywords = [...new Set([...siteConfig.seo.keywords, ...verticalKeywords])];

const metadataBase = new URL(siteConfig.url);
const brandTitle = siteConfig.brandName.replace(/\.$/, "");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${brandTitle} · ${siteConfig.seo.shortTitle}`,
    template: `%s · ${brandTitle}`,
  },
  description: siteConfig.seo.description,
  keywords: allKeywords,
  authors: [{ name: brandTitle }],
  creator: brandTitle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: brandTitle,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1920,
        height: 1080,
        alt: `${brandTitle} — websites, software & Google presence for hotels, cafés, shops & ecommerce`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <SmoothScroll />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
