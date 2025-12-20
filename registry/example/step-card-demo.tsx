"use client";

import StepCard from "@/registry/ruixenui/step-card";

export default function StepCardDemoPage() {
  const handleComplete = (data: {
    email: string;
    password: string;
    otp: string;
  }) => {
    console.log("Form Completed ✅", data);
    alert(
      `Form Completed!\nEmail: ${data.email}\nPassword: ${data.password}\nOTP: ${data.otp}`,
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16">
      <StepCard onComplete={handleComplete} />
    </main>
  );
}
