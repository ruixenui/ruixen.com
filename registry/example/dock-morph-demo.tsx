"use client";

import DockMorph from "@/registry/ruixenui/dock-morph";
import { Home, Search, Bell, User, Settings } from "lucide-react";

export default function DemoOne() {
  const items = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Home",
    },
    {
      icon: <Search className="h-6 w-6" />,
      label: "Search",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "Notifications",
    },
    {
      icon: <User className="h-6 w-6" />,
      label: "Profile",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      label: "Settings",
    },
  ];

  //<DockMorph position="bottom" />
  // <DockMorph position="top" />
  // <DockMorph position="left" />

  return <DockMorph items={items} />;
}
