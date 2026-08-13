import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

// Generic scraper / bulk-corpus bots we exclude from crawling.
// Previously managed by Cloudflare's AI Crawl Control block — ported here
// so the served robots.txt is fully spec-compliant (Cloudflare's block
// also emitted non-standard `Content-Signal:` directives that tripped
// strict SEO linters like Semrush).
//
// GPTBot, ClaudeBot, and Google-Extended were deliberately REMOVED from
// this list: assistant crawlers are now a real discovery surface for
// founder and company queries ("who founded Engageo"), and blocking them
// made the site unciteable there. None of the three ever affected Google
// Search ranking — Google-Extended only governs Gemini grounding and
// generative training, not Search indexing.
const BLOCKED_BOTS: readonly string[] = [
  'Amazonbot',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
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
