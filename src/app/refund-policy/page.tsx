/**
 * Refund and cancellation policy — required by the payment gateway (Cashfree)
 * for merchant KYC, and linked from the footer alongside the other legal pages.
 *
 * Terms mirror what the site already promises elsewhere: the 14-day free trial
 * (no card), "cancel anytime" monthly billing, the 15-booking guarantee, and
 * pass-through WhatsApp conversation fees. If any of those change on the
 * pricing page, update this page in the same change.
 */
import type { Metadata } from 'next';
import { LegalDoc, LegalSection } from '@/components/legal/LegalDoc';
import { LEGAL } from '@/config/legal';
import { COMPANY, CONTACT } from '@/lib/constants';

const TITLE = 'Refund and Cancellation Policy';
const DESCRIPTION =
  'How cancellations, refunds, and the 15-booking guarantee work for Engageo subscriptions, including timelines for refunds to your original payment method.';
const LAST_UPDATED = '13 November 2026';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Engageo` },
  description: DESCRIPTION,
  alternates: { canonical: '/refund-policy' },
  openGraph: {
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
    url: '/refund-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Engageo`,
    description: DESCRIPTION,
  },
};

const LINK_CLASS = 'font-medium text-primary-600 hover:text-primary-700';
const LIST_CLASS = 'list-disc space-y-2 pl-5 marker:text-neutral-400';

export default function RefundPolicyPage(): JSX.Element {
  return (
    <LegalDoc
      title={TITLE}
      intro={`This policy explains how cancellations and refunds work for subscriptions to the Engageo service provided by ${COMPANY.legalName} ("Engageo", "we"). It forms part of our Terms of Service.`}
      lastUpdated={LAST_UPDATED}
      breadcrumbLabel={TITLE}
      breadcrumbHref="/refund-policy"
    >
      <LegalSection id="trial" heading="1. Free trial">
        <p>
          Every plan starts with a 14-day free trial. No payment details are
          collected during the trial, so nothing is charged and nothing needs
          to be refunded. If you do not subscribe at the end of the trial, the
          service pauses automatically.
        </p>
      </LegalSection>

      <LegalSection id="guarantee" heading="2. 15-booking guarantee">
        <p>
          If Engageo does not recover at least 15 appointment bookings for your
          clinic in the first 30 days after your paid subscription goes live,
          we will refund the subscription fee you paid for that first month in
          full. Recovered bookings are counted from the live ledger in your
          dashboard.
        </p>
        <p>
          To claim, contact us within 15 days after the end of that first
          30-day period. The guarantee applies once per clinic and requires
          that the service stayed connected to your phone line, WhatsApp
          Business number, and calendar throughout the period.
        </p>
      </LegalSection>

      <LegalSection id="cancellation" heading="3. Cancelling your subscription">
        <ul className={LIST_CLASS}>
          <li>
            <strong>Monthly plans</strong> can be cancelled at any time. The
            cancellation takes effect at the end of the current billing month;
            you keep access until then and are not charged again.
          </li>
          <li>
            <strong>Quarterly (3-month) and yearly (12-month) plans</strong> can
            also be cancelled at any time. Service continues until the date you
            choose, and any remaining full months are refunded as described in
            section 4.
          </li>
          <li>
            <strong>Enterprise plans</strong> follow the cancellation terms in
            your order form.
          </li>
        </ul>
        <p>
          To cancel, contact us through our{' '}
          <a className={LINK_CLASS} href={LEGAL.company.contactUrl}>
            contact page
          </a>
          , email {CONTACT.email}, or message us on WhatsApp at {CONTACT.whatsapp}{' '}
          from your registered number or email address.
        </p>
      </LegalSection>

      <LegalSection id="refunds" heading="4. Refunds">
        <p>Apart from the guarantee in section 2, refunds are issued as follows:</p>
        <ul className={LIST_CLASS}>
          <li>
            <strong>Monthly plans:</strong> the current month&rsquo;s fee is not
            refunded after cancellation, including for partial use of the month.
          </li>
          <li>
            <strong>Quarterly and yearly plans:</strong> we refund the months
            that have not started yet. Because prepaid plans are discounted, the
            months already used are recalculated at the standard monthly price,
            and the refund is the amount you paid minus that recalculated amount.
          </li>
          <li>
            <strong>Duplicate or incorrect charges:</strong> refunded in full
            once verified.
          </li>
          <li>
            <strong>Service failure:</strong> if the service is unavailable for
            an extended period because of a fault on our side, we will offer a
            pro-rata refund or credit for the affected period.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="non-refundable" heading="5. What is not refundable">
        <ul className={LIST_CLASS}>
          <li>
            Call minutes used beyond your plan&rsquo;s included allowance.
          </li>
          <li>
            WhatsApp conversation fees charged by Meta, which we pass through at
            cost.
          </li>
          <li>
            Fees for a billing period that has already ended, except under the
            guarantee in section 2 or for an incorrect charge.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="process" heading="6. How to request a refund">
        <p>
          Email {CONTACT.email} or use our{' '}
          <a className={LINK_CLASS} href={LEGAL.company.contactUrl}>
            contact page
          </a>{' '}
          with your clinic name, registered phone number, the payment or invoice
          reference, and the reason for the request.
        </p>
        <ul className={LIST_CLASS}>
          <li>We acknowledge every request within 2 business days.</li>
          <li>We confirm whether the refund is approved within 7 business days.</li>
          <li>
            Approved refunds are credited to the original payment method (card,
            UPI, net banking, or wallet) within 5&ndash;7 business days of
            approval. Your bank may take a few additional days to show the
            credit.
          </li>
        </ul>
        <p>
          Refunds are made in Indian Rupees, only to the original payment
          method. We do not refund in cash or to a different account. Applicable
          taxes (including GST) are refunded or adjusted in line with the law.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="7. Changes to this policy">
        <p>
          We may update this policy. Changes do not affect payments made before
          the updated &ldquo;Last updated&rdquo; date.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="8. Contact">
        <p>
          For questions about billing, cancellations, or refunds, reach{' '}
          {COMPANY.legalName} at {CONTACT.email} or {CONTACT.phone} (
          {CONTACT.hours.label}), or via our{' '}
          <a className={LINK_CLASS} href={LEGAL.company.contactUrl}>
            contact page
          </a>
          .
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
