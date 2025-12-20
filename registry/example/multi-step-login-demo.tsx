"use client";

import MultiStepLogin, {
  MultiStep,
} from "@/registry/ruixenui/multi-step-login";

export default function DemoMultiStepLogin() {
  const steps: MultiStep[] = [
    {
      title: "Step 1: Email",
      inputs: [
        {
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "you@example.com",
        },
      ],
      nextLabel: "Next →",
    },
    {
      title: "Step 2: Password & OTP",
      inputs: [
        {
          id: "password",
          type: "password",
          label: "Password",
          placeholder: "********",
        },
        {
          id: "otp",
          type: "text",
          label: "OTP",
          placeholder: "123456",
          optional: true,
        },
      ],
      backLabel: "← Back",
      nextLabel: "Next →",
    },
    {
      title: "Step 3: 2FA Verification",
      inputs: [
        {
          id: "2fa",
          type: "text",
          label: "2FA Code",
          placeholder: "Enter code",
        },
      ],
      backLabel: "← Back",
      submitLabel: "Verify & Login",
    },
  ];

  const handleChange = (values: Record<string, string>) => {
    console.log("Form changed:", values);
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted:", values);
    alert("Check console for submitted values!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <MultiStepLogin
        steps={steps}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
