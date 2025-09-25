import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    PORT: process.env.PORT,
  },

  // Strapi API proxy rewrites to avoid CORS
  async rewrites() {
    return [
      {
        source: "/strapi-api/:path*",
        destination:
          "https://refreshing-acoustics-4f6486bcd4.strapiapp.com/api/:path*",
      },
    ];
  },

  // SEO and Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // TypeScript and ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization with Strapi support
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "refreshing-acoustics-4f6486bcd4.strapiapp.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "refreshing-acoustics-4f6486bcd4.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/strapi-api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/:path*.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO - adapted for pgadmit
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/university",
        destination: "/universities",
        permanent: true,
      },
      {
        source: "/uni",
        destination: "/universities",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/applications",
        permanent: true,
      },
      {
        source: "/application",
        destination: "/applications",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/user",
        destination: "/profile",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/profile",
        permanent: true,
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@/components", "@/lib", "@/hooks"],
  },

  // Windows compatibility fixes
  webpack: (config, { isServer }) => {
    if (process.platform === 'win32') {
      config.resolve.symlinks = false;
    }
    return config;
  },

  // Docker optimization - disabled for Windows compatibility
  // output: "standalone",
};

export default nextConfig;
