"use client";

import React, { useRef } from "react";
import GradientRevealText, {
  GradientRevealTextRef,
} from "@/registry/ruixenui/gradient-reveal-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GradientRevealTextDemo() {
  const ref1 = useRef<GradientRevealTextRef>(null);

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hover-triggered Gradient Reveal</CardTitle>
        </CardHeader>
        <CardContent>
          <GradientRevealText
            trigger="hover"
            gradient="linear-gradient(to right, #06b6d4, #3b82f6)"
          >
            Hover Me
          </GradientRevealText>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-triggered Gradient Reveal</CardTitle>
        </CardHeader>
        <CardContent>
          <GradientRevealText
            ref={ref1}
            trigger="auto"
            direction="ttb"
            gradient="linear-gradient(to bottom, #3b82f6, #06b6d4)"
          >
            Auto Reveal
          </GradientRevealText>
          <div className="mt-4">
            <Button onClick={() => ref1.current?.animate()}>Animate</Button>
            <Button className="ml-2" onClick={() => ref1.current?.reset()}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
