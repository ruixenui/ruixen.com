"use client";

import FeatureTabsShowcase, {
  FeatureTabItem,
} from "../ruixenui/feature-tabs-showcase";
import { Zap, ShieldCheck, BarChart } from "lucide-react";

const demoTabs: FeatureTabItem[] = [
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Optimize your app for blazing fast load times with one click.",
    backgroundPositionX: 30,
    backgroundPositionY: 50,
    backgroundSizeX: 160,
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Keep your platform safe with robust, enterprise-grade security features.",
    backgroundPositionX: 70,
    backgroundPositionY: 70,
    backgroundSizeX: 140,
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Track KPIs and insights with real-time analytics dashboards.",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 20,
    backgroundSizeX: 170,
  },
];

export default function DemoPage() {
  return (
    <FeatureTabsShowcase
      heading="Next-Gen Features for Teams"
      subtitle="Empower your workflow with speed, security, and insights."
      tabs={demoTabs}
      backgroundImage="/demo-dashboard.png"
    />
  );
}
