import Pricing, { Plan } from "@/registry/ruixenui/pricing-tiers";

const demoPlans: Plan[] = [
  {
    title: "Starter",
    price: "$0",
    period: "/mo",
    description: "For individuals starting out",
    features: [
      "Access to core features",
      "Community support",
      "Limited projects (up to 3)",
      "Basic analytics dashboard",
      "5GB Cloud Storage",
      "Email notifications",
      "Standard security",
      "Access to starter templates",
      "Mobile app access (view only)",
      "Monthly product updates",
    ],
  },
  {
    title: "Professional",
    price: "$29",
    period: "/mo",
    description: "For freelancers and small teams",
    features: [
      "All Starter features",
      "Priority support",
      "Unlimited projects",
      "Custom reports",
      "Advanced analytics",
      "Collaborative team access",
      "Version history and rollback",
      "API access for integrations",
      "Mobile app full access",
      "Custom branding",
      "Monthly product updates",
      "Standard security features",
    ],
    badge: "Popular",
  },
  {
    title: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "For large organizations",
    features: [
      "All Professional features",
      "Dedicated account manager",
      "Enterprise-grade security",
      "Custom integrations & API",
      "Single Sign-On (SSO)",
      "Advanced reporting & dashboards",
      "Team permissions & roles",
      "Priority 24/7 support",
      "Unlimited projects & users",
      "Dedicated server options",
      "Custom SLAs and contracts",
      "Onboarding & training sessions",
      "Compliance & audit features",
      "Monthly product updates",
    ],
    badge: "Enterprise",
  },
  {
    title: "Ultimate",
    price: "$199",
    period: "/mo",
    description: "For global enterprises and high-scale teams",
    features: [
      "All Enterprise features",
      "Dedicated infrastructure",
      "High availability SLAs",
      "Custom onboarding & training",
      "Personalized support team",
      "Unlimited API calls & integrations",
      "Advanced automation & workflows",
      "Priority access to beta features",
      "Custom analytics dashboards",
      "Data export and backup options",
      "Full compliance & audit support",
    ],
    badge: "Best Value",
  },
];

export default function PricingDemoPage() {
  return (
    <main>
      <Pricing
        plans={demoPlans}
        heading="Choose the Right Plan for Your Team"
        subheading="Flexible pricing that scales with your business, from solo developers to large enterprises."
      />
    </main>
  );
}
