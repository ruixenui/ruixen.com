"use client";

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
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
        >
          <User className="w-5 h-5 text-blue-600" />
          <span>Srinath G</span>
          <ChevronDown className="ml-1 w-4 h-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl border border-slate-200 bg-white shadow-md p-2">
        {/* Account Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <LayoutDashboard className="w-4 h-4" />
          <span className="flex-1">Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Users className="w-4 h-4" />
          <span className="flex-1">Team Space</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Settings className="w-4 h-4" />
          <span className="flex-1">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Preferences Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Preferences
        </DropdownMenuLabel>

        {/* Theme Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Palette className="w-4 h-4" />
            <span className="flex-1">Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuRadioGroup value="light">
                <DropdownMenuRadioItem
                  value="light"
                  className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100"
                >
                  <Sun className="w-4 h-4" />
                  <span className="flex-1">Light</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="dark"
                  className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100"
                >
                  <Moon className="w-4 h-4" />
                  <span className="flex-1">Dark</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="system"
                  className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100"
                >
                  <Bell className="w-4 h-4" />
                  <span className="flex-1">System Default</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Notifications Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Bell className="w-4 h-4" />
            <span className="flex-1">Notifications</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Email Alerts</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Push Notifications</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">SMS Alerts</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="my-1" />

        {/* Actions Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 py-2 px-2 rounded hover:bg-red-50 text-red-600">
          <LogOut className="w-4 h-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
