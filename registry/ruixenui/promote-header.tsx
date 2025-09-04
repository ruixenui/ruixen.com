"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type Resource = {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const RESOURCES: Resource[] = [
  {
    href: "/docs",
    title: "Docs",
    desc: "Guides, API, tutorials, and examples.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M7 4h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M14 4v4h4" />
      </svg>
    ),
  },
  {
    href: "/templates",
    title: "Templates",
    desc: "Production-ready starters for common use cases.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 5h16M4 12h16M4 19h16" />
      </svg>
    ),
  },
  {
    href: "/community",
    title: "Community",
    desc: "Join discussions and find support.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M7 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M15 14a5 5 0 0 0-10 0v3h10v-3z" />
        <path d="M17 8h.01M21 12h.01M19 20h.01" />
      </svg>
    ),
  },
  {
    href: "/changelog",
    title: "Changelog",
    desc: "What shipped and when, with details.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 5h18M3 12h18M3 19h18" />
        <path d="M7 5v14" />
      </svg>
    ),
  },
];

export default function PromoteHeader() {
  const [pathname, setPathname] = React.useState("/");
  const [open, setOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  // Safely get pathname from Next.js hook
  let pathnameFromHook = null;
  try {
    pathnameFromHook = usePathname();
  } catch (error) {
    // Hook not available outside Next.js router context
    pathnameFromHook = null;
  }

  const activePath = pathnameFromHook ?? pathname;

  React.useEffect(() => {
    // Safely get pathname on client side
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  React.useEffect(() => {
    // Initialize theme from localStorage or system
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const systemDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const dark = stored ? stored === "dark" : !!systemDark;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const isActive = (href: string) =>
    href === "/" ? activePath === "/" : activePath?.startsWith(href);

  const primaryBtn =
    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-semibold " +
    "bg-zinc-900 text-white hover:bg-zinc-900/90 " +
    "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100/90 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20";

  const secondaryBtn =
    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium " +
    "text-zinc-800 dark:text-zinc-200 " +
    "border border-zinc-950/20 dark:border-white/20 " +
    "hover:bg-zinc-950/[.03] dark:hover:bg-white/5 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20";

  const desktopLink = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-0",
      "hover:bg-zinc-950/[.03] dark:hover:bg-white/5",
      active
        ? "text-zinc-950 dark:text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10 bg-zinc-950/[.03] dark:bg-white/5"
        : "text-zinc-600 dark:text-zinc-400",
    ].join(" ");

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Skip to content
      </a>

      {/* Announcement bar (optional) */}
      <div className="w-full border-b border-zinc-950/20 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 dark:border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-1.5 text-xs sm:text-sm">
          <span className="rounded border border-zinc-950/20 px-1.5 py-0.5 font-medium text-zinc-700 dark:border-white/20 dark:text-zinc-200">
            New
          </span>
          <span className="text-zinc-700 dark:text-zinc-300">
            Explore our updated templates—faster starters and better docs.
          </span>
          <Link
            href="/templates"
            className="underline decoration-zinc-400 decoration-dashed underline-offset-4 hover:decoration-solid text-zinc-900 dark:text-zinc-100"
          >
            Browse templates
          </Link>
        </div>
      </div>

      {/* Header */}
      <header
        className={[
          "sticky top-0 z-50 w-full backdrop-blur",
          "bg-white/85 dark:bg-zinc-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60",
          "border-b border-zinc-950/20 dark:border-white/20",
        ].join(" ")}
      >
        {/* subtle gradient line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-950/10 to-transparent dark:via-white/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between gap-3">
            {/* Left: burger + brand + desktop nav */}
            <div className="flex items-center gap-2">
              {/* Mobile burger */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={[
                  "md:hidden group relative size-9 rounded-md",
                  "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute inset-x-2 top-[9px] h-[2px] rounded bg-current transition-transform",
                    open ? "translate-y-[6px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current transition-opacity",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute inset-x-2 bottom-[9px] h-[2px] rounded bg-current transition-transform",
                    open ? "-translate-y-[6px] -rotate-45" : "",
                  ].join(" ")}
                />
              </button>

              {/* Brand */}
              <Link
                href="/"
                className="inline-flex items-center gap-2"
                aria-label="Home"
              >
                <img
                  src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
                  alt="Ruixen"
                  className="h-6 w-auto object-contain dark:invert"
                />
                <span className="sr-only">Ruixen</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={desktopLink(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources hover panel */}
                <div className="relative group">
                  <button type="button" className={desktopLink(false)}>
                    Resources
                  </button>
                  <div
                    className={[
                      "pointer-events-none absolute left-1/2 top-full z-40 -translate-x-1/2 pt-2 opacity-0 transition",
                      "group-hover:pointer-events-auto group-hover:opacity-100",
                      "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "max-w-[calc(100vw-2rem)] sm:w-[520px] rounded-xl border border-zinc-950/20 bg-white/95 p-3 shadow-xl",
                        "backdrop-blur supports-[backdrop-filter]:bg-white/70",
                        "dark:border-white/20 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/70",
                      ].join(" ")}
                    >
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {RESOURCES.map((r) => (
                          <li key={r.href}>
                            <Link
                              href={r.href}
                              className={[
                                "flex items-start gap-3 rounded-lg p-3 transition",
                                "hover:bg-zinc-950/[.03] dark:hover:bg-white/5",
                                "border border-transparent hover:border-zinc-950/20 dark:hover:border-white/20",
                              ].join(" ")}
                            >
                              <div className="mt-0.5 text-zinc-700 dark:text-zinc-200">
                                {r.icon}
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                  {r.title}
                                </div>
                                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                                  {r.desc}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 rounded-lg border border-zinc-950/20 p-2 text-xs text-zinc-600 dark:border-white/20 dark:text-zinc-400">
                        Looking for examples? Try the{" "}
                        <Link
                          href="/templates"
                          className="text-zinc-900 underline dark:text-zinc-100"
                        >
                          Templates
                        </Link>{" "}
                        section or jump straight into the{" "}
                        <Link
                          href="/docs"
                          className="text-zinc-900 underline dark:text-zinc-100"
                        >
                          Docs
                        </Link>
                        .
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right: search + theme + CTAs (desktop) */}
            <div className="hidden items-center gap-2 md:flex">
              {/* search */}
              <div className="relative w-44 sm:w-56 lg:w-64 xl:w-80">
                <input
                  type="search"
                  placeholder="Search docs…"
                  className={[
                    "w-full rounded-md border border-zinc-950/20 bg-white/70 px-8 py-2 text-sm text-zinc-900 placeholder:text-zinc-400",
                    "focus:outline-none focus:ring-2 focus:ring-zinc-950/20",
                    "backdrop-blur supports-[backdrop-filter]:bg-white/50",
                    "dark:border-white/20 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-white/20",
                    "dark:supports-[backdrop-filter]:bg-zinc-900/50",
                  ].join(" ")}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-zinc-950/20 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:border-white/20 dark:text-zinc-400">
                  /
                </kbd>
              </div>

              {/* theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-md",
                  "border border-zinc-950/20 hover:bg-zinc-950/[.03]",
                  "text-zinc-800 dark:text-zinc-200",
                  "dark:border-white/20 dark:hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20",
                ].join(" ")}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {/* sun / moon swap without extra libs */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 dark:hidden"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="hidden h-4 w-4 dark:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>

              {/* actions */}
              <Link href="/signin" className={secondaryBtn}>
                Sign In
              </Link>
              <Link href="/get-started" className={primaryBtn}>
                Get Started
              </Link>
            </div>

            {/* Right (mobile): quick CTA */}
            <div className="md:hidden">
              <Link href="/get-started" className={primaryBtn}>
                Start
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={[
            "absolute inset-0 bg-black/30 backdrop-blur-sm",
            open ? "opacity-100" : "opacity-0",
            "transition-opacity",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-80 max-w-[calc(100vw-0.75rem)] transform bg-white/95 p-4 shadow-2xl",
            "backdrop-blur supports-[backdrop-filter]:bg-white/70",
            "border-l border-zinc-950/20",
            "dark:border-white/20 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/70",
            open ? "translate-x-0" : "translate-x-full",
            "transition-transform",
            "overflow-y-auto",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          {/* header in drawer */}
          <div className="mb-3 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <img
                src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
                alt="Ruixen"
                className="h-6 w-auto object-contain dark:invert"
              />
              <span className="sr-only">Ruixen</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-zinc-950/20 text-zinc-700 hover:bg-zinc-950/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* search */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search…"
                className="w-full rounded-md border border-zinc-950/20 bg-white/80 px-8 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:border-white/20 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-white/20"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
          </div>

          {/* nav list */}
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-md px-2.5 py-2 text-sm font-medium",
                  "hover:bg-zinc-950/[.03] dark:hover:bg-white/5",
                  isActive(item.href)
                    ? "text-zinc-950 dark:text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10 bg-zinc-950/[.03] dark:bg-white/5"
                    : "text-zinc-700 dark:text-zinc-300",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* quick links */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Quick Links
            </div>
            <div className="grid grid-cols-2 gap-2">
              {RESOURCES.slice(0, 4).map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2 rounded-lg border border-zinc-950/20 p-2 text-sm hover:bg-zinc-950/[.03] dark:border-white/20 dark:hover:bg-white/5"
                >
                  <span className="mt-0.5 text-zinc-700 dark:text-zinc-200">
                    {r.icon}
                  </span>
                  <span className="truncate text-zinc-800 dark:text-zinc-200">
                    {r.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className={secondaryBtn}
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className={primaryBtn}
            >
              Get Started
            </Link>
          </div>

          {/* footer row in drawer */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-950/20 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-950/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 dark:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="hidden h-4 w-4 dark:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Toggle theme
            </button>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md border border-zinc-950/20 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-950/[.03] dark:border-white/20 dark:text-zinc-300 dark:hover:bg-white/5"
            >
              Contact sales
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
