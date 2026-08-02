import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [384, 512, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      // Live website thumbnails for the portfolio grid
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "api.microlink.io" },
    ],
  },
};

export default nextConfig;
