"use client";

import * as React from "react";
import { CheckIcon, CircleIcon, CircleDotIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface MilestoneData {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
}

type MilestoneState = "completed" | "current" | "upcoming";

// ============================================================================
// MilestoneStepper - Root Container
// ============================================================================

interface MilestoneStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: MilestoneData[];
  currentMilestone?: number;
  variant?: "default" | "compact" | "detailed";
  lineStyle?: "solid" | "dashed";
}

function MilestoneStepper({
  milestones,
  currentMilestone = 0,
  variant = "default",
  lineStyle = "solid",
  className,
  ...props
}: MilestoneStepperProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="relative">
        {milestones.map((milestone, index) => {
          const state: MilestoneState =
            index < currentMilestone
              ? "completed"
              : index === currentMilestone
                ? "current"
                : "upcoming";

          return (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              state={state}
              isLast={index === milestones.length - 1}
              variant={variant}
              lineStyle={lineStyle}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MilestoneItem - Individual Milestone
// ============================================================================

interface MilestoneItemProps {
  milestone: MilestoneData;
  state: MilestoneState;
  isLast: boolean;
  variant: "default" | "compact" | "detailed";
  lineStyle: "solid" | "dashed";
  index: number;
}

function MilestoneItem({
  milestone,
  state,
  isLast,
  variant,
  lineStyle,
  index,
}: MilestoneItemProps) {
  return (
    <div className="relative flex gap-4">
      {/* Timeline Line */}
      {!isLast && (
        <div
          className={cn(
            "absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5",
            lineStyle === "dashed" ? "border-l-2 border-dashed" : "",
            state === "completed"
              ? lineStyle === "dashed"
                ? "border-primary"
                : "bg-primary"
              : lineStyle === "dashed"
                ? "border-muted"
                : "bg-muted",
          )}
        />
      )}

      {/* Icon */}
      <div className="relative z-10 flex-shrink-0">
        <MilestoneIcon state={state} icon={milestone.icon} />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 pb-8",
          variant === "compact" && "pb-4",
          variant === "detailed" && "pb-10",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4
              className={cn(
                "font-medium",
                state === "current" && "text-primary",
                state === "upcoming" && "text-muted-foreground",
              )}
            >
              {milestone.title}
            </h4>
            {milestone.description && variant !== "compact" && (
              <p className="mt-1 text-sm text-muted-foreground">
                {milestone.description}
              </p>
            )}
          </div>
          {milestone.date && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {milestone.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MilestoneIcon - State-based Icon
// ============================================================================

interface MilestoneIconProps {
  state: MilestoneState;
  icon?: React.ReactNode;
}

function MilestoneIcon({ state, icon }: MilestoneIconProps) {
  if (icon) {
    return (
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full",
          state === "completed" && "bg-primary text-primary-foreground",
          state === "current" &&
            "bg-primary text-primary-foreground ring-4 ring-primary/20",
          state === "upcoming" && "bg-muted text-muted-foreground",
        )}
      >
        {icon}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-full transition-all",
        state === "completed" && "bg-primary text-primary-foreground",
        state === "current" &&
          "bg-primary text-primary-foreground ring-4 ring-primary/20",
        state === "upcoming" && "bg-muted text-muted-foreground",
      )}
    >
      {state === "completed" ? (
        <CheckIcon className="size-4" aria-hidden="true" />
      ) : state === "current" ? (
        <CircleDotIcon className="size-4" aria-hidden="true" />
      ) : (
        <CircleIcon className="size-4" aria-hidden="true" />
      )}
    </span>
  );
}

// ============================================================================
// Exports
// ============================================================================

export { MilestoneStepper, MilestoneItem, MilestoneIcon };
export type { MilestoneData, MilestoneState };
