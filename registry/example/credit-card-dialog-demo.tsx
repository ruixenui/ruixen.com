"use client";

import { CreditCardDialog } from "@/registry/ruixenui/credit-card-dialog";

export default function CreditCardDialogDemo() {
  return (
    <div className="flex min-h-[260px] w-full items-center justify-center">
      <CreditCardDialog
        amount="$49.00"
        onSubmit={(card) => console.log("Card:", card)}
      />
    </div>
  );
}
