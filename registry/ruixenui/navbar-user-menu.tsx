"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NavbarUserMenuProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
  notificationCount?: number;
  onLogout?: () => void;
  className?: string;
}

export default function NavbarUserMenu({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Projects", href: "#" },
    { label: "Team", href: "#" },
  ],
  user = {
    name: "John Doe",
    email: "john@example.com",
    initials: "JD",
  },
  notificationCount = 0,
  onLogout,
  className,
}: NavbarUserMenuProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            {logo}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  link.active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-1">
                <Avatar className="size-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm md:inline">{user.name}</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
