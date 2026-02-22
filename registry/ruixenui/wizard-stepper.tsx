"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────────────

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

// ── Context ─────────────────────────────────────────────────────────────────

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

// ── WizardStepper ───────────────────────────────────────────────────────────

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
      if (controlledStep === undefined) setInternalStep(step);
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
      <div className={cn("w-full", className)} {...props}>
        <div
          className={cn(
            orientation === "horizontal"
              ? "flex items-start"
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

// ── WizardStepItem ──────────────────────────────────────────────────────────

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
          : "flex-row items-start gap-3",
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {orientation === "vertical" && (
          <div className="flex flex-col items-center">
            <WizardCircle step={step + 1} state={state} isLoading={isLoading} />
            {!isLast && (
              <motion.div
                className={cn(
                  "mt-2 w-px",
                  state === "completed"
                    ? "bg-foreground/20"
                    : "bg-foreground/[0.06]",
                )}
                initial={false}
                animate={{ height: 36 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
          orientation === "horizontal"
            ? "mt-2.5 max-w-[100px]"
            : "pt-0.5 pb-8",
        )}
      >
        <p
          className={cn(
            "text-[13px] font-medium transition-colors duration-200",
            state === "active" && "text-foreground",
            state === "completed" && "text-foreground/55",
            state === "pending" && "text-foreground/25",
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              "mt-0.5 text-[11px] transition-colors duration-200",
              state === "pending" ? "text-foreground/15" : "text-foreground/35",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// ── WizardCircle ────────────────────────────────────────────────────────────

interface WizardCircleProps {
  step: number;
  state: WizardStepState;
  isLoading: boolean;
}

function WizardCircle({ step, state, isLoading }: WizardCircleProps) {
  return (
    <div className="relative">
      {state === "active" && (
        <motion.div
          className="absolute -inset-1 rounded-full border border-foreground/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
      <motion.span
        className={cn(
          "relative flex size-7 items-center justify-center rounded-full text-[11px] font-semibold",
          state === "completed" && "bg-foreground text-background",
          state === "active" && "bg-foreground text-background",
          state === "pending" && "bg-foreground/[0.04] text-foreground/25",
        )}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isLoading ? (
          <motion.div
            className="size-3 rounded-full border-[1.5px] border-background/30 border-t-background"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
          />
        ) : state === "completed" ? (
          <CheckIcon className="size-3.5" />
        ) : (
          step
        )}
      </motion.span>
    </div>
  );
}

// ── WizardConnector ─────────────────────────────────────────────────────────

interface WizardConnectorProps {
  state: WizardStepState;
}

function WizardConnector({ state }: WizardConnectorProps) {
  return (
    <div className="relative mx-2 mt-3.5 h-px flex-1 overflow-hidden bg-foreground/[0.06]">
      <motion.div
        className="absolute inset-y-0 left-0 bg-foreground/25"
        initial={false}
        animate={{ width: state === "completed" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

// ── Exports ─────────────────────────────────────────────────────────────────

export { WizardStepper, useWizard };
export type { WizardStepData, WizardStepState };
