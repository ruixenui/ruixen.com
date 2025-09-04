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

export default function AdvancedContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-[160px] w-[320px] place-items-center rounded-lg border-2 border-dashed p-4 text-center text-sm hover:bg-gray-50 cursor-pointer">
        Right click here to open the advanced actions menu
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        {/* Basic actions */}
        <ContextMenuItem>
          Open Dashboard
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Refresh Data
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Export Report
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>

        {/* Submenu - Move to project */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to Project</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Marketing</ContextMenuItem>
            <ContextMenuItem>Development</ContextMenuItem>
            <ContextMenuItem>Design</ContextMenuItem>
            <ContextMenuItem>Create New Project</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Submenu - Assign To */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>Assign To</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Alice</ContextMenuItem>
            <ContextMenuItem>Bob</ContextMenuItem>
            <ContextMenuItem>Charlie</ContextMenuItem>
            <ContextMenuItem>Team Lead</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Other actions */}
        <ContextMenuItem>
          Delete Item
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy Link
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Share
          <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
        </ContextMenuItem>

        {/* Submenu - Tags */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>Add Tags</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Urgent</ContextMenuItem>
            <ContextMenuItem>High Priority</ContextMenuItem>
            <ContextMenuItem>Low Priority</ContextMenuItem>
            <ContextMenuItem>Create New Tag</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
