"use client";

import {
  Activity,
  ArrowRight,
  Files,
  Flower,
  GalleryVerticalEnd,
  MapPin,
} from "lucide-react";
import DottedMap from "dotted-map";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import RuixenFeaturedMessageCard from "@/registry/ruixenui/ruixen-featured-message-card";

export default function CompositeFeatureShowcase() {
  const featuredCasestudy = {
    logo: "/ruixen_dark.png",
    company: "Ruixen",
    tags: "Enterprise",
    title: "How we scaled to 1M+ users",
    subtitle:
      "without a single second of downtime, using smart architecture and real-time monitoring",
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6">
        {/* 1. MAP - Top Left */}
        <div className="relative rounded-none overflow-hidden bg-muted border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4" />
            Ruixen Analytics
          </div>
          <h3 className="text-xl font-normal text-gray-900 dark:text-white">
            Visualize user activity across regions.{" "}
            <span className="text-gray-500 dark:text-gray-400">
              Track, analyze, and optimize geographically.
            </span>
          </h3>

          <div className="relative mt-4">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white dark:bg-black text-black dark:text-white rounded-md text-xs font-medium shadow flex items-center gap-2">
              🌍 Last connection from US
            </div>
            <Map />
          </div>
        </div>

        {/* 2. FEATURED CASE STUDY BLOCK - Top Right */}
        <div className="flex flex-col justify-between gap-4 p-6 rounded-none border border-gray-200 dark:border-gray-800 bg-card">
          <div>
            <span className="text-xs flex items-center gap-2 text-sm text-gray-500">
              <GalleryVerticalEnd className="w-4 h-4" />{" "}
              {featuredCasestudy.tags}
            </span>
            <h3 className="text-xl font-normal text-gray-900 dark:text-white">
              {featuredCasestudy.title}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {featuredCasestudy.subtitle}
              </span>
            </h3>
          </div>
          <div className="flex justify-center items-center w-full">
            <RuixenFeaturedMessageCard />
          </div>
        </div>

        {/* 3. CHART - Bottom Left */}
        <div className="rounded-none border border-gray-200 dark:border-gray-800 bg-muted p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Activity className="w-4 h-4" />
            Ruixen Analytics
          </div>
          <h3 className="text-xl font-normal text-gray-900 dark:text-white">
            Real-time performance tracking for Ruixen.{" "}
            <span className="text-gray-500 dark:text-gray-400">
              Optimize your UI decisions instantly.
            </span>
          </h3>
          <MonitoringChart />
        </div>

        {/* 4. ALL FEATURE CARDS - Bottom Right */}
        <div className="grid sm:grid-cols-2 rounded-none bg-card">
          <FeatureCard
            icon={<Files className="w-4 h-4" />}
            image="/1.png"
            title="Ready to use blocks"
            subtitle="Copy & Paste"
            description="Plug-n-play UI blocks you can drop right into any project."
          />
          <FeatureCard
            icon={<Flower className="w-4 h-4" />}
            image="/2.png"
            title="Customize with ease"
            subtitle="Easy to Use"
            description="Design your layout exactly the way you want with full flexibility."
          />
        </div>
      </div>
    </section>
  );
}

// ----------------- Feature Card Component -------------------
function FeatureCard({
  icon,
  image,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="relative flex flex-col gap-3 p-4 border border-gray-200 dark:border-gray-800 bg-background transition">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs flex items-center gap-2 text-sm text-gray-500 mb-4">
            {icon}
            {title}
          </span>
          <h3 className="text-lg font-normal text-gray-900 dark:text-white">
            {subtitle}{" "}
            <span className="text-gray-500 dark:text-gray-400">
              {description}
            </span>
          </h3>
        </div>
      </div>

      {/* Card pinned to bottom right */}
      <Card className="absolute bottom-0 right-0 w-64 h-48 border-8 border-r-0 border-b-0 rounded-tl-xl overflow-hidden" />

      {/* Arrow icon */}
      <div className="absolute bottom-2 right-2 p-3 flex items-center gap-2 border border-gray-200 dark:border-gray-800 rounded-full hover:-rotate-45 transition z-10 bg-background">
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
}

// ----------------- Map -------------------
const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const Map = () => (
  <svg
    viewBox="0 0 120 60"
    className="w-full h-auto text-primary/70 dark:text-white/30"
  >
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
    ))}
  </svg>
);

// ----------------- Chart -------------------
const chartData = [
  { month: "May", desktop: 56, mobile: 224 },
  { month: "June", desktop: 90, mobile: 300 },
  { month: "July", desktop: 126, mobile: 252 },
  { month: "Aug", desktop: 205, mobile: 410 },
  { month: "Sep", desktop: 200, mobile: 126 },
  { month: "Oct", desktop: 400, mobile: 800 },
];

const chartConfig = {
  desktop: {
    label: "Ruixen Dashboard (Desktop)",
    color: "#2563eb",
  },
  mobile: {
    label: "Ruixen App (Mobile)",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function MonitoringChart() {
  return (
    <ChartContainer className="h-60 aspect-auto" config={chartConfig}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <XAxis hide />
        <YAxis hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="dark:bg-muted" />}
        />
        <Area
          strokeWidth={2}
          dataKey="mobile"
          type="monotone"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
        />
        <Area
          strokeWidth={2}
          dataKey="desktop"
          type="monotone"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
