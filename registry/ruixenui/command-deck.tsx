"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, Trash, Edit2, User, FolderPlus, Tag } from "lucide-react";

type CommandDeckProps = {
  /** Optional title shown inside the trigger box */
  label?: string;
  /** Optional callback handlers */
  onRename?: () => void;
  onDelete?: () => void;
  onCopyLink?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  onViewHistory?: () => void;
};

export default function CommandDeck({
  label = "Right-click here for advanced project actions",
  onRename,
  onDelete,
  onCopyLink,
  onDuplicate,
  onShare,
  onViewHistory,
}: CommandDeckProps) {
  return (
    <ContextMenu>
      {/* Trigger Box */}
      <ContextMenuTrigger className="grid h-[180px] w-[360px] place-items-center rounded-xl border-2 border-dashed p-4 text-center text-sm hover:bg-gray-50 cursor-pointer transition-all">
        {label}
      </ContextMenuTrigger>

      {/* Menu Content */}
      <ContextMenuContent className="w-64">
        {/* File / Item Actions */}
        <div className="border-b border-gray-200 mb-1">
          <ContextMenuItem onClick={onRename}>
            <Edit2 className="mr-2 h-4 w-4 text-gray-500" /> Rename
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={onCopyLink}>
            <Copy className="mr-2 h-4 w-4 text-gray-500" /> Copy Link
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </div>

        {/* Project Submenu */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderPlus className="mr-2 h-4 w-4 text-gray-500" /> Move to
            Project
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-52">
            <ContextMenuItem>Marketing</ContextMenuItem>
            <ContextMenuItem>Development</ContextMenuItem>
            <ContextMenuItem>Design</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Create New Project</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem>Internal Project</ContextMenuItem>
                <ContextMenuItem>Client Project</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Assignment Submenu */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <User className="mr-2 h-4 w-4 text-gray-500" /> Assign To
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Alice</ContextMenuItem>
            <ContextMenuItem>Bob</ContextMenuItem>
            <ContextMenuItem>Charlie</ContextMenuItem>
            <ContextMenuItem>Team Lead</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Tagging / Metadata */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Tag className="mr-2 h-4 w-4 text-gray-500" /> Add Tags
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Urgent</ContextMenuItem>
            <ContextMenuItem>High Priority</ContextMenuItem>
            <ContextMenuItem>Low Priority</ContextMenuItem>
            <ContextMenuItem>Create New Tag</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Other Quick Actions */}
        <div className="border-t border-gray-200 mt-1">
          <ContextMenuItem onClick={onDuplicate}>Duplicate</ContextMenuItem>
          <ContextMenuItem onClick={onShare}>Share</ContextMenuItem>
          <ContextMenuItem onClick={onViewHistory}>
            View History
          </ContextMenuItem>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
}
