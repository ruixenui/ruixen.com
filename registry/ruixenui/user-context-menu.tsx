"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Sparkles,
  Star,
  Heart,
  Camera,
} from "lucide-react";

export default function UserContextMenu() {
  return (
    <ContextMenu>
      {/* Trigger */}
      <ContextMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-lg bg-white border border-border p-4 hover:bg-muted/50 transition-all">
        <Avatar className="size-10 border border-border">
          <AvatarFallback className="bg-muted text-foreground font-semibold">
            SG
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-foreground">Srinath G</span>
          <span className="text-muted-foreground text-xs">
            Right-click to open menu
          </span>
        </div>
      </ContextMenuTrigger>

      {/* Context Menu */}
      <ContextMenuContent className="w-60 rounded-md border border-border bg-white shadow-md">
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70 font-medium">
          <User className="size-4" />
          View Dashboard
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Mail className="size-4" />
          Messages
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Camera className="size-4" />
          Update Picture
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Heart className="size-4" />
          Liked Posts
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Sparkles className="size-4" />
          Achievements
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Star className="size-4" />
          Upgrade to Pro
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Account Protection
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Privacy & Security
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium">
          <LogOut className="size-4" />
          Sign Out
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
