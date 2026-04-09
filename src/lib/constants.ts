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
  title: 'Engageo — Missed Call Recovery for Indian Clinics',
  titleTemplate: '%s · Engageo',
  description:
    'Every missed call at your clinic is a patient your competitor books. Engageo intercepts that call in 8 seconds — qualifies the patient, books the slot, sends the WhatsApp confirmation. Live in 47+ Indian clinics.',
  tagline: 'Your clinic is losing ₹3L every month. We recover it.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://engageoagency.digital').replace(/\/$/, ''),
  ogImage: '/opengraph-image',
  ogImageAlt: 'Engageo — AI voice + WhatsApp recovery for Indian clinics',
  locale: 'en_IN',
  language: 'en',
  region: 'IN',
  currency: 'INR',
  keywords: [
    'missed call recovery',
    'ai receptionist india',
    'clinic automation',
    'whatsapp automation clinic',
    'dental clinic booking',
    'ivf clinic crm',
    'hair transplant clinic software',
    'ai voice agent india',
    'patient booking automation',
    'clinic lead recovery',
  ],
  twitterHandle: '@engageo',
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
    label: 'Case Studies',
    href: '/case-studies',
    description: 'Real recovery numbers from 47+ clinics.',
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
    label: 'Free Audit — See What You\u2019re Losing',
    href: '/#audit',
    shortLabel: 'Free Audit',
  },
  demo: {
    label: 'Watch a Real Recovery Call',
    href: '/#decision-lifecycle',
    shortLabel: 'Watch Demo',
  },
  whatsapp: {
    label: 'Chat on WhatsApp',
    href: 'https://wa.me/919699670806?text=Hi%20Engageo%2C%20I%27d%20like%20to%20see%20a%20demo%20for%20my%20clinic.',
    shortLabel: 'WhatsApp',
  },
  book: {
    label: 'Book a 20-min Call',
    href: '/contact?intent=demo',
    shortLabel: 'Book Call',
  },
} as const;

// ─── Contact info ────────────────────────────────────────────────

export const CONTACT = {
  email: 'hello@engageoagency.digital',
  emailSupport: 'support@engageoagency.digital',
  phone: '+91 96996 70806',
  phoneE164: '+919699670806',
  whatsapp: '+91 96996 70806',
  whatsappE164: '919699670806',
  whatsappLink:
    'https://wa.me/919699670806?text=Hi%20Engageo%2C%20I%27d%20like%20to%20learn%20more.',
  address: {
    line1: 'Engageo HQ',
    line2: 'Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560034',
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
  legalName: 'Engageo Technologies Pvt. Ltd.',
  foundingYear: 2024,
  foundingLocation: 'Bengaluru, India',
  liveClinics: 47,
  avgRecoveryINR: 24_000,
  responseSeconds: 8,
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
    title: 'Clinics',
    links: [
      { label: 'Dental', href: '/clinics/dental' },
      { label: 'Dermatology', href: '/clinics/dermatology' },
      { label: 'IVF & Fertility', href: '/clinics/ivf' },
      { label: 'Hair Transplant', href: '/clinics/hair-transplant' },
      { label: 'Orthopaedics', href: '/clinics/orthopaedics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
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
  { label: 'Twitter',   href: 'https://twitter.com/engageo',                     handle: '@engageo' },
  { label: 'Instagram', href: 'https://www.instagram.com/engageo.agency/',        handle: '@engageo.agency' },
  { label: 'YouTube',   href: 'https://youtube.com/@engageo',                     handle: '@engageo' },
  { label: 'WhatsApp',  href: CONTACT.whatsappLink,                    handle: CONTACT.whatsapp },
] as const;

// ─── Key metrics (for hero / trust bar) ──────────────────────────

export const KEY_METRICS = [
  { label: 'Avg Recovery', value: '\u20B924K',   hint: 'per clinic / month' },
  { label: 'Response Time', value: '< 8s',        hint: 'voice callback' },
  { label: 'Clinics Live',  value: '47+',         hint: 'across India' },
  { label: 'Guarantee',     value: '15 bookings', hint: 'first 30 days' },
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
      'Your clinic already gets inbound calls. We make sure not one of them goes to voicemail. Answered, qualified, and booked \u2014 in under 8 seconds.',
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
      'We run your ads, drive inbound calls, and convert every single one into a confirmed booking. You stay in the consultation room. We make sure it stays full.',
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
      'Every patient in your city who searches your specialty should find you first, trust you immediately, and call you directly. We build that system.',
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
