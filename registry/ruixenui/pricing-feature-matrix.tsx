"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Rocket01Icon,
  DiamondIcon,
  CrownIcon,
  Tick02Icon,
  Cancel01Icon,
  SparklesIcon,
  Database01Icon,
  CustomerSupportIcon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Types
type FeatureValue = boolean | string;
type IconType = typeof SparklesIcon;

interface Feature {
  name: string;
  description?: string;
}

interface FeatureCategory {
  title: string;
  description: string;
  icon: IconType;
  features: Feature[];
}

interface Plan {
  name: string;
  icon: IconType;
  isHighlighted?: boolean;
  features: Record<string, FeatureValue>;
  cta: {
    label: string;
    href: string;
    variant: "default" | "primary" | "outline";
  };
}

interface PricingFeatureMatrixProps {
  categories?: FeatureCategory[];
  plans?: Plan[];
  className?: string;
}

// Default data - Design System themed
const defaultCategories: FeatureCategory[] = [
  {
    title: "Design System",
    description: "Core design tools that power your product development",
    icon: SparklesIcon,
    features: [
      {
        name: "Component Library",
        description: "Access to pre-built UI components",
      },
      {
        name: "Design Tokens",
        description: "Centralized style variables and themes",
      },
      {
        name: "Figma Integration",
        description: "Sync designs directly from Figma",
      },
      {
        name: "Theme Builder",
        description: "Create and customize themes visually",
      },
      { name: "Dark Mode", description: "Built-in dark mode support" },
      {
        name: "White Labeling",
        description: "Remove branding for enterprise use",
      },
    ],
  },
  {
    title: "Developer Tools",
    description: "Tools and APIs for seamless integration",
    icon: Database01Icon,
    features: [
      {
        name: "CLI Tools",
        description: "Command-line interface for automation",
      },
      {
        name: "TypeScript Support",
        description: "Full TypeScript definitions included",
      },
      {
        name: "Code Generation",
        description: "Auto-generate code from designs",
      },
      {
        name: "API Access",
        description: "Programmatic access to all features",
      },
      {
        name: "CI/CD Integration",
        description: "Integrate with your deployment pipeline",
      },
      {
        name: "Custom Plugins",
        description: "Build and deploy custom extensions",
      },
    ],
  },
  {
    title: "Collaboration",
    description: "Work together seamlessly across teams",
    icon: CustomerSupportIcon,
    features: [
      {
        name: "Team Workspaces",
        description: "Shared spaces for team collaboration",
      },
      {
        name: "Real-time Editing",
        description: "Edit components simultaneously",
      },
      {
        name: "Version History",
        description: "Track and restore previous versions",
      },
      {
        name: "Code Reviews",
        description: "Built-in review and approval workflow",
      },
      {
        name: "Comments & Feedback",
        description: "Leave inline comments on components",
      },
      {
        name: "Dedicated Manager",
        description: "Personal account manager for support",
      },
    ],
  },
  {
    title: "Analytics",
    description: "Insights to optimize your design system",
    icon: Analytics01Icon,
    features: [
      { name: "Usage Metrics", description: "Track component adoption rates" },
      {
        name: "Performance Reports",
        description: "Monitor bundle size and load times",
      },
      {
        name: "Custom Dashboards",
        description: "Build personalized analytics views",
      },
      {
        name: "Accessibility Audits",
        description: "Automated WCAG compliance checks",
      },
      {
        name: "Predictive Insights",
        description: "AI-powered usage predictions",
      },
    ],
  },
];

const defaultPlans: Plan[] = [
  {
    name: "Starter",
    icon: Rocket01Icon,
    features: {
      "Component Library": true,
      "Design Tokens": "50 tokens",
      "Figma Integration": true,
      "Theme Builder": true,
      "Dark Mode": false,
      "White Labeling": false,
      "CLI Tools": true,
      "TypeScript Support": false,
      "Code Generation": false,
      "API Access": false,
      "CI/CD Integration": false,
      "Custom Plugins": false,
      "Team Workspaces": false,
      "Real-time Editing": false,
      "Version History": true,
      "Code Reviews": false,
      "Comments & Feedback": true,
      "Dedicated Manager": false,
      "Usage Metrics": false,
      "Performance Reports": false,
      "Custom Dashboards": false,
      "Accessibility Audits": false,
      "Predictive Insights": false,
    },
    cta: { label: "Get Started", href: "#", variant: "outline" },
  },
  {
    name: "Pro",
    icon: DiamondIcon,
    isHighlighted: true,
    features: {
      "Component Library": true,
      "Design Tokens": "500 tokens",
      "Figma Integration": true,
      "Theme Builder": true,
      "Dark Mode": true,
      "White Labeling": false,
      "CLI Tools": true,
      "TypeScript Support": true,
      "Code Generation": "100/mo",
      "API Access": true,
      "CI/CD Integration": true,
      "Custom Plugins": false,
      "Team Workspaces": true,
      "Real-time Editing": true,
      "Version History": "30 days",
      "Code Reviews": "5 reviewers",
      "Comments & Feedback": true,
      "Dedicated Manager": false,
      "Usage Metrics": true,
      "Performance Reports": true,
      "Custom Dashboards": "5 dashboards",
      "Accessibility Audits": false,
      "Predictive Insights": false,
    },
    cta: { label: "Start Free Trial", href: "#", variant: "primary" },
  },
  {
    name: "Enterprise",
    icon: CrownIcon,
    features: {
      "Component Library": true,
      "Design Tokens": "Unlimited",
      "Figma Integration": true,
      "Theme Builder": true,
      "Dark Mode": true,
      "White Labeling": true,
      "CLI Tools": true,
      "TypeScript Support": true,
      "Code Generation": "Unlimited",
      "API Access": true,
      "CI/CD Integration": true,
      "Custom Plugins": true,
      "Team Workspaces": true,
      "Real-time Editing": true,
      "Version History": "Unlimited",
      "Code Reviews": "Unlimited",
      "Comments & Feedback": true,
      "Dedicated Manager": true,
      "Usage Metrics": true,
      "Performance Reports": true,
      "Custom Dashboards": "Unlimited",
      "Accessibility Audits": true,
      "Predictive Insights": true,
    },
    cta: { label: "Contact Sales", href: "#", variant: "outline" },
  },
];

// Feature value display component
function FeatureValueCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return <div>{value}</div>;
  }

  if (value) {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-foreground/[0.065] text-foreground/65">
      <HugeiconsIcon icon={Cancel01Icon} size={10} strokeWidth={2} />
    </span>
  );
}

export default function PricingFeatureMatrix({
  categories = defaultCategories,
  plans = defaultPlans,
  className,
}: PricingFeatureMatrixProps) {
  // Flatten all features from all categories
  const allFeatures = categories.flatMap((category) => category.features);

  return (
    <div className={cn("mx-auto max-w-5xl md:px-6", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* Features Column */}
        <div>
          {/* Header */}
          <div className="bg-background sticky top-0 z-[1] flex h-18 items-end gap-1.5 border-b px-6 py-2 max-md:hidden">
            <div className="text-muted-foreground text-sm font-medium">
              Features
            </div>
          </div>

          {/* Feature Rows */}
          {allFeatures.map((feature, idx) => (
            <div
              key={feature.name}
              className={cn(
                "text-muted-foreground flex h-14 items-center border-t px-6 md:border-l",
                idx === allFeatures.length - 1 &&
                  "h-[calc(3.5rem+1px)] border-b",
              )}
            >
              <div className="text-sm">{feature.name}</div>
              {feature.description && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1.5 flex size-7 items-center justify-center">
                        <span className="bg-foreground/10 text-foreground/65 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
                          ?
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      {feature.description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))}
        </div>

        {/* Plan Columns */}
        <div className="grid md:col-span-3 md:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <div key={plan.name} className="group">
              <div
                data-plan={plan.name.toLowerCase()}
                className={cn(
                  plan.isHighlighted &&
                    "relative z-[1] md:bg-card md:ring-border md:shadow-black/[0.065] md:shadow-xl md:ring-1",
                )}
              >
                {/* Plan Header */}
                <div
                  className={cn(
                    "bg-background sticky top-0 z-10 flex h-18 flex-col items-center justify-center gap-1.5 border-b px-4 pt-2 text-center max-md:hidden lg:px-8",
                    plan.isHighlighted && "bg-card",
                  )}
                >
                  <HugeiconsIcon icon={plan.icon} size={16} strokeWidth={1.5} />
                  <div className="text-sm font-medium">{plan.name}</div>
                </div>

                {/* Feature Values */}
                {allFeatures.map((feature, idx) => (
                  <div
                    key={feature.name}
                    className={cn(
                      "flex h-14 items-center justify-center border-t px-6 text-sm max-md:border-l",
                      idx === allFeatures.length - 1 &&
                        "h-[calc(3.5rem+1px)] border-b",
                      planIdx === plans.length - 1 && "md:border-r",
                    )}
                  >
                    <FeatureValueCell value={plan.features[feature.name]} />
                  </div>
                ))}

                {/* CTA Button */}
                <div className="flex h-20 items-center justify-center px-4 text-sm max-md:hidden lg:px-6">
                  <a
                    href={plan.cta.href}
                    className={cn(
                      "inline-flex h-8 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 lg:w-full",
                      plan.cta.variant === "primary"
                        ? "shadow-md border-[0.5px] border-white/10 shadow-black/15 bg-primary ring-1 ring-[color-mix(in_oklab,black_15%,var(--color-primary))] dark:border-transparent dark:ring-[color-mix(in_oklab,white_15%,var(--color-primary))] text-primary-foreground hover:bg-primary/90"
                        : "shadow-sm shadow-black/10 border border-transparent bg-card ring-1 ring-foreground/10 duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50",
                    )}
                  >
                    {plan.cta.label}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
