"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputField {
  id: string;
  type: string;
  placeholder?: string;
  label?: string;
}

interface SplitLoginCardProps {
  /** Left side title */
  title?: string;
  /** Left side description */
  description?: string;
  /** Left side image URL */
  imageSrc?: string;
  /** Inputs to render on the form */
  inputs?: InputField[];
  /** Callback when input values change */
  onChange?: (values: Record<string, string>) => void;
  /** Callback on submit */
  onSubmit?: (values: Record<string, string>) => void;
  /** Button label */
  buttonLabel?: string;
  className?: string;
}

export default function SplitLoginCard({
  title = "Welcome Back!",
  description = "Sign in to continue to your dashboard and enjoy seamless experience.",
  imageSrc = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
  inputs = [
    {
      id: "email",
      type: "email",
      placeholder: "you@example.com",
      label: "Email",
    },
    {
      id: "password",
      type: "password",
      placeholder: "********",
      label: "Password",
    },
  ],
  onChange,
  onSubmit,
  buttonLabel = "Login",
  className,
}: SplitLoginCardProps) {
  const [values, setValues] = React.useState<Record<string, string>>(
    Object.fromEntries(inputs.map((i) => [i.id, ""])),
  );

  const handleChange = (id: string, value: string) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white border dark:bg-gray-800",
        className,
      )}
    >
      {/* Left Side */}
      <div className="md:w-1/2 bg-[#8371F5] dark:bg-blue-600 text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-center">{description}</p>
        <img src={imageSrc} alt="Illustration" className="w-16" />
      </div>

      {/* Right Side: Form */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-6">{buttonLabel}</h3>

        <div className="flex flex-col gap-4">
          {inputs.map((input) => (
            <div key={input.id}>
              {input.label && <Label htmlFor={input.id}>{input.label}</Label>}
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                className="mt-1"
                value={values[input.id]}
                onChange={(e) => handleChange(input.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <Button className="mt-6 w-full" onClick={handleSubmit}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
