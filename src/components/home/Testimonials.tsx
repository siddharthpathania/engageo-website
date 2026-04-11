import { Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { cn } from '@/lib/utils';

type Testimonial = {
  quote: string;
  doctor: string;
  specialty: string;
  city: string;
  recovered: string;
  initials: string;
  accent: string;
};

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'I had no idea how many calls we were missing during consultations. Engageo recovered 23 patients in the first month — patients who would have called the next dermatologist on Google. I didn&rsquo;t change a single thing about how I run my practice.',
    doctor: 'Dr. Priya Krishnan',
    specialty: 'Dermatologist',
    city: 'Bengaluru',
    recovered: '₹3.1L recovered · month 1',
    initials: 'PK',
    accent: 'from-primary-400 to-primary-600',
  },
  {
    quote:
      'Our biggest leak was after 7 PM — patients calling about implant consultations when nobody was at the front desk. Now those calls get answered in Marathi, their questions get handled, and they book for the next morning. 41 appointments last month that would have walked to Apollo down the road.',
    doctor: 'Dr. Rajesh Malhotra',
    specialty: 'Dental & Oral Surgery',
    city: 'Mumbai',
    recovered: '41 bookings · October',
    initials: 'RM',
    accent: 'from-accent-400 to-accent-600',
  },
  {
    quote:
      'I was skeptical at first — would patients actually book through this? But callers get their questions about our IVF packages answered properly, in Hindi or English, and the booking shows up in our calendar before I even finish my current consultation. My receptionist finally has time for the patients sitting in front of her.',
    doctor: 'Dr. Ananya Reddy',
    specialty: 'IVF & Fertility',
    city: 'Hyderabad',
    recovered: '18 consults booked',
    initials: 'AR',
    accent: 'from-premium-400 to-premium-600',
  },
];

export function Testimonials(): JSX.Element {
  return (
    <SectionWrapper id="testimonials" ariaLabel="Doctor testimonials" className="bg-sand/40">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Proof</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Trusted by{' '}
          <span className="serif-hero">500+ Indian clinics.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          Real doctors. Real numbers. Real recoveries from the last 90 days.
        </p>
      </div>

      <div className="relative mt-14 md:mt-18">
        {/* Cards container */}
        <ul className="relative mx-auto grid max-w-5xl gap-5 md:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((item, index) => {
            /* Center card (index 1) is featured — larger, no rotation */
            const isCenter = index === 1;
            const rotation =
              index === 0 ? 'md:-rotate-1' : index === 2 ? 'md:rotate-1' : '';
            const elevation = isCenter ? 'md:-translate-y-4 md:scale-[1.03]' : '';

            return (
              <ScrollReveal
                as="li"
                key={item.doctor}
                direction="up"
                distance={24}
                delay={index * 0.12}
                className={cn(
                  'transition-all duration-500 ease-out hover:!rotate-0 hover:!scale-[1.02] hover:-translate-y-2',
                  rotation,
                  elevation,
                )}
              >
                <figure
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-2xl p-6 shadow-subtle transition-shadow duration-350 hover:shadow-card-hover md:p-7',
                    isCenter
                      ? 'border-2 border-primary-200 bg-gradient-to-b from-primary-50/50 to-surface'
                      : 'border border-neutral-200 bg-surface',
                  )}
                >
                  {/* Oversized quote mark */}
                  <Quote
                    size={80}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-2 select-none text-primary-500/[0.06]"
                  />

                  <blockquote className="relative z-10 flex-1 text-[15px] leading-relaxed text-obsidian/90 md:text-base">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Recovery pill */}
                  <div className="relative z-10 mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary-500" />
                    {item.recovered}
                  </div>

                  {/* Attribution */}
                  <figcaption className="relative z-10 mt-5 flex items-center gap-3 border-t border-neutral-200 pt-5">
                    <span
                      aria-hidden="true"
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} font-display text-sm font-semibold text-surface shadow-subtle`}
                    >
                      {item.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-obsidian">
                        {item.doctor}
                      </p>
                      <p className="mt-0.5 text-[11px] text-subtle">
                        {item.specialty} · {item.city}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </SectionWrapper>
  );
}
