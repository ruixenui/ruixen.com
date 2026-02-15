"use client";

import { useState } from "react";
import { DrawerInnerContent } from "@/registry/ruixenui/drawer-inner-content";
import {
  Copy,
  Mail,
  Share2,
  Bookmark,
  Pencil,
  Flag,
  Trash2,
} from "lucide-react";

export default function DrawerInnerContentDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 400 }}>
      {/* Reopen trigger */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          transition: "opacity 0.2s",
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          Open drawer
        </button>
      </div>

      <DrawerInnerContent
        open={open}
        onOpenChange={setOpen}
        sections={[
          {
            title: "Actions",
            items: [
              { icon: <Copy className="h-4 w-4" />, label: "Copy link" },
              { icon: <Mail className="h-4 w-4" />, label: "Send email" },
              { icon: <Share2 className="h-4 w-4" />, label: "Share" },
              {
                icon: <Bookmark className="h-4 w-4" />,
                label: "Save to bookmarks",
              },
            ],
          },
          {
            title: "Edit",
            items: [
              { icon: <Pencil className="h-4 w-4" />, label: "Rename" },
              { icon: <Flag className="h-4 w-4" />, label: "Flag" },
              {
                icon: <Trash2 className="h-4 w-4" />,
                label: "Delete",
                danger: true,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
