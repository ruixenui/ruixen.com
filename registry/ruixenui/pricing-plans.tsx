"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Pricing_Plans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      label: "SPRINT",
      labelColor: "bg-yellow-100 text-yellow-700",
      title: "One-Time Setup",
      price: "$1,999",
      type: "one-time",
      button: "Send Proposal",
      description:
        "Ideal for validating your core product idea with essential design and development—fast.",
      features: [
        "2-3 core features implemented",
        "Built using Ruixen Open Source Starter Kit",
        "Basic UI/UX customization",
        "Fully responsive components",
        "Timeline: 2–4 weeks",
      ],
    },
    {
      label: "PRO",
      labelColor: "bg-indigo-100 text-indigo-700",
      title: "Monthly Subscription",
      price: billing === "monthly" ? "$499" : "$4999",
      type: billing,
      popular: true,
      button: billing === "monthly" ? "Start Monthly" : "Start Yearly",
      description:
        "Best for scaling teams needing consistent design & dev with premium Ruixen UI components.",
      features: [
        "Full access to Ruixen UI library",
        "Unlimited website components",
        "Priority support & updates",
        "Integration help (Next.js, Remix, etc.)",
        "SEO-optimized templates",
        "Ongoing performance improvements",
      ],
    },
    {
      label: "ENTERPRISE",
      labelColor: "bg-emerald-100 text-emerald-700",
      title: "Custom Solutions",
      price: "Custom",
      type: "",
      button: "Contact Us",
      description:
        "Tailored for large teams needing full-stack design, dev, & deployment support using Ruixen stack.",
      features: [
        "Dedicated solution architect",
        "Design + Dev + Hosting consultation",
        "Custom workflows & dashboards",
        "Migration from legacy UIs",
        "AI-powered UI integrations",
        "Training + Onboarding",
      ],
    },
  ];

  const [period, setPeriod] = useState(0);
  const handleChangePeriod = (index: number) => {
    setPeriod(index);
    if (index === 0) {
      setBilling("monthly");
    } else {
      setBilling("yearly");
    }
  };

  return (
    <section className="py-20 bg-background text-foreground px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
          Pricing Plans for Every Stage
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
          Whether you&#39;re launching or scaling, Ruixen UI supports your
          journey with expertly crafted UI &amp; services.
        </p>

        <div className="rounded-full relative w-52 mx-auto my-5 border p-1.5 flex items-center">
          <button
            className="font-semibold rounded-full w-full p-1.5 text-slate-800 dark:text-gray-100 z-20"
            onClick={() => handleChangePeriod(0)}
          >
            Monthly
          </button>
          <button
            className="font-semibold rounded-full w-full p-1.5 text-slate-800 dark:text-gray-100 z-20"
            onClick={() => handleChangePeriod(1)}
          >
            Yearly
          </button>
          <div
            className="p-1.5 flex items-center justify-center absolute inset-0 w-1/2 z-10"
            style={{
              transform: `translateX(${period * 100}%)`,
              transition: "transform 0.3s",
            }}
          >
            <div className="bg-white dark:bg-zinc-900 border border-gray-500 shadow-sm rounded-full w-full h-full"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`rounded-xl border border-muted bg-white dark:bg-zinc-900 text-black dark:text-white p-4 sm:p-6 flex flex-col ${
              plan.popular ? "ring-2 ring-primary shadow-md" : ""
            }`}
          >
            <div className="mb-4">
              <span
                className={`text-xs uppercase font-semibold px-2 py-1 rounded ${plan.labelColor}`}
              >
                {plan.label}
              </span>
            </div>

            <div className="text-3xl font-bold">
              {plan.price}
              {plan.type && (
                <span className="text-sm font-medium text-muted-foreground ml-1">
                  /{plan.type}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {plan.description}
            </p>

            <button className="mt-6 bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition border border-gray-600 dark:border-gray-700">
              {plan.button}
            </button>

            <div className="mt-6">
              <p className="text-sm font-semibold mb-4">What&#39;s included:</p>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 mt-1 text-green-500 dark:text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
