"use client";

import * as React from "react";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

type WizardStepState = "active" | "completed" | "pending";

interface WizardStepData {
  id: string | number;
  title: string;
  description?: string;
}

interface WizardContextValue {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  isLoading: boolean;
}

// ============================================================================
// Context
// ============================================================================

const WizardContext = React.createContext<WizardContextValue | undefined>(
  undefined,
);

function useWizard() {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardStepper");
  }
  return context;
}

// ============================================================================
// WizardStepper - Root Container
// ============================================================================

interface WizardStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStepData[];
  defaultStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  loading?: boolean;
  orientation?: "horizontal" | "vertical";
}

function WizardStepper({
  steps,
  defaultStep = 0,
  currentStep: controlledStep,
  onStepChange,
  loading = false,
  orientation = "horizontal",
  className,
  ...props
}: WizardStepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultStep);
  const currentStep = controlledStep ?? internalStep;

  const setCurrentStep = React.useCallback(
    (step: number) => {
      if (controlledStep === undefined) {
        setInternalStep(step);
      }
      onStepChange?.(step);
    },
    [controlledStep, onStepChange],
  );

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps: steps.length,
        isLoading: loading,
      }}
    >
      <div
        className={cn(
          "w-full",
          orientation === "horizontal" ? "space-y-0" : "space-y-0",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            orientation === "horizontal"
              ? "flex items-start justify-between"
              : "flex flex-col gap-0",
          )}
        >
          {steps.map((step, index) => {
            const state: WizardStepState =
              index < currentStep
                ? "completed"
                : index === currentStep
                  ? "active"
                  : "pending";

            return (
              <React.Fragment key={step.id}>
                <WizardStepItem
                  step={index}
                  state={state}
                  title={step.title}
                  description={step.description}
                  isLast={index === steps.length - 1}
                  orientation={orientation}
                  isLoading={loading && index === currentStep}
                  onClick={() => setCurrentStep(index)}
                />
                {index < steps.length - 1 && orientation === "horizontal" && (
                  <WizardConnector state={state} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </WizardContext.Provider>
  );
}

// ============================================================================
// WizardStepItem - Individual Step
// ============================================================================

interface WizardStepItemProps {
  step: number;
  state: WizardStepState;
  title: string;
  description?: string;
  isLast: boolean;
  orientation: "horizontal" | "vertical";
  isLoading: boolean;
  onClick: () => void;
}

function WizardStepItem({
  step,
  state,
  title,
  description,
  isLast,
  orientation,
  isLoading,
  onClick,
}: WizardStepItemProps) {
  return (
    <div
      className={cn(
        "group flex cursor-pointer",
        orientation === "horizontal"
          ? "flex-col items-center text-center"
          : "flex-row items-start gap-4",
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {orientation === "vertical" && (
          <div className="flex flex-col items-center">
            <WizardCircle step={step + 1} state={state} isLoading={isLoading} />
            {!isLast && (
              <div
                className={cn(
                  "mt-2 h-12 w-0.5 transition-colors",
                  state === "completed" ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        )}
        {orientation === "horizontal" && (
          <WizardCircle step={step + 1} state={state} isLoading={isLoading} />
        )}
      </div>

      <div
        className={cn(
          orientation === "horizontal" ? "mt-3 max-w-[120px]" : "pt-1 pb-8",
        )}
      >
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            state === "active"
              ? "text-foreground"
              : state === "completed"
                ? "text-foreground"
                : "text-muted-foreground",
          )}
        >
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// WizardCircle - Step Number/Check Circle
// ============================================================================

interface WizardCircleProps {
  step: number;
  state: WizardStepState;
  isLoading: boolean;
}

function WizardCircle({ step, state, isLoading }: WizardCircleProps) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all",
        state === "completed" && "bg-primary text-primary-foreground",
        state === "active" &&
          "bg-primary text-primary-foreground ring-4 ring-primary/20",
        state === "pending" && "bg-muted text-muted-foreground",
      )}
    >
      {isLoading ? (
        <LoaderCircleIcon className="size-5 animate-spin" aria-hidden="true" />
      ) : state === "completed" ? (
        <CheckIcon className="size-5" aria-hidden="true" />
      ) : (
        step
      )}
    </span>
  );
}

// ============================================================================
// WizardConnector - Horizontal Line Between Steps
// ============================================================================

interface WizardConnectorProps {
  state: WizardStepState;
}

function WizardConnector({ state }: WizardConnectorProps) {
  return (
    <div
      className={cn(
        "mx-4 mt-5 h-0.5 flex-1 transition-colors",
        state === "completed" ? "bg-primary" : "bg-muted",
      )}
    />
  );
}

// ============================================================================
// Exports
// ============================================================================

export { WizardStepper, useWizard };
export type { WizardStepData, WizardStepState };
