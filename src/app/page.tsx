import type { Metadata } from 'next';
import { CTASection } from '@/components/home/CTASection';
import { FAQ } from '@/components/home/FAQ';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ROICalculator } from '@/components/home/ROICalculator';
import { SolutionSection } from '@/components/home/SolutionSection';
import { Testimonials } from '@/components/home/Testimonials';
import { FounderStrip } from '@/components/home/FounderStrip';

const HOME_TITLE =
  'Engageo — AI Missed Call Recovery for Indian Clinics & Hospitals';
const HOME_DESCRIPTION =
  'AI missed call recovery, WhatsApp automation, and appointment booking for Indian clinics and hospitals. Every missed call answered in 7 languages within 15 seconds. Live in 47+ practices.';

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
