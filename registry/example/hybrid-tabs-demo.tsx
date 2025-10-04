"use client";

import * as React from "react";
import HybridTabs from "@/registry/ruixenui/hybrid-tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function HybridTabsDemo() {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Hybrid Tabs Demo</h1>

      {/* HybridTabs Component */}
      <HybridTabs defaultValue="home" className="mb-8" />

      {/* Info Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">How It Works</h2>
          <p className="text-sm text-muted-foreground">
            The tabs combine <strong>icons</strong> with{" "}
            <strong>animated labels</strong>. When a tab is active, the label
            smoothly appears next to the icon.
          </p>
          <p className="text-sm text-muted-foreground">
            Click between the tabs above to experience the animation. You can
            easily add or modify tab items in the component’s props.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
