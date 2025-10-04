"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  countdown: number; // in seconds
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function CountdownButton({
  label,
  countdown,
  size = "md",
  onClick,
  className,
  ...props
}: CountdownButtonProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleClick = () => {
    if (onClick) onClick();
    setTimeLeft(countdown);
    setDisabled(true);
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {disabled ? `${label} in ${timeLeft}s` : label}
    </Button>
  );
}
