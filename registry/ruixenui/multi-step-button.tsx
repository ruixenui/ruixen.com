"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiStepButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  steps: string[];
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function MultiStepButton({
  steps,
  size = "md",
  className,
  ...props
}: MultiStepButtonProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = () => {
    setCurrentStep((prev) => (prev + 1 < steps.length ? prev + 1 : prev));
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={(e) => {
        handleClick();
        props.onClick?.(e);
      }}
      {...props}
    >
      {steps[currentStep]}
    </Button>
  );
}
