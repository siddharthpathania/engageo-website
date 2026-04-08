/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://engageo.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/services': 0.9,
      '/pricing': 0.9,
      '/how-it-works': 0.8,
      '/case-studies': 0.8,
      '/blog': 0.8,
      '/about': 0.6,
      '/contact': 0.7,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
