import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // force Client comme racine
  },
};

export default nextConfig;
