"use client";

import * as React from "react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import SocialAuthCard, {
  SocialProvider,
  FormInput,
} from "@/registry/ruixenui/social-auth-card";

export default function DemoSocialAuthPage() {
  const socialProviders: SocialProvider[] = [
    {
      id: "google",
      label: "Continue with Google",
      icon: <FaGoogle />,
      colorClass: "bg-red-500",
      textColorClass: "text-white",
      onClick: () => alert("Google clicked"),
    },
    {
      id: "github",
      label: "Continue with GitHub",
      icon: <FaGithub />,
      colorClass: "bg-gray-900",
      textColorClass: "text-white",
      onClick: () => alert("GitHub clicked"),
    },
    {
      id: "linkedin",
      label: "Continue with LinkedIn",
      icon: <FaLinkedin />,
      colorClass: "bg-blue-600",
      textColorClass: "text-white",
      onClick: () => alert("LinkedIn clicked"),
    },
  ];

  const formInputs: FormInput[] = [
    {
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "you@example.com",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "********",
    },
    { id: "otp", type: "text", label: "OTP", placeholder: "Optional OTP" },
  ];

  const handleChange = (values: Record<string, string>) => {
    console.log("Input changed:", values);
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted with:", values);
    alert("Check console for submitted values!");
  };

  return (
    <div className="flex items-center justify-center py-16">
      <SocialAuthCard
        socialProviders={socialProviders}
        formInputs={formInputs}
        buttonLabel="Sign In"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
