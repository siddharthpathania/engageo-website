import Script from 'next/script';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe2,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { CTA } from '@/lib/constants';
import type { Specialty } from '@/lib/specialty-data';

type Trust = { label: string; value: string; hint: string; Icon: typeof Clock };

const TRUST: readonly Trust[] = [
  { label: 'Pickup time', value: '< 15s', hint: 'on every missed call', Icon: Clock },
  { label: 'Languages', value: '12', hint: 'Indian languages, including Indian English', Icon: Globe2 },
  { label: 'Clinics live', value: '47+', hint: 'across India', Icon: CheckCircle2 },
  { label: 'Data residency', value: 'India', hint: 'AWS Mumbai · DPDP-aligned', Icon: Shield },
];

export type SpecialtyPageProps = {
  specialty: Specialty;
  basePath: '/clinics';
};

export function SpecialtyPage({
  specialty,
  basePath,
}: SpecialtyPageProps): JSX.Element {
  const canonical = `${basePath}/${specialty.slug}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: specialty.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Clinics', href: '/clinics' },
    { name: specialty.shortLabel, href: canonical },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Script
        id={`specialty-faq-${specialty.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <SectionWrapper id="specialty-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-label justify-center">{specialty.eyebrow}</span>
          <h1 className="mt-6 font-display text-[36px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-[56px] lg:text-[64px]">
            {specialty.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-relaxed text-subtle md:text-lg">
            {specialty.heroSubhead}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CTA.audit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-[13px] font-semibold text-surface transition-all hover:bg-obsidian/90"
            >
              Book a 20-min demo
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href={CTA.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-obsidian/20 bg-surface px-6 py-3 text-[13px] font-semibold text-obsidian transition-all hover:border-obsidian hover:bg-obsidian hover:text-surface"
            >
              <MessageCircle size={14} strokeWidth={2} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 md:mt-18 md:grid-cols-4 md:gap-5">
          {TRUST.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-neutral-200 bg-surface p-4 text-left md:p-5"
            >
              <span
                aria-hidden="true"
                className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
              >
                <item.Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="font-display text-[22px] font-semibold leading-tight text-obsidian md:text-[26px]">
                {item.value}
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                {item.label}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-subtle">
                {item.hint}
              </p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ─── Pain points ─────────────────────────────────────── */}
      <SectionWrapper id="specialty-problem" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">The problem</span>
          <h2 className="mt-6 font-display text-[30px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-4xl lg:text-[44px]">
            Why {specialty.shortLabel.toLowerCase()} calls slip through.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            The specific patterns we see across {specialty.label.toLowerCase()} that turn missed calls into lost patients.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {specialty.painPoints.map((point, index) => (
            <li
              key={point.title}
              className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-surface p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-error-50 text-error-600"
                >
                  <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-obsidian md:text-[19px]">
                {point.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ─── Use cases ───────────────────────────────────────── */}
      <SectionWrapper id="specialty-solution">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">How Engageo handles it</span>
          <h2 className="mt-6 font-display text-[30px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-4xl lg:text-[44px]">
            What the AI actually does for your {specialty.shortLabel.toLowerCase()} practice.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Four concrete flows that run every day without your team lifting a finger.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {specialty.useCases.map((useCase, index) => (
            <li
              key={useCase.title}
              className="group flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover md:p-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-success-50 text-success-700 transition-colors group-hover:bg-success-100"
                >
                  <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                  Flow {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-obsidian md:text-[19px]">
                {useCase.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-subtle md:text-[14.5px]">
                {useCase.body}
              </p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <SectionWrapper id="specialty-faq" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">FAQ</span>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-4xl lg:text-[40px]">
            {specialty.label}: what owners ask first.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Specific questions we hear from {specialty.label.toLowerCase()} before they sign up. More general questions are answered on the{' '}
            <Link
              href="/contact#contact-faq"
              className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-[3px] transition-colors hover:text-primary-800"
            >
              contact page FAQ
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-surface md:mt-14">
          {specialty.faqs.map((item, index) => (
            <details
              key={item.q}
              className="group"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 font-display text-[15.5px] font-semibold leading-snug text-obsidian transition-colors hover:bg-neutral-50 md:px-8 md:py-6 md:text-[17px]">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-mono text-[18px] leading-none text-subtle transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-[14px] leading-relaxed text-subtle md:px-8 md:pb-8 md:text-[15px]">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-obsidian bg-transparent px-6 py-3 text-[13px] font-semibold text-obsidian transition-all hover:bg-obsidian hover:text-surface"
          >
            See pricing
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-obsidian hover:text-primary-600"
          >
            How the engine works
            <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
