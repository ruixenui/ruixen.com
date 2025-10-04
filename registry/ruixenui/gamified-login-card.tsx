"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

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
  x: number;
  y: number;
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
    if (Object.values(values).some((v) => !v)) return; // All fields must have input

    onSubmit?.(values);

    // Trigger confetti
    const newParticles: ConfettiParticle[] = Array.from({
      length: confettiCount,
    }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      rotate: Math.random() * 360,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));
    setParticles(newParticles);
    setSuccess(true);

    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${className || ""}`}
    >
      {/* Confetti */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 150,
              y: -Math.random() * 200,
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          {success ? successMessage : title}
        </h2>

        <div className="flex flex-col gap-4 mt-2">
          {inputs.map((input) => (
            <div key={input.id}>
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={values[input.id]}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-4 hover:scale-110 transition-transform duration-200"
          onClick={handleLogin}
        >
          {success ? "Logged In!" : buttonText}
        </Button>

        {!success && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
            Don’t have an account?{" "}
            <a href="#" className="text-purple-500 hover:underline">
              Sign up
            </a>
          </p>
        )}
      </motion.div>
    </div>
  );
}
