"use client";

import * as React from "react";
import BannerCookie from "@/registry/ruixenui/banner-cookie";
import { Button } from "@/components/ui/button";

export default function BannerCookieDemo() {
  const [activeDemo, setActiveDemo] = React.useState<string | null>(null);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => setActiveDemo("bottom")}>
          Show Bottom Banner
        </Button>
        <Button variant="outline" onClick={() => setActiveDemo("bottom-right")}>
          Show Floating Banner
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Click a button above to see different cookie banner positions
      </p>

      {activeDemo === "bottom" && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <BannerCookie
            position="bottom"
            onAccept={() => setActiveDemo(null)}
            onDecline={() => setActiveDemo(null)}
            onSettings={() => console.log("Settings clicked")}
          />
        </div>
      )}

      {activeDemo === "bottom-right" && (
        <BannerCookie
          position="bottom-right"
          title="Cookie preferences"
          description="We use cookies to improve your experience and analyze site usage."
          onAccept={() => setActiveDemo(null)}
          onDecline={() => setActiveDemo(null)}
          showSettings={false}
        />
      )}
    </div>
  );
}
