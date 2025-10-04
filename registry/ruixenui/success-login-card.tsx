// components/ui/success-login-card.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface SuccessLoginCardProps {
  title?: string;
  description?: string;
  fields: Field[];
  onChange: (id: string, value: string) => void;
  onSubmit: () => Promise<boolean>;
  successMessage?: string;
  animationType?: "checkmark" | "color-shift" | "none";
}

export default function SuccessLoginCard({
  title = "Sign In",
  description = "Enter your details to continue",
  fields,
  onChange,
  onSubmit,
  successMessage = "Login Successful!",
  animationType = "checkmark",
}: SuccessLoginCardProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await onSubmit();
    setLoading(false);
    if (result) setSuccess(true);
  };

  return (
    <motion.div
      className="relative w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      animate={
        success && animationType === "color-shift"
          ? { backgroundColor: "#d1fae5" } // green-100
          : {}
      }
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">
        {success ? successMessage : title}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-300">
        {!success && description}
      </p>

      <AnimatePresence>
        {!success && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
            <Button
              className="mt-4 w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      {success && animationType === "checkmark" && (
        <motion.div
          key="checkmark"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
