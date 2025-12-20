"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import {
  Folder,
  FolderPlus,
  FileText,
  Users,
  UserCheck,
  Settings,
  Bell,
  Calendar,
  ChevronRight,
  CheckCircle,
  Upload,
} from "lucide-react";

export default function AppMenuBar() {
  return (
    <Menubar className="bg-background w-fit border-b border-slate-200 shadow-sm rounded-b-lg">
      {/* Projects Menu */}
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Projects
        </MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarItem className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            New Project
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            All Projects
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed Projects
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Teams Menu with Submenu */}
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Teams
        </MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarItem className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            All Members
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            Create Team
          </MenubarItem>

          <MenubarSeparator />

          {/* Proper Nested Submenu */}
          <MenubarSub>
            <MenubarSubTrigger className="flex items-center justify-between gap-2">
              Manage Teams
            </MenubarSubTrigger>
            <MenubarSubContent className="w-48">
              <MenubarItem className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Team Settings
              </MenubarItem>
              <MenubarItem className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Members
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Calendar Menu */}
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Calendar
        </MenubarTrigger>
        <MenubarContent className="w-48">
          <MenubarItem className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            View Calendar
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Schedule Task
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Notifications */}
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notifications
        </MenubarTrigger>
        <MenubarContent className="w-48">
          <MenubarItem className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            All Notifications
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Files Menu */}
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Files
        </MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarItem className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload File
          </MenubarItem>
          <MenubarItem className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            My Files
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
