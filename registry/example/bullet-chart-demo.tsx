"use client";

import {
  BulletChart,
  BulletLegendChart,
  BulletVerticalChart,
  BulletCompactChart,
  BulletInteractiveChart,
  BulletCustomChart,
  BulletDataItem,
} from "@/registry/ruixenui/bullet-chart";

const salesBulletData: BulletDataItem[] = [
  { name: "Revenue", actual: 275, target: 250, ranges: [150, 225, 300] },
  { name: "Profit", actual: 85, target: 100, ranges: [50, 75, 100] },
  { name: "Orders", actual: 180, target: 200, ranges: [100, 150, 200] },
];

const performanceBulletData: BulletDataItem[] = [
  { name: "CPU Usage", actual: 65, target: 80, ranges: [30, 60, 100] },
  { name: "Memory", actual: 72, target: 75, ranges: [40, 65, 100] },
  { name: "Disk I/O", actual: 45, target: 50, ranges: [25, 40, 80] },
  { name: "Network", actual: 88, target: 90, ranges: [50, 75, 100] },
];

const quarterlyBulletData: BulletDataItem[] = [
  {
    name: "Q1",
    actual: 120000,
    target: 100000,
    ranges: [60000, 90000, 150000],
  },
  {
    name: "Q2",
    actual: 95000,
    target: 110000,
    ranges: [70000, 100000, 150000],
  },
  {
    name: "Q3",
    actual: 140000,
    target: 130000,
    ranges: [80000, 110000, 160000],
  },
  {
    name: "Q4",
    actual: 110000,
    target: 150000,
    ranges: [90000, 120000, 180000],
  },
];

const kpiBulletData: BulletDataItem[] = [
  { name: "Satisfaction", actual: 4.2, target: 4.5, ranges: [3.0, 4.0, 5.0] },
  { name: "NPS Score", actual: 72, target: 80, ranges: [40, 60, 100] },
  { name: "Retention", actual: 85, target: 90, ranges: [60, 80, 100] },
];

export default function BulletChartDemo() {
  return (
    <div className="w-full space-y-8 p-10">
      {/* Default Bullet Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Bullet
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BulletChart data={salesBulletData} className="h-[200px]" />
        </div>
      </div>

      {/* With Legend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Legend
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BulletLegendChart
            data={performanceBulletData}
            className="h-[280px]"
          />
        </div>
      </div>

      {/* Vertical */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Vertical</h3>
        <div className="rounded-lg border bg-card p-4">
          <BulletVerticalChart
            data={quarterlyBulletData}
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
          <BulletInteractiveChart data={kpiBulletData} className="h-[240px]" />
        </div>
      </div>

      {/* Compact */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Compact</h3>
        <div className="rounded-lg border bg-card p-4 space-y-4">
          {salesBulletData.map((item, index) => (
            <BulletCompactChart
              key={index}
              name={item.name}
              actual={item.actual}
              target={item.target}
              ranges={item.ranges}
            />
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Custom Colors
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BulletCustomChart
            data={performanceBulletData}
            className="h-[280px]"
            rangeColors={["#e8f4ff", "#8ec5ff", "#2b7fff"]}
            actualColor="#1a5fd1"
          />
        </div>
      </div>
    </div>
  );
}
