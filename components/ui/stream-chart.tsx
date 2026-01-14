"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface StreamDataItem {
  name: string;
  [key: string]: string | number;
}

export type TooltipIndicator = "dot" | "line" | "dashed";

export interface StreamChartBaseProps {
  data: StreamDataItem[];
  keys: string[];
  className?: string;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  valueFormatter?: (value: number) => string;
}

// ============================================================================
// Color Palette (shadcn chart style - blue theme)
// ============================================================================

const COLORS = [
  "#2b7fff",
  "#8ec5ff",
  "#1a5fd1",
  "#5ba3ff",
  "#0047b3",
  "#b8d9ff",
  "#003d99",
  "#cce4ff",
];

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

function getColor(index: number): string {
  return COLORS[index % COLORS.length];
}

// ============================================================================
// Custom Tooltip Component
// ============================================================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  indicator?: TooltipIndicator;
  valueFormatter: (value: number) => string;
}

function ChartTooltip({
  active,
  payload,
  label,
  indicator = "dot",
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {label && (
        <div className="mb-1.5 font-medium text-foreground">{label}</div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, index) => (
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
  keys: string[];
  className?: string;
}

function ChartLegend({ keys, className }: ChartLegendProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 flex-wrap",
        className,
      )}
    >
      {keys.map((key, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: getColor(index) }}
          />
          <span className="text-sm text-muted-foreground">{key}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 1. Stream Chart - Default (Wiggle/Streamgraph)
// ============================================================================

interface StreamChartProps extends StreamChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  stackOffset?: "expand" | "none" | "wiggle" | "silhouette";
}

function StreamChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = false,
  showGrid = false,
  stackOffset = "wiggle",
}: StreamChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          stackOffset={stackOffset}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          )}
          {showXAxis && (
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={50}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={{ stroke: "var(--color-border)", strokeDasharray: "3 3" }}
            />
          )}
          {keys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={getColor(index)}
              fill={getColor(index)}
              fillOpacity={0.8}
              activeDot={{
                r: 4,
                fill: getColor(index),
                stroke: "#fff",
                strokeWidth: 2,
                style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 2. Stream Chart - Legend
// ============================================================================

interface StreamLegendChartProps extends StreamChartBaseProps {
  legendPosition?: "top" | "bottom";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  stackOffset?: "expand" | "none" | "wiggle" | "silhouette";
}

function StreamLegendChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "line",
  valueFormatter = defaultValueFormatter,
  legendPosition = "bottom",
  showXAxis = true,
  showYAxis = false,
  showGrid = false,
  stackOffset = "wiggle",
}: StreamLegendChartProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {legendPosition === "top" && <ChartLegend keys={keys} className="pb-4" />}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset={stackOffset}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
            )}
            {showXAxis && (
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={valueFormatter}
                width={50}
              />
            )}
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "3 3",
                }}
              />
            )}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={getColor(index)}
                fill={getColor(index)}
                fillOpacity={0.8}
                activeDot={{
                  r: 4,
                  fill: getColor(index),
                  stroke: "#fff",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === "bottom" && (
        <ChartLegend keys={keys} className="pt-4" />
      )}
    </div>
  );
}

// ============================================================================
// 3. Stream Chart - Expanded (100% Stacked)
// ============================================================================

function StreamExpandedChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
}: StreamChartBaseProps) {
  // Custom formatter for percentage
  const percentFormatter = (value: number) => `${(value * 100).toFixed(0)}%`;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="expand"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={percentFormatter}
              width={40}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "3 3",
                }}
              />
            )}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={getColor(index)}
                fill={getColor(index)}
                fillOpacity={0.8}
                activeDot={{
                  r: 4,
                  fill: getColor(index),
                  stroke: "#fff",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend keys={keys} className="pt-4" />
    </div>
  );
}

// ============================================================================
// 4. Stream Chart - Interactive (Hover highlight)
// ============================================================================

function StreamInteractiveChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
}: StreamChartBaseProps) {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="wiggle"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "3 3",
                }}
              />
            )}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={getColor(index)}
                fill={getColor(index)}
                fillOpacity={
                  activeKey === null ? 0.8 : activeKey === key ? 1 : 0.2
                }
                style={{
                  transition: "fill-opacity 150ms",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActiveKey(key)}
                onMouseLeave={() => setActiveKey(null)}
                activeDot={{
                  r: 4,
                  fill: getColor(index),
                  stroke: "#fff",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend keys={keys} className="pt-4" />
    </div>
  );
}

// ============================================================================
// 5. Stream Chart - Silhouette (Centered)
// ============================================================================

function StreamSilhouetteChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "dashed",
  valueFormatter = defaultValueFormatter,
}: StreamChartBaseProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="silhouette"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "3 3",
                }}
              />
            )}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={getColor(index)}
                fill={getColor(index)}
                fillOpacity={0.8}
                activeDot={{
                  r: 4,
                  fill: getColor(index),
                  stroke: "#fff",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend keys={keys} className="pt-4" />
    </div>
  );
}

// ============================================================================
// 6. Stream Chart - Stacked (Normal stacking)
// ============================================================================

function StreamStackedChart({
  data,
  keys,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
}: StreamChartBaseProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="none"
            margin={{ top: 10, right: 10, bottom: 10, left: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
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
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "3 3",
                }}
              />
            )}
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={getColor(index)}
                fill={getColor(index)}
                fillOpacity={0.8}
                activeDot={{
                  r: 4,
                  fill: getColor(index),
                  stroke: "#fff",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" },
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend keys={keys} className="pt-4" />
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  StreamChart,
  StreamLegendChart,
  StreamExpandedChart,
  StreamInteractiveChart,
  StreamSilhouetteChart,
  StreamStackedChart,
  ChartTooltip,
  ChartLegend,
  defaultValueFormatter,
  COLORS,
};
