// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // Opens two browser tabs (client + server bundle treemaps) when ANALYZE=true.
  // Run: ANALYZE=true npm run build
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    // Add specific hostnames here as needed, e.g.:
    // { protocol: "https", hostname: "res.cloudinary.com" }
    remotePatterns: [],
  },
  experimental: {
    // Barrel-file import optimisation.
    // Ensures Next.js tree-shakes these packages to only the exports used,
    // instead of bundling the entire barrel index into every chunk.
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
