"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Plan {
  title: string;
  price: string;
  billing: string;
  features: string[];
  button: string;
  recommended?: boolean;
}

interface SubscriptionPlansProps {
  plans?: Plan[];
}

const defaultPlans: Plan[] = [
  {
    title: "Starter Pack - Yearly Subscription",
    price: "$19",
    billing: "charged annually",
    features: [
      "Includes 40+ UI components and patterns",
      "Access to 3 production-ready templates",
      "License for personal and freelance projects",
      "Continue using components after subscription ends",
    ],
    button: "Subscribe for a Year",
  },
  {
    title: "Pro Pack - Lifetime Access",
    price: "$39",
    billing: "one-time fee",
    recommended: true,
    features: [
      "Includes 40+ UI components and patterns",
      "3 production templates built with React & Tailwind",
      "Commercial license for client work",
      "Lifetime usage with no renewals",
      "Free access to all future updates and additions",
    ],
    button: "Buy Lifetime Access",
  },
  {
    title: "Enterprise Pack",
    price: "$59",
    billing: "single payment",
    features: [
      "Everything from the Pro plan",
      "Up to 20 team members included",
      "Priority support & onboarding help",
    ],
    button: "Get Enterprise Plan",
  },
];

export default function SubscriptionPlans({
  plans = defaultPlans,
}: SubscriptionPlansProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Top 2 Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {plans.slice(0, 2).map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col rounded-none shadow-lg hover:shadow-xl transition-all duration-300 ${
              plan.recommended
                ? "border-4 border-green-200 shadow-2xl"
                : "border"
            }`}
          >
            <CardContent className="p-6 flex flex-col gap-5 flex-1">
              {plan.recommended && (
                <span className="text-sm font-medium text-green-600">
                  Recommended
                </span>
              )}
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.title}
                </h3>
                <p className="text-4xl font-extrabold mt-2 text-foreground">
                  {plan.price}
                </p>
                <p className="text-sm text-muted-foreground">{plan.billing}</p>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[15px]">
                    <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full mt-4" asChild>
                <Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">
                  {plan.button}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Enterprise Plan */}
      {plans[2] && (
        <div className="grid grid-cols-1 relative">
          <Card className="rounded-none shadow-lg border hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex flex-col gap-5">
              <h3 className="text-2xl font-bold text-foreground">
                {plans[2].title}
              </h3>
              <p className="text-4xl font-extrabold mt-2 text-foreground">
                {plans[2].price}
              </p>
              <p className="text-sm text-muted-foreground">
                {plans[2].billing}
              </p>
              <ul className="space-y-3 mt-2">
                {plans[2].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[15px]">
                    <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4">
                <Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">
                  {plans[2].button}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
