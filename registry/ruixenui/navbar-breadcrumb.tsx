"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface NavbarBreadcrumbProps {
  logo?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  user?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  notificationCount?: number;
  className?: string;
}

export default function NavbarBreadcrumb({
  logo = <span className="font-semibold">Logo</span>,
  breadcrumbs = [
    { label: "Personal Account", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Website" },
  ],
  user = { name: "John", initials: "JD" },
  notificationCount = 0,
  className,
}: NavbarBreadcrumbProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            {logo}
          </Link>
          <nav className="hidden items-center md:flex">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && (
                  <ChevronRight className="mx-1 size-4 text-muted-foreground" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sm">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {notificationCount}
              </span>
            )}
          </Button>
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
