import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Official Waggle product photography is served from Shopify's CDN (either host form).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "mywaggle.com", pathname: "/cdn/shop/**" },
    ],
  },
};

export default nextConfig;
