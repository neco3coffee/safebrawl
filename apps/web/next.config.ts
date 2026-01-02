import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 86400 * 1000).toUTCString()
          }
        ]
      }
    ]
  }
};

export default nextConfig;
