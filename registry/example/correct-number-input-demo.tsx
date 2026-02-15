import CorrectNumberInput from "@/registry/ruixenui/correct-number-input";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <CorrectNumberInput
        label="Quantity"
        hint="Use arrows or type a number"
        min={0}
        max={999}
      />
    </div>
  );
}
