"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/4 -translate-x-1/2 z-50">
      <Card className="w-[350px] shadow-lg rounded-2xl border bg-background text-foreground">
        <CardContent className="p-5">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🍪</span>
              <h2 className="font-semibold">Cookie Notice</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              We use cookies to ensure that we give you the best experience on
              our website.{" "}
              <a
                href="#"
                className="underline text-primary hover:text-primary/80"
              >
                Read cookies policies.
              </a>
            </p>
            <div className="flex justify-between items-center pt-2">
              <a
                href="#"
                className="text-sm underline hover:text-primary transition"
              >
                Manage your preferences
              </a>
              <Button
                size="sm"
                onClick={() => setVisible(false)}
                className={cn("rounded-lg")}
              >
                Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
