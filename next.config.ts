import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static copy (used for shareable previews).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport ? { output: "export" as const, trailingSlash: true, assetPrefix: "/w" } : {}),
  images: {
    unoptimized: staticExport,
    // Official Waggle product photography is served from Shopify's CDN (either host form).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "mywaggle.com", pathname: "/cdn/shop/**" },
    ],
  },
};

export default nextConfig;
