"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export function PricingSectionVertical() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "For individuals getting started",
      features: [
        "1 website project",
        "Email support",
        "Basic analytics dashboard",
        "Community access",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For growing businesses",
      features: [
        "5 active projects",
        "Priority email support",
        "SEO optimization tools",
        "Content scheduling system",
        "Advanced analytics",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large teams and enterprises",
      features: [
        "Unlimited projects",
        "Dedicated success manager",
        "Custom integrations",
        "24/7 live support",
        "Enterprise-grade security",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="w-full bg-background text-foreground py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* LEFT SIDE */}
        <div className="space-y-14">
          {/* Overview */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Services
            </h4>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Choose a plan that fits your growth.
            </h2>
            <p className="text-muted-foreground mb-4">
              Scale your digital presence with flexible pricing — from startups
              to enterprises, we’ve got you covered with transparent,
              value-driven plans.
            </p>
            <div className="flex items-center gap-2 border rounded-md w-fit px-3 py-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              All plans include onboarding and consultation.
            </div>
          </div>

          <Separator className="my-8" />

          {/* Tailored Section */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Custom Solutions
            </h4>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Looking for something specific?
            </h2>
            <p className="text-muted-foreground">
              Get in touch for customized strategies, integrations, or
              enterprise-level support built around your unique business goals.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Support */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Support
            </h4>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Continuous optimization
            </h2>
            <p className="text-muted-foreground">
              We provide ongoing performance reviews, campaign improvements, and
              dedicated assistance to help your brand reach its full potential.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (Pricing Cards) */}
        <div className="grid gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border border-muted shadow-sm hover:shadow-md transition-all rounded-xl ${
                plan.highlight ? "border-primary shadow-lg" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">
                      {plan.period}
                    </span>
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-6"
                  variant={plan.highlight ? "default" : "secondary"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
