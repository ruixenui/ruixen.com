'use client';

import TemplateShowcasePage from "@/components/ruixen/PreviewCard";

type SectionPreviewProps = {
  slug: string;
  SectionComponent: React.ComponentType;
};

export default function SectionPreview({ slug, SectionComponent }: SectionPreviewProps) {
  return (
    <TemplateShowcasePage
      title={slug}
      description="This is a demo of the selected section."
      preview={<SectionComponent />}  
    />
  );
}
