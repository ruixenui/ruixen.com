"use client";

import { SparkChart } from "@/registry/ruixenui/spark-chart";

const DATA = [
  8, 10, 14, 12, 15, 14, 18, 24, 22, 30, 36, 34, 42, 48, 44, 52, 56, 54, 62, 58,
  64,
];

export default function SparkChartDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <SparkChart
          data={DATA}
          height={140}
          formatValue={(v) => `$${v.toFixed(0)}k`}
        />
      </div>
    </div>
  );
}
