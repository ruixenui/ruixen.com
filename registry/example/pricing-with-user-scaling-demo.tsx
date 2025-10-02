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
    <main className="p-6">
      <PricingWithUserScaling
        plans={customPlans}
        defaultBilling="annual"
        defaultUsers={3}
      />
    </main>
  );
}
