/**
 * DRAFT — legal review required before relying on this document.
 *
 * Good-faith draft describing Engageo's real data flows (patient call recovery
 * + WhatsApp automation + calendar booking for Indian clinics). Facts only
 * Engageo can supply live in src/config/legal.ts and render as visible
 * [PLACEHOLDER: …] markers until filled. Items still wrapped in <Placeholder>
 * inline (or marked [confirm …]) MUST be filled and reviewed by qualified
 * counsel — DPDP Act 2023 specifics, sub-processor vendors, retention periods,
 * and the grievance officer's details — before this is a published notice.
 */
import type { Metadata } from 'next';
import {
  Field,
  LegalDoc,
  LegalSection,
  ListField,
  Placeholder,
} from '@/components/legal/LegalDoc';
import { LEGAL } from '@/config/legal';
import { COMPANY, CONTACT } from '@/lib/constants';

const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'How Engageo Agency LLP collects, uses, shares, and protects personal data — including patient information processed on behalf of the clinics that use our service.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Engageo` },
  description: DESCRIPTION,
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
    url: '/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
  },
};

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <LegalDoc
      title={TITLE}
      intro={`This policy explains how ${COMPANY.legalName} ("Engageo", "we", "us") handles personal data when clinics use our missed-call recovery, WhatsApp automation, and appointment-booking service, and when patients interact with us on a clinic's behalf.`}
      lastUpdated={LEGAL.lastUpdated}
      breadcrumbLabel={TITLE}
      breadcrumbHref="/privacy-policy"
    >
      <LegalSection id="roles" heading="1. Our role: processor and controller">
        <p>
          Engageo provides software and AI services to healthcare clinics and
          hospitals in India. When we handle patient information on a clinic&rsquo;s
          instructions &mdash; for example, answering a missed call, replying on
          WhatsApp, or writing an appointment into the clinic&rsquo;s calendar &mdash; the
          clinic is the <strong>data fiduciary</strong> (controller) and Engageo
          acts as a <strong>data processor</strong> on its behalf.
        </p>
        <p>
          When we collect information directly from clinic staff, prospects, or
          website visitors (for example, contact-form submissions or
          demo&nbsp;requests), Engageo is the controller of that data.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" heading="2. What we collect">
        <p>Depending on how you interact with the service, we may process:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>
            <strong>Patient contact details</strong> &mdash; phone numbers and names
            captured from inbound or missed calls and WhatsApp conversations.
          </li>
          <li>
            <strong>Appointment details</strong> &mdash; requested service, preferred
            date/time, doctor or department, and booking status written to the
            clinic&rsquo;s calendar.
          </li>
          <li>
            <strong>Voice-call audio and transcripts</strong> &mdash; recordings and
            machine-generated transcripts of calls our AI receptionist handles,
            used to answer the caller and to create the booking.
          </li>
          <li>
            <strong>WhatsApp message content</strong> &mdash; the messages exchanged
            between the patient and the clinic&rsquo;s automated number, including
            any media a patient chooses to send.
          </li>
          <li>
            <strong>Clinic account &amp; usage data</strong> &mdash; staff names and
            work contact details, login activity, and configuration settings.
          </li>
          <li>
            <strong>Technical data</strong> &mdash; IP address, device/browser
            information, and analytics events from our website.
          </li>
        </ul>
        <p>
          We do not seek to collect formal clinical records or diagnoses. Where a
          patient volunteers health-related information in a call or message, it
          is processed only to route and book their request on the clinic&rsquo;s
          behalf.
        </p>
      </LegalSection>

      <LegalSection id="why" heading="3. Why we use it">
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>To answer calls the clinic misses and respond to patient enquiries.</li>
          <li>To schedule, confirm, reschedule, and follow up on appointments.</li>
          <li>To send WhatsApp confirmations and reminders on the clinic&rsquo;s behalf.</li>
          <li>To transcribe and summarise calls so clinic staff have a record.</li>
          <li>To operate, secure, debug, and improve the service.</li>
          <li>To communicate with clinics about their account and support.</li>
        </ul>
      </LegalSection>

      <LegalSection id="lawful-basis" heading="4. Lawful basis">
        <p>
          For patient data processed on a clinic&rsquo;s behalf, the clinic is
          responsible for establishing a valid legal basis (such as the
          patient&rsquo;s consent or a legitimate purpose for which the patient has
          provided their data) under India&rsquo;s Digital Personal Data Protection
          Act, 2023 (&ldquo;DPDP Act&rdquo;). Engageo processes that data solely under the
          clinic&rsquo;s documented instructions.
        </p>
        <p>
          For data where Engageo is the controller (e.g. website enquiries), our
          basis is your consent together with the DPDP Act&rsquo;s &ldquo;certain legitimate
          uses&rdquo; provision &mdash; namely the data you voluntarily provide for the
          specified purpose of responding to your enquiry, used only for that
          purpose. We do not rely on a general &ldquo;legitimate interest&rdquo; basis, which
          the DPDP Act does not provide. Specific legal-basis mapping is{' '}
          <Placeholder>confirm with counsel</Placeholder>.
        </p>
      </LegalSection>

      <LegalSection id="sub-processors" heading="5. Sub-processors and data flows">
        <p>
          To deliver the service, data flows through third-party providers that
          process it on our behalf. These currently include:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>
            <strong>{LEGAL.subProcessors.messaging}</strong> &mdash; to send and
            receive WhatsApp messages between patients and the clinic.
          </li>
          <li>
            <strong>{LEGAL.subProcessors.calendar}</strong> &mdash; to read
            availability and write confirmed appointments into the clinic&rsquo;s
            calendar.
          </li>
          <li>
            <strong>Voice, LLM, and speech-to-text / text-to-speech vendors</strong>{' '}
            &mdash; to power the AI receptionist&rsquo;s telephony, language understanding,
            transcription, and spoken responses:{' '}
            <ListField items={LEGAL.subProcessors.voiceAi} fallback="voice / LLM / STT-TTS vendors" />.
          </li>
          <li>
            <strong>Cloud hosting &amp; infrastructure</strong> &mdash;{' '}
            <ListField items={LEGAL.subProcessors.hosting} fallback="hosting / database / analytics providers" />.
          </li>
        </ul>
        <p>
          Some of these providers may process data outside India. Such transfers
          are currently permissible under the DPDP framework, as the Government of
          India has not notified any restricted jurisdictions. We monitor for
          changes and will update our practices if restrictions are introduced.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="6. How long we keep it">
        <p>
          We retain personal data only as long as needed for the purposes above
          or as required by law, after which it is deleted or anonymised. Current
          retention periods are:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>
            <strong>Call audio:</strong>{' '}
            <Field value={LEGAL.retention.callAudio} fallback="call-audio retention period" />
          </li>
          <li>
            <strong>Transcripts:</strong>{' '}
            <Field value={LEGAL.retention.transcripts} fallback="transcript retention period" />
          </li>
          <li>
            <strong>Other personal data:</strong>{' '}
            <Field value={LEGAL.retention.general} fallback="general data retention period" />
          </li>
        </ul>
        <p>
          Clinics may also request deletion of their patients&rsquo; data as described
          below.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" heading="7. Your rights under the DPDP Act 2023">
        <p>
          Subject to the conditions in the DPDP Act, individuals (&ldquo;Data
          Principals&rdquo;) have the right to:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>access a summary of the personal data we process about them;</li>
          <li>request correction, completion, or updating of their data;</li>
          <li>request erasure of their data where it is no longer required;</li>
          <li>nominate another person to exercise these rights in case of death or incapacity;</li>
          <li>readily available means of grievance redressal (see below).</li>
        </ul>
        <p>
          Because most patient data is held on behalf of a clinic, requests
          relating to a specific clinic&rsquo;s patients are routed to that clinic as
          the data fiduciary; we will assist them in responding.
        </p>
      </LegalSection>

      <LegalSection id="grievance-officer" heading="8. Grievance Officer">
        <p>
          In accordance with the DPDP Act 2023, you may contact our Grievance
          Officer with any privacy concern or to exercise your rights:
        </p>
        <ul className="space-y-1">
          <li>
            <strong>Name:</strong>{' '}
            <Field value={LEGAL.grievanceOfficer.name} fallback="grievance officer name" />
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <Field value={LEGAL.grievanceOfficer.email} fallback="grievance officer email" />
          </li>
          <li>
            <strong>Company:</strong> {COMPANY.legalName},{' '}
            {CONTACT.address.city}, {CONTACT.address.state}, India
          </li>
        </ul>
        <p>
          We aim to acknowledge grievances promptly and resolve them within the
          timelines required by applicable law.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="9. Security and breach notification">
        <p>
          We apply technical and organisational safeguards &mdash; including
          encryption in transit and access controls &mdash; to protect personal data.
          See our <a className="font-medium text-primary-600 hover:text-primary-700" href="/security">Security overview</a> for details. No system
          is perfectly secure, and we cannot guarantee absolute security.
        </p>
        <p>
          On becoming aware of a personal-data breach, we will notify the Data
          Protection Board of India and affected parties (including the relevant
          clinic and, where applicable, affected Data Principals) without undue
          delay, in line with the DPDP Act 2023 and the DPDP Rules 2025.{' '}
          <Placeholder>confirm internal incident-response process</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="children" heading="10. Children's data">
        <p>
          Our service is intended for use by clinics and adult patients. Where a
          minor&rsquo;s data is processed in the course of a clinic booking, Engageo
          processes it only on the clinic&rsquo;s documented instructions. As data
          fiduciary, the clinic is responsible for obtaining verifiable
          parental or guardian consent where the DPDP Act 2023 requires it.
        </p>
        <p>
          Engageo does not use children&rsquo;s data for tracking, behavioural
          monitoring, profiling, or targeted advertising. This reflects our
          current position pending counsel review; we do not claim full
          compliance with every children&rsquo;s-data requirement until that review is
          complete. <Placeholder>confirm with counsel</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="11. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be
          reflected by updating the &ldquo;Last updated&rdquo; date above and, where
          appropriate, by notifying clinics directly.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="12. Contact us">
        <p>
          For any question about this policy or our data practices, contact{' '}
          {COMPANY.legalName} at{' '}
          <a
            className="font-medium text-primary-600 hover:text-primary-700"
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>{' '}
          or via our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href={LEGAL.company.contactUrl}>
            contact page
          </a>
          . Registered office: {LEGAL.company.address}.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
