"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

export default function NestedDashboardMenu() {
  return (
    <Menubar>
      {/* Dashboard */}
      <MenubarMenu>
        <MenubarTrigger>Dashboard</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Overview</MenubarItem>
          <MenubarItem>Statistics</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Quick Links</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Active Projects</MenubarItem>
              <MenubarItem>Pending Tasks</MenubarItem>
              <MenubarItem>Team Members</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Projects */}
      <MenubarMenu>
        <MenubarTrigger>Projects</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Projects</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Templates</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Web App Template</MenubarItem>
              <MenubarItem>Mobile App Template</MenubarItem>
              <MenubarItem>Marketing Template</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Create New Project</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Team */}
      <MenubarMenu>
        <MenubarTrigger>Team</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Members</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Roles</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Admin</MenubarItem>
              <MenubarItem>Editor</MenubarItem>
              <MenubarItem>Viewer</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Invite New Member</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Tasks */}
      <MenubarMenu>
        <MenubarTrigger>Tasks</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>My Tasks</MenubarItem>
          <MenubarItem>Assigned Tasks</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Categories</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Development</MenubarItem>
              <MenubarItem>Design</MenubarItem>
              <MenubarItem>Marketing</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Reports */}
      <MenubarMenu>
        <MenubarTrigger>Reports</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Project Reports</MenubarItem>
          <MenubarItem>Task Reports</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Analytics</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Weekly Overview</MenubarItem>
              <MenubarItem>Monthly Trends</MenubarItem>
              <MenubarItem>Team Performance</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Settings */}
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile Settings</MenubarItem>
          <MenubarItem>Account Settings</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Preferences</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Notifications</MenubarItem>
              <MenubarItem>Language</MenubarItem>
              <MenubarItem>Theme</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
