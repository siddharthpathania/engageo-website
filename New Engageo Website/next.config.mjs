import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Content Security Policy — production-grade, works with Next.js + Vercel
 * Analytics + Google Analytics + inline styles (Tailwind).
 *
 * NOTE: `unsafe-inline` for style-src is required by Tailwind/Next.js.
 * `unsafe-eval` is NOT included — keep it that way.
 */
const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self'${isDev ? ' ws://localhost:* http://localhost:*' : ''} https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDev ? '' : 'upgrade-insecure-requests;'}
`
  .replace(/\n/g, '')
  .replace(/\s{2,}/g, ' ')
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'clsx', 'tailwind-merge'],
  },

  /* ── Redirects (old URL → new URL) ──────────────────────── */
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/#features',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/#faq',
        permanent: true,
      },
    ];
  },

  /* ── Security + caching headers ─────────────────────────── */
  async headers() {
    return [
      /* Security headers — all routes */
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      /* Immutable cache for hashed static assets */
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      /* Long cache for public static files */
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
