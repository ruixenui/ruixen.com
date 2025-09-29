"use client";

import FloatingInput from "@/registry/ruixenui/floating-input";
import { User, Lock, Mail } from "lucide-react";

export default function FloatingInputDemoPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Floating Input Demo</h1>

      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow">
        {/* Email input (default) */}
        <FloatingInput label="Email" type="email" icon={<Mail size={18} />} />

        {/* Username input */}
        <FloatingInput label="Username" type="text" icon={<User size={18} />} />

        {/* Password input */}
        <FloatingInput
          label="Password"
          type="password"
          icon={<Lock size={18} />}
        />
      </div>
    </main>
  );
}
