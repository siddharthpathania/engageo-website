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
      // Generated at build time by src/app/icon1.tsx / icon2.tsx / apple-icon.tsx
      {
        src: '/icon1',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon2',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon2',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'medical', 'productivity'],
  };
}
