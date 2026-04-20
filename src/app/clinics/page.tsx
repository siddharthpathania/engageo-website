import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { getClinicSpecialties } from '@/lib/specialty-data';

const INDEX_TITLE = 'Solutions by Specialty for Indian Clinics | Engageo';
const INDEX_DESCRIPTION =
  'Engageo AI missed call recovery tailored to your specialty — dental, dermatology, IVF, hair transplant, orthopaedics, ophthalmology, and gynaecology clinics across India.';

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

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Clinics', href: '/clinics' },
        ]}
      />

      <SectionWrapper id="clinics-index-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Specialties</span>
          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[64px]">
            AI call recovery, <span className="serif-hero">built by specialty.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            A dental implant call doesn&rsquo;t need the same answers as an IVF
            enquiry. Engageo ships configured for your specialty — the questions
            your patients ask, the reminders your treatments need, and the
            compliance rails your clinic runs on.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="clinics-grid" className="pt-0 md:pt-0">
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
                <h2 className="font-display text-[20px] font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary-600 md:text-[22px]">
                  {specialty.label}
                </h2>
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
          <li>
            <Link
              href="/hospitals"
              className="group flex h-full flex-col gap-4 rounded-3xl border-2 border-dashed border-primary-200 bg-primary-50/40 p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-400 hover:bg-primary-50 md:p-7"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                Hospitals
              </span>
              <h2 className="font-display text-[20px] font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary-600 md:text-[22px]">
                Hospitals (multi-specialty)
              </h2>
              <p className="line-clamp-4 text-[13.5px] leading-relaxed text-subtle">
                Running a hospital or a multi-specialty group? Engageo routes
                calls to the right department, books OPD across specialties, and
                automates discharge follow-ups.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                See the hospitals page
                <ChevronRight
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        </ul>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
