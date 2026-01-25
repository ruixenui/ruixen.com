"use client";

import { useState } from "react";
import { NavStepper, NavStepData } from "@/registry/ruixenui/nav-stepper";

const formSteps: NavStepData[] = [
  { id: 1, label: "Details" },
  { id: 2, label: "Address" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

const tutorialSteps: NavStepData[] = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Features" },
  { id: 3, label: "Try It" },
  { id: 4, label: "Settings" },
  { id: 5, label: "Done" },
];

const slideSteps: NavStepData[] = [
  { id: 1, label: "Slide 1" },
  { id: 2, label: "Slide 2" },
  { id: 3, label: "Slide 3" },
  { id: 4, label: "Slide 4" },
];

export default function NavStepperDemo() {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(0);
  const [step3, setStep3] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleNavChange = (step: number) => {
    setLoading(true);
    setTimeout(() => {
      setStep2(step);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-16 p-8">
      {/* Numbered with Inline Navigation */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Numbered with Inline Arrows
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={formSteps}
            currentStep={step1}
            onStepChange={setStep1}
            variant="numbered"
            navPosition="inline"
          />
        </div>
      </div>

      {/* With Loading State */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Loading State
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={tutorialSteps}
            currentStep={step2}
            onStepChange={handleNavChange}
            variant="numbered"
            navPosition="inline"
            loading={loading}
          />
        </div>
      </div>

      {/* Dots Variant */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Dot Indicators
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={slideSteps}
            currentStep={step3}
            onStepChange={setStep3}
            variant="dots"
            navPosition="inline"
          />
        </div>
      </div>

      {/* Bar Variant */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Bar Indicators
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={formSteps}
            defaultStep={1}
            variant="bars"
            navPosition="inline"
          />
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Bottom Navigation
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={tutorialSteps}
            defaultStep={2}
            variant="numbered"
            navPosition="bottom"
          />
        </div>
      </div>

      {/* Without Navigation Buttons */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Click to Navigate
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <NavStepper
            steps={formSteps}
            defaultStep={1}
            variant="numbered"
            showNavButtons={false}
          />
        </div>
      </div>
    </div>
  );
}
