import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for caching & security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Never cache API routes
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },

  // Redirect www to non-www (if needed)
  async redirects() {
    return [];
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
  },

  // Powered by header removal
  poweredByHeader: false,
};

export default nextConfig;
