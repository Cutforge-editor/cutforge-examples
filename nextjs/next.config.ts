import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cross-origin isolation turns on the editor's low-latency audio engine. Scoped to the
  // editor route so the rest of the site can keep loading third-party resources.
  // Note: this only applies on a full page load, which is why app/page.tsx links to
  // /editor with a plain <a>, not next/link.
  async headers() {
    return [
      {
        source: '/editor',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

export default nextConfig;
