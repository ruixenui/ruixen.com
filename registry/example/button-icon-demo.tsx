"use client";

import { ButtonIcon } from "@/registry/ruixenui/button-icon";
import { Plus, Trash2, Settings, Heart, Star, Share2 } from "lucide-react";

export default function ButtonIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonIcon icon={<Plus />} variant="default" label="Add" />
      <ButtonIcon icon={<Settings />} variant="outline" label="Settings" />
      <ButtonIcon icon={<Heart />} variant="ghost" label="Like" />
      <ButtonIcon icon={<Trash2 />} variant="destructive" label="Delete" />
      <ButtonIcon icon={<Star />} variant="outline" rounded label="Favorite" />
      <ButtonIcon icon={<Share2 />} variant="ghost" rounded label="Share" />
      <ButtonIcon icon={<Plus />} variant="default" size="sm" label="Small" />
      <ButtonIcon icon={<Plus />} variant="default" size="lg" label="Large" />
    </div>
  );
}
