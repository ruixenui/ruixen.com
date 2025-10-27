import { FeatureItem } from "../ruixenui/featured-highlights";
import FeaturedHighlights from "../ruixenui/featured-highlights";

const demoFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "AI Analytics",
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png",
    description:
      "Gain insights into user behavior and trends using advanced AI analytics tools.",
  },
  {
    id: 2,
    title: "Smart Automation",
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-glass-walls.jpg",
    description:
      "Automate routine tasks and optimize workflow efficiency across teams.",
  },
  {
    id: 3,
    title: "Custom Dashboards",
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg",
    description:
      "Create dashboards tailored to your business needs and track KPIs in real-time.",
  },
];

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <FeaturedHighlights
        heading="Next-Level Features for Modern Teams"
        features={demoFeatures}
      />
    </div>
  );
}
