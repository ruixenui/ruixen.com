"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";

export default function SignInForm() {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md border bg-background">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Remember me & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
          <button className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button
          variant="default"
          className="w-full h-12 text-base font-medium rounded-lg"
        >
          Sign In
        </Button>

        {/* Social login buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width={20}
              height={20}
              unoptimized
            />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
            Continue with GitHub
          </Button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don’t have an account?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
