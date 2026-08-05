/**
 * ─── Engageo — founder profiles ──────────────────────────────────
 * Single source of truth for founder identity. Consumed by the home
 * FounderStrip, the /about team grid, the /about/<slug> profile pages,
 * and every Person / ProfilePage JSON-LD block.
 *
 * WHY THIS FILE EXISTS: founder data used to live in three places with
 * three different role strings ("Co-founder & CTO" on /about, "CTO" on
 * the home strip, "CTO" in blog frontmatter). Search engines treat a
 * name + title pair as an entity signal, and conflicting titles across
 * one domain split that signal. Everything reads `role` from here now.
 *
 * Do not add a short-form role. The full "Co-founder & <role>" string
 * is deliberate and must render identically everywhere.
 * ────────────────────────────────────────────────────────────────
 */

export type Founder = {
  /** URL segment under /about/. Stable — changing it breaks the entity @id. */
  slug: string;
  /** Canonical spelling. Must match LinkedIn and every external profile. */
  name: string;
  /** Canonical title. Rendered verbatim on every surface. */
  role: string;
  initials: string;
  /** Tailwind gradient for the initials fallback avatar. */
  accent: string;
  photo: string;
  /**
   * Descriptive alt text. Carries name + role + company because this is
   * the primary text signal Google Images has for the founder photo.
   */
  photoAlt: string;
  /** One line — home page founder strip. */
  oneLiner: string;
  /** Two sentences — /about team card. */
  bio: string;
  /** Paragraphs — /about/<slug> profile page body. */
  longBio: readonly string[];
  /** Drives Person.knowsAbout. Keep to genuine areas of work. */
  expertise: readonly string[];
  linkedin: string;
  /**
   * Absolute profile URLs for Person.sameAs. Every entry must be a full
   * URI — schema.org sameAs rejects bare domains, and Google silently
   * drops them. Only list profiles that actually name this person.
   */
  sameAs: readonly string[];
};

/**
 * The JETIR paper is the strongest external corroboration either founder
 * has: an independently published, indexed source naming both of them
 * alongside Engageo. Knowledge Graph entities form from corroboration
 * across domains, not from on-site markup alone, so this gets surfaced
 * on both profile pages with a live outbound link.
 */
export const RESEARCH_PAPER = {
  title:
    'Engageo: A Multilingual Voice and Messaging System for Missed-Call Recovery in Indian Specialty Clinics',
  journal: 'Journal of Emerging Technologies and Innovative Research (JETIR)',
  issue: 'Volume 13, Issue 5, May 2026',
  paperId: 'JETIR2605676',
  url: 'http://www.jetir.org/view?paper=JETIR2605676',
  /** Internal write-up of the same paper. */
  postSlug: 'engageo-multilingual-voice-ai-research-paper',
} as const;

export const FOUNDERS: readonly Founder[] = [
  {
    slug: 'siddharth-pathania',
    name: 'Siddharth Pathania',
    role: 'Co-founder & CEO',
    initials: 'SP',
    accent: 'from-primary-400 to-primary-600',
    photo: '/team/siddharth-pathania-ceo-engageo.jpg',
    photoAlt:
      'Siddharth Pathania, Co-founder & CEO of Engageo, an AI missed-call recovery platform for Indian clinics',
    oneLiner:
      'Product architect. Designed the recovery system from first principles.',
    bio: 'Agentic developer, UI/UX engineer, and strategy lead. Saw firsthand how Indian clinics haemorrhage revenue through missed calls — and designed the system that stops it.',
    longBio: [
      'Siddharth Pathania is the Co-founder and CEO of Engageo, an AI missed-call recovery platform built in Pune for Indian specialty clinics and hospitals.',
      'In 2023 he spent two weeks shadowing the front desks of 14 Indian clinics — dental, dermatology, IVF, physiotherapy — counting missed calls by hand. The average clinic was losing between ₹2 lakh and ₹4 lakh a month to calls that simply rang out, while the owner was convinced the problem was marketing spend. That fieldwork became the product thesis behind Engageo.',
      'He leads product architecture and go-to-market at Engageo, and designed the recovery flow that intercepts a missed call and returns a WhatsApp message before the patient dials the next clinic on the search results page. He co-authored the peer-reviewed JETIR paper documenting the system’s multilingual conversation design and production architecture.',
    ],
    expertise: [
      'Product architecture',
      'UI/UX engineering',
      'Healthcare technology in India',
      'Missed-call recovery systems',
      'Go-to-market strategy',
    ],
    linkedin: 'https://www.linkedin.com/in/its-siddharth/',
    sameAs: ['https://www.linkedin.com/in/its-siddharth/'],
  },
  {
    slug: 'atul-hooda',
    name: 'Atul Hooda',
    role: 'Co-founder & CTO',
    initials: 'AH',
    accent: 'from-accent-400 to-accent-600',
    photo: '/team/atul-hooda-cto-engageo.jpg',
    photoAlt:
      'Atul Hooda, Co-founder & CTO of Engageo, an AI missed-call recovery platform for Indian clinics',
    oneLiner:
      'ML engineer. Built the intelligence behind every recovered call.',
    bio: 'ML engineer leading the core AI operations — voice recognition, patient intent classification, and real-time call routing. Built the engine that intercepts in under 8 seconds.',
    longBio: [
      'Atul Hooda is the Co-founder and CTO of Engageo, where he leads the machine learning systems behind the platform’s multilingual voice agent.',
      'His work covers speech recognition across 12 Indian languages, patient intent classification, and the real-time call routing that lets Engageo intercept a missed call and respond in under 15 seconds. Much of that engineering is about the unglamorous failure modes — code-mixed Hindi-English utterances, Devanagari numerals mid-sentence, and script collisions that silently produce garbled audio.',
      'He is the lead author of the peer-reviewed JETIR paper on Engageo’s architecture, which documents five contributions from the platform’s first five pilot clinics, including the prompt-level script-consistency rule that fixed a class of silent text-to-speech failures.',
    ],
    expertise: [
      'Machine learning engineering',
      'Multilingual speech recognition',
      'Natural language understanding',
      'Voice AI systems',
      'Real-time call routing',
    ],
    linkedin: 'https://www.linkedin.com/in/atulhooda/',
    sameAs: ['https://www.linkedin.com/in/atulhooda/'],
  },
] as const;

export function getFounderBySlug(slug: string): Founder | undefined {
  return FOUNDERS.find((founder) => founder.slug === slug);
}

/**
 * Resolve a founder by the display name used in blog frontmatter, so an
 * authored post can point its Article author at the same Person @id the
 * profile page uses. Without this, every post mints an anonymous author
 * node and the entity fragments across the site.
 */
export function getFounderByName(name: string): Founder | undefined {
  return FOUNDERS.find((founder) => founder.name === name);
}
