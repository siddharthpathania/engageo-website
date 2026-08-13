import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Engageo — AI Missed-Call Recovery for Indian Clinics',
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F7F5F2',
    theme_color: '#3D5AFE',
    lang: 'en-IN',
    dir: 'ltr',
    scope: '/',
    icons: [
      // Static, pre-generated files in public/ — these must stay in sync with the
      // `icons` metadata in src/app/layout.tsx. The previous dynamic routes
      // (src/app/icon1.tsx / icon2.tsx / apple-icon.tsx) were removed, so the old
      // /icon1, /icon2 and /apple-icon paths 404'd and broke the manifest icons.
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'medical', 'productivity'],
  };
}
