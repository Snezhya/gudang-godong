import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow data URIs (base64 images from admin menu uploads)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    formats: ['image/avif', 'image/webp'],
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
