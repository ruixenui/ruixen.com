"use client";

import * as React from "react";
import InlineAnalyticsTable, {
  AnalyticsItem,
  ColumnConfig,
} from "@/registry/ruixenui/inline-analytics-table";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function DemoPage() {
  // Example custom data
  const customData: AnalyticsItem[] = [
    { id: "101", region: "Australia", sales: 800, revenue: 15000, growth: 10 },
    { id: "102", region: "India", sales: 2000, revenue: 40000, growth: 25 },
    { id: "103", region: "Japan", sales: 1200, revenue: 22000, growth: -8 },
  ];

  // Optional custom column config
  const customColumns: ColumnConfig<AnalyticsItem>[] = [
    { key: "region", label: "Region" },
    { key: "sales", label: "Sales", showProgress: true, progressValue: 80 },
    { key: "revenue", label: "Revenue", showProgress: true, progressValue: 60 },
    { key: "growth", label: "Growth", showProgress: true, progressValue: 50 },
    {
      key: "growth",
      label: "Trend",
      align: "text-right",
      render: (item) =>
        item.growth >= 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        ),
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Inline Analytics Table Demo</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Default Table</h2>
        <InlineAnalyticsTable />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Custom Table</h2>
        <InlineAnalyticsTable data={customData} columns={customColumns} />
      </section>
    </div>
  );
}
