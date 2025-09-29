"use client";

import { useState } from "react";
import ModernCardInput from "@/registry/ruixenui/modern-card-input";

export default function CardDemoPage() {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold">Modern Card Input Demo</h1>

      <ModernCardInput
        label="Enter Your Card Details"
        showPreview={true}
        onChange={(data) => setCardData(data)}
      />

      <div className="w-full max-w-md p-4 rounded-xl border bg-white shadow-md space-y-2">
        <h2 className="text-lg font-medium">Card Data Preview:</h2>
        <p>
          <strong>Number:</strong> {cardData.number || "—"}
        </p>
        <p>
          <strong>Expiry:</strong> {cardData.expiry || "—"}
        </p>
        <p>
          <strong>CVC:</strong> {cardData.cvc || "—"}
        </p>
      </div>
    </div>
  );
}
