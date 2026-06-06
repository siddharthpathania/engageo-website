import type { Metadata } from 'next';
import { ClinicLogin } from '@/components/login/ClinicLogin';

const TITLE = 'Clinic Login — Engageo';
const DESCRIPTION = 'Log in to your Engageo clinic dashboard. Enter your clinic code to continue.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-neutral-200 bg-surface p-8 shadow-subtle">
          <h1 className="text-2xl font-semibold tracking-tight text-obsidian">Clinic Login</h1>
          <p className="mt-2 text-[15px] text-neutral-500">
            Enter your clinic code to go to your dashboard.
          </p>
          <div className="mt-6">
            <ClinicLogin />
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-neutral-500">
          Don&apos;t have your clinic code?{' '}
          <a
            href="/contact"
            className="font-medium text-obsidian underline underline-offset-2"
          >
            Contact Engageo
          </a>
        </p>
      </div>
    </main>
  );
}
