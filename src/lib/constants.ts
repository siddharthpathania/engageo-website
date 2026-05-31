/**
 * ─── Engageo — site-wide constants ───────────────────────────────
 * Single source of truth for metadata, navigation, social, contact.
 * Imported by layout.tsx, Header, Footer, sitemap, SEO schemas.
 * ────────────────────────────────────────────────────────────────
 */

// ─── Site metadata ───────────────────────────────────────────────

export const SITE_CONFIG = {
  name: 'Engageo',
  shortName: 'Engageo',
  title: 'Engageo — AI Missed Call Recovery for Indian Clinics & Hospitals',
  titleTemplate: '%s · Engageo',
  description:
    'AI-powered missed call recovery, WhatsApp automation, and appointment booking for Indian clinics and hospitals. Every missed call is answered in 7 languages within 15 seconds, patient questions handled, and the booking lands in your calendar \u2014 without adding staff or changing your workflow.',
  tagline: 'Every missed call answered. Every patient booked.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.engageoagency.com').replace(/\/$/, ''),
  ogImage: '/opengraph-image',
  ogImageAlt: 'Engageo — AI voice + WhatsApp recovery for Indian clinics and hospitals',
  locale: 'en_IN',
  language: 'en',
  region: 'IN',
  currency: 'INR',
  keywords: [
    'missed call recovery for clinics india',
    'missed call recovery for hospitals india',
    'ai receptionist for clinics india',
    'ai receptionist for hospitals india',
    'whatsapp automation for clinics india',
    'automated appointment booking india',
    'dental clinic missed calls',
    'ivf clinic patient recovery',
    'hospital call answering service india',
    'patient booking automation india',
  ],
  twitterHandle: '@EngageoAgency',
  creator: 'Engageo',
} as const;

// ─── Main navigation ─────────────────────────────────────────────

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export const MAIN_NAV: readonly NavLink[] = [
  {
    label: 'How It Works',
    href: '/#protocol',
    description: 'The 8-second recovery flow in three stages.',
  },
  {
    label: 'Who It\u2019s For',
    href: '/#who-its-for',
    description: 'Dental, dermatology, IVF, hair transplant clinics.',
  },
  {
    label: 'Pricing',
    href: '/#pricing',
    description: 'Three tiers from Recover to Dominate.',
  },
  {
    label: 'FAQ',
    href: '/#faq',
    description: 'Legality, AI detection, HMS integration.',
  },
] as const;

// ─── Call-to-action links ────────────────────────────────────────

export const CTA = {
  audit: {
    label: 'See What You\u2019re Losing \u2014 Free Audit',
    href: 'https://cal.com/engageo',
    shortLabel: 'Free Audit',
  },
  demo: {
    label: 'Hear a Recovery in Action',
    href: 'https://wa.me/919699670806?text=Hi%20Engageo%2C%20I%27d%20like%20to%20see%20a%20demo.',
    shortLabel: 'Hear Demo',
  },
  whatsapp: {
    label: 'Chat on WhatsApp',
    href: 'https://wa.me/919699670806?text=Hi%20Engageo%2C%20I%27d%20like%20to%20see%20a%20demo%20for%20my%20clinic.',
    shortLabel: 'WhatsApp',
  },
  book: {
    label: 'Book a 20-min Call',
    href: 'https://cal.com/engageo',
    shortLabel: 'Book Call',
  },
  cal: {
    label: 'Book a Strategy Call',
    href: 'https://cal.com/engageo',
    shortLabel: 'Book Call',
  },
} as const;

// ─── Contact info ────────────────────────────────────────────────

export const CONTACT = {
  email: 'engageoagency@gmail.com',
  emailSupport: 'engageoagency@gmail.com',
  phone: '+91 96996 70806',
  phoneE164: '+919699670806',
  whatsapp: '+91 96996 70806',
  whatsappE164: '919699670806',
  whatsappLink:
    'https://wa.me/919699670806?text=Hi%20Engageo%2C%20I%27d%20like%20to%20learn%20more.',
  address: {
    line1: 'Engageo HQ',
    line2: 'Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411014',
    country: 'India',
    countryCode: 'IN',
  },
  hours: {
    label: 'Mon\u2013Sat, 10:00\u201319:00 IST',
    days: 'Mon\u2013Sat',
    start: '10:00',
    end: '19:00',
    tz: 'Asia/Kolkata',
  },
} as const;

// ─── Company info ────────────────────────────────────────────────

export const COMPANY = {
  legalName: 'Engageo Agency LLP',
  foundingYear: 2024,
  foundingLocation: 'Pune, India',
  liveClinics: 47,
  avgRecoveryINR: 24_000,
  responseSeconds: 15,
} as const;

// ─── Footer navigation ───────────────────────────────────────────

export type FooterSection = {
  title: string;
  links: readonly NavLink[];
};

export const FOOTER_NAV: readonly FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'How It Works', href: '/#protocol' },
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Decision Lifecycle', href: '/#decision-lifecycle' },
      { label: 'Integrations', href: '/#integrations' },
    ],
  },
  {
    title: 'By specialty',
    links: [
      { label: 'Dental', href: '/clinics/dental' },
      { label: 'Dermatology', href: '/clinics/dermatology' },
      { label: 'IVF & Fertility', href: '/clinics/ivf' },
      { label: 'Hair Transplant', href: '/clinics/hair-transplant' },
      { label: 'Orthopaedics', href: '/clinics/orthopaedics' },
      { label: 'Ophthalmology', href: '/clinics/ophthalmology' },
      { label: 'Gynaecology', href: '/clinics/gynaecology' },
      { label: 'Hospitals', href: '/hospitals' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'Data Processing', href: '/dpa' },
    ],
  },
] as const;

// ─── Social links ────────────────────────────────────────────────

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/engageo-agency/',  handle: 'engageo-agency' },
  { label: 'Twitter',   href: 'https://x.com/EngageoAgency',                      handle: '@EngageoAgency' },
  { label: 'Instagram', href: 'https://www.instagram.com/engageo.agency/',        handle: '@engageo.agency' },
  { label: 'Pinterest', href: 'https://in.pinterest.com/engageoagency/',          handle: 'engageoagency' },
  { label: 'YouTube',   href: 'https://youtube.com/@engageo',                     handle: '@engageo' },
  { label: 'WhatsApp',  href: CONTACT.whatsappLink,                    handle: CONTACT.whatsapp },
] as const;

// ─── Key metrics (for hero / trust bar) ──────────────────────────

export const KEY_METRICS = [
  { label: 'Revenue Recovered', value: '\u20B924K',   hint: 'per clinic / month' },
  { label: 'Response Time',     value: '< 15s',       hint: 'call answered' },
  { label: 'Clinics Live',      value: '47+',         hint: 'across India' },
  { label: 'Guarantee',         value: '15 bookings', hint: 'first 30 days' },
] as const;

// ─── Pricing tiers ───────────────────────────────────────────────

export type PricingTier = {
  id: 'recover' | 'grow' | 'dominate';
  name: string;
  label: string;
  price: number;
  priceLabel: string;
  cadence: string;
  addOn?: string;
  description: string;
  featured?: boolean;
};

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: 'recover',
    name: 'Recover',
    label: 'Missed Call Recovery',
    price: 25_000,
    priceLabel: '\u20B925,000',
    cadence: '/ month',
    description:
      'Your clinic already gets inbound calls. We make sure the ones your team can\u2019t pick up still get answered, the patient\u2019s questions still get handled, and the appointment still lands in your calendar.',
  },
  {
    id: 'grow',
    name: 'Grow',
    label: 'Lead Gen + Recovery',
    price: 55_000,
    priceLabel: '\u20B955,000',
    cadence: '/ month',
    addOn: '+ your ad spend',
    description:
      'We drive more inbound calls through ads and SEO \u2014 then make sure every single one gets answered, booked, confirmed, and followed up. You stay in the consultation room. We keep it full.',
    featured: true,
  },
  {
    id: 'dominate',
    name: 'Dominate',
    label: 'Full Clinic Growth System',
    price: 120_000,
    priceLabel: '\u20B91,20,000',
    cadence: '/ month',
    addOn: '+ ad spend',
    description:
      'Full-stack clinic growth: patient acquisition, call recovery, booking automation, WhatsApp follow-ups, and a dedicated growth strategist. Every patient touchpoint \u2014 from first search to post-treatment review \u2014 handled.',
  },
] as const;

// ─── Clinic verticals we serve ───────────────────────────────────

export const CLINIC_VERTICALS = [
  { name: 'Dental',          slug: 'dental' },
  { name: 'Dermatology',     slug: 'dermatology' },
  { name: 'IVF & Fertility', slug: 'ivf' },
  { name: 'Hair Transplant', slug: 'hair-transplant' },
  { name: 'Orthopaedics',    slug: 'orthopaedics' },
  { name: 'Ophthalmology',   slug: 'ophthalmology' },
  { name: 'Gynaecology',     slug: 'gynaecology' },
] as const;
