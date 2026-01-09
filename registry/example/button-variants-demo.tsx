"use client";

import ButtonVariants from "@/registry/ruixenui/button-variants";
import { Mail, ArrowRight } from "lucide-react";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonVariants variant="primary">Primary</ButtonVariants>
      <ButtonVariants variant="secondary">Secondary</ButtonVariants>
      <ButtonVariants variant="destructive">Destructive</ButtonVariants>
      <ButtonVariants variant="outline">Outline</ButtonVariants>
      <ButtonVariants variant="ghost">Ghost</ButtonVariants>
      <ButtonVariants variant="link">Link</ButtonVariants>
      <ButtonVariants variant="primary" leftIcon={<Mail className="size-4" />}>
        With Icon
      </ButtonVariants>
      <ButtonVariants
        variant="primary"
        rightIcon={<ArrowRight className="size-4" />}
      >
        Continue
      </ButtonVariants>
      <ButtonVariants variant="primary" loading>
        Loading
      </ButtonVariants>
      <ButtonVariants variant="primary" disabled>
        Disabled
      </ButtonVariants>
    </div>
  );
}
