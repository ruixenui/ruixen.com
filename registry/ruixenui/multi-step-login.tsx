"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface MultiStepInput {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
}

export interface MultiStep {
  title?: string;
  inputs: MultiStepInput[];
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
}

interface MultiStepLoginProps {
  steps: MultiStep[];
  className?: string;
  onChange?: (values: Record<string, string>) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

export default function MultiStepLogin({
  steps,
  className,
  onChange,
  onSubmit,
}: MultiStepLoginProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [values, setValues] = React.useState<Record<string, string>>(
    steps.reduce(
      (acc, step) => {
        step.inputs.forEach((input) => {
          acc[input.id] = "";
        });
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (id: string, value: string) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    onChange?.(newValues);
  };

  const handleSubmit = () => {
    onSubmit?.(values);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6",
        className,
      )}
    >
      {/* Step Indicator */}
      <div className="flex justify-between mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600",
              currentStep >= index && "bg-blue-500",
            )}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex flex-col gap-4">
        {steps[currentStep].inputs.map((input) => (
          <div key={input.id}>
            <Label htmlFor={input.id}>
              {input.label}
              {input.optional ? " (Optional)" : ""}
            </Label>
            <Input
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.id]}
              onChange={(e) => handleChange(input.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Step Buttons */}
      <div className="flex justify-between mt-2">
        {currentStep > 0 && (
          <Button variant="outline" onClick={prevStep}>
            {steps[currentStep].backLabel || "Back"}
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>
            {steps[currentStep].nextLabel || "Next"}
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            {steps[currentStep].submitLabel || "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
}
