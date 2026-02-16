import InputWithSelect from "@/registry/ruixenui/input-with-select";

export default function InputWithSelectDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <InputWithSelect
        label="Amount"
        placeholder="0.00"
        options={[
          { value: "usd", label: "USD" },
          { value: "eur", label: "EUR" },
          { value: "inr", label: "INR" },
        ]}
        defaultOption="usd"
      />
    </div>
  );
}
