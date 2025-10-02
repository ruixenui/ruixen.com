"use client";

import PricingFlow, { PLAN } from "../ruixenui/pricing-flow";

export default function PricingFlowDemo() {
  const customPlans: PLAN[] = [
    {
      id: "basic",
      title: "Basic",
      desc: "Perfect for personal projects and small experiments.",
      monthlyPrice: 10,
      annuallyPrice: 108,
      buttonText: "Subscribe Basic",
      features: [
        "10 UI components",
        "Community support",
        "Single project license",
      ],
      link: "#",
    },
    {
      id: "premium",
      title: "Premium",
      desc: "For freelancers and teams needing full access.",
      monthlyPrice: 49,
      annuallyPrice: 529,
      badge: "Most Popular",
      buttonText: "Subscribe Premium",
      features: [
        "All Basic features",
        "Advanced components",
        "Priority support",
        "Multi-project license",
      ],
      link: "#",
    },
  ];

  return (
    <main className="p-6">
      <PricingFlow plans={customPlans} defaultBillPlan="annually" />
    </main>
  );
}
