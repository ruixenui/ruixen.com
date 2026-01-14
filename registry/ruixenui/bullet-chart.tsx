"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface BulletDataItem {
  name: string;
  actual: number;
  target: number;
  ranges: [number, number, number]; // [poor, satisfactory, good]
}

export type TooltipIndicator = "dot" | "line" | "dashed";

export interface BulletChartBaseProps {
  data: BulletDataItem[];
  className?: string;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  valueFormatter?: (value: number) => string;
}

// ============================================================================
// Color Palette (shadcn style - neutral/blue theme)
// ============================================================================

const RANGE_COLORS = [
  "hsl(220 9% 78%)", // Poor - lightest
  "hsl(220 9% 56%)", // Satisfactory - medium
  "hsl(220 9% 36%)", // Good - darkest
];

const ACTUAL_COLOR = "#2b7fff";
const TARGET_COLOR = "hsl(220 9% 20%)";

// ============================================================================
// Utility Functions
// ============================================================================

function defaultValueFormatter(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

// ============================================================================
// Custom Tooltip Component
// ============================================================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    payload: BulletDataItem;
  }>;
  indicator?: TooltipIndicator;
  valueFormatter: (value: number) => string;
}

function ChartTooltip({
  active,
  payload,
  indicator = "dot",
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload;
  if (!data) return null;

  const items = [
    { name: "Actual", value: data.actual, color: ACTUAL_COLOR },
    { name: "Target", value: data.target, color: TARGET_COLOR },
    { name: "Good", value: data.ranges[2], color: RANGE_COLORS[2] },
    { name: "Satisfactory", value: data.ranges[1], color: RANGE_COLORS[1] },
    { name: "Poor", value: data.ranges[0], color: RANGE_COLORS[0] },
  ];

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="mb-1.5 font-medium text-foreground">{data.name}</div>
      <div className="grid gap-1.5">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full items-stretch gap-2",
              indicator === "dot" && "items-center",
            )}
          >
            <div
              className={cn("shrink-0 rounded-[2px]", {
                "h-2.5 w-2.5": indicator === "dot",
                "w-1 self-stretch": indicator === "line",
                "w-0 border-[1.5px] border-dashed bg-transparent self-stretch":
                  indicator === "dashed",
              })}
              style={{
                backgroundColor:
                  indicator !== "dashed" ? item.color : undefined,
                borderColor: indicator === "dashed" ? item.color : undefined,
              }}
            />
            <div className="flex flex-1 justify-between items-center gap-4">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-mono font-medium tabular-nums text-foreground">
                {valueFormatter(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Legend Component
// ============================================================================

interface ChartLegendProps {
  className?: string;
  showRanges?: boolean;
}

function ChartLegend({ className, showRanges = true }: ChartLegendProps) {
  const items = [
    { name: "Actual", color: ACTUAL_COLOR },
    { name: "Target", color: TARGET_COLOR },
    ...(showRanges
      ? [
          { name: "Good", color: RANGE_COLORS[2] },
          { name: "Satisfactory", color: RANGE_COLORS[1] },
          { name: "Poor", color: RANGE_COLORS[0] },
        ]
      : []),
  ];

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 flex-wrap",
        className,
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Transform data for stacked bar chart representation
// ============================================================================

function transformBulletData(data: BulletDataItem[]) {
  return data.map((item) => ({
    ...item,
    range0: item.ranges[0],
    range1: item.ranges[1] - item.ranges[0],
    range2: item.ranges[2] - item.ranges[1],
  }));
}

// ============================================================================
// 1. Bullet Chart - Default (Horizontal)
// ============================================================================

interface BulletChartProps extends BulletChartBaseProps {
  barSize?: number;
  actualBarSize?: number;
}

function BulletChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  barSize = 32,
  actualBarSize = 12,
}: BulletChartProps) {
  const chartData = transformBulletData(data);
  const maxValue = Math.max(...data.map((d) => d.ranges[2]));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, bottom: 10, left: 80 }}
          barCategoryGap="20%"
        >
          <XAxis
            type="number"
            domain={[0, maxValue]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickFormatter={valueFormatter}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            width={70}
          />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            />
          )}
          {/* Range bars - stacked */}
          <Bar
            dataKey="range0"
            stackId="range"
            fill={RANGE_COLORS[0]}
            barSize={barSize}
            radius={0}
          />
          <Bar
            dataKey="range1"
            stackId="range"
            fill={RANGE_COLORS[1]}
            barSize={barSize}
            radius={0}
          />
          <Bar
            dataKey="range2"
            stackId="range"
            fill={RANGE_COLORS[2]}
            barSize={barSize}
            radius={[0, 4, 4, 0]}
          />
          {/* Actual bar - overlaid */}
          <Bar
            dataKey="actual"
            fill={ACTUAL_COLOR}
            barSize={actualBarSize}
            radius={[0, 2, 2, 0]}
          />
          {/* Target markers rendered separately */}
          {chartData.map((entry, index) => (
            <ReferenceLine
              key={`target-${index}`}
              x={entry.target}
              stroke={TARGET_COLOR}
              strokeWidth={2}
              segment={[
                { x: entry.target, y: index - 0.3 },
                { x: entry.target, y: index + 0.3 },
              ]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 2. Bullet Chart - With Legend
// ============================================================================

interface BulletLegendChartProps extends BulletChartBaseProps {
  legendPosition?: "top" | "bottom";
  barSize?: number;
  actualBarSize?: number;
}

function BulletLegendChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "line",
  valueFormatter = defaultValueFormatter,
  legendPosition = "bottom",
  barSize = 32,
  actualBarSize = 12,
}: BulletLegendChartProps) {
  const chartData = transformBulletData(data);
  const maxValue = Math.max(...data.map((d) => d.ranges[2]));

  return (
    <div className={cn("flex flex-col", className)}>
      {legendPosition === "top" && <ChartLegend className="pb-4" />}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, bottom: 10, left: 80 }}
            barCategoryGap="20%"
          >
            <XAxis
              type="number"
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              width={70}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
              />
            )}
            <Bar
              dataKey="range0"
              stackId="range"
              fill={RANGE_COLORS[0]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range1"
              stackId="range"
              fill={RANGE_COLORS[1]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range2"
              stackId="range"
              fill={RANGE_COLORS[2]}
              barSize={barSize}
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="actual"
              fill={ACTUAL_COLOR}
              barSize={actualBarSize}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === "bottom" && <ChartLegend className="pt-4" />}
    </div>
  );
}

// ============================================================================
// 3. Bullet Chart - Vertical
// ============================================================================

interface BulletVerticalChartProps extends BulletChartBaseProps {
  barSize?: number;
  actualBarSize?: number;
}

function BulletVerticalChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  barSize = 40,
  actualBarSize = 16,
}: BulletVerticalChartProps) {
  const chartData = transformBulletData(data);
  const maxValue = Math.max(...data.map((d) => d.ranges[2]));

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            barCategoryGap="25%"
          >
            <XAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              type="number"
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={50}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
              />
            )}
            <Bar
              dataKey="range0"
              stackId="range"
              fill={RANGE_COLORS[0]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range1"
              stackId="range"
              fill={RANGE_COLORS[1]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range2"
              stackId="range"
              fill={RANGE_COLORS[2]}
              barSize={barSize}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="actual"
              fill={ACTUAL_COLOR}
              barSize={actualBarSize}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend className="pt-4" />
    </div>
  );
}

// ============================================================================
// 4. Bullet Chart - Compact (Single row)
// ============================================================================

interface BulletCompactChartProps {
  name: string;
  actual: number;
  target: number;
  ranges: [number, number, number];
  className?: string;
  valueFormatter?: (value: number) => string;
  showLabel?: boolean;
}

function BulletCompactChart({
  name,
  actual,
  target,
  ranges,
  className,
  valueFormatter = defaultValueFormatter,
  showLabel = true,
}: BulletCompactChartProps) {
  const maxValue = ranges[2];
  const actualPercent = (actual / maxValue) * 100;
  const targetPercent = (target / maxValue) * 100;
  const range0Percent = (ranges[0] / maxValue) * 100;
  const range1Percent = (ranges[1] / maxValue) * 100;

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-sm text-muted-foreground">
            {valueFormatter(actual)} / {valueFormatter(target)}
          </span>
        </div>
      )}
      <div className="relative h-6 w-full rounded overflow-hidden">
        {/* Range backgrounds */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${range0Percent}%`,
            backgroundColor: RANGE_COLORS[0],
          }}
        />
        <div
          className="absolute inset-y-0"
          style={{
            left: `${range0Percent}%`,
            width: `${range1Percent - range0Percent}%`,
            backgroundColor: RANGE_COLORS[1],
          }}
        />
        <div
          className="absolute inset-y-0 rounded-r"
          style={{
            left: `${range1Percent}%`,
            width: `${100 - range1Percent}%`,
            backgroundColor: RANGE_COLORS[2],
          }}
        />
        {/* Actual bar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 rounded-r"
          style={{
            width: `${actualPercent}%`,
            backgroundColor: ACTUAL_COLOR,
          }}
        />
        {/* Target marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            left: `${targetPercent}%`,
            backgroundColor: TARGET_COLOR,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// 5. Bullet Chart - Interactive (Hover highlight)
// ============================================================================

interface BulletInteractiveChartProps extends BulletChartBaseProps {
  barSize?: number;
  actualBarSize?: number;
}

function BulletInteractiveChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  barSize = 32,
  actualBarSize = 12,
}: BulletInteractiveChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const chartData = transformBulletData(data);
  const maxValue = Math.max(...data.map((d) => d.ranges[2]));

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, bottom: 10, left: 80 }}
            barCategoryGap="20%"
            onMouseLeave={() => setActiveIndex(null)}
          >
            <XAxis
              type="number"
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              width={70}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
              />
            )}
            <Bar
              dataKey="range0"
              stackId="range"
              fill={RANGE_COLORS[0]}
              barSize={barSize}
              radius={0}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`range0-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  style={{ transition: "fill-opacity 150ms" }}
                />
              ))}
            </Bar>
            <Bar
              dataKey="range1"
              stackId="range"
              fill={RANGE_COLORS[1]}
              barSize={barSize}
              radius={0}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`range1-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  style={{ transition: "fill-opacity 150ms" }}
                />
              ))}
            </Bar>
            <Bar
              dataKey="range2"
              stackId="range"
              fill={RANGE_COLORS[2]}
              barSize={barSize}
              radius={[0, 4, 4, 0]}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`range2-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  style={{ transition: "fill-opacity 150ms" }}
                />
              ))}
            </Bar>
            <Bar
              dataKey="actual"
              fill={ACTUAL_COLOR}
              barSize={actualBarSize}
              radius={[0, 2, 2, 0]}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`actual-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  style={{ transition: "fill-opacity 150ms" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend className="pt-4" />
    </div>
  );
}

// ============================================================================
// 6. Bullet Chart - Custom Colors
// ============================================================================

interface BulletCustomChartProps extends BulletChartBaseProps {
  rangeColors?: [string, string, string];
  actualColor?: string;
  targetColor?: string;
  barSize?: number;
  actualBarSize?: number;
}

function BulletCustomChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dashed",
  valueFormatter = defaultValueFormatter,
  rangeColors = RANGE_COLORS as [string, string, string],
  actualColor = ACTUAL_COLOR,
  barSize = 32,
  actualBarSize = 12,
}: BulletCustomChartProps) {
  const chartData = transformBulletData(data);
  const maxValue = Math.max(...data.map((d) => d.ranges[2]));

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, bottom: 10, left: 80 }}
            barCategoryGap="20%"
          >
            <XAxis
              type="number"
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              width={70}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
              />
            )}
            <Bar
              dataKey="range0"
              stackId="range"
              fill={rangeColors[0]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range1"
              stackId="range"
              fill={rangeColors[1]}
              barSize={barSize}
              radius={0}
            />
            <Bar
              dataKey="range2"
              stackId="range"
              fill={rangeColors[2]}
              barSize={barSize}
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="actual"
              fill={actualColor}
              barSize={actualBarSize}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend className="pt-4" />
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  BulletChart,
  BulletLegendChart,
  BulletVerticalChart,
  BulletCompactChart,
  BulletInteractiveChart,
  BulletCustomChart,
  ChartTooltip,
  ChartLegend,
  defaultValueFormatter,
  RANGE_COLORS,
  ACTUAL_COLOR,
  TARGET_COLOR,
};
