"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  LoaderCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ============================================================================
// Types
// ============================================================================

interface NavStepData {
  id: string | number;
  label: string;
}

interface NavStepperContextValue {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLoading: boolean;
}

// ============================================================================
// Context
// ============================================================================

const NavStepperContext = React.createContext<
  NavStepperContextValue | undefined
>(undefined);

function useNavStepper() {
  const context = React.useContext(NavStepperContext);
  if (!context) {
    throw new Error("useNavStepper must be used within a NavStepper");
  }
  return context;
}

// ============================================================================
// NavStepper - Root Container
// ============================================================================

interface NavStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: NavStepData[];
  defaultStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  loading?: boolean;
  showNavButtons?: boolean;
  navPosition?: "inline" | "bottom";
  variant?: "numbered" | "dots" | "bars";
}

function NavStepper({
  steps,
  defaultStep = 0,
  currentStep: controlledStep,
  onStepChange,
  loading = false,
  showNavButtons = true,
  navPosition = "inline",
  variant = "numbered",
  className,
  children,
  ...props
}: NavStepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultStep);
  const currentStep = controlledStep ?? internalStep;
  const totalSteps = steps.length;

  const goToStep = React.useCallback(
    (step: number) => {
      const clampedStep = Math.max(0, Math.min(step, totalSteps - 1));
      if (controlledStep === undefined) {
        setInternalStep(clampedStep);
      }
      onStepChange?.(clampedStep);
    },
    [controlledStep, onStepChange, totalSteps],
  );

  const goNext = React.useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const goPrev = React.useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const canGoNext = currentStep < totalSteps - 1;
  const canGoPrev = currentStep > 0;

  return (
    <NavStepperContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToStep,
        goNext,
        goPrev,
        canGoNext,
        canGoPrev,
        isLoading: loading,
      }}
    >
      <div className={cn("w-full space-y-6", className)} {...props}>
        <div
          className={cn(
            "flex items-center",
            navPosition === "inline" ? "gap-2" : "justify-center",
          )}
        >
          {showNavButtons && navPosition === "inline" && (
            <NavButton direction="prev" />
          )}

          <div className="flex-1">
            {variant === "numbered" && (
              <NavStepIndicators steps={steps} currentStep={currentStep} />
            )}
            {variant === "dots" && (
              <NavDotIndicators
                steps={steps}
                currentStep={currentStep}
                onStepClick={goToStep}
              />
            )}
            {variant === "bars" && (
              <NavBarIndicators
                steps={steps}
                currentStep={currentStep}
                onStepClick={goToStep}
              />
            )}
          </div>

          {showNavButtons && navPosition === "inline" && (
            <NavButton direction="next" />
          )}
        </div>

        {children}

        {showNavButtons && navPosition === "bottom" && (
          <div className="flex justify-center gap-4">
            <NavButton direction="prev" showLabel />
            <NavButton direction="next" showLabel />
          </div>
        )}
      </div>
    </NavStepperContext.Provider>
  );
}

// ============================================================================
// NavButton - Navigation Button
// ============================================================================

interface NavButtonProps {
  direction: "prev" | "next";
  showLabel?: boolean;
}

function NavButton({ direction, showLabel = false }: NavButtonProps) {
  const { goNext, goPrev, canGoNext, canGoPrev, isLoading } = useNavStepper();

  const isPrev = direction === "prev";
  const disabled = isPrev ? !canGoPrev : !canGoNext;
  const onClick = isPrev ? goPrev : goNext;
  const Icon = isPrev ? ChevronLeftIcon : ChevronRightIcon;
  const label = isPrev ? "Previous" : "Next";

  if (showLabel) {
    return (
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled || isLoading}
        className="min-w-[100px]"
      >
        {isPrev && <Icon className="mr-2 size-4" />}
        {isLoading && !isPrev ? (
          <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        {label}
        {!isPrev && !isLoading && <Icon className="ml-2 size-4" />}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="shrink-0"
    >
      {isLoading && !isPrev ? (
        <LoaderCircleIcon className="size-4 animate-spin" />
      ) : (
        <Icon className="size-4" />
      )}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

// ============================================================================
// NavStepIndicators - Numbered Step Indicators
// ============================================================================

interface NavStepIndicatorsProps {
  steps: NavStepData[];
  currentStep: number;
}

function NavStepIndicators({ steps, currentStep }: NavStepIndicatorsProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                index < currentStep && "bg-primary text-primary-foreground",
                index === currentStep &&
                  "bg-primary text-primary-foreground ring-4 ring-primary/20",
                index > currentStep && "bg-muted text-muted-foreground",
              )}
            >
              {index < currentStep ? (
                <CheckIcon className="size-4" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mx-2 h-0.5 flex-1",
                index < currentStep ? "bg-primary" : "bg-muted",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================================
// NavDotIndicators - Dot Step Indicators
// ============================================================================

interface NavDotIndicatorsProps {
  steps: NavStepData[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

function NavDotIndicators({
  steps,
  currentStep,
  onStepClick,
}: NavDotIndicatorsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepClick(index)}
          className={cn(
            "rounded-full transition-all",
            index === currentStep
              ? "size-3 bg-primary"
              : index < currentStep
                ? "size-2.5 bg-primary"
                : "size-2.5 bg-muted hover:bg-muted-foreground/30",
          )}
          aria-label={`Go to ${step.label}`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// NavBarIndicators - Bar Step Indicators
// ============================================================================

interface NavBarIndicatorsProps {
  steps: NavStepData[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

function NavBarIndicators({
  steps,
  currentStep,
  onStepClick,
}: NavBarIndicatorsProps) {
  return (
    <div className="flex gap-1">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepClick(index)}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            index <= currentStep
              ? "bg-primary"
              : "bg-muted hover:bg-muted-foreground/30",
          )}
          aria-label={`Go to ${step.label}`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  NavStepper,
  NavButton,
  NavStepIndicators,
  NavDotIndicators,
  NavBarIndicators,
  useNavStepper,
};
export type { NavStepData };
