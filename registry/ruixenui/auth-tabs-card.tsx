"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex items-center justify-center", className)}>
      <div className="w-md rounded-2xl border border-border bg-background shadow-sm p-6 sm:p-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full"
        >
          {/* Header */}
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {activeTab === "sign-in" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeTab === "sign-in"
                ? "Sign in to continue to your dashboard."
                : "Sign up to get started in under a minute."}
            </p>
          </div>

          {/* Tab Triggers */}
          <TabsList className="mb-6 w-full grid grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="sign-in" className="mt-0">
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
                      <btn.icon className="h-4 w-4" />
                      {btn.label}
                    </Button>
                  ))}

                  {/* Divider */}
                  <div className="my-1 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">or</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </div>
              )}

              {signInFields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={signInValues[field.id]}
                    onChange={(e) => handleChange(e, setSignInValues)}
                  />
                </div>
              ))}

              <Button
                className="mt-2 w-full"
                size="lg"
                onClick={() => onSignIn?.(signInValues)}
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => setActiveTab("sign-up")}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="sign-up" className="mt-0">
            <div className="flex flex-col gap-4">
              {signUpFields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={signUpValues[field.id]}
                    onChange={(e) => handleChange(e, setSignUpValues)}
                  />
                </div>
              ))}

              <Button
                className="mt-2 w-full"
                size="lg"
                onClick={() => onSignUp?.(signUpValues)}
              >
                Sign Up
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => setActiveTab("sign-in")}
                >
                  Sign In
                </button>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
