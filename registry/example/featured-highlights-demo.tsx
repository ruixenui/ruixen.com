import { FeatureItem } from "../ruixenui/featured-highlights";
import FeaturedHighlights from "../ruixenui/featured-highlights";

const demoFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "AI Analytics",
    image: "/image/ai-analytics.jpg",
    description:
      "Gain insights into user behavior and trends using advanced AI analytics tools.",
  },
  {
    id: 2,
    title: "Smart Automation",
    image: "/image/smart-automation.jpg",
    description:
      "Automate routine tasks and optimize workflow efficiency across teams.",
  },
  {
    id: 3,
    title: "Custom Dashboards",
    image: "/image/custom-dashboards.jpg",
    description:
      "Create dashboards tailored to your business needs and track KPIs in real-time.",
  },
];

export default function DemoPage() {
  return (
    <FeaturedHighlights
      heading="Next-Level Features for Modern Teams"
      features={demoFeatures}
    />
  );
}
