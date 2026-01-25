"use client";

import { useState } from "react";
import { ProgressTracker } from "@/registry/ruixenui/progress-tracker";
import { Button } from "@/components/ui/button";

export default function ProgressTrackerDemo() {
  const [step1, setStep1] = useState(3);
  const [step2, setStep2] = useState(2);
  const [step3, setStep3] = useState(4);

  return (
    <div className="w-full max-w-xl mx-auto space-y-16 p-8">
      {/* Segmented Progress */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Segmented Progress
        </h3>
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <ProgressTracker
            totalSteps={5}
            currentStep={step1}
            onStepChange={setStep1}
            variant="segments"
          />
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep1((prev) => Math.max(prev - 1, 1))}
              disabled={step1 === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setStep1((prev) => Math.min(prev + 1, 5))}
              disabled={step1 === 5}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Continuous Bar */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Continuous Bar
        </h3>
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <ProgressTracker
            totalSteps={6}
            currentStep={step2}
            onStepChange={setStep2}
            variant="bar"
          />
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep2((prev) => Math.max(prev - 1, 1))}
              disabled={step2 === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setStep2((prev) => Math.min(prev + 1, 6))}
              disabled={step2 === 6}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Dot Indicators
        </h3>
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <ProgressTracker
            totalSteps={7}
            currentStep={step3}
            onStepChange={setStep3}
            variant="dots"
          />
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep3((prev) => Math.max(prev - 1, 1))}
              disabled={step3 === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setStep3((prev) => Math.min(prev + 1, 7))}
              disabled={step3 === 7}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Label on Top */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Label on Top
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <ProgressTracker
            totalSteps={4}
            currentStep={2}
            variant="segments"
            labelPosition="top"
          />
        </div>
      </div>

      {/* Without Label */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Without Label
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <ProgressTracker
            totalSteps={5}
            currentStep={3}
            variant="segments"
            showLabel={false}
          />
        </div>
      </div>
    </div>
  );
}
