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

interface CreditCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: (code: string) => Promise<void>;
  backgroundImage?: string;
}

export function CreditCardDialog({
  open,
  onOpenChange,
  onActivate,
  backgroundImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
}: CreditCardDialogProps) {
  const [code, setCode] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleActivateClick = async () => {
    if (!code) return;
    setIsProcessing(true);
    try {
      await onActivate(code);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setCode("");
      setIsProcessing(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0">
        {/* Credit Card */}
        <div className="flex items-center justify-center pt-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "relative h-48 w-80 rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between bg-cover bg-center",
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />

            {/* Card content */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="h-8 w-12 bg-yellow-400 rounded-sm" /> {/* chip */}
              <p className="text-sm font-medium tracking-wider">VIRTUAL CARD</p>
            </div>

            <div className="relative z-10">
              <p className="text-lg tracking-widest font-semibold">
                **** **** **** 1234
              </p>
              <div className="flex justify-between text-sm mt-2">
                <span>RUIXEN UI</span>
                <span>12/28</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dialog Header */}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">
            Activate Your Virtual Card
          </DialogTitle>
          <DialogDescription>
            Enter the activation code to enable your digital card for use.
          </DialogDescription>
        </DialogHeader>

        {/* Input */}
        <div className="grid gap-4 px-6">
          <Input
            id="activation-code"
            placeholder="enter activation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isProcessing}
            className="h-10 text-base"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4 bg-muted/50 rounded-b-lg">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleActivateClick}
            disabled={!code || isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Activating..." : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
