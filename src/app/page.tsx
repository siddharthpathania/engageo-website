import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CTASection } from '@/components/home/CTASection';
import { FAQ } from '@/components/home/FAQ';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ROICalculator } from '@/components/home/ROICalculator';
import { SolutionSection } from '@/components/home/SolutionSection';
import { Testimonials } from '@/components/home/Testimonials';
import { FounderStrip } from '@/components/home/FounderStrip';

/* Dynamic import for the heaviest client component — Hero contains
   framer-motion AnimatePresence, typewriter, live dashboard phases,
   and AnimatedCounter. This keeps it out of the main bundle. */
const Hero = dynamic(
  () => import('@/components/home/Hero').then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => (
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-5 pt-24 md:px-12 md:pt-32 lg:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[5rem]">
            Your clinic is losing revenue to missed calls
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-subtle md:text-base">
            Every missed call triggers a full recovery sequence — AI voice callback in 8 seconds, patient qualified, slot booked, WhatsApp confirmation sent. While you&rsquo;re with your next patient.
          </p>
        </div>
      </section>
    ),
  },
);

const HOME_TITLE = 'Engageo — Missed Call Recovery for Clinics India';
const HOME_DESCRIPTION =
  'AI missed-call recovery for Indian clinics. Every unanswered call is auto-qualified, booked, and WhatsApped back in 8 seconds. Live in 47+ clinics.';

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <ROICalculator />
      <FounderStrip />
      <PricingPreview />
      <FAQ />
      <CTASection />
    </>
  );
}
