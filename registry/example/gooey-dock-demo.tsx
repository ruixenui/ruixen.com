"use client";

import { GooeyDock } from "@/registry/ruixenui/gooey-dock";
import {
  Home,
  Search,
  Bell,
  User,
  Settings,
  Music,
  MessageCircle,
} from "lucide-react";

export default function GooeyDockDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-end justify-center pb-8">
      <GooeyDock
        items={[
          { icon: <Home className="h-5 w-5" />, label: "Home", active: true },
          { icon: <MessageCircle className="h-5 w-5" />, label: "Messages" },
          { icon: <Search className="h-5 w-5" />, label: "Search" },
          { icon: <Music className="h-5 w-5" />, label: "Music" },
          { icon: <Bell className="h-5 w-5" />, label: "Notifications" },
          { icon: <User className="h-5 w-5" />, label: "Profile" },
          { icon: <Settings className="h-5 w-5" />, label: "Settings" },
        ]}
      />
    </div>
  );
}
