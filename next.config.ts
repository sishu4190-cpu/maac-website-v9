import type { NextConfig } from "next";
import { productCategoryRedirects } from "./app/data/productRedirects";

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

  // 301 redirects for product/category URLs that moved when the product
  // catalogue was restructured from 6 to 10 categories (July 2026) —
  // keeps existing Google rankings/backlinks pointed at the right page
  // instead of 404ing.
  async redirects() {
    return productCategoryRedirects;
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    // Admin-managed content (products, gallery, certificates, blog, etc.)
    // changes at any time — disable the client Router Cache's staleTime so
    // every navigation always fetches the current server-rendered content
    // instead of a cached copy from a few seconds/minutes ago.
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },

  // Powered by header removal
  poweredByHeader: false,
};

export default nextConfig;
