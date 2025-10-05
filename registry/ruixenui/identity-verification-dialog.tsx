"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface IdentityVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (pin: string) => Promise<void>;
  backgroundImage?: string;
}

export function IdentityVerificationDialog({
  open,
  onOpenChange,
  onVerify,
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
}: IdentityVerificationDialogProps) {
  const [pin, setPin] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerifyClick = async () => {
    if (!pin) return;
    setIsVerifying(true);
    try {
      await onVerify(pin);
    } finally {
      setIsVerifying(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setPin("");
      setIsVerifying(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="grid sm:grid-cols-2">
          {/* Left: Identity Card */}
          <div className="flex items-center justify-center bg-muted/40 p-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={cn(
                "relative h-52 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center",
              )}
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl" />

              {/* Card Content */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs tracking-wide">IDENTITY CARD</span>
                <span className="text-xs">VALID</span>
              </div>

              <div className="relative z-10">
                <p className="text-lg tracking-widest font-semibold">
                  ID **** 4590
                </p>
                <div className="flex justify-between text-sm mt-2">
                  <span>RUIXEN UI</span>
                  <span>11/29</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Verification Form */}
          <div className="flex flex-col justify-between">
            <div className="p-6 pb-2">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Verify Your Identity
                </DialogTitle>
                <DialogDescription>
                  Enter your secure PIN to complete verification.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <Input
                  id="verification-pin"
                  placeholder="Enter verification PIN"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  disabled={isVerifying}
                  className="h-10 text-base"
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 bg-muted/50">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isVerifying}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyClick}
                disabled={!pin || isVerifying}
              >
                {isVerifying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isVerifying ? "Verifying..." : "Verify Identity"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
