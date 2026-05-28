"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Star } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface PreviewTab {
  id: string;
  /** Text label shown in the switcher rail. */
  label: string;
  /** Panel shown when this tab is active. All panels should share one size. */
  media: React.ReactNode;
}

export interface HeroRating {
  source: string;
  score: string;
  /** Defaults to a filled star. */
  icon?: React.ReactNode;
}

export interface HeroLogo {
  name: string;
  /** Optional custom mark; falls back to the name as a text wordmark. */
  logo?: React.ReactNode;
}

export interface HeroAvatar {
  initials?: string;
  src?: string;
}

export interface Cta {
  label: string;
  href?: string;
}

export interface PreviewSwitchHeroProps {
  /** Small pill above the title, e.g. `{ tag: "NEW", label: "…" }`. */
  badge?: { tag?: string; label: React.ReactNode };
  title: React.ReactNode;
  description?: React.ReactNode;
  ratings?: HeroRating[];
  /** Label above the email field. */
  emailLabel?: React.ReactNode;
  emailPlaceholder?: string;
  /** Called with the email on submit. */
  onSubmit?: (email: string) => void;
  /** Submits the form when no `href`; otherwise renders as a link. */
  primaryCta?: Cta;
  secondaryCta?: Cta;
  avatars?: HeroAvatar[];
  socialProof?: React.ReactNode;
  /** Text tabs that switch the preview. */
  tabs: PreviewTab[];
  /** Logo strip rendered full-width below the split. */
  logos?: HeroLogo[];
  /**
   * Scroll-track height when the hero is pinned (md+ / motion on). Taller =
   * more scroll per tab. Default `"340vh"`.
   */
  scrollLength?: string;
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/* ── pieces ──────────────────────────────────────────────────── */

function TabRail({
  tabs,
  active,
  onSelect,
}: {
  tabs: PreviewTab[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Preview switcher"
      className="flex shrink-0 gap-2 overflow-x-auto [scrollbar-width:none] md:flex-col md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((t, i) => {
        const isActive = i === active;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(i)}
            className={cn(
              "whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-muted font-semibold text-foreground shadow-sm ring-1 ring-border"
                : "font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function PreviewStack({
  tabs,
  active,
}: {
  tabs: PreviewTab[];
  active: number;
}) {
  return (
    <div className="relative w-full min-w-0 md:flex-1">
      {tabs.map((t, i) => {
        const isActive = i === active;
        return (
          <div
            key={t.id}
            role="tabpanel"
            aria-hidden={!isActive}
            className={cn(
              "transition-opacity duration-500",
              isActive
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0",
            )}
          >
            {t.media}
          </div>
        );
      })}
    </div>
  );
}

function CtaButton({
  cta,
  variant,
  type,
}: {
  cta: Cta;
  variant: "primary" | "secondary";
  type?: "submit" | "button";
}) {
  const className = cn(
    "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
      : "bg-muted text-muted-foreground hover:bg-background hover:text-foreground hover:shadow-sm hover:ring-1 hover:ring-border",
  );
  const body = (
    <>
      {cta.label}
      {variant === "primary" && <ArrowUpRight className="size-4 shrink-0" />}
    </>
  );
  if (cta.href) {
    return (
      <Link href={cta.href} className={className}>
        {body}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={className}>
      {body}
    </button>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function PreviewSwitchHero({
  badge,
  title,
  description,
  ratings,
  emailLabel = "Enter email address",
  emailPlaceholder = "you@example.com",
  onSubmit,
  primaryCta,
  secondaryCta,
  avatars,
  socialProof,
  tabs,
  logos,
  scrollLength = "340vh",
  className,
}: PreviewSwitchHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const emailId = React.useId();
  const [active, setActive] = React.useState(0);

  // Scroll-driven only where it makes sense: md+ viewports with motion. On
  // small screens / reduced-motion the tabs are click-driven and the section
  // is a normal (un-pinned) hero. Starts off so SSR + first paint match.
  const [scrollDriven, setScrollDriven] = React.useState(false);
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) {
      setScrollDriven(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setScrollDriven(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [prefersReducedMotion]);

  // Map scroll progress through the pinned track to the active tab index.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!scrollDriven) return;
    const n = tabs.length;
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n - 1e-6)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const handleSelect = (i: number) => {
    const el = sectionRef.current;
    if (scrollDriven && el) {
      // Scroll to the middle of this tab's slice of the track.
      const top = window.scrollY + el.getBoundingClientRect().top;
      const range = el.offsetHeight - window.innerHeight;
      const target = top + ((i + 0.5) / tabs.length) * range;
      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit?.(String(data.get("email") ?? ""));
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={cn("relative w-full bg-background", className)}
      style={scrollDriven ? { height: scrollLength } : undefined}
    >
      <div
        className={cn(
          scrollDriven &&
            "sticky top-0 flex min-h-screen flex-col justify-center",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-14">
          <div className="flex flex-col-reverse justify-center gap-8 md:flex-row md:gap-6 lg:gap-10 xl:gap-[72px]">
            {/* ── left: text-tab rail + switchable preview ─────── */}
            <div className="flex min-w-0 flex-col gap-5 md:w-[400px] md:shrink-0 md:flex-row md:gap-4 lg:w-[480px] lg:gap-6">
              <TabRail tabs={tabs} active={active} onSelect={handleSelect} />
              <PreviewStack tabs={tabs} active={active} />
            </div>

            {/* ── right: content (centered on mobile, left on md+) ── */}
            <div className="flex min-w-0 flex-col items-center text-center md:max-w-[496px] md:flex-1 md:items-start md:text-left">
              {badge && (
                <div className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-muted py-1 pl-1.5 pr-2.5">
                  {badge.tag && (
                    <span className="inline-flex h-4 items-center rounded-[5px] bg-background px-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm">
                      {badge.tag}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {badge.label}
                  </span>
                </div>
              )}

              <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:mb-5 lg:text-5xl xl:text-[56px] xl:leading-[1.05]">
                {title}
              </h1>

              {description && (
                <p className="text-balance text-base text-muted-foreground lg:text-lg">
                  {description}
                </p>
              )}

              {ratings && ratings.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start lg:mt-8">
                  {ratings.map((r, i) => (
                    <div
                      key={`${r.source}-${i}`}
                      className={cn(
                        "flex items-center gap-2",
                        i < ratings.length - 1 &&
                          "border-r border-border pr-3 md:border-none md:pr-0",
                      )}
                    >
                      {r.icon ?? (
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {r.score}
                        </span>{" "}
                        {r.source}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 lg:mt-8">
                <div className="mx-auto flex w-full max-w-[420px] flex-col gap-2 md:mx-0">
                  <label
                    htmlFor={emailId}
                    className="text-sm text-muted-foreground"
                  >
                    {emailLabel}
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 shadow-sm transition focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring">
                    <Mail className="size-5 shrink-0 text-muted-foreground" />
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      placeholder={emailPlaceholder}
                      className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  {(primaryCta || secondaryCta) && (
                    <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
                      {primaryCta && (
                        <CtaButton
                          cta={primaryCta}
                          variant="primary"
                          type="submit"
                        />
                      )}
                      {secondaryCta && (
                        <CtaButton cta={secondaryCta} variant="secondary" />
                      )}
                    </div>
                  )}
                </div>
              </form>

              {(avatars?.length || socialProof) && (
                <div className="mt-6 flex flex-col items-center gap-y-3 md:flex-row">
                  {avatars && avatars.length > 0 && (
                    <div className="flex items-center">
                      {avatars.map((a, i) => (
                        <span
                          key={i}
                          className={cn(
                            "flex size-7 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground",
                            i > 0 && "-ml-2",
                          )}
                        >
                          {a.src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.src}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : (
                            a.initials
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                  {socialProof && (
                    <span className="text-sm text-muted-foreground md:ml-3">
                      {socialProof}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── logo strip ─────────────────────────────────────── */}
        {logos && logos.length > 0 && (
          <div className="border-y border-border">
            <div className="mx-auto max-w-7xl lg:px-7">
              <div className="flex items-center overflow-x-auto [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
                {logos.map((l, i) => (
                  <div
                    key={`${l.name}-${i}`}
                    className="flex shrink-0 items-center lg:w-full lg:shrink"
                  >
                    <div className="flex w-full items-center justify-center px-6 py-5 lg:px-0 lg:py-7">
                      {l.logo ?? (
                        <span className="whitespace-nowrap text-base font-semibold tracking-tight text-muted-foreground">
                          {l.name}
                        </span>
                      )}
                    </div>
                    {i < logos.length - 1 && (
                      <div
                        aria-hidden
                        className="h-9 w-px shrink-0 bg-border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PreviewSwitchHero;
