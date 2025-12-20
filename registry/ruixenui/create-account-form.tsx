"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock } from "lucide-react";

export default function CreateAccountForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md rounded-2xl border shadow-sm bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">
            Create Your Account
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign up and start exploring features tailored just for you.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                <User className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl">
              Get Started
            </Button>
          </form>

          <p className="mt-4 text-xs text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <span className="font-medium text-primary hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-primary hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
