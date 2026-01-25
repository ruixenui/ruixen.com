"use client";

import { useState } from "react";
import {
  WizardStepper,
  WizardStepData,
} from "@/registry/ruixenui/wizard-stepper";
import { Button } from "@/components/ui/button";

const accountSteps: WizardStepData[] = [
  { id: 1, title: "Account", description: "Create your account" },
  { id: 2, title: "Profile", description: "Set up your profile" },
  { id: 3, title: "Preferences", description: "Customize settings" },
  { id: 4, title: "Complete", description: "Review and finish" },
];

const checkoutSteps: WizardStepData[] = [
  { id: 1, title: "Cart", description: "Review items" },
  { id: 2, title: "Shipping", description: "Delivery address" },
  { id: 3, title: "Payment", description: "Payment method" },
  { id: 4, title: "Confirm", description: "Place order" },
];

const onboardingSteps: WizardStepData[] = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Personal Info" },
  { id: 3, title: "Verification" },
  { id: 4, title: "Setup Complete" },
];

export default function WizardStepperDemo() {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setStep1((prev) => Math.min(prev + 1, accountSteps.length - 1));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-16 p-8">
      {/* Horizontal with Descriptions */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Horizontal with Descriptions
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <WizardStepper
            steps={accountSteps}
            currentStep={step1}
            onStepChange={setStep1}
            loading={loading}
          />
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setStep1((prev) => Math.max(prev - 1, 0))}
              disabled={step1 === 0 || loading}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={step1 >= accountSteps.length - 1 || loading}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Flow */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Checkout Flow
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <WizardStepper
            steps={checkoutSteps}
            currentStep={step2}
            onStepChange={setStep2}
          />
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setStep2((prev) => Math.max(prev - 1, 0))}
              disabled={step2 === 0}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                setStep2((prev) => Math.min(prev + 1, checkoutSteps.length - 1))
              }
              disabled={step2 >= checkoutSteps.length - 1}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Vertical Layout */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Vertical Layout
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <WizardStepper
            steps={accountSteps}
            currentStep={2}
            orientation="vertical"
          />
        </div>
      </div>

      {/* Simple Labels Only */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Simple Labels
        </h3>
        <div className="rounded-lg border bg-card p-8">
          <WizardStepper steps={onboardingSteps} currentStep={1} />
        </div>
      </div>
    </div>
  );
}
