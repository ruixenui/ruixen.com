"use client";

import { componentsData } from "@/lib/simple-components-data";
import { PreviewCarousel } from "@/components/preview-carousel";

const SimpleComponentsShowcase = () => {
  return (
    <div className="space-y-12">
      {componentsData.map((category) => (
        <PreviewCarousel
          key={category.id}
          heading={category.name}
          viewAllText="View All"
          demoUrl={category.viewAllUrl}
          items={category.components.map((component) => ({
            id: component.id,
            title: component.title,
            summary: component.summary,
            url: component.url,
            image_dark: component.image_dark,
            image_light: component.image_light,
          }))}
        />
      ))}
    </div>
  );
};

export { SimpleComponentsShowcase };
