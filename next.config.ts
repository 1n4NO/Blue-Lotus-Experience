import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

export default nextConfig;
