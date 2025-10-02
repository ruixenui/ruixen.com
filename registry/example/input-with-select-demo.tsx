"use client";

import InputWithSelect from "@/registry/ruixenui/input-with-select";

export default function InputWithSelectDemoPage() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Input with Select Demo</h1>

      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow">
        {/* Default usage */}
        <InputWithSelect />

        {/* Customized with INR and step 10 */}
        <InputWithSelect
          label="Price"
          placeholder="Enter amount"
          defaultValue="inr"
          step={10}
          options={[
            { value: "inr", label: "INR" },
            { value: "usd", label: "USD" },
            { value: "eur", label: "EUR" },
            { value: "gbp", label: "GBP" },
          ]}
        />

        {/* Another variant */}
        <InputWithSelect
          label="Distance"
          placeholder="0"
          defaultValue="km"
          step={0.5}
          options={[
            { value: "km", label: "Kilometers" },
            { value: "miles", label: "Miles" },
          ]}
        />
      </div>
    </main>
  );
}
