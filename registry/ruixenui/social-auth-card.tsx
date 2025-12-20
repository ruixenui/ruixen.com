"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface SocialProvider {
  id: string;
  label: string;
  icon: React.ReactNode;
  colorClass?: string; // background color tailwind
  textColorClass?: string; // text color
  onClick?: () => void;
}

export interface FormInput {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
}

interface SocialAuthCardProps {
  socialProviders?: SocialProvider[];
  formInputs?: FormInput[];
  buttonLabel?: string;
  className?: string;
  onChange?: (values: Record<string, string>) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

export default function SocialAuthCard({
  socialProviders = [],
  formInputs = [
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
  ],
  buttonLabel = "Login",
  className,
  onChange,
  onSubmit,
}: SocialAuthCardProps) {
  const [values, setValues] = React.useState<Record<string, string>>(
    formInputs.reduce((acc, input) => ({ ...acc, [input.id]: "" }), {}),
  );

  const handleInputChange = (id: string, value: string) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    onChange?.(newValues);
  };

  const handleSubmit = () => {
    onSubmit?.(values);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto bg-background border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6",
        className,
      )}
    >
      {/* Social Login Buttons */}
      {socialProviders.length > 0 && (
        <div className="flex flex-col gap-4">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              className={cn(
                "w-full flex items-center justify-center gap-2",
                provider.colorClass ?? "bg-gray-800",
                provider.textColorClass ?? "text-white",
                "hover:brightness-90",
              )}
              onClick={provider.onClick}
            >
              {provider.icon} {provider.label}
            </Button>
          ))}
        </div>
      )}

      {/* Divider */}
      {socialProviders.length > 0 && formInputs.length > 0 && (
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-300 text-sm">
          <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
          <span>or</span>
          <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
        </div>
      )}

      {/* Traditional Login Form */}
      {formInputs.length > 0 && (
        <div className="flex flex-col gap-4">
          {formInputs.map((input) => (
            <div key={input.id}>
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                className="mt-1"
                value={values[input.id]}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
            </div>
          ))}
          <Button className="w-full mt-2" onClick={handleSubmit}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
