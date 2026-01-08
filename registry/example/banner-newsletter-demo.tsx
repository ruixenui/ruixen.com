"use client";

import * as React from "react";
import BannerNewsletter from "@/registry/ruixenui/banner-newsletter";
import { Button } from "@/components/ui/button";

export default function BannerNewsletterDemo() {
  const [showBanner, setShowBanner] = React.useState<
    "bottom" | "floating" | null
  >(null);

  const handleSubmit = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Subscribed:", email);
  };

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => setShowBanner("bottom")}>
          Show Bottom Banner
        </Button>
        <Button variant="outline" onClick={() => setShowBanner("floating")}>
          Show Floating Banner
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Click a button above to see different newsletter banner styles
      </p>

      {showBanner === "bottom" && (
        <BannerNewsletter
          position="bottom"
          title="Join our newsletter"
          description="Get weekly updates on the latest features and tips."
          onSubmit={handleSubmit}
          onDismiss={() => setShowBanner(null)}
        />
      )}

      {showBanner === "floating" && (
        <BannerNewsletter
          position="floating"
          title="Don't miss out!"
          description="Subscribe for exclusive content and early access."
          submitLabel="Join now"
          onSubmit={handleSubmit}
          onDismiss={() => setShowBanner(null)}
        />
      )}
    </div>
  );
}
