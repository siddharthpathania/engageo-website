import { SectionWrapper } from '@/components/shared/SectionWrapper';

type CTASectionProps = {
  label?: string;
  headline?: string;
  headlineAccent?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CTASection({
  label = 'Your move',
  headline = 'Stop losing patients',
  headlineAccent = 'today.',
  body = 'Somewhere right now, a patient is calling your clinic and nobody\u2019s picking up. That patient is worth \u20B96,000\u2013\u20B912,000 over their lifetime. With Engageo, that call still gets answered, that patient still gets booked. Set it up this week \u2014 see your first recovery by Friday.',
  primaryCta = { label: 'Book Your Strategy Call', href: 'https://calendly.com/engageoagency' },
  secondaryCta = { label: 'WhatsApp Us Instead', href: 'https://wa.me/919699670806' },
}: CTASectionProps): JSX.Element {
  return (
    <SectionWrapper id="cta" ariaLabel="Call to action" dark bleed className="py-24 md:py-32">
      {/* Ambient gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/25 blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center text-primary-300 before:bg-primary-300 after:bg-primary-300/40">
            {label}
          </span>

          <h2 className="mt-6 font-display text-[44px] font-semibold leading-[1.04] tracking-tighter text-surface md:text-6xl lg:text-[72px]">
            {headline}{' '}
            <span className="serif-hero text-accent-400">{headlineAccent}</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-surface/70 md:text-lg">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-surface px-7 py-4 text-[14px] font-semibold text-obsidian shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-card-hover"
            >
              {primaryCta.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-surface/30 bg-transparent px-7 py-4 text-[14px] font-semibold text-surface transition-all duration-300 hover:border-surface/60 hover:bg-surface/5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 13l1-3a5 5 0 117 2 5 5 0 01-8 1zm3-5h4m-4 2h3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {secondaryCta.label}
            </a>
          </div>

          {/* Trust row */}
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-medium uppercase tracking-widest text-surface/60">
            {[
              'No credit card required',
              '15-booking guarantee',
              'Live in 48 hours',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-primary-400"
                >
                  <path
                    d="M2.5 7l3 3 6-6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
