import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  Clock,
  type LucideIcon,
  LineChart,
  Languages,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { StaggerContainer } from '@/components/shared/StaggerContainer';
import { cn } from '@/lib/utils';

type Feature = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const FEATURES: readonly Feature[] = [
  {
    title: 'Intelligent Call Answering',
    body: 'When your receptionist can\u2019t pick up, the patient hears a trained voice in their own language. Not a recording. Not a menu. A real conversation that answers their questions and earns their trust.',
    Icon: PhoneCall,
  },
  {
    title: 'Twelve Indian Languages',
    body: 'Twelve languages spanning the major Indian languages and Indian English. The system matches the patient\u2019s language automatically — because a dermatology patient in Chennai shouldn\u2019t have to navigate in English.',
    Icon: Languages,
  },
  {
    title: 'Live Calendar Booking',
    body: 'Appointments are booked during the call itself — real-time availability check, slot confirmation, and sync to Google Calendar, iCal, or your HMS. Your receptionist sees the booking appear instantly.',
    Icon: CalendarCheck,
  },
  {
    title: 'Real-time Dashboard',
    body: 'Every recovered call, every conversation, every booking — in one place. See what patients are asking about, which hours you miss the most calls, and exactly how much revenue Engageo recovered this week.',
    Icon: BarChart3,
  },
  {
    title: 'Trained on Your Clinic',
    body: 'Fees, timings, doctor specialties, procedures offered, parking directions — whatever your receptionist knows, the system knows. You feed it once. It handles every call with that knowledge.',
    Icon: BookOpen,
  },
  {
    title: '24/7 Coverage',
    body: 'The 9 PM toothache call gets answered. The Sunday morning skin concern gets answered. The lunch-break overflow gets answered. Your team works regular hours. Your patients get served around the clock.',
    Icon: Clock,
  },
  {
    title: 'Analytics & Reports',
    body: 'Weekly summary: calls recovered, appointments booked, revenue saved. Monthly deep-dive: peak call hours, most-asked patient questions, conversion by doctor, and follow-up completion rates.',
    Icon: LineChart,
  },
  {
    title: 'WhatsApp Confirmations & Follow-ups',
    body: 'After every booking: instant WhatsApp confirmation with date, time, and doctor name. Reminders at 24 hours and 3 hours before. Post-visit follow-ups adapt to whether the patient showed up, started treatment, or needs aftercare.',
    Icon: MessageCircle,
  },
];

export function FeaturesGrid(): JSX.Element {
  return (
    <SectionWrapper id="features" ariaLabel="Product capabilities" animate={false}>
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-label justify-center">Capabilities</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-obsidian md:text-5xl lg:text-[56px]">
          Everything between the missed call{' '}
          <span className="serif-hero">and the booked patient.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-subtle md:text-base">
          From the moment the call goes unanswered to the post-treatment
          follow-up — every touchpoint, handled.
        </p>
      </div>

      <StaggerContainer
        as="ul"
        staggerDelay={0.07}
        amount={0.1}
        className="mt-14 grid gap-4 md:mt-18 md:grid-cols-2 md:gap-5 lg:grid-cols-6"
      >
        {FEATURES.map((feature, index) => {
          /* First 2 features are "hero" cards — span 3 cols each on lg */
          const isHero = index < 2;
          const Icon = feature.Icon;

          return (
            <ScrollReveal
              as="li"
              key={feature.title}
              direction="up"
              distance={20}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-350 will-change-transform hover:-translate-y-1 hover:shadow-card-hover',
                isHero
                  ? 'border-primary-100 bg-gradient-to-br from-primary-50/80 to-surface p-8 hover:border-primary-300 md:p-10 lg:col-span-3'
                  : 'border-neutral-200 bg-surface p-6 hover:border-primary-300 lg:col-span-2',
              )}
            >
              {/* Ghost numeral — visible on hero cards only */}
              {isHero ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[140px] font-normal italic leading-none text-primary-500/[0.06]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className={cn(
                  'flex items-center justify-center rounded-xl text-primary-600 shadow-none transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:text-primary-700 group-hover:shadow-glow-sm motion-reduce:transform-none motion-reduce:transition-none',
                  isHero
                    ? 'h-14 w-14 bg-primary-100/80 group-hover:bg-primary-200/80'
                    : 'h-11 w-11 bg-primary-50 group-hover:bg-primary-100',
                )}
              >
                <Icon
                  size={isHero ? 28 : 22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover:rotate-12 motion-reduce:transform-none"
                />
              </span>

              <h3
                className={cn(
                  'font-display font-semibold leading-tight tracking-tight text-obsidian',
                  isHero ? 'mt-6 text-xl md:text-[22px]' : 'mt-5 text-base',
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  'leading-relaxed text-subtle',
                  isHero ? 'mt-3 text-sm md:text-base' : 'mt-2 text-sm',
                )}
              >
                {feature.body}
              </p>
            </ScrollReveal>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>
  );
}
