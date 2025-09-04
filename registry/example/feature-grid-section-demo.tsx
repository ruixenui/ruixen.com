import FeatureGridSection, {
  FeatureGridItem,
} from "../ruixenui/feature-grid-section";

const demoFeatures: FeatureGridItem[] = [
  {
    title: "AI-Powered Recommendations",
    description:
      "Provide users with personalized suggestions using AI-driven insights.",
    iconLight: "/ai_light.png",
    iconDark: "/ai_dark.png",
  },
  {
    title: "Real-Time Analytics",
    description: "Track user behavior and engagement with live dashboards.",
  },
  {
    title: "Secure Transactions",
    description: "Ensure data security and fraud protection for all payments.",
  },
  {
    title: "Workflow Automation",
    description: "Automate repetitive tasks to save time and reduce errors.",
  },
];

export default function DemoPage() {
  return (
    <FeatureGridSection
      heading="Core Features for Your Success"
      subtitle="Empower your team and customers with our feature-rich platform."
      features={demoFeatures}
    />
  );
}
