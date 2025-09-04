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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          PricingFlow Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Default pricing plans below, plus a custom example.
        </p>
      </div>

      {/* Custom Plans */}
      <div className="mt-20">
        <PricingFlow plans={customPlans} defaultBillPlan="annually" />
      </div>
    </main>
  );
}
