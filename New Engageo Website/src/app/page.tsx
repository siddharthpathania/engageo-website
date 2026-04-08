import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CTASection } from '@/components/home/CTASection';
import { FAQ } from '@/components/home/FAQ';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { Testimonials } from '@/components/home/Testimonials';

/* Dynamic import for the heaviest client component — Hero contains
   framer-motion AnimatePresence, typewriter, live dashboard phases,
   and AnimatedCounter. This keeps it out of the main bundle. */
const Hero = dynamic(
  () => import('@/components/home/Hero').then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => (
      <section className="flex min-h-[85vh] items-center justify-center">
        <p className="text-subtle">Loading Hero…</p>
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
      <PricingPreview />
      <FAQ />
      <CTASection />
    </>
  );
}
