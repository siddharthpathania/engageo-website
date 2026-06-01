/**
 * DRAFT — legal review required before relying on this document.
 *
 * Standard B2B SaaS terms for clinics subscribing to Engageo. Commercial
 * specifics (fees, term length, SLAs, liability caps, indemnity scope,
 * governing courts) are wrapped in visible [PLACEHOLDER: …] markers and MUST be
 * confirmed by counsel before publishing — they are not draftable without a
 * lawyer. Shared facts (date, registered address) come from src/config/legal.ts.
 */
import type { Metadata } from 'next';
import { Field, LegalDoc, LegalSection } from '@/components/legal/LegalDoc';
import { isTodo, LEGAL } from '@/config/legal';
import { COMPANY, CONTACT } from '@/lib/constants';

const TITLE = 'Terms of Service';
const DESCRIPTION =
  'The terms that govern a clinic’s use of Engageo’s missed-call recovery, WhatsApp automation, and appointment-booking service.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Engageo` },
  description: DESCRIPTION,
  alternates: { canonical: '/terms-of-service' },
  openGraph: {
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
    url: '/terms-of-service',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
  },
};

export default function TermsOfServicePage(): JSX.Element {
  return (
    <LegalDoc
      title={TITLE}
      intro={`These terms form an agreement between ${COMPANY.legalName} ("Engageo", "we") and the clinic, hospital, or organisation ("Customer", "you") that subscribes to our service.`}
      lastUpdated={LEGAL.lastUpdated}
      breadcrumbLabel={TITLE}
      breadcrumbHref="/terms-of-service"
    >
      <LegalSection id="acceptance" heading="1. Acceptance of terms">
        <p>
          By signing an order form, creating an account, or using the Engageo
          service (the &ldquo;Service&rdquo;), you agree to these Terms of Service. If you
          are entering into these terms on behalf of an organisation, you confirm
          you have authority to bind that organisation.
        </p>
      </LegalSection>

      <LegalSection id="service" heading="2. The Service">
        <p>
          Engageo provides AI-assisted missed-call recovery, WhatsApp
          automation, call transcription, and appointment-booking tools that
          integrate with your telephony, WhatsApp Business number, and calendar.
          We may add, change, or remove features over time, and will not
          materially reduce core functionality during a paid term without notice.
        </p>
      </LegalSection>

      <LegalSection id="accounts" heading="3. Customer accounts and responsibilities">
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>You are responsible for the accuracy of the configuration and the actions of users on your account.</li>
          <li>You must keep login credentials secure and notify us of any unauthorised use.</li>
          <li>
            You are responsible for obtaining any patient consents required for us
            to process patient data on your behalf, and for your own compliance
            with applicable medical, advertising, and telecom regulations.
          </li>
          <li>You must use the Service in line with WhatsApp Business and telecom messaging policies.</li>
        </ul>
      </LegalSection>

      <LegalSection id="acceptable-use" heading="4. Acceptable use">
        <p>You agree not to use the Service to:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>send unlawful, deceptive, or unsolicited bulk messages (spam);</li>
          <li>impersonate any person or misrepresent your affiliation;</li>
          <li>infringe intellectual-property or privacy rights;</li>
          <li>attempt to disrupt, reverse-engineer, or gain unauthorised access to the Service.</li>
        </ul>
      </LegalSection>

      <LegalSection id="data" heading="5. Data protection">
        <p>
          Our handling of personal data, including patient data we process on
          your behalf as your processor, is described in our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/privacy-policy">
            Privacy Policy
          </a>
          . You remain the data fiduciary for your patients&rsquo; data. A separate
          data-processing addendum is{' '}
          <Field value={LEGAL.terms.dpa} fallback="available on request" />.
        </p>
      </LegalSection>

      <LegalSection id="fees" heading="6. Fees and payment">
        <p>
          Subscription fees, billing cycle, and any usage-based charges are set
          out in your order form or current pricing. Unless stated otherwise,
          fees are exclusive of applicable taxes (including GST). Payment terms,
          late-payment handling, and renewal pricing are{' '}
          <Field value={LEGAL.terms.feeTerms} fallback="as set out in your order form" />.
        </p>
      </LegalSection>

      <LegalSection id="term" heading="7. Term, renewal, and termination">
        <p>
          The agreement runs for the term stated in your order form and renews as
          specified there. Either party may terminate for material breach that is
          not cured within{' '}
          <Field value={LEGAL.terms.curePeriod} fallback="a reasonable cure period" /> of
          written notice. On termination, your right to use the Service ends and
          we will make your data available for export for{' '}
          <Field value={LEGAL.terms.exportWindow} fallback="a reasonable period" /> before
          deletion.
        </p>
      </LegalSection>

      <LegalSection id="availability" heading="8. Service availability">
        <p>
          We aim to keep the Service available and reliable but do not guarantee
          uninterrupted operation. The Service depends on third-party providers
          (telecom carriers, Meta/WhatsApp, calendar providers) whose outages may
          affect it.
          {!isTodo(LEGAL.terms.sla) ? (
            <> Any committed uptime or support targets are {LEGAL.terms.sla}.</>
          ) : null}
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="9. Intellectual property">
        <p>
          Engageo and its licensors retain all rights in the Service, software,
          and underlying models. You retain all rights in your data and content.
          You grant us a limited licence to process your data solely to provide
          and improve the Service as described in the Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection id="warranties" heading="10. Disclaimers">
        <p>
          The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. AI
          outputs (including transcripts and automated replies) can contain
          errors; you are responsible for clinical and operational decisions. To
          the extent permitted by law, we disclaim implied warranties of
          merchantability and fitness for a particular purpose.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, neither party is liable for
          indirect, incidental, or consequential damages. Our total aggregate
          liability is limited to{' '}
          <Field
            value={LEGAL.terms.liabilityCap}
            fallback="the maximum extent permitted by applicable law"
          />
          .
        </p>
      </LegalSection>

      <LegalSection id="indemnity" heading="12. Indemnification">
        <p>
          You agree to indemnify Engageo against claims arising from your misuse
          of the Service, your content, or your breach of these terms or
          applicable law, subject to{' '}
          <Field
            value={LEGAL.terms.indemnityScope}
            fallback="the limitations set out in these terms"
          />
          .
        </p>
      </LegalSection>

      <LegalSection id="law" heading="13. Governing law and disputes">
        <p>
          These terms are governed by the laws of India, and the{' '}
          <Field
            value={LEGAL.terms.jurisdiction}
            fallback="courts of competent jurisdiction in India"
          />{' '}
          have exclusive jurisdiction, subject to any agreed arbitration process.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="14. Changes to these terms">
        <p>
          We may update these terms; material changes take effect on the updated
          &ldquo;Last updated&rdquo; date, and continued use of the Service constitutes
          acceptance.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="15. Contact">
        <p>
          Questions about these terms? Reach {COMPANY.legalName} via our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href={LEGAL.company.contactUrl}>
            contact page
          </a>
          , or email our Grievance Officer at{' '}
          <Field value={LEGAL.grievanceOfficer.email} fallback={CONTACT.email} />.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
