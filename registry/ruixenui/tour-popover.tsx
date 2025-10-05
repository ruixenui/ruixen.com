"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

export interface TourStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TourPopoverProps {
  steps: TourStep[];
  triggerLabel?: string;
  popoverWidth?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function TourPopover({
  steps,
  triggerLabel = "Start tour",
  popoverWidth = "w-80",
  side = "bottom",
  align = "center",
}: TourPopoverProps) {
  const [step, setStep] = useState(0);

  if (!steps || steps.length === 0) return null;

  const Icon = steps[step].icon;
  const progress = ((step + 1) / steps.length) * 100;

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => setStep(0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${popoverWidth} space-y-4 p-4`}
        side={side}
        align={align}
      >
        {/* Step header */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">{steps[step].title}</p>
            <p className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </p>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <p className="text-sm leading-relaxed">{steps[step].description}</p>

        {/* Progress bar */}
        <Progress value={progress} className="h-2" />

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          {step > 0 ? (
            <Button variant="ghost" size="sm" onClick={prev}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step === steps.length - 1 ? (
            <Button size="sm" onClick={restart}>
              Restart
            </Button>
          ) : (
            <Button size="sm" onClick={next}>
              Next
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
