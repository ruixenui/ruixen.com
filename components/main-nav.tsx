"use client";

import { Icons } from "@/components/icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import Image from "next/image";

function copyLogoAsSVG(path: string) {
  fetch(path)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const svgContent = event.target?.result;
        navigator.clipboard.writeText(svgContent as string);
      };
      reader.readAsText(blob);
    });
}

function copyLogoAsPNG(path: string) {
  fetch(path)
    .then((response) => response.blob())
    .then((blob) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
    });
}

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link href="/" className="relative mr-6 flex items-center space-x-2">
            <Image
              src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
              alt="Logo"
              width={28}
              height={28}
            />
            <span className="hidden font-semibold md:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="flex items-center gap-2"
            onClick={() =>
              copyLogoAsSVG(
                "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
              )
            }
          >
            <Image
              src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
              alt="Logo"
              width={28}
              height={28}
            />
            <span>Copy Logo as SVG</span>
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center gap-2"
            onClick={() =>
              copyLogoAsPNG(
                "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-icon.png",
              )
            }
          >
            <Image
              src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-icon.png"
              alt="Logo"
              width={28}
              height={28}
            />
            <span>Copy Logo as PNG</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
        {docsConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href!}
            aria-label={item.title}
            onClick={() => item.event && posthog.capture(item.event)}
            target={item.external ? "_blank" : undefined}
            className={cn(
              "flex items-center justify-center transition-colors hover:text-foreground/80",
              pathname?.startsWith(item.href!)
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            <span className="shrink-0">{item.title}</span>
            {item.label && (
              <span className="ml-2 rounded-md bg-[#FFBD7A] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
            {item.external && <ExternalLinkIcon className="ml-2 size-4" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}
