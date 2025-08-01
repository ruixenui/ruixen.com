"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Number", test: (v: string) => /\d/.test(v) },
  { label: "Lowercase", test: (v: string) => /[a-z]/.test(v) },
  { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Special (!@#$)", test: (v: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(v) },
] as const;

const placeholders = [
  "Who will be the next OpenAI CEO?",
  "Are we living in a simulation?",
  "How do vampires deal with insomnia?",
  "Can we achieve AGI by 2030?",
  "Who is Beeple’s next target meme?"
];

export const codeStringInput_04 = `
"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Number", test: (v: string) => /\d/.test(v) },
  { label: "Lowercase", test: (v: string) => /[a-z]/.test(v) },
  { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Special (!@#$)", test: (v: string) => /[!@#$%^&*(),.?\":{}|<>]/.test(v) },
] as const;

const placeholders = [
  "Who will be the next OpenAI CEO?",
  "Are we living in a simulation?",
  "How do vampires deal with insomnia?",
  "Can we achieve AGI by 2030?",
  "Who is Beeple’s next target meme?"
];

export default function Input_04() {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strengthScore = passwordRequirements.filter((r) => r.test(value)).length;
  const strength = (strengthScore / passwordRequirements.length) * 100;

  const strengthLabel =
    strength === 100 ? "Strong" : strength >= 60 ? "Medium" : value ? "Weak" : "";

  const glowColor =
    strength === 100
      ? "shadow-[0_0_12px_rgba(34,197,94,0.7)]" // Green glow
      : strength >= 60
      ? "shadow-[0_0_12px_rgba(234,179,8,0.7)]" // Yellow glow
      : value
      ? "shadow-[0_0_12px_rgba(239,68,68,0.7)]" // Red glow
      : "shadow-none";

  return (
    <div className="w-full max-w-sm mx-auto border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-4 transition-all">
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "peer w-full px-4 pt-5 pb-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all",
            glowColor
          )}
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute left-3 top-2 text-xs text-zinc-500 dark:text-zinc-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all"
        >
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {value && (
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-20 h-20">
            <svg className="rotate-[-90deg]" width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-200 dark:text-zinc-800"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                className={
                  strength === 100
                    ? "text-green-500"
                    : strength >= 60
                    ? "text-yellow-400"
                    : "text-red-500"
                }
                strokeDasharray={2 * Math.PI * 35}
                strokeDashoffset={2 * Math.PI * 35 * (1 - strength / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-zinc-700 dark:text-zinc-100">
              {strengthLabel}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        {passwordRequirements.map(({ label, test }) => {
          const passed = test(value);
          return (
            <div key={label} className="flex items-center gap-2">
              {passed ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={passed ? "line-through opacity-70" : ""}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

`;

export default function Input_04() {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strengthScore = passwordRequirements.filter((r) => r.test(value)).length;
  const strength = (strengthScore / passwordRequirements.length) * 100;

  const strengthLabel =
    strength === 100 ? "Strong" : strength >= 60 ? "Medium" : value ? "Weak" : "";

  const glowColor =
    strength === 100
      ? "shadow-[0_0_12px_rgba(34,197,94,0.7)]" // Green glow
      : strength >= 60
      ? "shadow-[0_0_12px_rgba(234,179,8,0.7)]" // Yellow glow
      : value
      ? "shadow-[0_0_12px_rgba(239,68,68,0.7)]" // Red glow
      : "shadow-none";

  return (
    <div className="w-full max-w-sm mx-auto border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-4 transition-all">
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "peer w-full px-4 pt-5 pb-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all",
            glowColor
          )}
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute left-3 top-2 text-xs text-zinc-500 dark:text-zinc-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all"
        >
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {value && (
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-20 h-20">
            <svg className="rotate-[-90deg]" width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-200 dark:text-zinc-800"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                className={
                  strength === 100
                    ? "text-green-500"
                    : strength >= 60
                    ? "text-yellow-400"
                    : "text-red-500"
                }
                strokeDasharray={2 * Math.PI * 35}
                strokeDashoffset={2 * Math.PI * 35 * (1 - strength / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-zinc-700 dark:text-zinc-100">
              {strengthLabel}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        {passwordRequirements.map(({ label, test }) => {
          const passed = test(value);
          return (
            <div key={label} className="flex items-center gap-2">
              {passed ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={passed ? "line-through opacity-70" : ""}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
