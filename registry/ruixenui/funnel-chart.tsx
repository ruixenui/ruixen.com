"use client";

import * as React from "react";
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Cell,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Trapezoid,
} from "recharts";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface FunnelDataItem {
  name: string;
  value: number;
  fill?: string;
}

export type TooltipIndicator = "dot" | "line" | "dashed";

export interface FunnelChartBaseProps {
  data: FunnelDataItem[];
  className?: string;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  valueFormatter?: (value: number) => string;
}

// ============================================================================
// Neutral Color Palette (shadcn style)
// ============================================================================

const NEUTRAL_COLORS = [
  "hsl(220 9% 20%)",
  "hsl(220 9% 32%)",
  "hsl(220 9% 44%)",
  "hsl(220 9% 56%)",
  "hsl(220 9% 68%)",
  "hsl(220 9% 78%)",
];

// ============================================================================
// Utility Functions
// ============================================================================

function defaultValueFormatter(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

function getColor(index: number): string {
  return NEUTRAL_COLORS[index % NEUTRAL_COLORS.length];
}

// ============================================================================
// Custom Tooltip Component (shadcn style with indicator variants)
// ============================================================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: FunnelDataItem & { fill?: string };
  }>;
  indicator?: TooltipIndicator;
  valueFormatter: (value: number) => string;
  hideLabel?: boolean;
  label?: string;
}

function ChartTooltip({
  active,
  payload,
  indicator = "dot",
  valueFormatter,
  hideLabel = false,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0];
  const indicatorColor = data.payload.fill;

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {!hideLabel && label && (
        <div className="mb-1.5 font-medium text-foreground">{label}</div>
      )}
      <div className="grid gap-1.5">
        <div
          className={cn(
            "flex w-full items-stretch gap-2",
            indicator === "dot" && "items-center",
          )}
        >
          {/* Indicator */}
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
          {/* Content */}
          <div className="flex flex-1 justify-between items-center gap-4">
            <span className="text-muted-foreground">{data.name}</span>
            <span className="font-mono font-medium tabular-nums text-foreground">
              {valueFormatter(data.value)}
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
  data: Array<{ name: string; fill: string }>;
  className?: string;
}

function ChartLegend({ data, className }: ChartLegendProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: item.fill }}
          />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 1. Funnel Chart - Default
// ============================================================================

interface FunnelChartProps extends FunnelChartBaseProps {
  labelPosition?: "left" | "right";
  labelOffset?: number;
}

function FunnelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  labelPosition = "right",
  labelOffset = 12,
}: FunnelChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || getColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
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
          <Funnel
            data={chartData}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
            ))}
            <LabelList
              dataKey="value"
              position={labelPosition}
              fill="hsl(var(--foreground))"
              fontSize={12}
              content={(props: any) => {
                const { x, y, width, height, value } = props;
                const xPos =
                  labelPosition === "right"
                    ? x + width + labelOffset
                    : x - labelOffset;
                const textAnchor = labelPosition === "right" ? "start" : "end";

                return (
                  <text
                    x={xPos}
                    y={y + height / 2}
                    fill="hsl(var(--foreground))"
                    fontSize={12}
                    dominantBaseline="middle"
                    textAnchor={textAnchor}
                  >
                    {valueFormatter(value)}
                  </text>
                );
              }}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 2. Funnel Chart - Label
// ============================================================================

interface FunnelLabelChartProps extends FunnelChartBaseProps {
  labelPosition?: "left" | "right";
  labelOffset?: number;
}

function FunnelLabelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  labelPosition = "right",
  labelOffset = 12,
}: FunnelLabelChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || getColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
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
          <Funnel
            data={chartData}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
            ))}
            <LabelList
              dataKey="name"
              position={labelPosition}
              fill="hsl(var(--foreground))"
              fontSize={13}
              fontWeight={500}
              content={(props: any) => {
                const { x, y, width, height, value } = props;
                const xPos =
                  labelPosition === "right"
                    ? x + width + labelOffset
                    : x - labelOffset;
                const textAnchor = labelPosition === "right" ? "start" : "end";

                return (
                  <text
                    x={xPos}
                    y={y + height / 2}
                    fill="hsl(var(--foreground))"
                    fontSize={13}
                    fontWeight={500}
                    dominantBaseline="middle"
                    textAnchor={textAnchor}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 3. Funnel Chart - Stacked + Legend
// ============================================================================

interface FunnelStackedLegendChartProps extends FunnelChartBaseProps {
  legendPosition?: "top" | "bottom";
}

function FunnelStackedLegendChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "line",
  valueFormatter = defaultValueFormatter,
  legendPosition = "bottom",
}: FunnelStackedLegendChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || getColor(index),
  }));

  return (
    <div className={cn("flex flex-col", className)}>
      {legendPosition === "top" && (
        <ChartLegend data={chartData} className="pb-4" />
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFunnelChart>
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
            <Funnel
              data={chartData}
              dataKey="value"
              nameKey="name"
              isAnimationActive={true}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
              ))}
            </Funnel>
          </RechartsFunnelChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === "bottom" && (
        <ChartLegend data={chartData} className="pt-4" />
      )}
    </div>
  );
}

// ============================================================================
// 4. Funnel Chart - Custom + Label
// ============================================================================

interface FunnelCustomLabelChartProps extends FunnelChartBaseProps {
  strokeWidth?: number;
  strokeDasharray?: string;
  showBorder?: boolean;
}

function FunnelCustomLabelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dashed",
  valueFormatter = defaultValueFormatter,
  strokeWidth = 1,
  strokeDasharray,
  showBorder = true,
}: FunnelCustomLabelChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || getColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
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
          <Funnel
            data={chartData}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke={showBorder ? "hsl(var(--background))" : "none"}
                strokeWidth={showBorder ? strokeWidth : 0}
                strokeDasharray={strokeDasharray}
              />
            ))}
            <LabelList
              dataKey="name"
              position="center"
              fill="hsl(var(--background))"
              fontSize={12}
              fontWeight={500}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 5. Funnel Chart - Active
// ============================================================================

interface FunnelActiveChartProps extends FunnelChartBaseProps {
  activeIndex?: number;
  onSegmentClick?: (item: FunnelDataItem, index: number) => void;
}

function FunnelActiveChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  valueFormatter = defaultValueFormatter,
  activeIndex,
  onSegmentClick,
}: FunnelActiveChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.fill || getColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
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
          <Funnel
            data={chartData}
            dataKey="value"
            nameKey="name"
            isAnimationActive={false}
            onClick={(data) => {
              const item = data as FunnelDataItem;
              const idx = chartData.findIndex((d) => d.name === item.name);
              onSegmentClick?.(item, idx);
            }}
            shape={(props: any) => {
              const index = chartData.findIndex((d) => d.name === props.name);
              const isActive = activeIndex === index;
              const isInactive =
                activeIndex !== undefined && activeIndex !== index;

              return (
                <Trapezoid
                  {...props}
                  fill={props.fill}
                  stroke={isActive ? "hsl(var(--foreground))" : "transparent"}
                  strokeWidth={isActive ? 2 : 0}
                  strokeDasharray={isActive ? "6 4" : undefined}
                  opacity={isInactive ? 0.3 : 1}
                  style={{ cursor: "pointer" }}
                />
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              fill="hsl(var(--foreground))"
              fontSize={12}
              content={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const isActive = activeIndex === index;
                const isInactive =
                  activeIndex !== undefined && activeIndex !== index;

                return (
                  <text
                    x={x + width + 12}
                    y={y + height / 2}
                    fill="hsl(var(--foreground))"
                    fontSize={isActive ? 14 : 12}
                    fontWeight={isActive ? 600 : 400}
                    opacity={isInactive ? 0.4 : 1}
                    dominantBaseline="middle"
                  >
                    {valueFormatter(value)}
                  </text>
                );
              }}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  FunnelChart,
  FunnelLabelChart,
  FunnelStackedLegendChart,
  FunnelCustomLabelChart,
  FunnelActiveChart,
  ChartTooltip,
  ChartLegend,
  defaultValueFormatter,
  NEUTRAL_COLORS,
};
