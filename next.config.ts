import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow data URIs (base64 images from admin menu uploads)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Compress responses
  compress: true,
  // Power off X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
