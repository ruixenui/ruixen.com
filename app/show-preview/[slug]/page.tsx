import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SectionPreview from '@/components/preview/SectionPreview';
import sectionsMap from '@/app/map';
import Loading from '@/app/loading';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return Object.keys(sectionsMap).map((slug) => ({
    slug,
  }));
}

export default function DynamicSectionPage({ params }: PageProps) {
  const { slug } = params;
  const SectionComponent = sectionsMap[slug];

  if (!SectionComponent) return notFound();

  return (
    <Suspense fallback={<Loading />}>
      <SectionPreview slug={slug} SectionComponent={SectionComponent} />
    </Suspense>
  );
}
