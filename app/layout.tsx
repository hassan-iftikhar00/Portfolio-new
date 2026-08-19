import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hassan Iftikhar - Full Stack Developer",
  description:
    "Full stack developer building multi-tenant SaaS platforms, admin panel systems, and web applications. React, Next.js, Node.js, TypeScript.",
  keywords: [
    "Hassan Iftikhar",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: "Hassan Iftikhar", url: "https://hassaniftikhar.dev" }],
  creator: "Hassan Iftikhar",
  icons: {
    icon: "/Copilot_20260310_201847.png",
    apple: "/Copilot_20260310_201847.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Hassan Iftikhar - Full Stack Developer",
    description:
      "Full stack developer. SaaS platforms, admin systems, and web applications.",
    siteName: "Hassan Iftikhar",
    images: [
      { url: "/Copilot_20260310_201847.png", width: 1024, height: 1024 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Iftikhar - Full Stack Developer",
    description:
      "Full stack developer. SaaS platforms, admin systems, and web applications.",
    images: ["/Copilot_20260310_201847.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
