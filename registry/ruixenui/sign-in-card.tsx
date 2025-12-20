"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInCard() {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    console.log("Email entered:", email);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-md rounded-xl border border-border bg-background shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              width={20}
              height={20}
              priority
            />
            <span className="text-lg font-semibold text-foreground">
              Microsoft
            </span>
          </div>

          <CardTitle className="text-2xl font-semibold text-foreground">
            Sign in
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="E-mail, phone, or Skype"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              No account?{" "}
              <a href="#" className="text-primary hover:underline">
                Create one!
              </a>
            </p>
            <p>
              <a href="#" className="text-primary hover:underline">
                Can’t access your account?
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="secondary">Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
