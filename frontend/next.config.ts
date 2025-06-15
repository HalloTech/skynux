import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    BACKEND_URL: 'http://localhost:5000'
  }
};

export default nextConfig;
