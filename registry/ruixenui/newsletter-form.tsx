"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Stay Updated
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Join the List
            </Button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-medium">
            🎉 You’re in! We’ll keep you posted with exciting news and updates.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
