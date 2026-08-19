import type { Metadata } from "next";
import { Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { owner } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import GrainOverlay from "@/components/layout/GrainOverlay";

// Self-hosted, non-blocking fonts. No render-blocking <link>/@import.
// Exposed as CSS variables consumed by tailwind.config.ts.
// Unbounded (display) + JetBrains Mono (labels) from Google; General Sans
// (text + mixed-case display register) self-hosted from ./fonts (Fontshare).
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// General Sans is self-hosted via @font-face in globals.css (stable /fonts path)
// and preloaded below, so the LCP hero pitch does not wait on a font swap.

const siteUrl = "https://hassaniftikhar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hassan Iftikhar - Full Stack Developer",
    template: "%s · Hassan Iftikhar",
  },
  description:
    "Full stack developer shipping production SaaS: an AI sketch-to-code pipeline, a multi-tenant feedback platform, and live school and election systems. React, Next.js, Node, C#.",
  keywords: [
    "Hassan Iftikhar",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "C# ASP.NET Core",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: owner.name, url: siteUrl }],
  creator: owner.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: owner.name,
    title: "Hassan Iftikhar - Full Stack Developer",
    description:
      "Production SaaS engineer. AI sketch-to-code, multi-tenant feedback, live school and election platforms.",
    // OG/Twitter images come from the generated opengraph-image / twitter-image
    // file conventions (brutalist card), not a static /og.png.
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Iftikhar - Full Stack Developer",
    description:
      "Production SaaS engineer. AI sketch-to-code, multi-tenant feedback, live school and election platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: owner.name,
  jobTitle: owner.title,
  url: siteUrl,
  email: `mailto:${owner.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [owner.github, owner.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preload the above-the-fold General Sans weights (Regular = LCP hero
            pitch, Medium = tail/labels) so text paints without a swap delay. */}
        <link
          rel="preload"
          href="/fonts/GeneralSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:uppercase focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <GrainOverlay />
        <Reveal />
        <Analytics />
        <script
          type="application/ld+json"
          // JSON-LD is static, controlled data. Not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
