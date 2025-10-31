"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface StatData {
  title: string;
  value: string | number;
  unit?: string;
  changePercent?: number;
  changeDirection?: "up" | "down";
}

export interface HealthGraphData {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

export interface HealthStatCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headerIcon?: React.ReactNode;
  title: string;
  stats: StatData[];
  graphData?: HealthGraphData[];
  graphHeight?: number;
  showLegend?: boolean;
  legendTitle?: string;
  legendFormat?: (item: HealthGraphData) => string;
}

export const HealthStatCard = React.forwardRef<
  HTMLDivElement,
  HealthStatCardProps
>(
  (
    {
      className,
      headerIcon,
      title,
      stats,
      graphData,
      graphHeight = 100,
      showLegend = true,
      legendTitle = "Data Breakdown",
      legendFormat,
      ...props
    },
    ref,
  ) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
      },
    };

    const barVariants = {
      hidden: { scaleY: 0 },
      visible: {
        scaleY: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          {headerIcon && <div className="text-primary">{headerIcon}</div>}
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4 text-center">
          {stats.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-center gap-1">
                <p className="text-2xl font-bold">{item.value}</p>
                {item.unit && (
                  <span className="text-sm text-muted-foreground">
                    {item.unit}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.title}</p>
              {item.changePercent !== undefined && (
                <div
                  className={cn(
                    "mt-1 text-xs font-medium",
                    item.changeDirection === "up"
                      ? "text-green-500"
                      : "text-red-500",
                  )}
                >
                  {item.changeDirection === "up" ? "▲" : "▼"}{" "}
                  {item.changePercent}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Animated Graph */}
        {graphData && (
          <TooltipProvider delayDuration={100}>
            <div className="rounded-lg bg-muted/50 p-4">
              <motion.div
                className="flex w-full items-end justify-between gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ height: graphHeight }}
              >
                {graphData.map((bar, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="flex-1 rounded-full cursor-pointer"
                        style={{
                          height: `${bar.value}%`,
                          background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}cc 100%)`,
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -6,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                          rotateX: 8,
                          rotateY: -6,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          },
                        }}
                        whileTap={{ scale: 0.95 }}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      <p className="font-semibold">{bar.label}</p>
                      <p className="text-muted-foreground">{bar.value}%</p>
                      {bar.description && (
                        <p className="text-muted-foreground mt-1">
                          {bar.description}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            </div>
          </TooltipProvider>
        )}

        {/* Legend */}
        {showLegend && graphData && (
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              {legendTitle}
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {graphData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {legendFormat
                      ? legendFormat(item)
                      : `${item.label} (${item.value}%)`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

HealthStatCard.displayName = "HealthStatCard";
