import type { MetadataRoute } from "next";

const base = "https://hassaniftikhar.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
