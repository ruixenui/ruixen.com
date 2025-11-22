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
          <Link href="/" className="relative mr-6 flex items-center">
            <Image
              src="/ruixen-ui-nw.png"
              alt="Ruixen Logo"
              width={60}
              height={60}
              className="rounded-full h-9 w-9 block dark:hidden"
            />
            <Image
              src="/ruixen-ui-nw-light.png"
              alt="Ruixen Logo"
              width={60}
              height={60}
              className="rounded-full h-9 w-9 hidden dark:block"
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
                "/ruixen-ui-nw.png",
              )
            }
          >
            <Image
              src="/ruixen-ui-nw.png"
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
                "/ruixen-ui-nw.png",
              )
            }
          >
            <Image
              src="/ruixen-ui-nw.png"
              alt="Logo"
              width={28}
              height={28}
            />
            <span>Copy Logo as PNG</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
        {docsConfig.mainNav.map((item) => {
          const hasDropdown = item.items && item.items.length > 0;
          
          if (hasDropdown) {
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href!}
                  aria-label={item.title}
                  className={cn(
                    "flex items-center justify-center transition-colors hover:text-foreground/80",
                    pathname?.startsWith(item.href!)
                      ? "text-foreground"
                      : "text-foreground/60",
                  )}
                >
                  <span className="shrink-0">{item.title}</span>
                  {item.label && (
                    <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-xs leading-none text-[var(--color-sidebar-label-foreground)] no-underline group-hover:no-underline">
                      {item.label}
                    </span>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                  <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden min-w-[200px]">
                    {item.items!.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href!}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-muted/50",
                          pathname === subItem.href
                            ? "text-foreground bg-muted/30"
                            : "text-foreground/70",
                        )}
                      >
                        <span>{subItem.title}</span>
                        {subItem.label && (
                          <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-xs leading-none text-[var(--color-sidebar-label-foreground)]">
                            {subItem.label}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href!}
              aria-label={item.title}
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
                <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-xs leading-none text-[var(--color-sidebar-label-foreground)] no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
              {item.external && <ExternalLinkIcon className="ml-2 size-4" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
