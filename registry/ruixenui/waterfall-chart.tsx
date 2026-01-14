"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  CartesianGrid,
} from "recharts";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface WaterfallDataItem {
  name: string;
  value: number;
  isTotal?: boolean;
}

export type TooltipIndicator = "dot" | "line" | "dashed";

export interface WaterfallChartBaseProps {
  data: WaterfallDataItem[];
  className?: string;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  valueFormatter?: (value: number) => string;
  barSize?: number;
}

// ============================================================================
// Color Palette (shadcn chart style - blue theme)
// ============================================================================

const COLORS = {
  positive: "#2b7fff", // Primary blue
  negative: "#8ec5ff", // Light blue
  total: "#2b7fff", // Primary blue for totals
};

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

// Transform data for waterfall visualization
function transformWaterfallData(data: WaterfallDataItem[]) {
  let cumulative = 0;

  return data.map((item) => {
    if (item.isTotal) {
      const result = {
        name: item.name,
        value: item.value,
        start: 0,
        end: item.value,
        isTotal: true,
        isPositive: item.value >= 0,
        displayValue: item.value,
      };
      cumulative = item.value;
      return result;
    }

    const start = cumulative;
    const end = cumulative + item.value;
    cumulative = end;

    return {
      name: item.name,
      value: Math.abs(item.value),
      start: Math.min(start, end),
      end: Math.max(start, end),
      isTotal: false,
      isPositive: item.value >= 0,
      displayValue: item.value,
    };
  });
}

// ============================================================================
// Custom Tooltip Component (shadcn style with indicator variants)
// ============================================================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      displayValue: number;
      isTotal: boolean;
      isPositive: boolean;
    };
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

  const data = payload[0].payload;
  const indicatorColor = data.isTotal
    ? COLORS.total
    : data.isPositive
      ? COLORS.positive
      : COLORS.negative;

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="grid gap-1.5">
        <div
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
                indicator !== "dashed" ? indicatorColor : undefined,
              borderColor: indicator === "dashed" ? indicatorColor : undefined,
            }}
          />
          <div className="flex flex-1 justify-between items-center gap-4">
            <span className="text-muted-foreground">{data.name}</span>
            <span className="font-mono font-medium tabular-nums text-foreground">
              {data.isTotal ? "" : data.displayValue >= 0 ? "+" : ""}
              {valueFormatter(data.displayValue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Legend Component
// ============================================================================

interface ChartLegendProps {
  className?: string;
  showTotal?: boolean;
}

function ChartLegend({ className, showTotal = true }: ChartLegendProps) {
  const items = [
    { name: "Increase", color: COLORS.positive },
    { name: "Decrease", color: COLORS.negative },
    ...(showTotal ? [{ name: "Total", color: COLORS.total }] : []),
  ];

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
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
// 1. Waterfall Chart - Default
// ============================================================================

interface WaterfallChartProps extends WaterfallChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
}

function WaterfallChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  barSize,
}: WaterfallChartProps) {
  const chartData = transformWaterfallData(data);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          barGap={0}
          barCategoryGap="20%"
          barSize={barSize}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
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
              interval={0}
            />
          )}
          {showYAxis && (
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={60}
            />
          )}
          <ReferenceLine y={0} stroke="var(--color-border)" />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={false}
            />
          )}
          <Bar
            dataKey="start"
            stackId="waterfall"
            fill="transparent"
            radius={0}
          />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? COLORS.total
                    : entry.isPositive
                      ? COLORS.positive
                      : COLORS.negative
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 2. Waterfall Chart - Label
// ============================================================================

interface WaterfallLabelChartProps extends WaterfallChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
}

function WaterfallLabelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = false,
  showGrid = false,
  barSize,
}: WaterfallLabelChartProps) {
  const chartData = transformWaterfallData(data);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          barGap={0}
          barCategoryGap="20%"
          barSize={barSize}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
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
              interval={0}
            />
          )}
          {showYAxis && (
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={60}
            />
          )}
          <ReferenceLine y={0} stroke="var(--color-border)" />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={false}
            />
          )}
          <Bar
            dataKey="start"
            stackId="waterfall"
            fill="transparent"
            radius={0}
          />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? COLORS.total
                    : entry.isPositive
                      ? COLORS.positive
                      : COLORS.negative
                }
              />
            ))}
            <LabelList
              dataKey="displayValue"
              position="top"
              fill="var(--color-foreground)"
              fontSize={11}
              fontWeight={500}
              offset={8}
              content={(props: any) => {
                const { x, y, width, value } = props;
                if (value === undefined || value === null) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y - 8}
                    fill="var(--color-foreground)"
                    fontSize={11}
                    fontWeight={500}
                    textAnchor="middle"
                  >
                    {`${value >= 0 ? "+" : ""}${valueFormatter(value)}`}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 3. Waterfall Chart - Custom Label (inside bars)
// ============================================================================

function WaterfallCustomLabelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dashed",
  valueFormatter = defaultValueFormatter,
  barSize,
}: WaterfallChartBaseProps) {
  const chartData = transformWaterfallData(data);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          barGap={0}
          barCategoryGap="20%"
          barSize={barSize}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickMargin={8}
            interval={0}
          />
          <YAxis hide domain={[0, "auto"]} />
          <ReferenceLine y={0} stroke="var(--color-border)" />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={false}
            />
          )}
          <Bar
            dataKey="start"
            stackId="waterfall"
            fill="transparent"
            radius={0}
          />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? COLORS.total
                    : entry.isPositive
                      ? COLORS.positive
                      : COLORS.negative
                }
              />
            ))}
            <LabelList
              dataKey="displayValue"
              position="center"
              fill="#ffffff"
              fontSize={10}
              fontWeight={600}
              content={(props: any) => {
                const { x, y, width, height, value } = props;
                if (value === undefined || value === null) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="#ffffff"
                    fontSize={10}
                    fontWeight={600}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {valueFormatter(value)}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 4. Waterfall Chart - Legend
// ============================================================================

interface WaterfallLegendChartProps extends WaterfallChartBaseProps {
  legendPosition?: "top" | "bottom";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
}

function WaterfallLegendChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "line",
  valueFormatter = defaultValueFormatter,
  legendPosition = "bottom",
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  barSize,
}: WaterfallLegendChartProps) {
  const chartData = transformWaterfallData(data);
  const hasTotal = data.some((d) => d.isTotal);

  return (
    <div className={cn("flex flex-col", className)}>
      {legendPosition === "top" && (
        <ChartLegend showTotal={hasTotal} className="pb-4" />
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barGap={0}
            barCategoryGap="20%"
            barSize={barSize}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
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
                interval={0}
              />
            )}
            {showYAxis && (
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={valueFormatter}
                width={60}
              />
            )}
            <ReferenceLine y={0} stroke="var(--color-border)" />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                  />
                }
                cursor={false}
              />
            )}
            <Bar
              dataKey="start"
              stackId="waterfall"
              fill="transparent"
              radius={0}
            />
            <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isTotal
                      ? COLORS.total
                      : entry.isPositive
                        ? COLORS.positive
                        : COLORS.negative
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === "bottom" && (
        <ChartLegend showTotal={hasTotal} className="pt-4" />
      )}
    </div>
  );
}

// ============================================================================
// 5. Waterfall Chart - Horizontal
// ============================================================================

function WaterfallHorizontalChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  barSize,
}: WaterfallChartBaseProps) {
  const chartData = transformWaterfallData(data);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          barGap={0}
          barCategoryGap="20%"
          barSize={barSize}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="var(--color-border)"
          />
          <XAxis
            type="number"
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
            width={80}
            interval={0}
          />
          <ReferenceLine x={0} stroke="var(--color-border)" />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={false}
            />
          )}
          <Bar
            dataKey="start"
            stackId="waterfall"
            fill="transparent"
            radius={0}
          />
          <Bar dataKey="value" stackId="waterfall" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? COLORS.total
                    : entry.isPositive
                      ? COLORS.positive
                      : COLORS.negative
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 6. Waterfall Chart - Interactive (Negative highlighting)
// ============================================================================

function WaterfallInteractiveChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  barSize,
}: WaterfallChartBaseProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const chartData = transformWaterfallData(data);

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          barGap={0}
          barCategoryGap="20%"
          barSize={barSize}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-border)"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickMargin={8}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickFormatter={valueFormatter}
            width={60}
          />
          <ReferenceLine y={0} stroke="var(--color-border)" />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                />
              }
              cursor={false}
            />
          )}
          <Bar
            dataKey="start"
            stackId="waterfall"
            fill="transparent"
            radius={0}
          />
          <Bar
            dataKey="value"
            stackId="waterfall"
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? COLORS.total
                    : entry.isPositive
                      ? COLORS.positive
                      : COLORS.negative
                }
                opacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
                style={{ cursor: "pointer", transition: "opacity 150ms" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  WaterfallChart,
  WaterfallLabelChart,
  WaterfallCustomLabelChart,
  WaterfallLegendChart,
  WaterfallHorizontalChart,
  WaterfallInteractiveChart,
  ChartTooltip,
  ChartLegend,
  defaultValueFormatter,
  COLORS,
};
