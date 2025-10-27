"use client";

import LoginCard from "@/registry/ruixenui/login-card";
import { FaUserCircle } from "react-icons/fa";

export default function DemoLoginCard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginCard
        title="Welcome Back!"
        logo={<FaUserCircle size={48} className="text-blue-500" />}
        inputs={[
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
          {
            id: "username",
            type: "text",
            label: "Username",
            placeholder: "Your username",
          },
        ]}
        buttonText="Sign In"
      />
    </div>
  );
}
