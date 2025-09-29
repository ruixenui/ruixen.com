"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils"; // optional, for conditional classes

interface FloatingInputProps {
  label?: string;
  type?: string;
  icon?: React.ReactNode;
}

export default function FloatingInput({
  label = "Email",
  type = "email",
  icon = <Mail size={18} />,
}: FloatingInputProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isFloating = focused || value.length > 0;

  return (
    <div className="relative w-full max-w-sm">
      {/* Icon */}
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
          {icon}
        </span>
      )}

      {/* Input */}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" " // keep placeholder blank for accessibility
        className={`h-12 rounded-2xl ps-12 pt-4 border-2 border-input 
                    bg-background shadow-sm transition-all 
                    focus:border-primary focus:ring-2 focus:ring-primary/30`}
      />

      {/* Floating Label */}
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-9 text-muted-foreground text-base transition-all pointer-events-none",
          isFloating
            ? "top-1 text-xs text-primary"
            : "top-1/2 -translate-y-1/2 text-base text-muted-foreground",
        )}
      >
        {label}
      </Label>

      {/* Decorative glow */}
      <div
        className={cn(
          "absolute inset-x-2 -bottom-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity",
          focused ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
