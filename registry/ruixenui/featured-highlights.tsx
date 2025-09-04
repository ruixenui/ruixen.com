"use client";

import { useState } from "react";
import Image from "next/image";
import { Atom } from "lucide-react";

export interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface FeaturedHighlightsProps {
  heading?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Lead Management",
    image: "/image/feature-01.jpg",
    description:
      "Track, prioritize, and manage leads efficiently with an intuitive dashboard to close deals faster and boost sales conversions.",
  },
  {
    id: 2,
    title: "Automated Workflows",
    image: "/image/feature-02.jpg",
    description:
      "Automate repetitive tasks like email follow-ups and lead assignments to streamline your business processes and save time.",
  },
  {
    id: 3,
    title: "Real-Time Analytics",
    image: "/image/feature-03.jpg",
    description:
      "Monitor sales performance, team productivity, and customer behavior with powerful dashboards and real-time insights.",
  },
  {
    id: 4,
    title: "Customer 360° View",
    image: "/image/feature-04.jpg",
    description:
      "Get a complete view of every customer — from contact details and communication history to purchase behavior and feedback.",
  },
];

export default function FeaturedHighlights({
  heading = "Powerful Features to Accelerate Your Workflow",
  features = defaultFeatures,
}: FeaturedHighlightsProps) {
  const [activeId, setActiveId] = useState<number>(features[0].id);
  const activeFeature = features.find((f) => f.id === activeId);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl text-left">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features List */}
          <ul className="space-y-4">
            {features.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <li
                  key={feature.id}
                  onClick={() => setActiveId(feature.id)}
                  className={`group flex items-start gap-3 p-3 border-b border-gray-300 dark:border-gray-700 cursor-pointer transition-all duration-300 transform rounded-lg ${
                    isActive
                      ? "bg-muted text-primary shadow-md scale-[1.02] -translate-y-1"
                      : "hover:shadow-sm hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className="w-6 h-6 flex-shrink-0"
                    style={{
                      transform: isActive ? "rotateY(0deg)" : "rotateY(90deg)",
                      opacity: isActive ? 1 : 0,
                      transition: "transform 0.4s ease, opacity 0.4s ease",
                    }}
                  >
                    {isActive && (
                      <div className="w-5 h-5">
                        <Atom
                          className="w-full h-full"
                          style={{ stroke: "url(#grad)" }}
                        />
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient
                              id="grad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="50%" stopColor="#a855f7" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3
                      className={`text-md font-semibold mb-1 transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-gray-800 dark:text-gray-200 group-hover:text-primary"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Image Preview */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-black">
            {activeFeature && (
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-cover transition-all duration-500 bg-gray-50 dark:bg-black blur-xs"
                priority
                unoptimized
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
