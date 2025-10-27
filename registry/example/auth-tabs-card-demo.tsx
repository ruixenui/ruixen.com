"use client";

import AuthTabsCard from "@/registry/ruixenui/auth-tabs-card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

export default function DemoAuthTabsCard() {
  const handleSignIn = (data: Record<string, string>) => {
    console.log("Sign In Data:", data);
    alert(`Signed in as: ${data.email}`);
  };

  const handleSignUp = (data: Record<string, string>) => {
    console.log("Sign Up Data:", data);
    alert(`Signed up with email: ${data.email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthTabsCard
        socialButtons={[
          {
            id: "google",
            label: "Sign in with Google",
            icon: FaGoogle,
            onClick: () => alert("Google Login"),
          },
          {
            id: "github",
            label: "Sign in with GitHub",
            icon: FaGithub,
            onClick: () => alert("GitHub Login"),
          },
          {
            id: "linkedin",
            label: "Sign in with LinkedIn",
            icon: FaLinkedin,
            onClick: () => alert("LinkedIn Login"),
          },
        ]}
        signInFields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
          },
        ]}
        signUpFields={[
          { id: "name", label: "Name", type: "text", placeholder: "Your Name" },
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
          },
        ]}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    </div>
  );
}
