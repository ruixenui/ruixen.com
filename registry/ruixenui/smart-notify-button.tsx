"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon, InfoIcon } from "lucide-react";

interface SmartNotifyButtonProps {
  label?: string;
  message?: string;
  description?: string;
  type?: "success" | "error" | "info";
  actionLabel?: string;
  actionCallback?: () => void;
  variant?: "default" | "outline" | "ghost";
  duration?: number;
  /** Position of toast on screen */
  position?: any;
}

const defaultProps: SmartNotifyButtonProps = {
  label: "Notify",
  message: "This is a notification!",
  description: "",
  type: "info",
  variant: "default",
  duration: 4000,
  position: "top-right",
};

export default function SmartNotifyButton(props: SmartNotifyButtonProps) {
  const {
    label,
    message,
    description,
    type,
    actionLabel,
    actionCallback,
    variant,
    duration,
    position,
  } = { ...defaultProps, ...props };

  const icons = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
  };

  const handleClick = () => {
    toast(message!, {
      description,
      icon: icons[type!],
      duration,
      action: actionLabel
        ? { label: actionLabel, onClick: actionCallback ?? (() => {}) }
        : undefined,
      position,
    });
  };

  return (
    <>
      <Button variant={variant} onClick={handleClick}>
        {label}
      </Button>

      {/* Add the Toaster only once in your app */}
      <Toaster />
    </>
  );
}
