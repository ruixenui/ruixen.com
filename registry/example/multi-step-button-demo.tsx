import MultiStepButton from "@/registry/ruixenui/multi-step-button";

export default function DemoMultiStepButton() {
  const steps = ["Step 1: Fill Info", "Step 2: Confirm", "Step 3: Done"];

  return (
    <div className="flex p-6 flex-col items-center justify-center min-h-screen">
      <MultiStepButton steps={steps} />
    </div>
  );
}
