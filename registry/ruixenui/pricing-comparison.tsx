"use client";

import React from "react";
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlanFeature {
  [key: string]: boolean | string;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  buttonVariant: "default" | "outline";
  features: PlanFeature;
}

interface FeatureCategory {
  title: string;
  items: { key: string; label: string }[];
}

interface PricingComparisonProps {
  plans?: Plan[];
  categories?: FeatureCategory[];
}

const defaultPlans: Plan[] = [
  {
    name: "Startup",
    price: "$40",
    description: "Perfect for small teams launching fast.",
    cta: "Try it",
    icon: <MoveRight className="w-4 h-4" />,
    buttonVariant: "outline",
    features: {
      sso: true,
      twoFA: false,
      encryption: true,
      auditLogs: false,
      ai: false,
      backups: false,
      versioning: false,
      templates: true,
      integrations: false,
      members: "5 members",
      multiplayer: false,
      roles: false,
      support: false,
      orchestration: false,
      deployment: false,
      monitoring: false,
      apiAccess: false,
    },
  },
  {
    name: "Growth",
    price: "$99",
    description: "Designed for growing teams scaling features.",
    cta: "Try it",
    icon: <MoveRight className="w-4 h-4" />,
    buttonVariant: "default",
    features: {
      sso: true,
      twoFA: true,
      encryption: true,
      auditLogs: true,
      ai: true,
      backups: true,
      versioning: true,
      templates: true,
      integrations: true,
      members: "25 members",
      multiplayer: true,
      roles: true,
      support: true,
      orchestration: true,
      deployment: true,
      monitoring: true,
      apiAccess: false,
    },
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "Everything you need at scale with full support.",
    cta: "Contact us",
    icon: <PhoneCall className="w-4 h-4" />,
    buttonVariant: "outline",
    features: {
      sso: true,
      twoFA: true,
      encryption: true,
      auditLogs: true,
      ai: true,
      backups: true,
      versioning: true,
      templates: true,
      integrations: true,
      members: "100+ members",
      multiplayer: true,
      roles: true,
      support: true,
      orchestration: true,
      deployment: true,
      monitoring: true,
      apiAccess: true,
    },
  },
];

const defaultCategories: FeatureCategory[] = [
  {
    title: "Security",
    items: [
      { key: "sso", label: "SSO (Single Sign-On)" },
      { key: "twoFA", label: "Two-Factor Authentication" },
      { key: "encryption", label: "Data Encryption at Rest" },
      { key: "auditLogs", label: "Security Audit Logs" },
    ],
  },
  {
    title: "Productivity",
    items: [
      { key: "ai", label: "AI Assistant" },
      { key: "backups", label: "Automatic Backups" },
      { key: "versioning", label: "Version Control" },
      { key: "templates", label: "Built-in Templates" },
      { key: "integrations", label: "3rd-Party Integrations" },
    ],
  },
  {
    title: "Team",
    items: [
      { key: "members", label: "Team Members Limit" },
      { key: "multiplayer", label: "Real-time Collaboration" },
      { key: "roles", label: "Custom Roles & Permissions" },
      { key: "support", label: "Priority Team Support" },
    ],
  },
  {
    title: "DevOps",
    items: [
      { key: "orchestration", label: "Workflow Orchestration" },
      { key: "deployment", label: "CI/CD Deployment" },
      { key: "monitoring", label: "Performance Monitoring" },
      { key: "apiAccess", label: "Developer API Access" },
    ],
  },
];

export default function PricingComparison({
  plans = defaultPlans,
  categories = defaultCategories,
}: PricingComparisonProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Badge className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Prices that scale with your ambition
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Choose a plan that fits your current needs — and grow into it with
            advanced features as your team scales.
          </p>
          <div className="mt-8 p-2 bg-muted/40 dark:bg-zinc-900 text-xs text-gray-500">
            <p>
              Note: All plans come with free onboarding, Slack support, and
              access to monthly product updates.
            </p>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="grid md:grid-cols-4 gap-6 items-stretch">
          {/* Empty top-left */}
          <div />

          {/* Plan Cards */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-xl border border-muted bg-background p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-4xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <span className="text-sm text-muted-foreground"> / month</span>
              </div>
              <Button
                variant={plan.buttonVariant as any}
                className="mt-6 gap-2"
              >
                {plan.cta} {plan.icon}
              </Button>
            </div>
          ))}

          {/* Feature Rows */}
          {categories.map((category, catIdx) => (
            <React.Fragment key={catIdx}>
              <div className="text-left font-semibold text-sm text-foreground py-4 px-2 border-t col-span-4">
                {category.title}
              </div>
              {category.items.map((feature, rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <div className="text-sm text-muted-foreground py-3 px-2">
                    {feature.label}
                  </div>
                  {plans.map((plan, colIdx) => {
                    const value =
                      plan.features[feature.key as keyof typeof plan.features];
                    return (
                      <div
                        key={`${feature.key}-${colIdx}`}
                        className="flex items-center justify-center py-3"
                      >
                        {typeof value === "string" ? (
                          <span className="text-sm text-muted-foreground">
                            {value}
                          </span>
                        ) : value ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
