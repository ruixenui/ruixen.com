"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type PlanType = "monthly" | "annually";

export interface PLAN {
  id: string;
  title: string;
  desc: string;
  monthlyPrice: number;
  annuallyPrice: number;
  badge?: string;
  buttonText: string;
  features: string[];
  link: string;
}

interface PricingFlowProps {
  plans?: PLAN[];
  defaultBillPlan?: PlanType;
}

export const DEFAULT_PLANS: PLAN[] = [
  {
    id: "starter",
    title: "Starter",
    desc: "Ideal for developers and indie hackers building with Ruixen UI for personal or small commercial projects.",
    monthlyPrice: 29,
    annuallyPrice: 306,
    buttonText: "Get Starter Access",
    features: [
      "Access to 50+ UI components",
      "Tailwind-compatible styling",
      "Basic theming support",
      "Starter templates (blog, dashboard)",
      "1 project license",
      "Community support",
      "Early access to updates",
    ],
    link: "#",
  },
  {
    id: "pro",
    title: "Pro",
    desc: "Designed for teams and startups who need advanced UI components, theme customization, and premium support.",
    monthlyPrice: 79,
    annuallyPrice: 834,
    badge: "Best Value",
    buttonText: "Upgrade to Pro",
    features: [
      "Access to 100+ production-grade components",
      "Advanced theming & dark mode",
      "Code snippets & layout presets",
      "Figma design system access",
      "Commercial use for up to 10 projects",
      "Priority GitHub issue support",
      "Team collaboration tools",
    ],
    link: "#",
  },
];

export default function PricingFlow({
  plans = DEFAULT_PLANS,
  defaultBillPlan = "monthly",
}: PricingFlowProps) {
  const [billPlan, setBillPlan] = useState<PlanType>(defaultBillPlan);

  const handleSwitch = () => {
    setBillPlan((prev) => (prev === "monthly" ? "annually" : "monthly"));
  };

  return (
    <div className="relative flex flex-col items-center justify-center max-w-5xl py-20 mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Pricing</h2>
        <p className="text-base md:text-lg text-accent-foreground/80">
          Streamline your creative process with AI. Generate, manage, and
          publish content — all in one place.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <span className="text-base font-medium">Monthly</span>
          <button
            onClick={handleSwitch}
            className="relative rounded-full focus:outline-none"
          >
            <div className="w-12 h-6 transition rounded-full shadow-md bg-blue-500"></div>
            <div
              className={cn(
                "absolute inline-flex items-center justify-center w-4 h-4 transition-all duration-500 ease-in-out top-1 left-1 rounded-full bg-white",
                billPlan === "annually" ? "translate-x-6" : "translate-x-0",
              )}
            />
          </button>
          <span className="text-base font-medium">Annually</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billPlan={billPlan} />
        ))}
      </div>
    </div>
  );
}

const PlanCard = ({ plan, billPlan }: { plan: PLAN; billPlan: PlanType }) => {
  const price = billPlan === "monthly" ? plan.monthlyPrice : plan.annuallyPrice;
  const suffix = billPlan === "monthly" ? "/mo" : "/yr";

  return (
    <div
      className={cn(
        "flex flex-col relative rounded-2xl lg:rounded-3xl bg-background border border-foreground/10 overflow-hidden",
        plan.badge ? "border-blue-500" : "",
      )}
    >
      {/* Badge Glow */}
      {plan.badge && (
        <div className="absolute top-1/2 inset-x-0 mx-auto h-12 -rotate-45 w-full bg-blue-600 rounded-2xl lg:rounded-3xl blur-[8rem] -z-10"></div>
      )}

      {/* Header */}
      <div className="p-6 md:p-8 flex flex-col items-start w-full">
        <h2 className="font-medium text-xl text-foreground">{plan.title}</h2>
        <h3 className="mt-3 text-2xl font-bold md:text-5xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              ${price}{suffix}
            </motion.span>
          </AnimatePresence>
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          {plan.desc}
        </p>
      </div>

      {/* Button & Billing */}
      <div className="flex flex-col items-start w-full px-6 pb-4">
        <Button size="lg" className="w-full">
          <a href={plan.link}>{plan.buttonText}</a>
        </Button>
        <div className="h-8 overflow-hidden w-full mt-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={billPlan}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-sm text-muted-foreground block text-center w-full"
            >
              {billPlan === "monthly" ? "Billed monthly" : "Billed annually"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col items-start w-full px-6 py-4 gap-y-2">
        <span className="text-base text-left mb-2">Includes:</span>
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
