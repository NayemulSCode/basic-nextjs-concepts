import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    esmExternals: true, // This allows Next.js to handle ESM-based dependencies properly
  },
};

export default nextConfig;
