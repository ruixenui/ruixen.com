"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────────────

interface MilestoneData {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
}

type MilestoneState = "completed" | "current" | "upcoming";

// ── MilestoneStepper ────────────────────────────────────────────────────────

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
  );
}

// ── MilestoneItem ───────────────────────────────────────────────────────────

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
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.06,
      }}
    >
      {/* Indicator column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="mt-[5px]">
          <MilestoneIcon state={state} icon={milestone.icon} />
        </div>
        {!isLast && (
          <div
            className={cn(
              "mt-1.5 flex-1 w-px",
              lineStyle === "dashed" ? "border-l border-dashed" : "",
              state === "completed"
                ? lineStyle === "dashed"
                  ? "border-foreground/20"
                  : "bg-foreground/20"
                : lineStyle === "dashed"
                  ? "border-foreground/[0.06]"
                  : "bg-foreground/[0.06]",
            )}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 min-w-0",
          variant === "compact" ? "pb-3" : variant === "detailed" ? "pb-8" : "pb-6",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4
              className={cn(
                "text-[13px] font-medium leading-tight",
                state === "completed" && "text-foreground/60",
                state === "current" && "text-foreground",
                state === "upcoming" && "text-foreground/30",
              )}
            >
              {milestone.title}
            </h4>
            {milestone.description && variant !== "compact" && (
              <p
                className={cn(
                  "mt-1 text-[12px] leading-relaxed",
                  state === "upcoming"
                    ? "text-foreground/20"
                    : "text-foreground/40",
                )}
              >
                {milestone.description}
              </p>
            )}
          </div>
          {milestone.date && (
            <span
              className={cn(
                "shrink-0 text-[11px] font-medium tabular-nums",
                state === "upcoming"
                  ? "text-foreground/20"
                  : "text-foreground/30",
              )}
            >
              {milestone.date}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── MilestoneIcon ───────────────────────────────────────────────────────────

interface MilestoneIconProps {
  state: MilestoneState;
  icon?: React.ReactNode;
}

function MilestoneIcon({ state, icon }: MilestoneIconProps) {
  if (icon) {
    return (
      <motion.div
        className={cn(
          "flex size-5 items-center justify-center rounded-full",
          state === "completed" && "bg-foreground text-background",
          state === "current" &&
            "bg-foreground text-background ring-[3px] ring-foreground/[0.08]",
          state === "upcoming" && "bg-foreground/[0.06] text-foreground/30",
        )}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className="[&>svg]:size-2.5">{icon}</span>
      </motion.div>
    );
  }

  return (
    <div className="relative flex items-center justify-center size-[18px]">
      {state === "current" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full border border-foreground/[0.12]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      )}
      <motion.div
        className={cn(
          "rounded-full",
          state === "completed" && "bg-foreground/80",
          state === "current" && "bg-foreground",
          state === "upcoming" && "bg-foreground/[0.12]",
        )}
        initial={false}
        animate={{
          width: state === "current" ? 7 : 5,
          height: state === "current" ? 7 : 5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}

// ── Exports ─────────────────────────────────────────────────────────────────

export { MilestoneStepper, MilestoneItem, MilestoneIcon };
export type { MilestoneData, MilestoneState };
