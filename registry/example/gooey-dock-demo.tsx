import GooeyDock from "@/registry/ruixenui/gooey-dock";
import { Home, Search, Bell, Settings, User } from "lucide-react";

export default function DemoOne() {
  const dockItems = [
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

  return <GooeyDock items={dockItems} />;
}
