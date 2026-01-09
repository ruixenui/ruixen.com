"use client";

import ButtonRounded from "@/registry/ruixenui/button-rounded";
import { ArrowRight, Plus, Heart } from "lucide-react";

export default function ButtonRoundedDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonRounded>Get Started</ButtonRounded>
      <ButtonRounded variant="secondary">Learn More</ButtonRounded>
      <ButtonRounded variant="outline">Contact Us</ButtonRounded>
      <ButtonRounded variant="ghost">Cancel</ButtonRounded>
      <ButtonRounded
        variant="default"
        rightIcon={<ArrowRight className="size-4" />}
      >
        Continue
      </ButtonRounded>
      <ButtonRounded variant="secondary" leftIcon={<Plus className="size-4" />}>
        Add Item
      </ButtonRounded>
      <ButtonRounded
        variant="destructive"
        leftIcon={<Heart className="size-4" />}
      >
        Like
      </ButtonRounded>
    </div>
  );
}
