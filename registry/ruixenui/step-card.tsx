"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

type Step = 1 | 2 | 3;

interface StepCardProps {
  onComplete?: (data: { email: string; password: string; otp: string }) => void;
}

export default function StepCard({ onComplete }: StepCardProps) {
  const [step, setStep] = React.useState<Step>(1);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const nextStep = () =>
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

  const handleSubmit = () => {
    if (onComplete) {
      onComplete({ email, password, otp });
    }
    alert("Form submitted successfully!");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-md bg-background rounded-2xl shadow-lg p-8 border">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          {step === 1
            ? "Step 1: Email"
            : step === 2
              ? "Step 2: Password"
              : "Step 3: 2FA"}
        </h2>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={nextStep} className="mt-4 w-full">
                Next
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="otp">2FA Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
