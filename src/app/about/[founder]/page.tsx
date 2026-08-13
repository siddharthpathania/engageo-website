import { ArrowUpRight, ChevronLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import {
  FounderPersonSchema,
  ProfilePageSchema,
} from '@/components/seo/StructuredData';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SITE_CONFIG } from '@/lib/constants';
import {
  type Founder,
  FOUNDERS,
  getFounderBySlug,
  RESEARCH_PAPER,
} from '@/lib/founders';

type FounderPageProps = {
  params: { founder: string };
};

export function generateStaticParams(): Array<{ founder: string }> {
  return FOUNDERS.map((f) => ({ founder: f.slug }));
}

/**
 * Meta title leads with the bare name because that is the query these
 * pages exist to answer ("Atul Hooda Engageo"). Role and company follow
 * so the title still reads as a real page in the SERP.
 */
function buildTitle(founder: Founder): string {
  return `${founder.name} — ${founder.role}, ${SITE_CONFIG.name}`;
}

export function generateMetadata({ params }: FounderPageProps): Metadata {
  const founder = getFounderBySlug(params.founder);
  if (!founder) {
    return { title: 'Founder not found' };
  }

  const title = buildTitle(founder);
  const url = `/about/${founder.slug}`;

  return {
    title: { absolute: title },
    description: founder.bio,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: founder.bio,
      url,
      type: 'profile',
      images: [
        {
          url: founder.photo,
          alt: founder.photoAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: founder.bio,
      images: [founder.photo],
    },
  };
}

export default function FounderProfilePage({
  params,
}: FounderPageProps): JSX.Element {
  const founder = getFounderBySlug(params.founder);
  if (!founder) {
    notFound();
  }

  const other = FOUNDERS.find((f) => f.slug !== founder.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: founder.name, href: `/about/${founder.slug}` },
        ]}
      />
      <FounderPersonSchema founder={founder} />
      <ProfilePageSchema founder={founder} />

      {/* Profile header */}
      <SectionWrapper id="founder-hero" className="pt-6 md:pt-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle transition-colors hover:text-primary-700"
          >
            <ChevronLeft size={12} strokeWidth={2} aria-hidden="true" />
            Back to about
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder.photo}
              alt={founder.photoAlt}
              width={128}
              height={128}
              className="h-28 w-28 shrink-0 rounded-2xl border-2 border-neutral-100 object-cover shadow-subtle md:h-32 md:w-32"
            />

            <div className="min-w-0">
              {/* h1 is the bare name — this page's entire purpose is to be
                  the canonical result for that name. */}
              <h1 className="font-display text-[38px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-5xl">
                {founder.name}
              </h1>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                {founder.role} · {SITE_CONFIG.name}
              </p>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${founder.name} on LinkedIn (opens in new tab)`}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-[12px] font-medium text-obsidian/70 transition-colors hover:border-primary-300 hover:text-primary-600"
              >
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Biography */}
      <SectionWrapper id="founder-bio" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5 text-[16px] leading-relaxed text-obsidian/85 md:text-[17px] md:leading-[1.7]">
            {founder.longBio.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {/* Areas of work — mirrors Person.knowsAbout so the visible page
              and the structured data assert the same things. */}
          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
              Areas of work
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {founder.expertise.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-neutral-200 bg-neutral-50/60 px-3 py-1.5 text-[13px] text-obsidian/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Published research */}
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-surface p-6 md:p-7">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
            >
              <FileText size={19} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
              Published research
            </h2>
            <p className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight text-obsidian md:text-lg">
              {RESEARCH_PAPER.title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              {RESEARCH_PAPER.journal} · {RESEARCH_PAPER.issue}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={RESEARCH_PAPER.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary-600 transition-colors hover:text-primary-700"
              >
                Read the paper ({RESEARCH_PAPER.paperId})
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </a>
              <Link
                href={`/blog/${RESEARCH_PAPER.postSlug}`}
                className="text-[13px] font-medium text-obsidian/60 transition-colors hover:text-primary-600"
              >
                Plain-English write-up
              </Link>
            </div>
          </div>

          {/* Cross-link to the other founder — gives crawlers an internal
              path between the two person entities. */}
          {other ? (
            <div className="mt-10 border-t border-neutral-200 pt-8">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle">
                The other half
              </h2>
              <Link
                href={`/about/${other.slug}`}
                className="group mt-4 flex items-center gap-4 rounded-2xl border border-neutral-200 bg-surface p-5 transition-all duration-350 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={other.photo}
                  alt={other.photoAlt}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-xl border-2 border-neutral-100 object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold leading-tight tracking-tight text-obsidian">
                    {other.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary-600">
                    {other.role}
                  </p>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
