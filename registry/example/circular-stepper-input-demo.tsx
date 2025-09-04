import CircularStepperInput from "../ruixenui/circular-stepper-input";

export default function DemoCircularStepper() {
  const handleChange = (value: number) => {
    console.log("Current value:", value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      {/* <CircularStepperInput onChange={handleChange} /> */}
      <CircularStepperInput
        min={10}
        max={200}
        step={5}
        defaultValue={50}
        size={150}
      />
    </div>
  );
}
