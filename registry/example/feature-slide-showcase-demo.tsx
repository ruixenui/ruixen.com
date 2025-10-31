// app/feature-demo/page.tsx
import {
  FeatureShowcase,
  type TabMedia,
} from "@/registry/ruixenui/feature-slide-showcase";

export default function Page() {
  const tabs: TabMedia[] = [
    {
      value: "apparel",
      label: "Apparel",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/t-shirt-mockup.png",
      alt: "Apparel mockup",
    },
    {
      value: "screen",
      label: "Screen",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png",
      alt: "Website template on screen",
    },
    {
      value: "abstract",
      label: "Abstract",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg",
      alt: "Abstract background",
    },
  ];

  return (
    <FeatureShowcase
      eyebrow="Experience"
      title="Design that adapts to your vibe"
      description="Turn your ideas into visuals that match your style — whether it’s product mockups, website screens, or abstract art. Instantly switch views and find what clicks with your brand."
      stats={["3 styles", "Instant preview", "Creative-ready"]}
      steps={[
        {
          id: "step-1",
          title: "Upload your concept",
          text: "Start with any visual — a logo, sketch, or product photo. We’ll analyze it to set your creative tone.",
        },
        {
          id: "step-2",
          title: "Preview across styles",
          text: "Toggle between Apparel, Screen, and Abstract to visualize how your idea fits different mediums.",
        },
        {
          id: "step-3",
          title: "Refine and export",
          text: "Fine-tune the details, download polished assets, and share them directly with your team or clients.",
        },
      ]}
      tabs={tabs}
      defaultTab="screen"
      panelMinHeight={720}
    />
  );
}
