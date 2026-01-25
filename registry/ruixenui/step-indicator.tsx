"use client";

import * as React from "react";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

type StepState = "active" | "completed" | "inactive" | "loading";

interface StepIndicatorContextValue {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
}

interface StepItemContextValue {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
}

// ============================================================================
// Contexts
// ============================================================================

const StepIndicatorContext = React.createContext<
  StepIndicatorContextValue | undefined
>(undefined);
const StepItemContext = React.createContext<StepItemContextValue | undefined>(
  undefined,
);

function useStepIndicator() {
  const context = React.useContext(StepIndicatorContext);
  if (!context) {
    throw new Error("useStepIndicator must be used within a StepIndicator");
  }
  return context;
}

function useStepItem() {
  const context = React.useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepItem");
  }
  return context;
}

// ============================================================================
// StepIndicator - Root Container
// ============================================================================

interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
}

function StepIndicator({
  defaultStep = 1,
  currentStep,
  onStepChange,
  orientation = "horizontal",
  className,
  ...props
}: StepIndicatorProps) {
  const [activeStep, setInternalStep] = React.useState(defaultStep);

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (currentStep === undefined) {
        setInternalStep(step);
      }
      onStepChange?.(step);
    },
    [currentStep, onStepChange],
  );

  const step = currentStep ?? activeStep;

  return (
    <StepIndicatorContext.Provider
      value={{ activeStep: step, setActiveStep, orientation }}
    >
      <div
        className={cn(
          "group/steps inline-flex",
          orientation === "horizontal"
            ? "w-full flex-row items-center"
            : "flex-col",
          className,
        )}
        data-orientation={orientation}
        {...props}
      />
    </StepIndicatorContext.Provider>
  );
}

// ============================================================================
// StepItem - Individual Step Container
// ============================================================================

interface StepItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function StepItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepItemProps) {
  const { activeStep } = useStepIndicator();

  const state: StepState =
    completed || step < activeStep
      ? "completed"
      : activeStep === step
        ? "active"
        : "inactive";

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider
      value={{ step, state, isDisabled: disabled, isLoading }}
    >
      <div
        className={cn(
          "group/step flex items-center",
          "group-data-[orientation=horizontal]/steps:flex-row",
          "group-data-[orientation=vertical]/steps:flex-col",
          className,
        )}
        data-state={state}
        data-loading={isLoading || undefined}
        {...props}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  );
}

// ============================================================================
// StepCircle - The Numbered Circle Indicator
// ============================================================================

interface StepCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  showCheck?: boolean;
}

function StepCircle({
  showCheck = true,
  className,
  ...props
}: StepCircleProps) {
  const { state, step, isLoading } = useStepItem();

  return (
    <span
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
        "bg-muted text-muted-foreground",
        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        "data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground",
        className,
      )}
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
      ) : state === "completed" && showCheck ? (
        <CheckIcon className="size-4" aria-hidden="true" />
      ) : (
        <span>{step}</span>
      )}
    </span>
  );
}

// ============================================================================
// StepConnector - Line Between Steps
// ============================================================================

interface StepConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

function StepConnector({ className, ...props }: StepConnectorProps) {
  const { state } = useStepItem();

  return (
    <div
      className={cn(
        "bg-muted transition-colors",
        "group-data-[orientation=horizontal]/steps:mx-2 group-data-[orientation=horizontal]/steps:h-0.5 group-data-[orientation=horizontal]/steps:flex-1",
        "group-data-[orientation=vertical]/steps:ml-4 group-data-[orientation=vertical]/steps:h-8 group-data-[orientation=vertical]/steps:w-0.5",
        state === "completed" && "bg-primary",
        className,
      )}
      {...props}
    />
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  StepIndicator,
  StepItem,
  StepCircle,
  StepConnector,
  useStepIndicator,
  useStepItem,
};
