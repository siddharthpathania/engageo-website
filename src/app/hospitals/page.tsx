import type { Metadata } from 'next';
import { SpecialtyPage } from '@/components/specialty/SpecialtyPage';
import { getHospitalSpecialty } from '@/lib/specialty-data';

const specialty = getHospitalSpecialty();

export const metadata: Metadata = {
  title: { absolute: specialty.metaTitle },
  description: specialty.metaDescription,
  alternates: { canonical: '/hospitals' },
  openGraph: {
    title: specialty.metaTitle,
    description: specialty.metaDescription,
    url: '/hospitals',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: specialty.metaTitle,
    description: specialty.metaDescription,
  },
};

export default function HospitalsPage(): JSX.Element {
  return <SpecialtyPage specialty={specialty} basePath="/hospitals" />;
}
