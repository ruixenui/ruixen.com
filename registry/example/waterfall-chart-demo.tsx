"use client";

import {
  WaterfallChart,
  WaterfallLabelChart,
  WaterfallLegendChart,
  WaterfallHorizontalChart,
  WaterfallInteractiveChart,
  WaterfallDataItem,
} from "@/registry/ruixenui/waterfall-chart";

const revenueData: WaterfallDataItem[] = [
  { name: "Q1 Start", value: 120000, isTotal: true },
  { name: "Prod A", value: 45000 },
  { name: "Prod B", value: 32000 },
  { name: "Prod C", value: 28000 },
  { name: "Services", value: 18000 },
  { name: "Consult", value: 12000 },
  { name: "License", value: 8500 },
  { name: "Returns", value: -15000 },
  { name: "Refunds", value: -8500 },
  { name: "Discount", value: -12000 },
  { name: "Chargeback", value: -4200 },
  { name: "Support", value: -6800 },
  { name: "Q1 End", value: 217000, isTotal: true },
];

const profitData: WaterfallDataItem[] = [
  { name: "Revenue", value: 500000, isTotal: true },
  { name: "Sales", value: 85000 },
  { name: "Online", value: 62000 },
  { name: "Partners", value: 43000 },
  { name: "Subs", value: 38000 },
  { name: "COGS", value: -145000 },
  { name: "Mfg", value: -52000 },
  { name: "Shipping", value: -28000 },
  { name: "Payroll", value: -95000 },
  { name: "Ads", value: -42000 },
  { name: "R&D", value: -35000 },
  { name: "Admin", value: -18000 },
  { name: "Utilities", value: -8500 },
  { name: "Insurance", value: -6200 },
  { name: "Profit", value: 298300, isTotal: true },
];

const monthlyData: WaterfallDataItem[] = [
  { name: "Jan", value: 85000, isTotal: true },
  { name: "Feb", value: 12000 },
  { name: "Mar", value: 18500 },
  { name: "Apr", value: -5200 },
  { name: "May", value: 22000 },
  { name: "Jun", value: 15800 },
  { name: "Jul", value: -8400 },
  { name: "Aug", value: 28000 },
  { name: "Sep", value: 19500 },
  { name: "Oct", value: -12000 },
  { name: "Nov", value: 35000 },
  { name: "Dec", value: 42000 },
  { name: "Year End", value: 252200, isTotal: true },
];

export default function WaterfallChartDemo() {
  return (
    <div className="w-full space-y-8 p-10">
      {/* Default Waterfall Chart */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Waterfall
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <WaterfallChart data={revenueData} className="h-[320px]" />
        </div>
      </div>

      {/* With Labels */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Labels
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <WaterfallLabelChart data={monthlyData} className="h-[320px]" />
        </div>
      </div>

      {/* With Legend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Legend
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <WaterfallLegendChart data={profitData} className="h-[380px]" />
        </div>
      </div>

      {/* Horizontal */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Horizontal
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <WaterfallHorizontalChart data={revenueData} className="h-[480px]" />
        </div>
      </div>

      {/* Interactive */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Interactive
        </h3>
        <div className="rounded-lg border bg-card p-4">
          <WaterfallInteractiveChart data={monthlyData} className="h-[320px]" />
        </div>
      </div>
    </div>
  );
}
