import { COMPANY, CONTACT, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { type Founder, FOUNDERS } from '@/lib/founders';
import { absoluteUrl } from '@/lib/utils';

/**
 * Stable node identifiers.
 *
 * Every schema block that talks about the company or a founder must point
 * at these exact strings. Search engines merge JSON-LD nodes that share an
 * `@id` into one entity and treat differing nodes as separate things — so
 * an Organization emitted on the layout, a Person on /about/<slug>, and an
 * Article author on a blog post only describe *one* company and *one*
 * person if they agree on the @id. Do not inline these URLs elsewhere.
 */
export const ORG_ID = `${SITE_CONFIG.url}/#organization`;

export function founderPersonId(slug: string): string {
  return `${SITE_CONFIG.url}/about/${slug}#person`;
}

/** Reference to the Organization node, for use inside other schemas. */
const orgRef = { '@id': ORG_ID } as const;

// Shared sub-types used by multiple schemas below.
// Street address and postal code are intentionally omitted — we publish only
// city / region / country in structured data.
type PostalAddressLD = {
  '@type': 'PostalAddress';
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
};

function buildPostalAddress(): PostalAddressLD {
  return {
    '@type': 'PostalAddress',
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
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
    '@id': ORG_ID,
    name: SITE_CONFIG.name,
    legalName: COMPANY.legalName,
    url: SITE_CONFIG.url,
    logo: absoluteUrl('/logo.png'),
    foundingDate: String(COMPANY.foundingYear),
    foundingLocation: {
      '@type': 'Place',
      address: buildPostalAddress(),
    },
    description: SITE_CONFIG.description,
    address: buildPostalAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      contactType: 'customer support',
    },
    // The founder edge is what links the company entity to the person
    // entities in the Knowledge Graph. Each founder is a full node here
    // (not a bare @id reference) so this block stands on its own for any
    // crawler that only fetches the home page, while the matching @id
    // merges it with the richer node on /about/<slug>.
    founder: FOUNDERS.map((founder) => ({
      '@type': 'Person',
      '@id': founderPersonId(founder.slug),
      name: founder.name,
      jobTitle: founder.role,
      url: absoluteUrl(`/about/${founder.slug}`),
      image: absoluteUrl(founder.photo),
      sameAs: [...founder.sameAs],
    })),
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
  return <JsonLd data={data} />;
}

/**
 * Person schema for a founder. Emitted on that founder's profile page,
 * where it carries the full detail; the Organization block emits a
 * lighter node under the same @id.
 *
 * `worksFor` closes the loop back to the Organization — the reciprocal
 * of Organization.founder. One-directional linking is markedly weaker:
 * it asserts the company has a founder without asserting the person is
 * affiliated with the company.
 */
export function FounderPersonSchema({
  founder,
}: {
  founder: Founder;
}): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': founderPersonId(founder.slug),
    name: founder.name,
    jobTitle: founder.role,
    description: founder.bio,
    url: absoluteUrl(`/about/${founder.slug}`),
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(founder.photo),
      caption: founder.photoAlt,
    },
    worksFor: {
      '@type': 'Organization',
      ...orgRef,
      name: SITE_CONFIG.name,
      legalName: COMPANY.legalName,
      url: SITE_CONFIG.url,
    },
    knowsAbout: [...founder.expertise],
    homeLocation: {
      '@type': 'Place',
      address: buildPostalAddress(),
    },
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [...founder.sameAs],
  };
  return <JsonLd data={data} />;
}

/**
 * ProfilePage schema — Google's documented type for a page whose primary
 * subject is a single person. Signals "this URL *is* Atul Hooda" rather
 * than "this page mentions him", which a generic WebPage cannot express.
 */
export function ProfilePageSchema({
  founder,
}: {
  founder: Founder;
}): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.url}/about/${founder.slug}#profilepage`,
    url: absoluteUrl(`/about/${founder.slug}`),
    name: `${founder.name} — ${founder.role}, ${SITE_CONFIG.name}`,
    inLanguage: SITE_CONFIG.language,
    mainEntity: { '@id': founderPersonId(founder.slug) },
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
    },
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
  authorUrl?: string;
  cover?: string;
};

/**
 * Build the Article author node. When the byline matches a founder, reuse
 * that founder's Person @id and canonical role so all authored posts fold
 * into the same entity instead of creating one anonymous Person per post.
 */
function buildArticleAuthor(
  author: string,
  authorUrl?: string,
): Record<string, unknown> {
  const founder = FOUNDERS.find((f) => f.name === author);
  if (founder) {
    return {
      '@type': 'Person',
      '@id': founderPersonId(founder.slug),
      name: founder.name,
      jobTitle: founder.role,
      url: absoluteUrl(`/about/${founder.slug}`),
      sameAs: [...founder.sameAs],
    };
  }
  return {
    '@type': 'Person',
    name: author,
    ...(authorUrl ? { url: authorUrl, sameAs: [authorUrl] } : {}),
  };
}

export function ArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author,
  authorUrl,
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
    author: buildArticleAuthor(author, authorUrl),
    publisher: {
      '@type': 'Organization',
      ...orgRef,
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
  /** Optional geo coordinates. Omitted from the schema when not provided. */
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
  geo,
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
    ...(geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
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
