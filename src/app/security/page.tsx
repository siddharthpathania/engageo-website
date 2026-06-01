/**
 * DRAFT — legal review required before relying on this document.
 *
 * Honest, high-level security overview. Deliberately avoids certification or
 * control claims we cannot back. Shared facts (sub-processors, retention)
 * come from src/config/legal.ts; anything not yet confirmed renders as a
 * visible [PLACEHOLDER: …] marker and MUST be verified before publishing.
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
import { COMPANY } from '@/lib/constants';

const TITLE = 'Security';
const DESCRIPTION =
  'A high-level overview of how Engageo protects clinic and patient data — encryption in transit, access controls, and the sub-processors we rely on.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Engageo` },
  description: DESCRIPTION,
  alternates: { canonical: '/security' },
  openGraph: {
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
    url: '/security',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
  },
};

export default function SecurityPage(): JSX.Element {
  return (
    <LegalDoc
      title={TITLE}
      intro={`Clinics trust Engageo with sensitive patient interactions. This page gives an honest, high-level overview of how ${COMPANY.legalName} protects that data. It is a summary, not a complete description of every control.`}
      lastUpdated={LEGAL.lastUpdated}
      breadcrumbLabel={TITLE}
      breadcrumbHref="/security"
    >
      <LegalSection id="encryption" heading="1. Encryption">
        <p>
          Data is encrypted in transit using TLS between patients, clinics,
          Engageo, and our sub-processors. Encryption of data at rest is provided
          by our cloud and database providers:{' '}
          <Placeholder>confirm at-rest encryption details</Placeholder>.
        </p>
      </LegalSection>

      <LegalSection id="access" heading="2. Access controls">
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>Access to production systems and patient data is limited to authorised personnel on a need-to-know basis.</li>
          <li>Engageo staff authenticate to internal systems and we use role-based permissions.</li>
          <li>
            Administrative access requires{' '}
            <Placeholder>confirm MFA / SSO enforcement</Placeholder>.
          </li>
          <li>Access is reviewed and revoked when no longer required.</li>
        </ul>
      </LegalSection>

      <LegalSection id="sub-processors" heading="3. Sub-processors">
        <p>
          We rely on a small set of vetted providers to deliver the Service. Each
          processes only the data needed for its function:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li><strong>{LEGAL.subProcessors.messaging}</strong> — patient messaging.</li>
          <li><strong>{LEGAL.subProcessors.calendar}</strong> — appointment scheduling.</li>
          <li>
            <strong>Voice / LLM / speech-to-text &amp; text-to-speech vendors</strong> —
            AI call handling and transcription:{' '}
            <ListField items={LEGAL.subProcessors.voiceAi} fallback="voice / LLM / STT-TTS vendors" />.
          </li>
          <li>
            <strong>Cloud hosting &amp; database</strong> —{' '}
            <ListField items={LEGAL.subProcessors.hosting} fallback="hosting / database providers" />.
          </li>
        </ul>
        <p>
          See the{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/privacy-policy">
            Privacy Policy
          </a>{' '}
          for how data flows through these providers.
        </p>
      </LegalSection>

      <LegalSection id="data-handling" heading="4. Data handling and retention">
        <p>
          We collect only the data needed to recover calls, answer patients, and
          book appointments, and retain it only as long as necessary. Current
          retention periods &mdash; call audio:{' '}
          <Field value={LEGAL.retention.callAudio} fallback="call-audio retention period" />;
          transcripts:{' '}
          <Field value={LEGAL.retention.transcripts} fallback="transcript retention period" />;
          other personal data:{' '}
          <Field value={LEGAL.retention.general} fallback="general data retention period" /> &mdash;
          are described in full in our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/privacy-policy">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="resilience" heading="5. Reliability and backups">
        <p>
          We rely on managed cloud infrastructure with provider-level redundancy.
          Backup frequency and disaster-recovery objectives are{' '}
          <Placeholder>confirm backup / DR details</Placeholder>.
        </p>
      </LegalSection>

      <LegalSection id="vulnerability" heading="6. Monitoring and incident response">
        <p>
          We monitor our systems for anomalies and maintain an internal process
          for responding to security incidents. On becoming aware of a
          personal-data breach, we will notify the Data Protection Board of India
          and affected parties without undue delay, in line with the DPDP Act 2023
          and the DPDP Rules 2025.{' '}
          <Placeholder>confirm internal incident-response process</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="certifications" heading="7. Compliance and certifications">
        <p>
          We design our practices around India&rsquo;s Digital Personal Data
          Protection Act, 2023. We make no claim to hold formal certifications
          (such as ISO 27001 or SOC&nbsp;2) unless and until stated here:{' '}
          <Placeholder>list any certifications, or state &ldquo;none yet&rdquo;</Placeholder>.
        </p>
      </LegalSection>

      <LegalSection id="report" heading="8. Reporting a vulnerability">
        <p>
          If you believe you have found a security issue, please contact us
          through our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/contact">
            contact page
          </a>{' '}
          so we can investigate. A dedicated security contact address is{' '}
          <Placeholder>security@ email, if available</Placeholder>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
