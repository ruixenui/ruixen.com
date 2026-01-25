"use client";

import {
  StepIndicator,
  StepItem,
  StepCircle,
  StepConnector,
} from "@/registry/ruixenui/step-indicator";

const steps = [1, 2, 3, 4, 5];

export default function StepIndicatorDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-12 p-8">
      {/* Basic Horizontal */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Basic Horizontal
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <StepIndicator defaultStep={3}>
            {steps.map((step, index) => (
              <StepItem key={step} step={step} className="flex-1">
                <StepCircle />
                {index < steps.length - 1 && <StepConnector />}
              </StepItem>
            ))}
          </StepIndicator>
        </div>
      </div>

      {/* All Completed */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          All Steps Completed
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <StepIndicator defaultStep={6}>
            {steps.map((step, index) => (
              <StepItem key={step} step={step} className="flex-1">
                <StepCircle />
                {index < steps.length - 1 && <StepConnector />}
              </StepItem>
            ))}
          </StepIndicator>
        </div>
      </div>

      {/* First Step Active */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          First Step Active
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <StepIndicator defaultStep={1}>
            {steps.map((step, index) => (
              <StepItem key={step} step={step} className="flex-1">
                <StepCircle />
                {index < steps.length - 1 && <StepConnector />}
              </StepItem>
            ))}
          </StepIndicator>
        </div>
      </div>

      {/* Vertical */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Vertical Layout
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <StepIndicator defaultStep={2} orientation="vertical">
            {steps.slice(0, 4).map((step, index) => (
              <StepItem key={step} step={step}>
                <StepCircle />
                {index < 3 && <StepConnector />}
              </StepItem>
            ))}
          </StepIndicator>
        </div>
      </div>

      {/* Numbers Only (No Checkmarks) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Numbers Only
        </h3>
        <div className="rounded-lg border bg-card p-6">
          <StepIndicator defaultStep={3}>
            {steps.map((step, index) => (
              <StepItem key={step} step={step} className="flex-1">
                <StepCircle showCheck={false} />
                {index < steps.length - 1 && <StepConnector />}
              </StepItem>
            ))}
          </StepIndicator>
        </div>
      </div>
    </div>
  );
}
