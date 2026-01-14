"use client";

import {
  StreamChart,
  StreamLegendChart,
  StreamExpandedChart,
  StreamInteractiveChart,
  StreamSilhouetteChart,
  StreamStackedChart,
  StreamDataItem,
} from "@/registry/ruixenui/stream-chart";

const trafficData: StreamDataItem[] = [
  { name: "Jan", Desktop: 4000, Mobile: 2400, Tablet: 1800 },
  { name: "Feb", Desktop: 3000, Mobile: 1398, Tablet: 2210 },
  { name: "Mar", Desktop: 2000, Mobile: 9800, Tablet: 2290 },
  { name: "Apr", Desktop: 2780, Mobile: 3908, Tablet: 2000 },
  { name: "May", Desktop: 1890, Mobile: 4800, Tablet: 2181 },
  { name: "Jun", Desktop: 2390, Mobile: 3800, Tablet: 2500 },
  { name: "Jul", Desktop: 3490, Mobile: 4300, Tablet: 2100 },
];

const revenueData: StreamDataItem[] = [
  { name: "Q1", Products: 12000, Services: 8000, Subscriptions: 5000 },
  { name: "Q2", Products: 15000, Services: 10000, Subscriptions: 7000 },
  { name: "Q3", Products: 18000, Services: 12000, Subscriptions: 9000 },
  { name: "Q4", Products: 22000, Services: 15000, Subscriptions: 12000 },
];

const usersData: StreamDataItem[] = [
  { name: "Mon", Active: 120, Inactive: 80, New: 40 },
  { name: "Tue", Active: 150, Inactive: 70, New: 55 },
  { name: "Wed", Active: 180, Inactive: 60, New: 70 },
  { name: "Thu", Active: 200, Inactive: 50, New: 85 },
  { name: "Fri", Active: 220, Inactive: 45, New: 95 },
  { name: "Sat", Active: 250, Inactive: 40, New: 110 },
  { name: "Sun", Active: 190, Inactive: 55, New: 75 },
];

const salesData: StreamDataItem[] = [
  { name: "Week 1", Online: 5000, Retail: 3000, Wholesale: 2000 },
  { name: "Week 2", Online: 6000, Retail: 3500, Wholesale: 2500 },
  { name: "Week 3", Online: 5500, Retail: 4000, Wholesale: 2200 },
  { name: "Week 4", Online: 7000, Retail: 4500, Wholesale: 3000 },
];

export default function StreamChartDemo() {
  return (
    <div className="w-full space-y-8 p-10">
      {/* Default Stream Chart (Wiggle) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Stream (Wiggle)
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamChart
            data={trafficData}
            keys={["Desktop", "Mobile", "Tablet"]}
            className="h-[300px]"
          />
        </div>
      </div>

      {/* With Legend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Legend
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamLegendChart
            data={revenueData}
            keys={["Products", "Services", "Subscriptions"]}
            className="h-[320px]"
          />
        </div>
      </div>

      {/* Expanded (100% Stacked) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Expanded (100% Stacked)
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamExpandedChart
            data={usersData}
            keys={["Active", "Inactive", "New"]}
            className="h-[320px]"
          />
        </div>
      </div>

      {/* Interactive */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Interactive (Hover Highlight)
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamInteractiveChart
            data={trafficData}
            keys={["Desktop", "Mobile", "Tablet"]}
            className="h-[300px]"
          />
        </div>
      </div>

      {/* Silhouette (Centered) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Silhouette (Centered)
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamSilhouetteChart
            data={salesData}
            keys={["Online", "Retail", "Wholesale"]}
            className="h-[300px]"
          />
        </div>
      </div>

      {/* Stacked (Normal) */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Stacked (Normal)
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <StreamStackedChart
            data={revenueData}
            keys={["Products", "Services", "Subscriptions"]}
            className="h-[320px]"
          />
        </div>
      </div>
    </div>
  );
}
