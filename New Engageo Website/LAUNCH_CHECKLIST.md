# Engageo — Launch Checklist

## Pre-Launch (before DNS cutover)

### Environment
- [ ] Copy `.env.example` to `.env.local` and fill in all values
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain (no trailing slash)
- [ ] Set `RESEND_API_KEY` for contact form email delivery
- [ ] Set `CONTACT_FORM_TO` to the inbox that should receive form submissions
- [ ] Set `NEXT_PUBLIC_GA_ID` (Google Analytics 4 measurement ID)
- [ ] Set `NEXT_PUBLIC_GSC_VERIFICATION` (Google Search Console verification)
- [ ] Add all env vars to Vercel project settings (Settings > Environment Variables)

### Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Verify `vercel.json` region is correct (default: `bom1` Mumbai)
- [ ] Deploy to preview — verify all pages render correctly
- [ ] Promote preview to production
- [ ] Add custom domain in Vercel (Settings > Domains)
- [ ] Enable Vercel Analytics (Settings > Analytics)
- [ ] Enable Vercel Speed Insights (Settings > Speed Insights)

### DNS & SSL
- [ ] Point domain A/CNAME records to Vercel
- [ ] Wait for SSL certificate to provision (usually < 5 minutes)
- [ ] Verify HTTPS redirect works (http:// → https://)
- [ ] Verify www → non-www redirect (or vice versa)

---

## Launch Day (first 24 hours)

### Functional Testing
- [ ] Test contact form end-to-end — verify email arrives at `CONTACT_FORM_TO`
- [ ] Test contact form validation (empty fields, invalid email/phone)
- [ ] Test contact form rate limiting (submit 6+ times in a row)
- [ ] Test all navigation links (header, footer, mobile menu)
- [ ] Test blog pages load correctly
- [ ] Test 404 page (`/this-page-does-not-exist`)
- [ ] Test skip-to-content link (Tab on page load)

### Cross-Browser Testing
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + iOS)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Samsung Internet (Android)
- [ ] Test on slow 3G (Chrome DevTools > Network > Slow 3G)

### SEO Verification
- [ ] Submit sitemap to Google Search Console (`/sitemap.xml`)
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify `robots.txt` is accessible (`/robots.txt`)
- [ ] Verify OG image renders correctly — share URL on Twitter/LinkedIn/WhatsApp
- [ ] Verify canonical URLs are correct (View Source > `<link rel="canonical">`)
- [ ] Run Lighthouse audit — target: Performance 95+, Accessibility 95+, SEO 100

### Performance
- [ ] Run PageSpeed Insights on homepage, blog, and contact page
- [ ] Verify Core Web Vitals are green (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Check bundle size with `npm run analyze`

---

## Post-Launch (first week)

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Better Uptime, or Vercel Checks)
- [ ] Set up Core Web Vitals monitoring (via Google Search Console or Vercel)
- [ ] Set up error alerting (Sentry, LogRocket, or Vercel Logs)
- [ ] Review Vercel Analytics dashboard after 48 hours

### Indexation
- [ ] Verify Google has indexed homepage (search `site:yourdomain.com`)
- [ ] Request indexing for key pages via Google Search Console URL Inspection
- [ ] Verify structured data with Google Rich Results Test
- [ ] Verify manifest with Lighthouse PWA audit

### Marketing
- [ ] Share site on LinkedIn, Twitter, Instagram to test OG previews
- [ ] Set up Google Alerts for "Engageo" brand name
- [ ] Update Google Business Profile with new website URL
- [ ] Add website link to all social media profiles

---

## Ongoing

- [ ] Review Google Search Console weekly for coverage issues
- [ ] Review Core Web Vitals monthly
- [ ] Update blog content at least 2x per month for SEO
- [ ] Review and respond to contact form submissions within 4 working hours
- [ ] Keep dependencies updated (`npm outdated` monthly)
