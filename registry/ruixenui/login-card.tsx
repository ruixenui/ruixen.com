"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface LoginInput {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
}

interface LoginCardProps {
  title?: string;
  inputs?: LoginInput[];
  buttonText?: string;
  logo?: React.ReactNode;
  className?: string;
  onChange?: (values: Record<string, string>) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

export default function LoginCard({
  title = "Sign In",
  inputs = [
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
  buttonText = "Login",
  logo,
  className,
  onChange,
  onSubmit,
}: LoginCardProps) {
  const [values, setValues] = React.useState<Record<string, string>>(
    inputs.reduce(
      (acc, input) => {
        acc[input.id] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const handleChange = (id: string, value: string) => {
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
        "relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900",
        className,
      )}
    >
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg z-10 flex flex-col gap-6">
        {logo && <div className="flex justify-center mb-4">{logo}</div>}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          {inputs.map((input) => (
            <div key={input.id}>
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={values[input.id]}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="mt-1"
              />
            </div>
          ))}
        </div>

        <Button className="w-full mt-2" onClick={handleSubmit}>
          {buttonText}
        </Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
