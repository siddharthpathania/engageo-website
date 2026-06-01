/**
 * DRAFT — legal review required before relying on this document.
 *
 * Honest, high-level security overview. Deliberately avoids certification or
 * control claims we cannot back. Shared facts (sub-processors, retention) come
 * from src/config/legal.ts. Unfilled values render neutral fallback prose with
 * NO visible markers; completeness is tracked only by the dev-time warning in
 * src/config/legal.ts. Verify the real values before publishing.
 */
import type { Metadata } from 'next';
import { Field, LegalDoc, LegalSection, ListField } from '@/components/legal/LegalDoc';
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
          Engageo, and our sub-processors. Data at rest is encrypted by our cloud
          and database providers.
        </p>
      </LegalSection>

      <LegalSection id="access" heading="2. Access controls">
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          <li>Access to production systems and patient data is limited to authorised personnel on a need-to-know basis.</li>
          <li>Engageo staff authenticate to internal systems and we use role-based permissions.</li>
          <li>
            Administrative access is restricted and protected by authentication
            controls.
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
            <ListField
              items={LEGAL.subProcessors.voiceAi}
              fallback="specialist voice, language-model, and speech-processing providers engaged under data-processing terms"
            />
            .
          </li>
          <li>
            <strong>Cloud hosting &amp; database</strong> —{' '}
            <ListField
              items={LEGAL.subProcessors.hosting}
              fallback="reputable cloud hosting and database providers"
            />
            .
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
          <Field
            value={LEGAL.retention.callAudio}
            fallback="kept only as long as needed to handle the call and resulting booking"
          />
          ; transcripts:{' '}
          <Field
            value={LEGAL.retention.transcripts}
            fallback="kept only as long as needed to maintain service records"
          />
          ; other personal data:{' '}
          <Field
            value={LEGAL.retention.general}
            fallback="kept only as long as necessary for the purposes described above"
          />{' '}
          &mdash; are described in full in our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/privacy-policy">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="resilience" heading="5. Reliability and backups">
        <p>
          We rely on managed cloud infrastructure with provider-level redundancy.
          Backups and disaster recovery are handled through our managed
          infrastructure providers.
        </p>
      </LegalSection>

      <LegalSection id="vulnerability" heading="6. Monitoring and incident response">
        <p>
          We monitor our systems for anomalies and maintain an internal process
          for responding to security incidents. On becoming aware of a
          personal-data breach, we will notify the Data Protection Board of India
          and affected parties without undue delay, in line with the DPDP Act 2023
          and the DPDP Rules 2025.
        </p>
      </LegalSection>

      <LegalSection id="certifications" heading="7. Compliance and certifications">
        <p>
          We design our practices around India&rsquo;s Digital Personal Data
          Protection Act, 2023. We do not currently claim to hold formal
          certifications such as ISO 27001 or SOC&nbsp;2.
        </p>
      </LegalSection>

      <LegalSection id="report" heading="8. Reporting a vulnerability">
        <p>
          If you believe you have found a security issue, please contact us
          through our{' '}
          <a className="font-medium text-primary-600 hover:text-primary-700" href="/contact">
            contact page
          </a>{' '}
          so we can investigate.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
