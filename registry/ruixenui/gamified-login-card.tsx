"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LoginInput {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
}

interface GamifiedLoginCardProps {
  title?: string;
  successMessage?: string;
  inputs?: LoginInput[];
  buttonText?: string;
  confettiColors?: string[];
  confettiCount?: number;
  className?: string;
  onChange?: (values: Record<string, string>) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

interface ConfettiParticle {
  id: number;
  rotate: number;
  color: string;
}

export default function GamifiedLoginCard({
  title = "Sign In",
  successMessage = "Welcome!",
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
  confettiColors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"],
  confettiCount = 30,
  className,
  onChange,
  onSubmit,
}: GamifiedLoginCardProps) {
  const [values, setValues] = React.useState<Record<string, string>>(
    inputs.reduce(
      (acc, input) => {
        acc[input.id] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );
  const [success, setSuccess] = React.useState(false);
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([]);

  const handleChange = (id: string, value: string) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    onChange?.(newValues);
  };

  const handleLogin = () => {
    if (Object.values(values).some((v) => !v)) return;

    onSubmit?.(values);

    const newParticles: ConfettiParticle[] = Array.from({
      length: confettiCount,
    }).map((_, i) => ({
      id: Date.now() + i,
      rotate: Math.random() * 360,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));

    setParticles(newParticles);
    setSuccess(true);

    setTimeout(() => setParticles([]), 1100);
  };

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden rounded-2xl",
        "border border-border bg-background/50",
        "p-6 sm:p-10",
        className,
      )}
    >
      {/* Confetti */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute h-3 w-3 rounded-full"
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 20, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 260,
              y: -Math.random() * 260 - 40,
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl",
          "border border-border bg-background shadow-sm",
          "p-7 sm:p-8",
          "flex flex-col",
        )}
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {success ? successMessage : title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {success
              ? "You’re in. Enjoy exploring!"
              : "Enter your details to continue."}
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {inputs.map((input) => (
            <div key={input.id} className="space-y-1.5">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={values[input.id]}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="transition-transform duration-150 hover:scale-[1.01] focus-visible:scale-[1.01]"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="mt-6 w-full"
          size="lg"
          onClick={handleLogin}
          disabled={success}
        >
          {success ? "Logged in!" : buttonText}
        </Button>

        {!success && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Sign up
            </a>
          </p>
        )}
      </motion.div>
    </div>
  );
}
