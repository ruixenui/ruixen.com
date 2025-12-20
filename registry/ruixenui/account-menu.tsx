"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Users,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Palette,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

export default function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-muted"
        >
          <User className="h-5 w-5 text-foreground" />
          <span>Srinath G</span>
          <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl border-border bg-popover text-popover-foreground shadow-md p-2">
        {/* Account Section */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Account
        </DropdownMenuLabel>

        <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted focus:bg-muted">
          <LayoutDashboard className="h-4 w-4" />
          <span className="flex-1">Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted focus:bg-muted">
          <Users className="h-4 w-4" />
          <span className="flex-1">Team Space</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted focus:bg-muted">
          <Settings className="h-4 w-4" />
          <span className="flex-1">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Preferences Section */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Preferences
        </DropdownMenuLabel>

        {/* Theme Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted focus:bg-muted">
            <Palette className="h-4 w-4" />
            <span className="flex-1">Theme</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border-border bg-popover text-popover-foreground shadow-sm p-1">
              <DropdownMenuRadioGroup value="light">
                <DropdownMenuRadioItem
                  value="light"
                  className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted"
                >
                  <Sun className="h-4 w-4" />
                  <span className="flex-1">Light</span>
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  value="dark"
                  className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted"
                >
                  <Moon className="h-4 w-4" />
                  <span className="flex-1">Dark</span>
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  value="system"
                  className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted"
                >
                  <Bell className="h-4 w-4" />
                  <span className="flex-1">System Default</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Notifications Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted focus:bg-muted">
            <Bell className="h-4 w-4" />
            <span className="flex-1">Notifications</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border-border bg-popover text-popover-foreground shadow-sm p-1">
              <DropdownMenuCheckboxItem className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="flex-1">Email Alerts</span>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="flex-1">Push Notifications</span>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted focus:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="flex-1">SMS Alerts</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="my-1" />

        {/* Actions Section */}
        <DropdownMenuLabel className="text-sm text-muted-foreground">
          Actions
        </DropdownMenuLabel>

        <DropdownMenuItem className="flex items-center gap-2 rounded px-2 py-2 text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
