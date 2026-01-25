"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface ProgressTrackerContextValue {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
}

// ============================================================================
// Context
// ============================================================================

const ProgressTrackerContext = React.createContext<
  ProgressTrackerContextValue | undefined
>(undefined);

function useProgressTracker() {
  const context = React.useContext(ProgressTrackerContext);
  if (!context) {
    throw new Error("useProgressTracker must be used within a ProgressTracker");
  }
  return context;
}

// ============================================================================
// ProgressTracker - Root Container
// ============================================================================

interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  totalSteps: number;
  defaultStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  showLabel?: boolean;
  labelPosition?: "top" | "bottom";
  variant?: "bar" | "segments" | "dots";
}

function ProgressTracker({
  totalSteps,
  defaultStep = 1,
  currentStep: controlledStep,
  onStepChange,
  showLabel = true,
  labelPosition = "bottom",
  variant = "segments",
  className,
  ...props
}: ProgressTrackerProps) {
  const [internalStep, setInternalStep] = React.useState(defaultStep);
  const currentStep = controlledStep ?? internalStep;

  const setCurrentStep = React.useCallback(
    (step: number) => {
      const clampedStep = Math.max(1, Math.min(step, totalSteps));
      if (controlledStep === undefined) {
        setInternalStep(clampedStep);
      }
      onStepChange?.(clampedStep);
    },
    [controlledStep, onStepChange, totalSteps],
  );

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <ProgressTrackerContext.Provider
      value={{ currentStep, totalSteps, setCurrentStep }}
    >
      <div className={cn("w-full space-y-3", className)} {...props}>
        {showLabel && labelPosition === "top" && (
          <ProgressLabel currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {variant === "bar" && <ProgressBar progress={progressPercent} />}

        {variant === "segments" && (
          <ProgressSegments
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={setCurrentStep}
          />
        )}

        {variant === "dots" && (
          <ProgressDots
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={setCurrentStep}
          />
        )}

        {showLabel && labelPosition === "bottom" && (
          <ProgressLabel currentStep={currentStep} totalSteps={totalSteps} />
        )}
      </div>
    </ProgressTrackerContext.Provider>
  );
}

// ============================================================================
// ProgressLabel - Step X of Y
// ============================================================================

interface ProgressLabelProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressLabel({ currentStep, totalSteps }: ProgressLabelProps) {
  return (
    <p className="text-center text-sm font-medium text-muted-foreground tabular-nums">
      Step {currentStep} of {totalSteps}
    </p>
  );
}

// ============================================================================
// ProgressBar - Continuous Progress Bar
// ============================================================================

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

// ============================================================================
// ProgressSegments - Segmented Progress Bar
// ============================================================================

interface ProgressSegmentsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

function ProgressSegments({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressSegmentsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <button
          key={step}
          onClick={() => onStepClick(step)}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors",
            step <= currentStep ? "bg-primary" : "bg-muted",
            "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={`Go to step ${step}`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// ProgressDots - Dot Indicators
// ============================================================================

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

function ProgressDots({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <button
          key={step}
          onClick={() => onStepClick(step)}
          className={cn(
            "rounded-full transition-all",
            step === currentStep
              ? "size-3 bg-primary"
              : step < currentStep
                ? "size-2.5 bg-primary"
                : "size-2.5 bg-muted",
            "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={`Go to step ${step}`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  ProgressTracker,
  ProgressLabel,
  ProgressBar,
  ProgressSegments,
  ProgressDots,
  useProgressTracker,
};
