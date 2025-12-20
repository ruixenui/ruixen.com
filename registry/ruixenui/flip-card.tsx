"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FlipCardField {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
}

export interface FlipCardProps {
  frontTitle?: string;
  frontDescription?: string;
  frontIllustration?: React.ReactNode;
  backTitle?: string;
  backDescription?: string;
  backIllustration?: React.ReactNode;
  successTitle?: string;
  successDescription?: string;
  successIllustration?: React.ReactNode;
  fields?: FlipCardField[];
  onLogin?: (data: Record<string, string>) => Promise<boolean> | boolean;
  loginButtonText?: string;
  backButtonText?: string;
  successButtonText?: string;
  className?: string;
  cardWidth?: number;
  cardHeight?: number;
  showBackInitially?: boolean;
}

export default function FlipCard({
  frontTitle = "Welcome Back 👋",
  frontDescription = "Login to continue",
  frontIllustration,
  backTitle = "Login Form",
  backDescription = "Fill your details",
  backIllustration,
  successTitle = "Login Successful 🎉",
  successDescription = "You are now logged in!",
  successIllustration,
  fields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
    },
  ],
  onLogin,
  loginButtonText = "Login",
  backButtonText = "Back",
  successButtonText = "Continue",
  className,
  cardWidth = 320,
  cardHeight = 420,
  showBackInitially = false,
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(showBackInitially);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (onLogin) {
        const result = await onLogin(formData);
        if (result) {
          setSuccess(true);
          setFlipped(false);
        } else {
          setError("Invalid credentials");
        }
      } else {
        setSuccess(true);
        setFlipped(false);
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const SurfaceCardClass =
    "absolute w-full h-full backface-hidden rounded-2xl border border-border bg-background shadow-sm";

  return (
    <div
      className={cn("perspective-1000", className)}
      style={{ width: cardWidth, height: cardHeight }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        {/* FRONT SIDE */}
        <Card
          className={cn(
            SurfaceCardClass,
            "flex flex-col items-center justify-center px-6 text-center",
          )}
        >
          {!success ? (
            <>
              {frontIllustration ?? (
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
                  👋
                </div>
              )}

              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Welcome back
              </h2>

              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                Sign in to access your account and continue where you left off.
              </p>

              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={() => setFlipped(true)}
              >
                Continue to login
              </Button>
            </>
          ) : (
            <>
              {successIllustration ?? (
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  ✅
                </div>
              )}

              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                You’re signed in
              </h2>

              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                Your account has been successfully authenticated.
              </p>

              <Button className="mt-6 w-full" size="lg">
                Go to dashboard
              </Button>
            </>
          )}
        </Card>

        <Card
          className={cn(SurfaceCardClass, "flex flex-col justify-center px-6")}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Sign in
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <Input
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            {error && (
              <p className="text-center text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setFlipped(false)}
            >
              ← Back
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
