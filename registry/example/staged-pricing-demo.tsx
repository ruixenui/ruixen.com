import {
  StagedPricing,
  type StagedPricingPlan,
} from "@/registry/ruixenui/staged-pricing";

const plans: StagedPricingPlan[] = [
  {
    name: "Starter",
    audience: "For solo builders prototyping ideas",
    monthly: 0,
    annual: 0,
    features: [
      "10K requests per month",
      "Community Discord access",
      "1 connected project",
    ],
    cta: { label: "Get started", href: "#" },
  },
  {
    name: "Studio",
    audience: "For freelancers shipping client work",
    monthly: 24,
    annual: 19,
    annualSavingsPct: 20,
    features: ["Unlimited projects", "Custom domains", "Email support"],
    cta: { label: "Start with Studio", href: "#" },
  },
  {
    name: "Team",
    audience: "For product teams that ship every week",
    monthly: 72,
    annual: 58,
    annualSavingsPct: 20,
    features: [
      "Shared workspaces",
      "Role-based access controls",
      "Slack + GitHub sync",
    ],
    cta: { label: "Start with Team", href: "#" },
    highlighted: true,
  },
  {
    name: "Enterprise",
    audience: "For organizations with strict requirements",
    monthly: "Custom",
    annual: "Custom",
    priceCaption: "Billed annually",
    features: [
      "SAML SSO and SCIM provisioning",
      "Audit logs and SOC 2 reports",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to our team", href: "#" },
  },
];

export default function StagedPricingDemo() {
  return (
    <StagedPricing
      title="Pricing that grows with you."
      description="Pick a plan that fits your team today—level up the moment your usage outgrows it."
      plans={plans}
    />
  );
}
