"use client";

import { useState } from "react";
import {
  FunnelChart,
  FunnelLabelChart,
  FunnelStackedLegendChart,
  FunnelCustomLabelChart,
  FunnelActiveChart,
  FunnelDataItem,
} from "@/registry/ruixenui/funnel-chart";

const salesData: FunnelDataItem[] = [
  { name: "Visitors", value: 10000 },
  { name: "Leads", value: 6500 },
  { name: "Qualified", value: 3200 },
  { name: "Proposals", value: 1800 },
  { name: "Closed", value: 1200 },
];

export default function FunnelChartDemo() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  return (
    <div className="w-full space-y-8">
      {/* Default Funnel Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Funnel
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <FunnelChart data={salesData} className="h-[280px]" />
        </div>
      </div>

      {/* Label Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Labels
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <FunnelLabelChart data={salesData} className="h-[280px]" />
        </div>
      </div>

      {/* Stacked + Legend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Legend
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <FunnelStackedLegendChart data={salesData} className="h-[300px]" />
        </div>
      </div>

      {/* Custom + Label */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Center Labels
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <FunnelCustomLabelChart
            data={salesData}
            showBorder={true}
            strokeWidth={2}
            className="h-[280px]"
          />
        </div>
      </div>

      {/* Interactive */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Interactive{" "}
          {activeIndex !== undefined && (
            <span className="text-foreground">
              — {salesData[activeIndex].name}
            </span>
          )}
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <FunnelActiveChart
            data={salesData}
            className="h-[280px]"
            activeIndex={activeIndex}
            onSegmentClick={(_, index) =>
              setActiveIndex(activeIndex === index ? undefined : index)
            }
          />
        </div>
      </div>
    </div>
  );
}
