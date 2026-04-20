import type { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { getClinicSpecialties } from '@/lib/specialty-data';

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: ChangeFreq }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/clinics', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/hospitals', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_CONFIG.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const specialtyEntries: MetadataRoute.Sitemap = getClinicSpecialties().map(
    (specialty) => ({
      url: `${SITE_CONFIG.url}/clinics/${specialty.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...specialtyEntries, ...blogEntries];
}
