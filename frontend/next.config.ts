import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    BACKEND_URL: 'http://localhost:5000'
  },
    images: {
    domains: ['storage.googleapis.com'], // Add the domain for external images
  },
    experimental: {
    turbo: true,
  }
};

export default nextConfig;
