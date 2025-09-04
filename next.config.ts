import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    viewTransition: true,
    useCache: true,
  }
};

export default nextConfig;
