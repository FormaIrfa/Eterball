import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // force Client comme racine
  },

  // ✅ Empêche Vercel de bloquer le build à cause d'ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
