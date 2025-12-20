import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Edit3,
  MoreHorizontal,
} from "lucide-react";
import { ActionToolbar } from "@/registry/ruixenui/action-toolbar";

export default function ToolbarDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ActionToolbar
        buttons={[
          { label: "Left", icon: <AlignLeft className="size-4" /> },
          { label: "Center", icon: <AlignCenter className="size-4" /> },
          { label: "Right", icon: <AlignRight className="size-4" /> },
          {
            label: "Edit",
            icon: <Edit3 className="size-4" />,
            dropdownItems: ["Rename", "Duplicate", "Move to…"],
          },
          {
            label: "More",
            icon: <MoreHorizontal className="size-4" />,
            dropdownItems: ["Settings", "Export", "Archive"],
          },
        ]}
      />
    </div>
  );
}
