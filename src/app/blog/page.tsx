import type { Metadata } from 'next';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { getAllCategories, getAllPostsMeta } from '@/lib/blog';

const BLOG_TITLE = 'Blog — AI Clinic Automation & Missed Call Recovery';
const BLOG_DESCRIPTION =
  'Playbooks on missed call recovery for clinics India, WhatsApp automation for clinics, patient follow-up, and clinic growth. Field-tested across 47+ clinics.';

export const metadata: Metadata = {
  title: { absolute: `${BLOG_TITLE} | Engageo` },
  description: BLOG_DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `${BLOG_TITLE} | Engageo`,
    description: BLOG_DESCRIPTION,
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BLOG_TITLE} | Engageo`,
    description: BLOG_DESCRIPTION,
  },
};

export default function BlogIndexPage(): JSX.Element {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="blog-hero" ariaLabel="Blog introduction" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Blog</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            Playbooks and{' '}
            <span className="serif-hero">field notes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            What we&rsquo;ve learned from 47+ Indian clinics running
            Engageo. Missed-call recovery, WhatsApp templates,
            multi-doctor routing, and the operational details most
            founders miss.
          </p>
        </div>
      </SectionWrapper>

      {/* Filter + posts grid */}
      <SectionWrapper id="blog-posts" ariaLabel="Blog articles" className="pt-0 md:pt-0">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-neutral-300 bg-surface p-10 text-center">
            <p className="font-display text-[18px] font-semibold text-obsidian">
              Posts coming soon.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-subtle">
              We&rsquo;re editing the first batch now — clinic playbooks,
              onboarding teardowns, and product deep-dives. Subscribe on
              WhatsApp to get the first post when it ships.
            </p>
          </div>
        ) : (
          <CategoryFilter posts={posts} categories={categories} />
        )}
      </SectionWrapper>

      <CTASection />
    </>
  );
}
