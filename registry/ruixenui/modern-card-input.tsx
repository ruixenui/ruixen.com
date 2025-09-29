"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCardIcon } from "lucide-react";
import images, { CardImages } from "react-payment-inputs/images";
import { usePaymentInputs } from "react-payment-inputs";
import { cn } from "@/lib/utils";

interface CardInputProps {
  label?: string;
  showPreview?: boolean;
  onChange?: (data: { number: string; expiry: string; cvc: string }) => void;
}

export default function ModernCardInput({
  label = "Card Information",
  showPreview = true,
  onChange,
}: CardInputProps) {
  const id = useId();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const handleChange = () => {
    onChange?.({ number: cardNumber, expiry, cvc });
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <Label className="text-sm font-medium">{label}</Label>

      <div
        className={cn(
          "relative rounded-xl border bg-background p-4 shadow-md flex flex-col gap-3 transition-all",
          focusedField ? "ring-2 ring-primary/50" : "ring-0",
        )}
      >
        {/* Card Number */}
        <div className="relative">
          <Input
            {...getCardNumberProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setCardNumber(e.target.value);
                handleChange();
              },
            })}
            placeholder="Card Number"
            id={`card-number-${id}`}
            onFocus={() => setFocusedField("number")}
            onBlur={() => setFocusedField(null)}
            className="peer rounded-xl pr-12"
          />
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pr-3 pointer-events-none text-muted-foreground">
            {meta.cardType ? (
              <svg
                {...getCardImageProps({
                  images: images as unknown as CardImages,
                })}
                width={24}
                className="overflow-hidden rounded-sm transition-all"
              />
            ) : (
              <CreditCardIcon size={18} />
            )}
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="flex gap-2">
          <Input
            {...getExpiryDateProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setExpiry(e.target.value);
                handleChange();
              },
            })}
            placeholder="MM/YY"
            id={`expiry-${id}`}
            onFocus={() => setFocusedField("expiry")}
            onBlur={() => setFocusedField(null)}
            className="flex-1 rounded-xl"
          />
          <Input
            {...getCVCProps({
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setCVC(e.target.value);
                handleChange();
              },
            })}
            placeholder="CVC"
            id={`cvc-${id}`}
            onFocus={() => setFocusedField("cvc")}
            onBlur={() => setFocusedField(null)}
            className="flex-1 rounded-xl"
          />
        </div>

        {/* Optional Preview */}
        {showPreview && meta.cardType && (
          <div className="absolute top-3 right-3 text-xs text-muted-foreground font-medium">
            {meta.cardType.toString().toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
