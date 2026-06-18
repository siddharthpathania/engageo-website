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
import { ExperienceForm } from '@/components/experience/ExperienceForm';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

const HOME_TITLE =
  'Engageo — AI Missed Call Recovery for Indian Clinics & Hospitals';
const HOME_DESCRIPTION =
  'AI missed call recovery, WhatsApp automation, and appointment booking for Indian clinics and hospitals. Every missed call answered in 12 languages within 15 seconds. Live in 47+ practices.';

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
      <SectionWrapper id="home-experience-form" className="bg-sand/40 pt-12 md:pt-16">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <span className="section-label justify-center">Live demo</span>
          <h2 className="mt-5 font-display text-[28px] font-semibold leading-tight tracking-tight text-obsidian md:text-[36px] lg:text-[40px]">
            Talk to our AI <span className="serif-hero">like a patient would.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-subtle md:text-[16px]">
            Enter your details, verify your phone with a one-time code, and Engageo&rsquo;s
            AI receptionist calls you back in under 30 seconds.
          </p>
        </div>
        <ExperienceForm />
      </SectionWrapper>
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
