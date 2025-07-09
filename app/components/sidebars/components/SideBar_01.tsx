"use client";

import * as React from "react";

import { AudioWaveform, Command, Frame, GalleryVerticalEnd, Map, MonitorCog, PieChart } from "lucide-react";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import SidebarNavigation from "@/components/sidebar/sidebar-navigation";
import SidebarFooterMenu from "@/components/sidebar/sidebar-footer-menu";


const user = {
  name: "Ruixen UI",
  email: "",
  avatar: "",
};

const teams = [
  {
    name: "Ruixen UI",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  // {
  //   name: "OpenCV Corp.",
  //   logo: AudioWaveform,
  //   plan: "Startup",
  // },
  // {
  //   name: "Bigvision Corp.",
  //   logo: Command,
  //   plan: "Free",
  // },
];

const projects = [
  {
    name: "Design Engineering",
    url: "/design-engineering",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
  {
    name: "Control Space",
    url: "/control-space",
    icon: MonitorCog,
  },
];

export const codeStringSideBar_01 = `"use client";

import * as React from "react";

import { AudioWaveform, Command, Frame, GalleryVerticalEnd, Map, MonitorCog, PieChart } from "lucide-react";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import SidebarNavigation from "@/components/sidebar/sidebar-navigation";
import SidebarFooterMenu from "@/components/sidebar/sidebar-footer-menu";


const user = {
  name: "Ruixen UI",
  email: "",
  avatar: "",
};

const teams = [
  {
    name: "Ruixen UI",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  // {
  //   name: "Ruixen Corp.",
  //   logo: AudioWaveform,
  //   plan: "Startup",
  // },
  // {
  //   name: "Bigvision Corp.",
  //   logo: Command,
  //   plan: "Free",
  // },
];

const projects = [
  {
    name: "Design Engineering",
    url: "/design-engineering",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
  {
    name: "Control Space",
    url: "/control-space",
    icon: MonitorCog,
  },
];

export default function SideBar_01({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="z-50">
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
        {/* <SidebarProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
`;

export default function SideBar_01({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible="icon" {...props} className="z-50">
          <SidebarHeader>
            <TeamSwitcher teams={teams} />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNavigation sidebarItems={sidebarItems} />
            {/* <SidebarProjects projects={projects} /> */}
          </SidebarContent>
          <SidebarFooter>
            <SidebarFooterMenu user={user} />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </ SidebarProvider>
    </div>
  );
}
