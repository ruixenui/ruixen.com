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
      <ContextMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:bg-muted/50">
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
      <ContextMenuContent className="w-60 rounded-md border border-border bg-popover text-popover-foreground shadow-md">
        <ContextMenuItem className="flex items-center gap-2 font-medium focus:bg-muted data-[highlighted]:bg-muted">
          <User className="size-4" />
          View Dashboard
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Mail className="size-4" />
          Messages
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Camera className="size-4" />
          Update Picture
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Heart className="size-4" />
          Liked Posts
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Sparkles className="size-4" />
          Achievements
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Star className="size-4" />
          Upgrade to Pro
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Shield className="size-4" />
          Account Protection
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2 focus:bg-muted data-[highlighted]:bg-muted">
          <Shield className="size-4" />
          Privacy & Security
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 font-medium text-destructive focus:bg-destructive/10 data-[highlighted]:bg-destructive/10">
          <LogOut className="size-4" />
          Sign Out
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
