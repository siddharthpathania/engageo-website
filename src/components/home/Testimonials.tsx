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
      'We were losing ₹2.8 lakhs a month to missed calls. Engageo recovered 23 patients in the first 30 days. I didn&rsquo;t change a thing about my practice.',
    doctor: 'Dr. Priya Krishnan',
    specialty: 'Dermatologist',
    city: 'Bengaluru',
    recovered: '₹3.1L recovered · month 1',
    initials: 'PK',
    accent: 'from-primary-400 to-primary-600',
  },
  {
    quote:
      'Patients called me after-hours all the time. Now they get a WhatsApp in 30 seconds with a booking link. Last month we booked 41 appointments that would have gone to Apollo Clinic down the road.',
    doctor: 'Dr. Rajesh Malhotra',
    specialty: 'Dental & Oral Surgery',
    city: 'Mumbai',
    recovered: '41 bookings · October',
    initials: 'RM',
    accent: 'from-accent-400 to-accent-600',
  },
  {
    quote:
      'I was skeptical about AI for patient calls. But the messages go out in my clinic&rsquo;s voice, in Hindi and English. My receptionist now focuses on in-clinic patients instead of chasing voicemails.',
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
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-2 select-none text-primary-500/[0.06]"
                  >
                    <path
                      d="M26 18C16 24 9 32 9 44V64h20V44H18c0-8.5 5.7-16 14.3-18.6L26 18zm37 0c-10 6-17 14-17 26V64h20V44H55c0-8.5 5.7-16 14.3-18.6L63 18z"
                      fill="currentColor"
                    />
                  </svg>

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
