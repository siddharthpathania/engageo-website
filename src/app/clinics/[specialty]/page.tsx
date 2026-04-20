import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SpecialtyPage } from '@/components/specialty/SpecialtyPage';
import {
  getClinicSpecialties,
  getSpecialtyBySlug,
} from '@/lib/specialty-data';

type ClinicSpecialtyPageProps = {
  params: { specialty: string };
};

export function generateStaticParams(): Array<{ specialty: string }> {
  return getClinicSpecialties().map((s) => ({ specialty: s.slug }));
}

export function generateMetadata({
  params,
}: ClinicSpecialtyPageProps): Metadata {
  const specialty = getSpecialtyBySlug(params.specialty);
  if (!specialty || specialty.kind !== 'clinic') {
    return { title: 'Specialty not found' };
  }

  const url = `/clinics/${specialty.slug}`;

  return {
    title: { absolute: specialty.metaTitle },
    description: specialty.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: specialty.metaTitle,
      description: specialty.metaDescription,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: specialty.metaTitle,
      description: specialty.metaDescription,
    },
  };
}

export default function ClinicSpecialtyPage({
  params,
}: ClinicSpecialtyPageProps): JSX.Element {
  const specialty = getSpecialtyBySlug(params.specialty);
  if (!specialty || specialty.kind !== 'clinic') {
    notFound();
  }

  return <SpecialtyPage specialty={specialty} basePath="/clinics" />;
}
