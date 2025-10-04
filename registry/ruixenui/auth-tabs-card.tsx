"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconType } from "react-icons";

export interface SocialButton {
  id: string;
  label: string;
  icon: IconType;
  onClick: () => void;
  variant?: "default" | "outline";
}

export interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}

export interface AuthTabsCardProps {
  signInFields?: Field[];
  signUpFields?: Field[];
  socialButtons?: SocialButton[];
  onSignIn?: (data: Record<string, string>) => void;
  onSignUp?: (data: Record<string, string>) => void;
  className?: string;
}

export default function AuthTabsCard({
  signInFields = [
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
  ],
  signUpFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
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
  ],
  socialButtons = [],
  onSignIn,
  onSignUp,
  className = "",
}: AuthTabsCardProps) {
  const [activeTab, setActiveTab] = React.useState<"sign-in" | "sign-up">(
    "sign-in",
  );

  const [signInValues, setSignInValues] = React.useState<
    Record<string, string>
  >(signInFields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));

  const [signUpValues, setSignUpValues] = React.useState<
    Record<string, string>
  >(signUpFields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  ) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full"
        >
          {/* Tab Triggers */}
          <TabsList className="mb-6 w-full grid grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="sign-in">
            <div className="flex flex-col gap-4">
              {socialButtons.length > 0 && (
                <div className="flex flex-col gap-3">
                  {socialButtons.map((btn) => (
                    <Button
                      key={btn.id}
                      variant={btn.variant || "outline"}
                      className="flex items-center justify-center gap-2"
                      onClick={btn.onClick}
                    >
                      <btn.icon /> {btn.label}
                    </Button>
                  ))}
                  <div className="flex items-center justify-center my-2 text-gray-400 dark:text-gray-300">
                    or
                  </div>
                </div>
              )}

              {signInFields.map((field) => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={signInValues[field.id]}
                    onChange={(e) => handleChange(e, setSignInValues)}
                    className="mt-1"
                  />
                </div>
              ))}

              <Button
                className="mt-4 w-full"
                onClick={() => onSignIn?.(signInValues)}
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Don’t have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setActiveTab("sign-up")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="sign-up">
            <div className="flex flex-col gap-4">
              {signUpFields.map((field) => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={signUpValues[field.id]}
                    onChange={(e) => handleChange(e, setSignUpValues)}
                    className="mt-1"
                  />
                </div>
              ))}

              <Button
                className="mt-4 w-full"
                onClick={() => onSignUp?.(signUpValues)}
              >
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Already have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setActiveTab("sign-in")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
