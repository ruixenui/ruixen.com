"use client";

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { LucideIcon, LayoutDashboard, Rocket, Lightbulb } from "lucide-react";

export interface FeatureTabItem {
  icon: LucideIcon;
  title: string;
  description: string;
  isNew?: boolean;
  backgroundPositionX: number;
  backgroundPositionY: number;
  backgroundSizeX: number;
}

export interface FeatureTabsShowcaseProps {
  heading?: string;
  subtitle?: string;
  tabs?: FeatureTabItem[];
  backgroundImage?: string;
}

const defaultTabs: FeatureTabItem[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description:
      "A centralized space to monitor your site’s SEO health, traffic, and performance trends in real-time.",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: Rocket,
    title: "Boost with One Click",
    description:
      "Easily apply SEO best practices like lazy loading, alt-text fixes, and meta updates without writing code.",
    isNew: false,
    backgroundPositionX: 80,
    backgroundPositionY: 90,
    backgroundSizeX: 135,
  },
  {
    icon: Lightbulb,
    title: "AI Keyword Suggestions",
    description:
      "Discover trending, high-intent keywords tailored to your content niche using Ruixen’s smart AI engine.",
    isNew: true,
    backgroundPositionX: 120,
    backgroundPositionY: 30,
    backgroundSizeX: 170,
  },
];

const FeatureTab = (
  props: FeatureTabItem &
    ComponentPropsWithoutRef<"div"> & { selected: boolean },
) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const xPercent = useMotionValue(100);
  const yPercent = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(100px 50px at ${xPercent}% ${yPercent}%, black, transparent)`;

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;

    xPercent.set(0);
    yPercent.set(0);
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];
    animate(xPercent, [0, 100, 100, 0, 0], {
      duration: 4,
      times,
      ease: "linear",
      repeat: Infinity,
    });
    animate(yPercent, [0, 0, 100, 100, 0], {
      duration: 4,
      times,
      ease: "linear",
      repeat: Infinity,
    });
  }, [props.selected, xPercent, yPercent]);

  return (
    <div
      ref={tabRef}
      className="border border-gray-200 dark:border-gray-800 rounded-lg flex items-center gap-1 pr-4 py-1 relative cursor-pointer"
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-lg"
        />
      )}
      <div className="h-8 w-8 px-2 py-1 rounded-lg ml-3 inline-flex items-center justify-center">
        <props.icon />
      </div>
      <div className="text-sm font-normal">{props.title}</div>
      {props.isNew && (
        <div className="ml-2 bg-purple-400 rounded-lg text-black px-2 py-0.5 font-semibold text-xs">
          new
        </div>
      )}
    </div>
  );
};

export default function FeatureTabsShowcase({
  heading = "Supercharge your content with Ruixen UI.",
  subtitle = "Ruixen UI helps you craft, plan, and publish content effortlessly—powered by AI and built for scale.",
  tabs = defaultTabs,
  backgroundImage = "/dashboard-01-dark.png",
}: FeatureTabsShowcaseProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

  const handleSelecttab = (index: number) => {
    setSelectedTab(index);
    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
      {
        duration: 2,
        ease: "easeInOut",
      },
    );
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],
      {
        duration: 2,
        ease: "easeInOut",
      },
    );
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],
      {
        duration: 2,
        ease: "easeInOut",
      },
    );
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="text-5xl lg:text-7xl font-medium text-center tracking-tighter">
          {heading}
        </h2>
        <p className="text-gray-500 text-lg md:text-xl text-center tracking-tight mt-5 max-w-3xl mx-auto">
          {subtitle}
        </p>

        <div className="relative mt-10 flex justify-center">
          <div className="flex flex-col lg:flex-row gap-5">
            {tabs.map((tab, tabIndex) => (
              <FeatureTab
                {...tab}
                key={tab.title}
                selected={selectedTab === tabIndex}
                onClick={() => handleSelecttab(tabIndex)}
              />
            ))}
          </div>
        </div>

        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-2.5 mt-10">
          <motion.div
            className="aspect-video bg-cover border border-gray-200 dark:border-gray-800 rounded-lg"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
