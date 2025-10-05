"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CreditCardDialog } from "@/registry/ruixenui/credit-card-dialog";

export default function CreditDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleActivate = (code: string): Promise<void> => {
    console.log(`Verifying activation code: ${code}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ Card activated successfully!");
        setIsDialogOpen(false);
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <Button onClick={() => setIsDialogOpen(true)}>Activate Card</Button>

      <CreditCardDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onActivate={handleActivate}
      />
    </div>
  );
}
