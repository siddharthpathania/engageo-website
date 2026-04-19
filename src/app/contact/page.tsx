import { Calendar, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactFAQ } from '@/components/contact/ContactFAQ';
import { ContactForm } from '@/components/contact/ContactForm';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { CONTACT } from '@/lib/constants';

const CONTACT_TITLE = 'Contact Engageo — Pune, India';
const CONTACT_DESCRIPTION =
  'Book a demo for AI missed call recovery for your Indian clinic. Pune HQ. We reply within 4 working hours, Mon–Sat, 10am–7pm IST. Email, WhatsApp, or call.';

export const metadata: Metadata = {
  title: { absolute: `${CONTACT_TITLE} | Engageo` },
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${CONTACT_TITLE} | Engageo`,
    description: CONTACT_DESCRIPTION,
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CONTACT_TITLE} | Engageo`,
    description: CONTACT_DESCRIPTION,
  },
};

export default function ContactPage(): JSX.Element {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />

      {/* Page hero */}
      <SectionWrapper id="contact-hero" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label justify-center">Contact</span>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-tighter text-obsidian md:text-6xl lg:text-[72px]">
            Let&rsquo;s talk about{' '}
            <span className="serif-hero">your clinic.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-subtle md:text-lg">
            Demo request, pricing question, integration scoping — we
            read every message. Reply within 4 working hours, Mon–Sat,
            10am–7pm IST.
          </p>
        </div>
      </SectionWrapper>

      {/* Form + contact info */}
      <SectionWrapper id="contact-form" className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* Left: form */}
          <div className="rounded-3xl border border-neutral-200 bg-surface p-7 shadow-subtle md:p-10">
            <div className="mb-7">
              <h2 className="font-display text-[22px] font-semibold tracking-tight text-obsidian md:text-2xl">
                Send us a message
              </h2>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-subtle">
                Takes under a minute. We reply by email and WhatsApp.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Right: channels + address */}
          <aside className="space-y-6">
            {/* Direct channels */}
            <div className="rounded-3xl border border-neutral-200 bg-surface p-6 md:p-7">
              <h2 className="font-display text-[16px] font-semibold tracking-tight text-obsidian md:text-[17px]">
                Reach us directly
              </h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={CONTACT.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-success-200 bg-success-50 p-4 transition-colors hover:border-success-300 hover:bg-success-100"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-500 text-surface"
                    >
                      <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-success-700">
                        WhatsApp — fastest
                      </p>
                      <p className="mt-1 font-display text-[15px] font-semibold text-obsidian">
                        {CONTACT.whatsapp}
                      </p>
                      <p className="mt-1 text-[12px] text-subtle">
                        Usually replies in under 8 seconds during IST hours.
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${CONTACT.phoneE164}`}
                    className="group flex items-start gap-3 rounded-2xl border border-neutral-200 bg-surface p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
                    >
                      <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                        Phone
                      </p>
                      <p className="mt-1 font-display text-[15px] font-semibold text-obsidian">
                        {CONTACT.phone}
                      </p>
                      <p className="mt-1 text-[12px] text-subtle">
                        {CONTACT.hours.label}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Calendly embed placeholder */}
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-primary-50 via-surface to-accent-50/40 p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-surface"
                >
                  <Calendar size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                    Book a demo
                  </p>
                  <p className="font-display text-[15px] font-semibold text-obsidian">
                    20 minutes. Live recovery walkthrough.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-subtle">
                Pick a slot on our calendar. We&rsquo;ll show you a real
                missed-call recovery happening on a live clinic dashboard
                — then answer whatever you ask.
              </p>

              {/* Calendly placeholder */}
              <div
                aria-label="Calendly booking widget"
                className="mt-5 flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary-200 bg-surface/60 p-6 text-center"
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-600">
                  Calendly embed
                </span>
                <p className="text-[12px] leading-relaxed text-subtle">
                  Calendar picker loads here. Meanwhile, book via
                  WhatsApp or email — we&rsquo;ll send you a direct slot.
                </p>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-obsidian px-4 py-2 text-[12px] font-semibold text-surface transition-colors hover:bg-obsidian/90"
                >
                  Book via WhatsApp instead
                  <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Office address */}
            <div className="rounded-3xl border border-neutral-200 bg-surface p-6 md:p-7">
              <h2 className="font-display text-[16px] font-semibold tracking-tight text-obsidian md:text-[17px]">
                Office
              </h2>
              <address className="mt-4 not-italic text-[13.5px] leading-relaxed text-subtle">
                <p className="font-display font-semibold text-obsidian">
                  {CONTACT.address.line1}
                </p>
                <p className="mt-1">{CONTACT.address.line2}</p>
                <p>
                  {CONTACT.address.city}, {CONTACT.address.state}{' '}
                  {CONTACT.address.postalCode}
                </p>
                <p>{CONTACT.address.country}</p>
              </address>
              <p className="mt-4 border-t border-neutral-200 pt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                {CONTACT.hours.label}
              </p>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      <ContactFAQ />

      <CTASection />
    </>
  );
}
