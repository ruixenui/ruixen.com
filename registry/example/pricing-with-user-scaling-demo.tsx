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
      features: [
        "5 projects per month",
        "Community support",
        "Basic analytics",
      ],
      buttonText: "Subscribe Solo",
    },
    {
      title: "Creator",
      monthlyPrice: 10,
      annuallyPrice: 108,
      desc: "For freelancers and creators",
      features: ["15 projects per month", "Email support", "Custom themes"],
      buttonText: "Subscribe Creator",
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
        "Shared workspaces",
      ],
      buttonText: "Subscribe Team",
    },
    {
      title: "Growth",
      monthlyPrice: 35,
      annuallyPrice: 378,
      desc: "For growing teams",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Role-based access",
        "Faster support",
      ],
      buttonText: "Subscribe Growth",
    },
    {
      title: "Business",
      monthlyPrice: 60,
      annuallyPrice: 648,
      desc: "For established companies",
      features: [
        "Everything in Growth",
        "Security controls",
        "Team permissions",
        "Dedicated support",
      ],
      buttonText: "Subscribe Business",
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
