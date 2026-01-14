"use client";

import {
  BubbleChart,
  BubbleLabelChart,
  BubbleLegendChart,
  BubbleGroupedChart,
  BubbleInteractiveChart,
  BubbleSizeLegendChart,
  BubbleDataItem,
} from "@/registry/ruixenui/bubble-chart";

const salesData: BubbleDataItem[] = [
  { name: "Prod A", x: 100, y: 200, z: 400 },
  { name: "Prod B", x: 120, y: 100, z: 260 },
  { name: "Prod C", x: 170, y: 300, z: 400 },
  { name: "Prod D", x: 140, y: 250, z: 280 },
  { name: "Prod E", x: 150, y: 400, z: 500 },
  { name: "Prod F", x: 110, y: 280, z: 200 },
];

const marketData: BubbleDataItem[] = [
  { name: "Tech", x: 80, y: 4500, z: 12000 },
  { name: "Finance", x: 95, y: 3800, z: 8500 },
  { name: "Health", x: 70, y: 5200, z: 15000 },
  { name: "Energy", x: 60, y: 2800, z: 6000 },
  { name: "Retail", x: 85, y: 3200, z: 9500 },
];

const performanceData: BubbleDataItem[] = [
  { name: "Alpha", x: 85, y: 92, z: 1500 },
  { name: "Beta", x: 72, y: 78, z: 1200 },
  { name: "Gamma", x: 90, y: 88, z: 1800 },
  { name: "Delta", x: 65, y: 70, z: 800 },
];

const categoryData: BubbleDataItem[] = [
  { name: "NYC", x: 40, y: 8500, z: 850, category: "East" },
  { name: "Boston", x: 35, y: 4200, z: 420, category: "East" },
  { name: "Miami", x: 28, y: 3800, z: 380, category: "East" },
  { name: "LA", x: 55, y: 7200, z: 720, category: "West" },
  { name: "Seattle", x: 48, y: 4800, z: 480, category: "West" },
  { name: "Denver", x: 38, y: 3200, z: 320, category: "West" },
];

const quarterlyData: BubbleDataItem[] = [
  { name: "Q1", x: 25, y: 120, z: 800 },
  { name: "Q2", x: 45, y: 180, z: 1200 },
  { name: "Q3", x: 65, y: 240, z: 1600 },
  { name: "Q4", x: 85, y: 320, z: 2200 },
];

export default function BubbleChartDemo() {
  return (
    <div className="w-full space-y-8 p-10">
      {/* Default Bubble Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Bubble
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BubbleChart
            data={salesData}
            xLabel="Units"
            yLabel="Revenue"
            zLabel="Market Share"
            className="h-[300px]"
          />
        </div>
      </div>

      {/* With Labels */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Labels
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BubbleLabelChart
            data={performanceData}
            xLabel="Efficiency"
            yLabel="Quality"
            zLabel="Team Size"
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
          <BubbleLegendChart
            data={marketData}
            xLabel="Growth %"
            yLabel="Revenue"
            zLabel="Employees"
            className="h-[320px]"
          />
        </div>
      </div>

      {/* Grouped */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Grouped by Category
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BubbleGroupedChart
            data={categoryData}
            xLabel="Growth %"
            yLabel="Population"
            zLabel="Revenue"
            className="h-[320px]"
          />
        </div>
      </div>

      {/* Interactive */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Interactive
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BubbleInteractiveChart
            data={quarterlyData}
            xLabel="Week"
            yLabel="Sales"
            zLabel="Customers"
            className="h-[300px]"
          />
        </div>
      </div>

      {/* Size Legend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Size Legend
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <BubbleSizeLegendChart
            data={marketData}
            xLabel="Growth %"
            yLabel="Revenue"
            zLabel="Employees"
            className="h-[320px]"
          />
        </div>
      </div>
    </div>
  );
}
