import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

// LLM training + generic scraper bots we want to exclude from crawling.
// Previously managed by Cloudflare's AI Crawl Control block — ported here
// so the served robots.txt is fully spec-compliant (Cloudflare's block
// also emitted non-standard `Content-Signal:` directives that tripped
// strict SEO linters like Semrush).
const BLOCKED_BOTS: readonly string[] = [
  'Amazonbot',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'ClaudeBot',
  'Google-Extended',
  'GPTBot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
