"use client";

import FlipCard, { FlipCardField } from "@/registry/ruixenui/flip-card";
import { FaSmile, FaUserCheck, FaStar, FaShieldAlt } from "react-icons/fa";

export default function DemoFlipCard() {
  const handleLogin = async (data: Record<string, string>) => {
    console.log("Login attempt:", data);
    await new Promise((r) => setTimeout(r, 1000)); // simulate delay
    return data.email === "demo@example.com" && data.password === "1234";
  };

  const fields: FlipCardField[] = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "••••••••",
    },
    { name: "otp", type: "text", label: "OTP", placeholder: "123456" },
  ];

  const frontInfo = (
    <div className="mt-4 space-y-3 text-sm text-gray-700">
      <p>🚀 Fast onboarding to get started quickly.</p>
      <p>🔒 Secure login with 2FA support.</p>
      <p>⭐ Personalized dashboard and insights.</p>
      <div className="flex gap-3 justify-center mt-2">
        <FaStar className="text-yellow-400" />
        <FaShieldAlt className="text-blue-500" />
        <FaSmile className="text-green-400" />
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center py-16">
      <FlipCard
        frontTitle="Hello! Welcome to MyApp"
        frontDescription="Click below to login"
        frontIllustration={
          <FaSmile className="text-4xl text-yellow-400 mb-3" />
        }
        backTitle="Please Login"
        backDescription="Fill all fields to continue"
        fields={fields}
        onLogin={handleLogin}
        successTitle="Welcome In 🎉"
        successDescription="You are successfully logged in!"
        successIllustration={
          <FaUserCheck className="text-4xl text-green-400 mb-3" />
        }
        loginButtonText="Submit"
        backButtonText="Go Back"
        successButtonText="Continue"
        cardWidth={380}
        cardHeight={480}
      />
    </div>
  );
}
