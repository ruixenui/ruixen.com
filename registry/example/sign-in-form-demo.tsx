"use client";

import React from "react";
import SignInForm from "@/registry/ruixenui/sign-in-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SignInFormDemoPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Sign in to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
