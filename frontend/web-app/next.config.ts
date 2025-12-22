import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com"],
  },
};

export default nextConfig;
