"use client";

import { ButtonSocial } from "@/registry/ruixenui/button-social";

export default function ButtonSocialDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonSocial provider="google" />
      <ButtonSocial provider="github" />
      <ButtonSocial provider="twitter" />
      <ButtonSocial provider="facebook" />
      <ButtonSocial provider="apple" />
    </div>
  );
}
