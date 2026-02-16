import CircularStepperInput from "../ruixenui/circular-stepper-input";

export default function DemoCircularStepper() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <CircularStepperInput
        min={0}
        max={100}
        step={5}
        defaultValue={50}
        label="Volume"
      />
    </div>
  );
}
