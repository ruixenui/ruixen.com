"use client";

import PricingWithUserScaling, {
  Plan,
} from "../ruixenui/pricing-with-user-scaling";

export default function PricingScalingDemo() {
  const customPlans: Plan[] = [
    {
      title: "Solo",
      monthlyPrice: 5,
      annuallyPrice: 54,
      desc: "Perfect for individuals",
      features: ["5 projects per month", "Community support"],
      buttonText: "Subscribe Solo",
    },
    {
      title: "Team",
      monthlyPrice: 20,
      annuallyPrice: 216,
      desc: "For small teams",
      features: [
        "Unlimited projects",
        "Priority support",
        "Team collaboration",
      ],
      buttonText: "Subscribe Team",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          PricingWithUserScaling Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Default plans below, plus a custom example with 3 users by default.
        </p>
      </div>

      {/* Custom Plans */}
      <div className="mt-20">
        <PricingWithUserScaling
          plans={customPlans}
          defaultBilling="annual"
          defaultUsers={3}
        />
      </div>
    </main>
  );
}
