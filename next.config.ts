import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ERXES_API_URL: process.env.ERXES_API_URL,
    ERXES_APP_TOKEN: process.env.ERXES_APP_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "autooilnew.next.erxes.io",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
