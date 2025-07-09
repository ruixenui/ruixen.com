"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Share2,
  Archive,
  Trash2,
} from "lucide-react";

interface DropdownAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface DropDownProps {
  actions?: DropdownAction[]; // Optional custom actions
  label?: string;
}

export const codeStringDropDown_01 = `"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Share2,
  Archive,
  Trash2,
} from "lucide-react";

interface DropdownAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface DropDownProps {
  actions?: DropdownAction[]; // Optional custom actions
  label?: string;
}

export default function DropDown_01({ actions, label }: DropDownProps) {
  const defaultActions: DropdownAction[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: () => console.log("View clicked"),
    },
    {
      label: "Edit",
      icon: <Pencil size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      label: "Duplicate",
      icon: <Copy size={16} />,
      onClick: () => console.log("Duplicate clicked"),
    },
    {
      label: "Share",
      icon: <Share2 size={16} />,
      onClick: () => console.log("Share clicked"),
    },
    {
      label: "Archive",
      icon: <Archive size={16} />,
      onClick: () => console.log("Archive clicked"),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete clicked"),
    },
  ];

  const items = actions || defaultActions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          aria-label="Open menu"
        >
          <MoreHorizontal size={18} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {items.slice(0, 4).map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {items.slice(4).map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`;

export default function DropDown_01({ actions, label }: DropDownProps) {
  const defaultActions: DropdownAction[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: () => console.log("View clicked"),
    },
    {
      label: "Edit",
      icon: <Pencil size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      label: "Duplicate",
      icon: <Copy size={16} />,
      onClick: () => console.log("Duplicate clicked"),
    },
    {
      label: "Share",
      icon: <Share2 size={16} />,
      onClick: () => console.log("Share clicked"),
    },
    {
      label: "Archive",
      icon: <Archive size={16} />,
      onClick: () => console.log("Archive clicked"),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete clicked"),
    },
  ];

  const items = actions || defaultActions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          aria-label="Open menu"
        >
          <MoreHorizontal size={18} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {items.slice(0, 4).map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {items.slice(4).map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
