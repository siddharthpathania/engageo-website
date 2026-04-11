import { COMPANY, CONTACT, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { absoluteUrl } from '@/lib/utils';

// Shared sub-types used by multiple schemas below.
type PostalAddressLD = {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

function buildPostalAddress(): PostalAddressLD {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${CONTACT.address.line1}, ${CONTACT.address.line2}`,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.countryCode,
  };
}

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Inject a JSON-LD script tag. Prefer this over useEffect for SSR-correct rendering.
 */
export function JsonLd({ data }: JsonLdProps): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization schema — include on layout or home page.
 */
export function OrganizationSchema(): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: COMPANY.legalName,
    url: SITE_CONFIG.url,
    logo: absoluteUrl('/logo.png'),
    foundingDate: String(COMPANY.foundingYear),
    description: SITE_CONFIG.description,
    address: buildPostalAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      contactType: 'customer support',
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
  return <JsonLd data={data} />;
}

/**
 * WebSite schema with SearchAction — enables site-links search box.
 */
export function WebSiteSchema(): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Article schema — use on blog post pages.
 */
export type ArticleSchemaProps = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  cover?: string;
};

export function ArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author,
  cover,
}: ArticleSchemaProps): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(`/blog/${slug}`),
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    image: cover ? absoluteUrl(cover) : absoluteUrl(SITE_CONFIG.ogImage),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${slug}`),
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Product schema — use on the pricing page. Renders one Offer per tier.
 */
export type ProductOffer = {
  name: string;
  priceINR: number;
  /** e.g. "/ month" or "/ year" — used in description only. */
  cadence?: string;
  description: string;
  url?: string;
};

export type ProductSchemaProps = {
  name: string;
  description: string;
  image?: string;
  offers: ProductOffer[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
};

export function ProductSchema({
  name,
  description,
  image,
  offers,
  aggregateRating,
}: ProductSchemaProps): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    image: image ? absoluteUrl(image) : absoluteUrl(SITE_CONFIG.ogImage),
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      price: offer.priceINR,
      priceCurrency: 'INR',
      url: offer.url ? absoluteUrl(offer.url) : absoluteUrl('/pricing'),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    })),
    ...(aggregateRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: aggregateRating.bestRating ?? 5,
          },
        }
      : {}),
  };
  return <JsonLd data={data} />;
}

/**
 * FAQPage schema — renders Question/Answer pairs for rich-result eligibility.
 * Answers may include plain strings (interpreted as HTML-safe text).
 */
export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQPageSchemaProps = {
  items: FAQItem[];
};

export function FAQPageSchema({ items }: FAQPageSchemaProps): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * LocalBusiness schema — use on the contact page. Carries address, hours,
 * geo (if provided), and contact channels.
 */
export type LocalBusinessSchemaProps = {
  /** Optional geo coordinates (Viman Nagar, Pune used as default). */
  geo?: { latitude: number; longitude: number };
  /** Override business type (defaults to "LocalBusiness"). */
  businessType?: string;
};

const DAY_OF_WEEK_MAP: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

function parseOpeningHours(): Array<Record<string, unknown>> {
  // CONTACT.hours.days is e.g. "Mon–Sat" — expand into day list.
  const [startDay, endDay] = CONTACT.hours.days.split('\u2013');
  const ordered = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const startIdx = ordered.indexOf(startDay ?? 'Mon');
  const endIdx = ordered.indexOf(endDay ?? 'Sat');
  const days = ordered
    .slice(startIdx, endIdx + 1)
    .map((d) => DAY_OF_WEEK_MAP[d] ?? d);

  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: CONTACT.hours.start,
      closes: CONTACT.hours.end,
    },
  ];
}

export function LocalBusinessSchema({
  geo = { latitude: 18.5679, longitude: 73.9143 }, // Viman Nagar, Pune
  businessType = 'LocalBusiness',
}: LocalBusinessSchemaProps = {}): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': businessType,
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    legalName: COMPANY.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: absoluteUrl(SITE_CONFIG.ogImage),
    logo: absoluteUrl('/logo.png'),
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: buildPostalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: parseOpeningHours(),
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    priceRange: '₹₹',
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
  return <JsonLd data={data} />;
}
