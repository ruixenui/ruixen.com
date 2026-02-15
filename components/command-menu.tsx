"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  CornerDownLeftIcon,
  ExternalLinkIcon,
  LayoutGridIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState<string[]>([]);
  const { setTheme } = useTheme();

  const activePage = pages[pages.length - 1];

  /* ── Extract navigation data ── */
  const pageItems = React.useMemo(
    () => docsConfig.mainNav.filter((item) => !item.external),
    [],
  );

  const gettingStarted = React.useMemo(
    () => docsConfig.sidebarNav.find((g) => g.title === "Getting Started"),
    [],
  );

  const componentCategories = React.useMemo(() => {
    const group = docsConfig.sidebarNav.find((g) => g.title === "Components");
    return (
      group?.items?.filter(
        (item) => item.items && item.items.length > 0 && !item.href,
      ) ?? []
    );
  }, []);

  const sectionCategories = React.useMemo(() => {
    const group = docsConfig.sidebarNav.find((g) => g.title === "Sections");
    return (
      group?.items?.filter(
        (item) => item.items && item.items.length > 0 && !item.href,
      ) ?? []
    );
  }, []);

  /* Items for the active drill-down page */
  const activeCategoryItems = React.useMemo(() => {
    if (!activePage) return [];
    const fromComponents = componentCategories.find(
      (c) => c.title === activePage,
    );
    if (fromComponents?.items) return fromComponents.items;
    const fromSections = sectionCategories.find((c) => c.title === activePage);
    return fromSections?.items ?? [];
  }, [activePage, componentCategories, sectionCategories]);

  /* ── Keyboard: open ── */
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  /* ── Keyboard: backspace → go back ── */
  React.useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && search === "" && pages.length > 0) {
        e.preventDefault();
        setPages((p) => p.slice(0, -1));
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, search, pages.length]);

  /* ── Actions ── */
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    setPages([]);
    setSearch("");
    command();
  }, []);

  const navigateToPage = React.useCallback((page: string) => {
    setPages((p) => [...p, page]);
    setSearch("");
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-44 lg:w-72",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.35rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[20px] font-medium opacity-100 sm:flex">
          <span className="text-md">⌘</span>
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setPages([]);
            setSearch("");
          }
        }}
      >
        {/* ── Breadcrumb when inside a category ── */}
        {activePage && (
          <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
            <button
              onClick={() => {
                setPages([]);
                setSearch("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <span className="text-xs text-muted-foreground/50">/</span>
            <span className="text-xs font-medium text-foreground">
              {activePage}
            </span>
          </div>
        )}

        <CommandInput
          placeholder="Search Anything"
          value={search}
          onValueChange={setSearch}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* ════════ ROOT PAGE ════════ */}
          {!activePage && (
            <>
              {/* Pages */}
              <CommandGroup heading="Pages">
                <CommandItem
                  value="Home"
                  onSelect={() => runCommand(() => router.push("/"))}
                >
                  <ArrowRightIcon className="mr-3 size-4 text-muted-foreground" />
                  <span className="font-medium">Home</span>
                </CommandItem>
                {pageItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    onSelect={() =>
                      runCommand(() => router.push(item.href as string))
                    }
                  >
                    <ArrowRightIcon className="mr-3 size-4 text-muted-foreground" />
                    <span className="font-medium">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Get Started */}
              {gettingStarted?.items && (
                <CommandGroup heading="Get Started">
                  {gettingStarted.items
                    .filter((item) => item.href)
                    .map((item) => (
                      <CommandItem
                        key={item.href}
                        value={`get started ${item.title}`}
                        onSelect={() =>
                          runCommand(() => router.push(item.href as string))
                        }
                      >
                        <BookOpenIcon className="mr-3 size-4 text-muted-foreground" />
                        <span>{item.title}</span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}

              {/* Component Categories → drill-down */}
              <CommandGroup heading="Components">
                {componentCategories.map((cat) => (
                  <CommandItem
                    key={cat.title}
                    value={cat.title}
                    onSelect={() => navigateToPage(cat.title)}
                  >
                    <LayoutGridIcon className="mr-3 size-4 text-muted-foreground" />
                    <span>{cat.title}</span>
                    <span className="ml-auto text-xs tabular-nums text-muted-foreground/50">
                      {cat.items?.length ?? 0}
                    </span>
                    <ArrowRightIcon className="ml-1.5 size-3.5 text-muted-foreground/40" />
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Section Categories → drill-down */}
              {sectionCategories.length > 0 && (
                <CommandGroup heading="Sections">
                  {sectionCategories.map((cat) => (
                    <CommandItem
                      key={cat.title}
                      value={`sections ${cat.title}`}
                      onSelect={() => navigateToPage(cat.title)}
                    >
                      <LayoutGridIcon className="mr-3 size-4 text-muted-foreground" />
                      <span>{cat.title}</span>
                      <span className="ml-auto text-xs tabular-nums text-muted-foreground/50">
                        {cat.items?.length ?? 0}
                      </span>
                      <ArrowRightIcon className="ml-1.5 size-3.5 text-muted-foreground/40" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              <CommandSeparator />

              {/* Theme */}
              <CommandGroup heading="Theme">
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("light"))}
                >
                  <SunIcon className="mr-3 size-4 text-muted-foreground" />
                  Light
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("dark"))}
                >
                  <MoonIcon className="mr-3 size-4 text-muted-foreground" />
                  Dark
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme("system"))}
                >
                  <LaptopIcon className="mr-3 size-4 text-muted-foreground" />
                  System
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {/* ════════ CATEGORY DRILL-DOWN PAGE ════════ */}
          {activePage && (
            <CommandGroup heading={activePage}>
              {activeCategoryItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() =>
                    runCommand(() => router.push(item.href as string))
                  }
                >
                  <ArrowRightIcon className="mr-3 size-4 text-muted-foreground" />
                  <span>{item.title}</span>
                  {item.paid && (
                    <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                      Pro
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>

        {/* ── Footer bar ── */}
        <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {activePage ? (
              <button
                onClick={() => {
                  setPages((p) => p.slice(0, -1));
                  setSearch("");
                }}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <ChevronLeftIcon className="size-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <CornerDownLeftIcon className="size-3.5" />
                <span>Go To Page</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium">
              /
            </kbd>
            <ExternalLinkIcon className="size-3.5" />
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
