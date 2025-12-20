// demo/SuccessLoginDemo.tsx
"use client";

import * as React from "react";
import SuccessLoginCard from "@/registry/ruixenui/success-login-card";

export default function DemoOne() {
  const [form, setForm] = React.useState<{ [key: string]: string }>({});

  const handleChange = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    console.log("Form Submitted:", form);
    // Fake API delay
    await new Promise((res) => setTimeout(res, 1000));
    return true; // simulate success
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <SuccessLoginCard
        title="Create Your Account"
        description="Fill in the details below to get started"
        fields={[
          {
            id: "name",
            label: "Full Name",
            type: "text",
            placeholder: "John Doe",
          },
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
          },
          {
            id: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "+91 98765 43210",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
          },
          {
            id: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "********",
          },
          {
            id: "company",
            label: "Company / Organization",
            type: "text",
            placeholder: "Ruixen Pvt. Ltd.",
          },
          {
            id: "role",
            label: "Role",
            type: "text",
            placeholder: "Software Developer",
          },
        ]}
        onChange={handleChange}
        onSubmit={handleSubmit}
        successMessage="🎉 Account Created Successfully!"
        animationType="color-shift"
      />
    </div>
  );
}
