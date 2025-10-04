import MultiStepButton from "@/registry/ruixenui/multi-step-button";

export default function DemoMultiStepButton() {
  const steps = ["Step 1: Fill Info", "Step 2: Confirm", "Step 3: Done"];

  return (
    <div className="flex gap-4">
      <MultiStepButton steps={steps} />
    </div>
  );
}
