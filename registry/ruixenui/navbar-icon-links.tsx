"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarIconLinksProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  socials?: { icon: "github" | "twitter"; href: string; label: string }[];
  cta?: { label: string; href: string };
  className?: string;
}

const iconMap = {
  github: Github,
  twitter: Twitter,
};

export default function NavbarIconLinks({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Blog", href: "#" },
  ],
  socials = [
    { icon: "github", href: "#", label: "GitHub" },
    { icon: "twitter", href: "#", label: "Twitter" },
  ],
  cta = { label: "Get Started", href: "#" },
  className,
}: NavbarIconLinksProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-8">
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
        <div className="flex items-center gap-1">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <Button key={social.href} variant="ghost" size="icon" asChild>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <Icon className="size-4" />
                </a>
              </Button>
            );
          })}
          <Button size="sm" className="ml-2" asChild>
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
