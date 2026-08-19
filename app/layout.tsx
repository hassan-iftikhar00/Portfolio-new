import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { owner } from "@/lib/data";

// Self-hosted, non-blocking fonts. Replaces the render-blocking <link>/@import.
// Exposed as CSS variables consumed by tailwind.config.ts (sans / mono).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://hassaniftikhar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hassan Iftikhar — Full Stack Developer",
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
    title: "Hassan Iftikhar — Full Stack Developer",
    description:
      "Production SaaS engineer. AI sketch-to-code, multi-tenant feedback, live school and election platforms.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: owner.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Iftikhar — Full Stack Developer",
    description:
      "Production SaaS engineer. AI sketch-to-code, multi-tenant feedback, live school and election platforms.",
    images: ["/og.png"],
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // JSON-LD is static, controlled data. Not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
