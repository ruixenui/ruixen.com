"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/grid-card";

export interface FeatureGridItem {
  title: string;
  description: string;
  iconLight?: string; // optional custom light icon
  iconDark?: string; // optional custom dark icon
}

export interface FeatureGridSectionProps {
  heading?: string;
  subtitle?: string;
  features?: FeatureGridItem[];
}

const defaultFeatures: FeatureGridItem[] = [
  {
    title: "Seamless Shopping",
    description:
      "Deliver a smooth shopping experience with intuitive navigation, fast checkout, and personalized product recommendations.",
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Automate shipping workflows and provide real-time tracking to keep your customers informed and satisfied.",
  },
  {
    title: "Secure Payments",
    description:
      "Accept payments confidently with integrated fraud protection and compliance with industry standards.",
  },
  {
    title: "Business Automation",
    description:
      "Automate repetitive business tasks and optimize workflows to boost efficiency and reduce manual effort.",
  },
];

export default function FeatureGridSection({
  heading = "Key Platform Features",
  subtitle = "Explore how our platform supports your business growth and customer satisfaction.",
  features = defaultFeatures,
}: FeatureGridSectionProps) {
  return (
    <section className="max-w-5xl mx-auto relative py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-black text-gray-800 dark:text-gray-100 overflow-hidden">
      <div className="mx-auto text-center mb-12 z-10">
        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className={cn(
              "relative border border-blue-100 dark:border-blue-900 bg-white dark:bg-zinc-900 shadow-md transition-colors p-0 rounded-none",
            )}
            variant="plus"
          >
            {/* SVG Grid Background with Fade */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 20%, transparent 100%)",
              }}
            >
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id={`grid-pattern-${idx}`}
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 100 0 L 0 0 0 100"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#grid-pattern-${idx})`}
                />
              </svg>
            </div>

            {/* Card Content */}
            <CardContent className="relative z-10 p-6 flex flex-col items-center text-center gap-4 w-full min-h-[260px]">
              <div className="relative">
                <Image
                  src={feature.iconLight || "/ruixen_dark.png"}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="rounded-full block dark:hidden"
                />
                <Image
                  src={feature.iconDark || "/ruixen_light.png"}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="rounded-full hidden dark:block"
                />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
