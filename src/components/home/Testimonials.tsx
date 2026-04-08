import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { StaggerContainer } from '@/components/shared/StaggerContainer';

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

      <StaggerContainer as="ul" staggerDelay={0.1} amount={0.15} className="mt-14 grid gap-5 md:mt-18 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {TESTIMONIALS.map((item) => (
          <ScrollReveal as="li" key={item.doctor} direction="up" distance={20}>
            <figure className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-surface p-6 shadow-subtle md:p-7">
              {/* Quote mark */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                className="text-primary-500/30"
              >
                <path
                  d="M9 6C5.5 8 3 11 3 15.5V22h7v-7H6c0-3 2-5.5 5-6.5L9 6zm13 0c-3.5 2-6 5-6 9.5V22h7v-7h-4c0-3 2-5.5 5-6.5L22 6z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-obsidian/90 md:text-base">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Recovery pill */}
              <div className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                {item.recovered}
              </div>

              {/* Attribution */}
              <figcaption className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-5">
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} font-display text-sm font-semibold text-surface shadow-subtle`}
                >
                  {item.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[13.5px] font-semibold text-obsidian">
                    {item.doctor}
                  </p>
                  <p className="mt-0.5 text-[11px] text-subtle">
                    {item.specialty} · {item.city}
                  </p>
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
