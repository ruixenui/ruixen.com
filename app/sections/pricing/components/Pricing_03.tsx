"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export const codeStringPricing_03 = `"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const plans = [
  {
    title: "Starter Pack - Yearly Subscription",
    price: "$19",
    billing: "charged annually",
    features: [
      "Includes 40+ UI components and patterns",
      "Access to 3 production-ready templates",
      "License for personal and freelance projects",
      "Continue using components after subscription ends"
    ],
    button: "Subscribe for a Year"
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
      "Free access to all future updates and additions"
    ],
    button: "Buy Lifetime Access"
  },
  {
    title: "Enterprise Pack",
    price: "$59",
    billing: "single payment",
    features: [
      "Everything from the Pro plan",
      "Up to 20 team members included",
      "Priority support & onboarding help"
    ],
    button: "Get Enterprise Plan"
  }
];

export default function Pricing_03() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
        {plans.slice(0, 2).map((plan, index) => (
          <Card
            key={index}
            className={\`flex flex-col rounded-none shadow-lg hover:shadow-xl transition-all duration-300 \${plan.recommended ? "border-4 border-green-200 shadow-2xl" : "border"}\`}
          >
            <CardContent className="p-6 flex flex-col gap-5 flex-1">
              {plan.recommended && (
                <span className="text-sm font-medium text-green-600">Recommended</span>
              )}
              <div>
                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                <p className="text-4xl font-extrabold mt-2 text-foreground">{plan.price}</p>
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
              <div className="relative w-full">
                {/* {plan.price == "$199" && <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />} */}
                <Button className="w-full relative z-[1] mt-4">{plan.button}</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="relative grid grid-cols-1 mt-10">
        <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
        <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
        <Card className="rounded-none shadow-lg border hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-foreground">{plans[2].title}</h3>
            <p className="text-4xl font-extrabold mt-2 text-foreground">{plans[2].price}</p>
            <p className="text-sm text-muted-foreground">{plans[2].billing}</p>
            <ul className="space-y-3 mt-2">
              {plans[2].features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[15px]">
                  <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="relative w-full mx-auto mt-4">
              <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl opacity-60" />
              <Button className="w-full relative z-[1]">{plans[2].button}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
`;


const plans = [
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

export default function Pricing_03() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="relative grid grid-cols-1 md:grid-cols-2">
                <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                {plans.slice(0, 2).map((plan, index) => (
                    <Card
                        key={index}
                        className={`flex flex-col rounded-none shadow-lg hover:shadow-xl transition-all duration-300 ${plan.recommended ? "border-4 border-green-200 shadow-2xl" : "border"
                            }`}
                    >
                        <CardContent className="p-6 flex flex-col gap-5 flex-1">
                            {plan.recommended && (
                                <span className="text-sm font-medium text-green-600">Recommended</span>
                            )}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                                <p className="text-4xl font-extrabold mt-2 text-foreground">{plan.price}</p>
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
                            <div className="relative w-full">
                                {/* {plan.price == "$199" && <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />} */}
                                    <Button className="w-full relative z-[1] mt-4" asChild>
                                        <Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">{plan.button}</Link>
                                    </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="relative grid grid-cols-1">
                <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <Card className="rounded-none shadow-lg border hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex flex-col gap-5">
                        <h3 className="text-2xl font-bold text-foreground">{plans[2].title}</h3>
                        <p className="text-4xl font-extrabold mt-2 text-foreground">{plans[2].price}</p>
                        <p className="text-sm text-muted-foreground">{plans[2].billing}</p>
                        <ul className="space-y-3 mt-2">
                            {plans[2].features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[15px]">
                                    <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative w-full mx-auto">
                            <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />
                            <Button className="w-full relative z-[1]"><Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">
                                {plans[2].button}</Link></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
