"use client";

import GamifiedLoginCard from "@/registry/ruixenui/gamified-login-card";

export default function DemoGamifiedLoginCard() {
  const handleChange = (values: Record<string, string>) => {
    console.log("Input changed:", values);
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted:", values);
    alert("Check console for submitted values!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <GamifiedLoginCard
        title="Login to Gamify!"
        successMessage="🎉 Welcome to the Game!"
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
        buttonText="Play & Login"
        confettiColors={["#f59e0b", "#10b981", "#3b82f6", "#f472b6"]}
        confettiCount={50}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
