// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // Opens two browser tabs (client + server bundle treemaps) when ANALYZE=true.
  // Run: ANALYZE=true npm run build
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    // Add specific hostnames here as needed, e.g.:
    // { protocol: "https", hostname: "res.cloudinary.com" }
    remotePatterns: [],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
