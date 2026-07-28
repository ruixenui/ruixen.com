"use client";

import * as React from "react";
import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { ChevronDown, Globe } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Region {
  /** Stable id. */
  id: string;
  /** Short name, e.g. "Tokyo". */
  name: string;
  /** Region code, e.g. "ap-northeast-1". */
  code: string;
  /** Caption city, e.g. "Tokyo, Japan". */
  city: string;
  /** `[latitude, longitude]` in degrees. */
  location: [number, number];
  /** p50 latency in ms, shown under the globe. */
  latency: number;
}

export interface RegionGlobeProps {
  /** Heading at the top of the card. */
  title?: string;
  /** Sub-line under the heading. */
  subtitle?: string;
  /** Regions listed and marked on the globe. */
  regions?: Region[];
  /** Initially selected region id. */
  defaultRegionId?: string;
  /** Fires when the selected region changes. */
  onRegionChange?: (region: Region) => void;
  /** Fires when the confirm button is pressed, with the selected region. */
  onConfirm?: (region: Region) => void;
  /** Label to the left of the selected region code. */
  selectLabel?: string;
  /** Text of the confirm button. */
  actionLabel?: string;
  /** Globe marker RGB (0–1), also the accent dot color. */
  markerColor?: [number, number, number];
  /** Globe zoom (globe scale). 1 = full distant sphere, ~2 = close-up. */
  zoom?: number;
  /** Extra classes on the card. */
  className?: string;
}

const DEFAULT_REGIONS: Region[] = [
  {
    id: "iad",
    name: "N. Virginia",
    code: "us-east-1",
    city: "Ashburn, USA",
    location: [38.95, -77.45],
    latency: 41,
  },
  {
    id: "sfo",
    name: "N. California",
    code: "us-west-1",
    city: "San Francisco, USA",
    location: [37.77, -122.42],
    latency: 63,
  },
  {
    id: "gru",
    name: "São Paulo",
    code: "sa-east-1",
    city: "São Paulo, Brazil",
    location: [-23.55, -46.63],
    latency: 118,
  },
  {
    id: "fra",
    name: "Frankfurt",
    code: "eu-central-1",
    city: "Frankfurt, Germany",
    location: [50.11, 8.68],
    latency: 74,
  },
  {
    id: "dxb",
    name: "Dubai",
    code: "me-central-1",
    city: "Dubai, UAE",
    location: [25.2, 55.27],
    latency: 96,
  },
  {
    id: "bom",
    name: "Mumbai",
    code: "ap-south-1",
    city: "Mumbai, India",
    location: [19.08, 72.88],
    latency: 88,
  },
  {
    id: "sin",
    name: "Singapore",
    code: "ap-southeast-1",
    city: "Singapore",
    location: [1.35, 103.82],
    latency: 61,
  },
  {
    id: "nrt",
    name: "Tokyo",
    code: "ap-northeast-1",
    city: "Tokyo, Japan",
    location: [35.68, 139.65],
    latency: 52,
  },
  {
    id: "syd",
    name: "Sydney",
    code: "ap-southeast-2",
    city: "Sydney, Australia",
    location: [-33.87, 151.21],
    latency: 79,
  },
];

const DEFAULT_MARKER: [number, number, number] = [0.23, 0.51, 0.96]; // blue-500

const TRAVEL_DIP = 0.4; // how far the camera pulls back at mid-flight
const MIN_DURATION = 650; // ms — a short hop between neighbours
const MAX_DURATION = 1300; // ms — a flight across the globe
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Rotation (phi/theta) that brings a lat/long to the front-center of the globe.
function locationToAngles(lat: number, long: number): [number, number] {
  return [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

const THEME = {
  light: {
    dark: 0,
    mapBrightness: 5,
    baseColor: [1, 1, 1],
    glowColor: [0.96, 0.96, 0.98],
    opacity: 0.9,
  },
  dark: {
    dark: 1,
    mapBrightness: 5,
    baseColor: [0.12, 0.13, 0.16],
    glowColor: [0.06, 0.06, 0.09],
    opacity: 0.95,
  },
} as const;

export function DeployRegionGlobe({
  title = "Global regions",
  subtitle = "Fastest region to your users",
  regions = DEFAULT_REGIONS,
  defaultRegionId,
  onRegionChange,
  onConfirm,
  selectLabel = "Region",
  actionLabel = "Select region",
  markerColor = DEFAULT_MARKER,
  zoom = 1.5,
  className,
}: RegionGlobeProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(
    defaultRegionId ?? regions[0]?.id,
  );
  const [open, setOpen] = React.useState(true);
  const listId = React.useId();

  const selected = regions.find((r) => r.id === selectedId) ?? regions[0];

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const initial = locationToAngles(selected.location[0], selected.location[1]);
  const phiRef = React.useRef(initial[0]);
  const thetaRef = React.useRef(initial[1]);
  const scaleRef = React.useRef(zoom);
  const animRef = React.useRef<{
    sp: number;
    st: number;
    dp: number;
    dt: number;
    t0: number;
    dur: number;
    travel: number;
  } | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Start a smooth camera flight to the newly selected region. Picking a new
  // region mid-flight just re-bases from wherever the camera is now — no snap.
  React.useEffect(() => {
    const [tp, tt] = locationToAngles(
      selected.location[0],
      selected.location[1],
    );
    let dp = (tp - phiRef.current) % (2 * Math.PI);
    if (dp > Math.PI) dp -= 2 * Math.PI;
    if (dp < -Math.PI) dp += 2 * Math.PI; // rotate the short way round
    const dt = tt - thetaRef.current;
    const travel = Math.min((Math.abs(dp) + Math.abs(dt)) / Math.PI, 1);
    animRef.current = {
      sp: phiRef.current,
      st: thetaRef.current,
      dp,
      dt,
      t0: performance.now(),
      dur: MIN_DURATION + (MAX_DURATION - MIN_DURATION) * travel,
      travel,
    };
  }, [selected.location]);

  // Stable keys so the globe is only rebuilt on real changes (not inline props).
  const markersKey = React.useMemo(
    () => regions.map((r) => r.location.join()).join("|"),
    [regions],
  );
  const markerKey = markerColor.join();

  React.useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cfg = resolvedTheme === "dark" ? THEME.dark : THEME.light;
    let w = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const build = () => {
      if (globe || w === 0) return;
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: w * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: scaleRef.current,
        dark: cfg.dark,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: cfg.mapBrightness,
        baseColor: cfg.baseColor as [number, number, number],
        markerColor,
        glowColor: cfg.glowColor as [number, number, number],
        opacity: cfg.opacity,
        markers: regions.map((r) => ({ location: r.location, size: 0.03 })),
        onRender: (state) => {
          const anim = animRef.current;
          if (anim) {
            const t = Math.min((performance.now() - anim.t0) / anim.dur, 1);
            const e = easeInOutCubic(t);
            phiRef.current = anim.sp + anim.dp * e;
            thetaRef.current = anim.st + anim.dt * e;
            // Pull the camera back at mid-flight, ease it in on arrival —
            // scaled by how far we're travelling so short hops barely dip.
            scaleRef.current =
              zoom - TRAVEL_DIP * anim.travel * Math.sin(Math.PI * e);
            if (t >= 1) animRef.current = null;
          } else {
            scaleRef.current += (zoom - scaleRef.current) * 0.1;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current;
          state.scale = scaleRef.current;
          state.width = w * dpr;
          state.height = w * dpr;
        },
      });
      requestAnimationFrame(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      });
    };

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      build();
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      globe?.destroy();
      canvas.style.opacity = "0";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, resolvedTheme, markersKey, markerKey, zoom]);

  const select = (region: Region) => {
    setSelectedId(region.id);
    onRegionChange?.(region);
  };

  const accent = `rgb(${markerColor.map((c) => Math.round(c * 255)).join(",")})`;

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <Globe className="size-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          {subtitle && (
            <p className="font-mono text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Globe */}
      <div className="relative mt-3 aspect-[5/4] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 [contain:layout_paint_size]"
          style={{ opacity: 0, transition: "opacity 1s ease" }}
        />
      </div>
      <p className="text-center font-mono text-xs text-muted-foreground">
        {selected.city} · {selected.latency}ms p50
      </p>

      {/* Region selector — expands below the trigger */}
      <div className="mt-4 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between rounded-md text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <span className="text-muted-foreground">{selectLabel}</span>
          <span className="flex items-center gap-1.5 font-mono text-foreground">
            {selected.code}
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
            />
          </span>
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label={selectLabel}
            className="mt-2 max-h-52 space-y-0.5 overflow-y-auto pr-1"
          >
            {regions.map((region) => {
              const isSelected = region.id === selectedId;
              return (
                <li key={region.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => select(region)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-muted" : "hover:bg-muted/60",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="size-1.5 rounded-full transition-colors"
                        style={{
                          backgroundColor: isSelected
                            ? accent
                            : "hsl(var(--muted-foreground) / 0.4)",
                        }}
                      />
                      <span className="text-sm font-medium">{region.name}</span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {region.code}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => onConfirm?.(selected)}
        className="mt-4 w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        {actionLabel}
      </button>
    </div>
  );
}
