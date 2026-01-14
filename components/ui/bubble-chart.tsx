"use client";

import * as React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
  LabelList,
} from "recharts";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface BubbleDataItem {
  name: string;
  x: number;
  y: number;
  z: number; // bubble size
  category?: string;
}

export type TooltipIndicator = "dot" | "line" | "dashed";

export interface BubbleChartBaseProps {
  data: BubbleDataItem[];
  className?: string;
  showTooltip?: boolean;
  tooltipIndicator?: TooltipIndicator;
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
  valueFormatter?: (value: number) => string;
}

// ============================================================================
// Color Palette (shadcn chart style - blue theme)
// ============================================================================

const COLORS = {
  primary: "#2b7fff",
  secondary: "#8ec5ff",
  tertiary: "#1a5fd1",
  quaternary: "#5ba3ff",
};

const CATEGORY_COLORS = [
  "#2b7fff",
  "#8ec5ff",
  "#1a5fd1",
  "#5ba3ff",
  "#0047b3",
  "#b8d9ff",
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

function getCategoryColor(index: number): string {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

// ============================================================================
// Custom Tooltip Component (shadcn style with indicator variants)
// ============================================================================

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: BubbleDataItem & { fill?: string };
  }>;
  indicator?: TooltipIndicator;
  valueFormatter: (value: number) => string;
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
}

function ChartTooltip({
  active,
  payload,
  indicator = "dot",
  valueFormatter,
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const indicatorColor = data.fill || COLORS.primary;

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="mb-1.5 font-medium text-foreground">{data.name}</div>
      <div className="grid gap-1.5">
        {[
          { label: xLabel, value: data.x },
          { label: yLabel, value: data.y },
          { label: zLabel, value: data.z },
        ].map((item, index) => (
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
                  indicator !== "dashed" ? indicatorColor : undefined,
                borderColor:
                  indicator === "dashed" ? indicatorColor : undefined,
              }}
            />
            <div className="flex flex-1 justify-between items-center gap-4">
              <span className="text-muted-foreground">{item.label}</span>
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
  categories: string[];
  className?: string;
}

function ChartLegend({ categories, className }: ChartLegendProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 flex-wrap",
        className,
      )}
    >
      {categories.map((category, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: getCategoryColor(index) }}
          />
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 1. Bubble Chart - Default
// ============================================================================

interface BubbleChartProps extends BubbleChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}

function BubbleChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  minBubbleSize = 60,
  maxBubbleSize = 400,
}: BubbleChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: getCategoryColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          )}
          {showXAxis && (
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={60}
            />
          )}
          <ZAxis
            type="number"
            dataKey="z"
            range={[minBubbleSize, maxBubbleSize]}
            name={zLabel}
          />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                  xLabel={xLabel}
                  yLabel={yLabel}
                  zLabel={zLabel}
                />
              }
              cursor={{ strokeDasharray: "3 3", stroke: "var(--color-border)" }}
            />
          )}
          <Scatter data={chartData} fill={COLORS.primary}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.7} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 2. Bubble Chart - Label
// ============================================================================

interface BubbleLabelChartProps extends BubbleChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}

function BubbleLabelChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  minBubbleSize = 400,
  maxBubbleSize = 2000,
}: BubbleLabelChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: getCategoryColor(index),
    index,
  }));

  // Calculate min/max z for radius scaling
  const zValues = data.map((d) => d.z);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);

  // Custom shape that renders bubble with label inside
  const createBubbleShape = (itemIndex: number) => {
    const BubbleShape = (props: any) => {
      const { cx, cy, payload, fill } = props;
      const isHovered = hoveredIndex === itemIndex;
      const isOtherHovered =
        hoveredIndex !== null && hoveredIndex !== itemIndex;

      // Scale z value to radius
      const normalizedZ =
        maxZ === minZ ? 0.5 : (payload.z - minZ) / (maxZ - minZ);
      const area =
        minBubbleSize + normalizedZ * (maxBubbleSize - minBubbleSize);
      const radius = Math.sqrt(area / Math.PI);

      return (
        <g
          style={{
            transition: "opacity 150ms, transform 150ms",
            opacity: isOtherHovered ? 0.4 : 1,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredIndex(itemIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill={fill}
            fillOpacity={isHovered ? 1 : 0.8}
            stroke={isHovered ? fill : "none"}
            strokeWidth={isHovered ? 2 : 0}
            style={{
              filter: isHovered
                ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                : "none",
            }}
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize={11}
            fontWeight={600}
            style={{ pointerEvents: "none" }}
          >
            {payload.name}
          </text>
        </g>
      );
    };
    BubbleShape.displayName = `BubbleShape-${itemIndex}`;
    return BubbleShape;
  };

  // Sort data so hovered item renders last (on top)
  const sortedData = [...chartData].sort((a, b) => {
    if (hoveredIndex === a.index) return 1;
    if (hoveredIndex === b.index) return -1;
    return 0;
  });

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          )}
          {showXAxis && (
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickMargin={8}
            />
          )}
          {showYAxis && (
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={valueFormatter}
              width={50}
            />
          )}
          <ZAxis
            type="number"
            dataKey="z"
            range={[minBubbleSize, maxBubbleSize]}
            name={zLabel}
          />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                  xLabel={xLabel}
                  yLabel={yLabel}
                  zLabel={zLabel}
                />
              }
              cursor={{ strokeDasharray: "3 3", stroke: "var(--color-border)" }}
            />
          )}
          {sortedData.map((entry) => (
            <Scatter
              key={`scatter-${entry.index}`}
              name={entry.name}
              data={[entry]}
              fill={entry.fill}
              shape={createBubbleShape(entry.index)}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 3. Bubble Chart - Legend
// ============================================================================

interface BubbleLegendChartProps extends BubbleChartBaseProps {
  legendPosition?: "top" | "bottom";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}

function BubbleLegendChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "line",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
  legendPosition = "bottom",
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  minBubbleSize = 60,
  maxBubbleSize = 400,
}: BubbleLegendChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: getCategoryColor(index),
  }));

  const categories = data.map((d) => d.name);

  return (
    <div className={cn("flex flex-col", className)}>
      {legendPosition === "top" && (
        <ChartLegend categories={categories} className="pb-4" />
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
            )}
            {showXAxis && (
              <XAxis
                type="number"
                dataKey="x"
                name={xLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis
                type="number"
                dataKey="y"
                name={yLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={valueFormatter}
                width={60}
              />
            )}
            <ZAxis
              type="number"
              dataKey="z"
              range={[minBubbleSize, maxBubbleSize]}
              name={zLabel}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    zLabel={zLabel}
                  />
                }
                cursor={{
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)",
                }}
              />
            )}
            <Scatter data={chartData} fill={COLORS.primary}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  fillOpacity={0.7}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === "bottom" && (
        <ChartLegend categories={categories} className="pt-4" />
      )}
    </div>
  );
}

// ============================================================================
// 4. Bubble Chart - Grouped (by category)
// ============================================================================

interface BubbleGroupedChartProps extends BubbleChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}

function BubbleGroupedChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dashed",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  minBubbleSize = 60,
  maxBubbleSize = 400,
}: BubbleGroupedChartProps) {
  // Group data by category
  const categories = [...new Set(data.map((d) => d.category || "Default"))];
  const groupedData = categories.map((category, catIndex) => ({
    category,
    data: data
      .filter((d) => (d.category || "Default") === category)
      .map((item) => ({
        ...item,
        fill: getCategoryColor(catIndex),
      })),
  }));

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
            )}
            {showXAxis && (
              <XAxis
                type="number"
                dataKey="x"
                name={xLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis
                type="number"
                dataKey="y"
                name={yLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={valueFormatter}
                width={60}
              />
            )}
            <ZAxis
              type="number"
              dataKey="z"
              range={[minBubbleSize, maxBubbleSize]}
              name={zLabel}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    zLabel={zLabel}
                  />
                }
                cursor={{
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)",
                }}
              />
            )}
            {groupedData.map((group, groupIndex) => (
              <Scatter
                key={group.category}
                name={group.category}
                data={group.data}
                fill={getCategoryColor(groupIndex)}
              >
                {group.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    fillOpacity={0.7}
                  />
                ))}
              </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend categories={categories} className="pt-4" />
    </div>
  );
}

// ============================================================================
// 5. Bubble Chart - Interactive (Hover highlight)
// ============================================================================

function BubbleInteractiveChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
}: BubbleChartBaseProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: getCategoryColor(index),
  }));

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickMargin={8}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            tickFormatter={valueFormatter}
            width={60}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name={zLabel} />
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip
                  indicator={tooltipIndicator}
                  valueFormatter={valueFormatter}
                  xLabel={xLabel}
                  yLabel={yLabel}
                  zLabel={zLabel}
                />
              }
              cursor={{ strokeDasharray: "3 3", stroke: "var(--color-border)" }}
            />
          )}
          <Scatter
            data={chartData}
            fill={COLORS.primary}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 0.85 : 0.3
                }
                style={{ cursor: "pointer", transition: "fill-opacity 150ms" }}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================================
// 6. Bubble Chart - Size Legend
// ============================================================================

interface BubbleSizeLegendChartProps extends BubbleChartBaseProps {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}

function BubbleSizeLegendChart({
  data,
  className,
  showTooltip = true,
  tooltipIndicator = "dot",
  xLabel = "X",
  yLabel = "Y",
  zLabel = "Size",
  valueFormatter = defaultValueFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  minBubbleSize = 60,
  maxBubbleSize = 400,
}: BubbleSizeLegendChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: getCategoryColor(index),
  }));

  // Calculate size legend values
  const zValues = data.map((d) => d.z);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);
  const midZ = Math.round((minZ + maxZ) / 2);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
            )}
            {showXAxis && (
              <XAxis
                type="number"
                dataKey="x"
                name={xLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis
                type="number"
                dataKey="y"
                name={yLabel}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={valueFormatter}
                width={60}
              />
            )}
            <ZAxis
              type="number"
              dataKey="z"
              range={[minBubbleSize, maxBubbleSize]}
              name={zLabel}
            />
            {showTooltip && (
              <Tooltip
                content={
                  <ChartTooltip
                    indicator={tooltipIndicator}
                    valueFormatter={valueFormatter}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    zLabel={zLabel}
                  />
                }
                cursor={{
                  strokeDasharray: "3 3",
                  stroke: "var(--color-border)",
                }}
              />
            )}
            <Scatter data={chartData} fill={COLORS.primary}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  fillOpacity={0.7}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Size Legend */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <span className="text-sm text-muted-foreground">{zLabel}:</span>
        {[
          { size: 12, value: minZ },
          { size: 18, value: midZ },
          { size: 24, value: maxZ },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{
                width: item.size,
                height: item.size,
                backgroundColor: COLORS.primary,
                opacity: 0.7,
              }}
            />
            <span className="text-xs text-muted-foreground">
              {valueFormatter(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  BubbleChart,
  BubbleLabelChart,
  BubbleLegendChart,
  BubbleGroupedChart,
  BubbleInteractiveChart,
  BubbleSizeLegendChart,
  ChartTooltip,
  ChartLegend,
  defaultValueFormatter,
  COLORS,
  CATEGORY_COLORS,
};
