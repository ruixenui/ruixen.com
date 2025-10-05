"use client";

import ExpandableContentButton from "@/registry/ruixenui/expandable-content-button";
import { ChevronDown, ChevronUp, Twitter, Linkedin, Copy } from "lucide-react";

// Demo Usage
export default function Demo() {
  return (
    <div className="flex gap-4">
      <ExpandableContentButton
        label="Filters"
        options={[
          { label: "Filter 1", onClick: () => alert("Filter 1 selected") },
          { label: "Filter 2", onClick: () => alert("Filter 2 selected") },
          { label: "Filter 3", onClick: () => alert("Filter 3 selected") },
        ]}
      />

      <ExpandableContentButton
        label="Share"
        options={[
          {
            label: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            onClick: () => alert("Shared on Twitter"),
          },
          {
            label: "LinkedIn",
            icon: <Linkedin className="w-4 h-4" />,
            onClick: () => alert("Shared on LinkedIn"),
          },
          {
            label: "Copy Link",
            icon: <Copy className="w-4 h-4" />,
            onClick: () => alert("Link copied"),
          },
        ]}
      />
    </div>
  );
}
