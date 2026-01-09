import MultiStepButton from "@/registry/ruixenui/multi-step-button";

export default function DemoMultiStepButton() {
  const steps = ["Step 1: Fill Info", "Step 2: Confirm", "Step 3: Done"];

  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center">
      <MultiStepButton steps={steps} />
    </div>
  );
}
