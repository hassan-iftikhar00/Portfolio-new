import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/data";

const base = "https://hassaniftikhar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${base}/projects/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
