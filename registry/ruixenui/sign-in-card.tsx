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
    // Add authentication logic here
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md rounded-xl shadow-md bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              width={20}
              height={20}
              priority
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Microsoft
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Sign in
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            type="text"
            placeholder="E-mail, phone, or Skype"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 dark:bg-gray-700 dark:text-gray-100"
          />
          <div className="mt-4 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              No account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Create one!
              </a>
            </p>
            <p className="mt-1">
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Can’t access your account?
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
