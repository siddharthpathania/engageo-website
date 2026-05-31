import Script from 'next/script';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import {
  getClinicSpecialties,
  getHospitalSpecialty,
} from '@/lib/specialty-data';

const INDEX_TITLE =
  'AI Call Recovery for Indian Clinics & Hospitals | Engageo';
const INDEX_DESCRIPTION =
  'Engageo AI missed call recovery for Indian clinics and multi-specialty hospitals — dental, dermatology, IVF, hair transplant, orthopaedics, ophthalmology, gynaecology, and hospital switchboards.';

export const metadata: Metadata = {
  title: { absolute: INDEX_TITLE },
  description: INDEX_DESCRIPTION,
  alternates: { canonical: '/clinics' },
  openGraph: {
    title: INDEX_TITLE,
    description: INDEX_DESCRIPTION,
    url: '/clinics',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: INDEX_TITLE,
    description: INDEX_DESCRIPTION,
  },
};

export default function ClinicsIndexPage(): JSX.Element {
  const specialties = getClinicSpecialties();
  const hospital = getHospitalSpecialty();

  const hospitalFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hospital.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Clinics & Hospitals', href: '/clinics' },
        ]}
      />
      <Script
        id="hospitals-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(hospitalFaqSchema)}
      </Script>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <SectionWrapper id="clinics-index-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Who we serve</span>
          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[64px]">
            AI call recovery, <span className="serif-hero">built by specialty.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            A dental implant call doesn&rsquo;t need the same answers as an IVF
            enquiry — and a hospital switchboard doesn&rsquo;t work like either.
            Engageo ships configured for your practice: the questions your
            patients ask, the reminders your treatments need, and the compliance
            rails your team runs on.
          </p>
        </div>
      </SectionWrapper>

      {/* ─── Specialty grid ───────────────────────────────────── */}
      <SectionWrapper id="clinics-grid" className="pt-0 md:pt-0">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <span className="section-label justify-center">For clinics</span>
          <h2 className="mt-5 font-display text-[28px] font-semibold leading-tight tracking-tight text-obsidian md:text-[36px]">
            Specialty-tuned, ready to ship.
          </h2>
        </div>

        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {specialties.map((specialty) => (
            <li key={specialty.slug}>
              <Link
                href={`/clinics/${specialty.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover md:p-7"
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                  {specialty.eyebrow}
                </span>
                <h3 className="font-display text-[20px] font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary-600 md:text-[22px]">
                  {specialty.label}
                </h3>
                <p className="line-clamp-4 text-[13.5px] leading-relaxed text-subtle">
                  {specialty.heroSubhead}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-obsidian transition-colors group-hover:text-primary-700">
                  Read the specialty brief
                  <ChevronRight
                    size={12}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* ─── Hospitals: intro ─────────────────────────────────── */}
      <SectionWrapper id="hospitals-intro" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">{hospital.eyebrow}</span>
          <h2 className="mt-6 font-display text-[32px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-[44px] lg:text-[52px]">
            {hospital.heroTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-subtle md:text-base">
            {hospital.heroSubhead}
          </p>
        </div>
      </SectionWrapper>

      {/* ─── Hospitals: pain points ───────────────────────────── */}
      <SectionWrapper id="hospitals-problem">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">The problem</span>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-[36px] lg:text-[40px]">
            Why hospital calls slip through.
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {hospital.painPoints.map((point, index) => (
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

      {/* ─── Hospitals: use cases ─────────────────────────────── */}
      <SectionWrapper id="hospitals-solution" className="bg-sand/40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">How Engageo handles it</span>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-[36px] lg:text-[40px]">
            What the AI actually does for your hospital.
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {hospital.useCases.map((useCase, index) => (
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

      {/* ─── Hospitals: FAQ ───────────────────────────────────── */}
      <SectionWrapper id="hospitals-faq">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">FAQ</span>
          <h2 className="mt-6 font-display text-[26px] font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-[34px] lg:text-[38px]">
            Hospitals: what owners ask first.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
            Specific questions we hear from hospital teams before they sign up. More general questions are answered on the{' '}
            <Link
              href="/contact#contact-faq"
              className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-[3px] transition-colors hover:text-primary-800"
            >
              contact page FAQ
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-surface md:mt-12">
          {hospital.faqs.map((item, index) => (
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
      </SectionWrapper>

      <CTASection />
    </>
  );
}
