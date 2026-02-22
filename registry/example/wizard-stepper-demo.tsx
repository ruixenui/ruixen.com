"use client";

import { useState } from "react";
import {
  WizardStepper,
  WizardStepData,
} from "@/registry/ruixenui/wizard-stepper";

const steps: WizardStepData[] = [
  { id: 1, title: "Account", description: "Create your account" },
  { id: 2, title: "Profile", description: "Set up your profile" },
  { id: 3, title: "Settings", description: "Customize preferences" },
  { id: 4, title: "Complete", description: "Review and finish" },
];

export default function WizardStepperDemo() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full max-w-xl mx-auto p-8">
      <WizardStepper
        steps={steps}
        currentStep={step}
        onStepChange={setStep}
      />
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          className="rounded-lg px-4 py-2 text-[13px] font-medium text-foreground/50 transition-colors hover:bg-foreground/[0.04] hover:text-foreground disabled:cursor-not-allowed disabled:text-foreground/15"
        >
          Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
          disabled={step >= steps.length - 1}
          className="rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
