"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IdentityVerificationDialog } from "@/registry/ruixenui/identity-verification-dialog";

export default function IdentityDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleVerify = (pin: string): Promise<void> => {
    console.log(`Verifying PIN: ${pin}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ Identity verified successfully!");
        setIsDialogOpen(false);
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <Button onClick={() => setIsDialogOpen(true)}>Verify Identity</Button>

      <IdentityVerificationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onVerify={handleVerify}
      />
    </div>
  );
}
