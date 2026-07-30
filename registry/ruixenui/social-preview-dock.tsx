"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Social Preview Dock — a row of social links sharing one preview card.
 *
 * One panel owns the card surface — border, background, rounding, shadow — and
 * resizes itself between profiles, the way a navigation menu viewport does.
 * Hovering an icon measures that card's natural box and springs the panel's
 * width, height and x onto it while the contents cross-fade inside. So moving
 * between icons reads as a single card growing and travelling, never as two
 * cards sliding past each other.
 *
 * Only the card on screen is mounted. The panel is `overflow-hidden`, so during
 * a resize the incoming card is simply revealed by a box that is still growing —
 * no layout animation, nothing to keep in sync, and no offscreen work.
 *
 * The card is reachable by cursor: the panel's wrapper carries the gap down to
 * the row as padding, so the pointer never crosses dead space on the way up, and
 * `mouseleave` sits on the outer wrapper, which counts the panel as inside.
 *
 * The shadow is a `drop-shadow` filter on the wrapper rather than a box-shadow
 * on the panel, so it tracks the panel's animating size without a second
 * transition of its own.
 *
 * All content arrives through `profile` / `items`. Nothing here is anyone's
 * real account — see the demo for populated cards.
 */

/** One day of the GitHub contribution graph. `level` is GitHub's own 0–4 ramp. */
export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface SocialProfile {
  /** GitHub login: shown on the GitHub card, and the key live data is fetched with. */
  username?: string;
  /** X handle, without the @. */
  xHandle?: string;
  /** Display name on the LinkedIn card. */
  name?: string;
  /** Square image URL. The live GitHub avatar replaces it when it arrives. */
  avatar?: string;
  /** One-liner under the @handle on the X card. */
  bio?: string;
  /** Job title on the LinkedIn card. */
  headline?: string;
  /** City line on the LinkedIn card. */
  location?: string;
  /**
   * Contribution total to show when live data is off or unavailable. Left out,
   * the card says "Contributions in the last year" rather than inventing a number.
   */
  contributions?: number;
  /**
   * Offline heatmap: one digit (0–4) per day, oldest first, rendered
   * column-major into 7 rows. Live data replaces it. Left out, the grid renders
   * a full year of empty tiles rather than a fabricated streak.
   */
  levels?: string;
  /** Banner image for the X card. Takes precedence over the gradient. */
  cover?: string;
  links?: { github?: string; linkedin?: string; x?: string };
}

export interface SocialPreviewItem {
  /** Stable identifier. */
  id: string;
  /** Accessible name for the link. */
  label: string;
  href: string;
  /** Brand mark — sized by the button, colored by `currentColor`. */
  icon: React.ReactNode;
  /** Card revealed on hover. Give it a fixed width so the rail can't reflow. */
  card: React.ReactNode;
}

export interface SocialPreviewDockProps {
  /** Card content. Every field is optional; cards drop what they aren't given. */
  profile?: SocialProfile;
  /** Replace the links and their cards outright. Live data is skipped. */
  items?: SocialPreviewItem[];
  /** Address for the copy pill. Omit it and the pill isn't rendered. */
  email?: string;
  /** Fetch the live GitHub card. Needs `profile.username`. */
  live?: boolean;
  /**
   * Banner blob colors per card, as background utility classes. Theme tokens by
   * default, so the banners follow a palette swap and light/dark on their own.
   */
  bannerColors?: { linkedin: string[]; x: string[] };
  className?: string;
}

/* Travel is a touch livelier than the resize: the panel arrives at the new icon
   just before it finishes growing, which reads as one object moving rather than
   a box being redrawn. Both are near-critically damped — a card that overshoots
   its own size looks like a bug. */
const SPRING_MOVE = {
  type: "spring" as const,
  stiffness: 620,
  damping: 46,
  mass: 0.8,
};
const SPRING_SIZE = {
  type: "spring" as const,
  stiffness: 700,
  damping: 54,
  mass: 0.8,
};
/** Content swaps faster than the box moves, so the card is never mid-fade at rest. */
const FADE = { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const };

/** Gap kept between the revealed card and the viewport edge. */
const MARGIN = 12;
/** 52 weeks. What the grid falls back to with no data to draw. */
const EMPTY_YEAR = 364;

const DEFAULT_BANNER_COLORS = {
  linkedin: ["bg-chart-2", "bg-chart-3", "bg-primary"],
  x: ["bg-chart-5", "bg-chart-1", "bg-chart-4"],
};

/* ── Live GitHub data ──
   Both endpoints are public, unauthenticated and send `access-control-allow-
   origin: *`, so this works from the browser with no token and no server route.
   api.github.com allows 60 requests/hour per visitor IP, which one profile
   lookup per page view stays well under. */

interface GithubUserResponse {
  avatar_url?: string;
}

interface ContributionsResponse {
  total?: { lastYear?: number };
  contributions?: ContributionDay[];
}

interface GithubLive {
  avatar?: string;
  total?: number;
  days?: ContributionDay[];
}

const GITHUB_API = "https://api.github.com/users";
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

function useGithubLive(username: string, enabled: boolean): GithubLive {
  const [live, setLive] = React.useState<GithubLive>({});

  React.useEffect(() => {
    if (!enabled || !username) return;
    let alive = true;

    const json = <T,>(url: string): Promise<T> =>
      fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

    /* allSettled, not all: a rate-limited profile lookup should not cost us the
       heatmap, and vice versa. Whatever fails keeps its offline value. */
    Promise.allSettled([
      json<GithubUserResponse>(`${GITHUB_API}/${username}`),
      json<ContributionsResponse>(`${CONTRIBUTIONS_API}/${username}?y=last`),
    ]).then(([user, graph]) => {
      if (!alive) return;
      const next: GithubLive = {};
      if (user.status === "fulfilled") next.avatar = user.value?.avatar_url;
      if (graph.status === "fulfilled") {
        next.total = graph.value?.total?.lastYear;
        next.days = graph.value?.contributions;
      }
      setLive(next);
    });

    return () => {
      alive = false;
    };
  }, [username, enabled]);

  return live;
}

/* ── Brand marks ──
   Paths only, `currentColor`, no brand palette: they inherit the theme's
   foreground like any other icon in the row. */

const GithubMark = () => (
  <svg viewBox="0 0 256 250" fill="currentColor" aria-hidden="true">
    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0" />
  </svg>
);

const LinkedinMark = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
  </svg>
);

const XMark = () => (
  <svg viewBox="0 0 251 256" fill="currentColor" aria-hidden="true">
    <path d="M149.079 108.399L242.33 0h-22.098l-80.97 94.12L74.59 0H0l97.796 142.328L0 256h22.1l85.507-99.395L175.905 256h74.59L149.073 108.399zM118.81 143.58l-9.909-14.172l-78.84-112.773h33.943l63.625 91.011l9.909 14.173l82.705 118.3H186.3l-67.49-96.533z" />
  </svg>
);

/* ── Cards ── */

/** Card contents carry no surface of their own — the panel is the card, and it
    resizes between them. They only cap at the viewport so a 420px card can't
    overflow a 375px phone. */
const CARD = "max-w-[calc(100vw-1.5rem)]";

/** Level 0 is a neutral tile; 1–4 are one chart token at four strengths, so the
    ramp follows the theme instead of a hardcoded green. */
const LEVEL_TINT = [
  "bg-muted",
  "bg-chart-2/25",
  "bg-chart-2/45",
  "bg-chart-2/70",
  "bg-chart-2",
];

/** "2025-07-27" → "Jul 27, 2025", parsed as a local date so a timezone behind
    UTC doesn't shift every tile back a day. */
function formatDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface HeatmapTip {
  x: number;
  y: number;
  text: string;
}

/** Half the widest tooltip line, near enough. See the note at the call site. */
const TIP_HALF = 100;

function ContributionHeatmap({
  days,
  label,
}: {
  days: ContributionDay[];
  label: string;
}) {
  /* One tooltip node driven by delegation, not 364 hover handlers and 364
     mounted chips. The tile's own offsets are enough to place it. */
  const [tip, setTip] = React.useState<HeatmapTip | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const trackTip = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-day]");
    const day = cell && days[Number(cell.dataset.day)];
    if (!cell || !day?.date) return setTip(null);
    setTip({
      x: cell.offsetLeft + cell.offsetWidth / 2,
      y: cell.offsetTop,
      text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDay(day.date)}`,
    });
  };

  return (
    <div className="relative mt-3">
      {/* One image to assistive tech: 364 tiles announced one by one is noise,
          and the total above already carries the information. */}
      <div
        ref={gridRef}
        role="img"
        aria-label={label}
        className="grid grid-flow-col grid-rows-7 gap-[2px]"
        onMouseMove={trackTip}
        onMouseLeave={() => setTip(null)}
      >
        {days.map((day, i) => (
          <span
            key={day.date || i}
            data-day={i}
            aria-hidden="true"
            className={cn(
              "size-[5px] rounded-[1px]",
              LEVEL_TINT[day.level] ?? LEVEL_TINT[0],
            )}
          />
        ))}
      </div>
      {tip && (
        <div
          role="tooltip"
          style={{
            /* ponytail: tooltip width is estimated from a fixed half-width
               rather than measured, to keep this a single render with no
               flicker. Only matters within ~half a tooltip of either edge —
               measure with a ref if the copy stops being one short line. */
            left: Math.min(
              Math.max(tip.x, TIP_HALF),
              (gridRef.current?.offsetWidth ?? 0) - TIP_HALF,
            ),
            top: tip.y,
          }}
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+6px)] whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[11px] font-medium leading-none text-primary-foreground shadow-md"
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}

function GithubCard({
  profile,
  live,
}: {
  profile: SocialProfile;
  live: GithubLive;
}) {
  /* Live days carry a real date and count. Without them the grid draws an empty
     year rather than a made-up streak — a blank graph is honest, fake data isn't. */
  const days = React.useMemo<ContributionDay[]>(() => {
    if (live.days?.length) return live.days;
    const levels = profile.levels ?? "";
    return Array.from({ length: levels.length || EMPTY_YEAR }, (_, i) => ({
      date: "",
      count: 0,
      level: Number(levels[i] ?? 0),
    }));
  }, [live.days, profile.levels]);

  const total = live.total ?? profile.contributions;
  const caption =
    total === undefined
      ? "Contributions in the last year"
      : `${total.toLocaleString()} contributions in the last year`;

  return (
    <div className={cn(CARD, "w-[420px] p-4")}>
      <div className="flex items-center gap-3">
        {profile.avatar || live.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={live.avatar ?? profile.avatar}
            alt=""
            className="size-9 shrink-0 rounded-full object-cover"
          />
        ) : null}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{profile.username}</p>
          <p className="truncate text-xs text-muted-foreground">{caption}</p>
        </div>
      </div>
      <ContributionHeatmap days={days} label={caption} />
    </div>
  );
}

/* ── Banner ──
   A mesh gradient, drawn here rather than pulled from a package: four colors
   blended by inverse distance to four anchors drifting on their own orbits,
   over a domain-warped field. The warp is what turns four blobs into a mesh —
   without it you get four circles.

   About 60 lines of WebGL and no dependency, which also means no build step to
   add, nothing to keep in version sync, and no second copy of a renderer if you
   already ship one. */

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 u_res;
uniform float u_t;
uniform vec3 u_colors[4];

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  /* Deliberately not aspect-corrected: letting the field stretch with the box
     gives a banner soft horizontal sweeps instead of a row of circles. */
  vec2 p = uv;
  p += 0.18 * vec2(sin(uv.y * 4.0 + u_t * 0.6), cos(uv.x * 4.0 + u_t * 0.5));
  p += 0.10 * vec2(sin(uv.y * 8.0 - u_t * 0.4), cos(uv.x * 7.0 + u_t * 0.45));

  vec3 sum = vec3(0.0);
  float weight = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 anchor = vec2(
      0.5 + 0.42 * sin(u_t * (0.23 + 0.05 * fi) + fi * 1.7),
      0.5 + 0.42 * cos(u_t * (0.19 + 0.06 * fi) + fi * 2.3)
    );
    /* Inverse distance, softened: the epsilon keeps an anchor from burning a
       hard dot into the surface as the field passes over it. */
    float w = 1.0 / (pow(distance(p, anchor), 2.6) + 0.015);
    sum += u_colors[i] * w;
    weight += w;
  }
  gl_FragColor = vec4(sum / weight, 1.0);
}
`;

/**
 * Resolve CSS custom properties — or any CSS color — to [r, g, b] floats.
 *
 * A shader needs numbers, but hardcoding them would put the banners outside the
 * theme. A canvas 2D context normalises whatever the browser can parse
 * (including the `oklch()` shadcn emits under Tailwind v4) down to hex, which
 * gives us numbers while the source of truth stays a theme token. Re-resolves
 * when the theme flips.
 */
function useShaderColors(colors: string[]): number[][] {
  const [rgb, setRgb] = React.useState<number[][]>([]);
  const key = colors.join("|");

  React.useEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;

    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      setRgb(
        key.split("|").map((color) => {
          const raw = color.startsWith("--")
            ? styles.getPropertyValue(color).trim()
            : color;
          ctx.fillStyle = "#888888";
          ctx.fillStyle = raw || "#888888";
          const hex = String(ctx.fillStyle);
          // Opaque colors come back as #rrggbb; anything else keeps mid grey.
          if (hex[0] !== "#" || hex.length !== 7) return [0.53, 0.53, 0.53];
          return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
        }),
      );
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    return () => observer.disconnect();
  }, [key]);

  return rgb;
}

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function MeshGradient({
  colors,
  speed = 0.35,
  className,
}: {
  colors: string[];
  speed?: number;
  className?: string;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rgb = useShaderColors(colors);
  const key = rgb.map((c) => c.join(",")).join(";");

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rgb.length) return;

    /* WebGL 1, not 2: it is the wider net, and nothing here needs 2. A machine
       without either just keeps the CSS gradient painted behind the canvas. */
    const gl = canvas.getContext("webgl", { antialias: false, depth: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const attribute = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    // Fewer than four colors just repeat around the anchors.
    const palette = Array.from({ length: 4 }, (_, i) => rgb[i % rgb.length]);
    gl.uniform3fv(
      gl.getUniformLocation(program, "u_colors"),
      new Float32Array(palette.flat()),
    );

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_t");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      resize();
      // Reduced motion keeps the gradient, drops the drift.
      gl.uniform1f(uTime, still ? 0 : ((now - start) / 1000) * speed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!still) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, speed]);

  return (
    /* `rounded-[inherit]` is not cosmetic. A WebGL canvas is a composited
       layer, and a composited layer ignores an ancestor's rounded
       `overflow: hidden` clip — the card body below it clips fine, so the
       banner alone would sit there with square top corners. Carrying the
       radius down to the canvas itself is what rounds it. */
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full rounded-[inherit]", className)}
    />
  );
}

function Banner({
  colors,
  className,
}: {
  colors: string[];
  className?: string;
}) {
  return (
    /* The gradient is the fallback, not decoration: without WebGL the canvas
       paints nothing, and this is what stays. Only the card on screen is
       mounted, so no banner renders behind a closed panel. */
    <div
      className={cn(
        /* Top corners match the panel's `rounded-2xl`; the banner is always
           flush with the top of a card, and the canvas inherits this. */
        "relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-muted via-accent to-primary/50",
        className,
      )}
    >
      <MeshGradient colors={colors} className="absolute inset-0" />
    </div>
  );
}

/** `relative` on the avatars is load-bearing: the shader banner is a positioned
    element, so a static image would paint under it and lose its overlap. */
const OVERLAP_AVATAR =
  "relative z-10 -mt-7 size-14 rounded-full border-4 border-card object-cover";

function LinkedinCard({
  profile,
  live,
  colors,
}: {
  profile: SocialProfile;
  live: GithubLive;
  colors: string[];
}) {
  return (
    <div className={cn(CARD, "w-[300px]")}>
      <Banner colors={colors} className="h-14" />
      <div className="px-4 pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={live.avatar ?? profile.avatar}
          alt=""
          className={OVERLAP_AVATAR}
        />
        <p className="mt-2 text-sm font-medium">{profile.name}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {profile.headline}
            {profile.headline && profile.location && <br />}
            {profile.location}
          </p>
          {profile.links?.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Connect
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function XCard({
  profile,
  live,
  colors,
}: {
  profile: SocialProfile;
  live: GithubLive;
  colors: string[];
}) {
  return (
    <div className={cn(CARD, "w-[300px]")}>
      {profile.cover ? (
        <div
          className="h-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.cover})` }}
        />
      ) : (
        <Banner colors={colors} className="h-20" />
      )}
      <div className="px-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={live.avatar ?? profile.avatar}
            alt=""
            className={OVERLAP_AVATAR}
          />
          {profile.links?.x && (
            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="mt-2 shrink-0 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Follow
            </a>
          )}
        </div>
        {profile.xHandle && (
          <p className="mt-1.5 text-sm font-medium">@{profile.xHandle}</p>
        )}
        <p className="text-xs text-muted-foreground">{profile.bio}</p>
      </div>
    </div>
  );
}

function defaultItems(
  profile: SocialProfile,
  live: GithubLive,
  bannerColors: { linkedin: string[]; x: string[] },
): SocialPreviewItem[] {
  const links = profile.links ?? {};
  return [
    links.github && {
      id: "github",
      label: "GitHub",
      href: links.github,
      icon: <GithubMark />,
      card: <GithubCard profile={profile} live={live} />,
    },
    links.linkedin && {
      id: "linkedin",
      label: "LinkedIn",
      href: links.linkedin,
      icon: <LinkedinMark />,
      card: (
        <LinkedinCard
          profile={profile}
          live={live}
          colors={bannerColors.linkedin}
        />
      ),
    },
    links.x && {
      id: "x",
      label: "X",
      href: links.x,
      icon: <XMark />,
      card: <XCard profile={profile} live={live} colors={bannerColors.x} />,
    },
  ].filter(Boolean) as SocialPreviewItem[];
}

/* ── Copy pill ── */

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      // No clipboard permission (or no secure context) — hand it to the mail client.
      window.location.assign(`mailto:${email}`);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-copied={copied ? "" : undefined}
      className="group relative flex items-center justify-center rounded-2xl bg-foreground px-4 py-2 text-sm font-medium text-background outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
    >
      {/* Both labels stack so the pill can't change width mid-transition. */}
      <span className="transition-all duration-500 group-data-[copied]:opacity-0 group-data-[copied]:blur-[2px]">
        Copy my email
      </span>
      <span
        aria-hidden="true"
        className="absolute opacity-0 blur-[2px] transition-all duration-500 group-data-[copied]:opacity-100 group-data-[copied]:blur-none"
      >
        E-mail copied!
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}

/* ── Dock ── */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/** Sum offsetLeft up the offsetParent chain until `ancestor`. Transform-independent. */
function offsetLeftWithin(
  el: HTMLElement | null,
  ancestor: HTMLElement | null,
): number {
  let x = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return x;
}

export function SocialPreviewDock({
  profile = {},
  items,
  email,
  live = true,
  bannerColors = DEFAULT_BANNER_COLORS,
  className,
}: SocialPreviewDockProps) {
  const github = useGithubLive(
    profile.username ?? "",
    live && !items && !!profile.username,
  );

  const links = React.useMemo(
    () => items ?? defaultItems(profile, github, bannerColors),
    [items, profile, github, bannerColors],
  );

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const btnRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const [active, setActive] = React.useState<{
    index: number;
    id: string;
  } | null>(null);
  const [box, setBox] = React.useState({ x: 0, width: 0, height: 0 });
  /* First open jumps into place. Springing from the previous card's box would
     otherwise fly the panel in from wherever it last was. */
  const openRef = React.useRef(false);
  const appearing = !openRef.current;

  /* Measure before paint, so the panel never shows a frame at the wrong size.
     The card is absolutely positioned inside an overflow-hidden panel, so its
     own box is its natural one no matter what the panel currently measures. */
  useIsoLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!active || !wrapper) return;
    const card = panelRef.current?.querySelector<HTMLElement>(
      `[data-card="${active.id}"]`,
    );
    const btn = btnRefs.current[active.index];
    if (!card || !btn) return;

    const width = card.offsetWidth;
    const height = card.offsetHeight;

    /* Centre on the icon, then keep the card on screen: the row can sit anywhere
       on the page and every card is wider than it is. When a card is wider than
       the viewport the left edge wins — a cut right edge is cheaper to read than
       a cut avatar. */
    const originLeft = wrapper.getBoundingClientRect().left;
    const centered =
      offsetLeftWithin(btn, wrapper) + btn.offsetWidth / 2 - width / 2;
    const x = Math.max(
      MARGIN - originLeft,
      Math.min(centered, window.innerWidth - MARGIN - width - originLeft),
    );

    setBox({ x, width, height });
    openRef.current = true;
  }, [active, github]);

  const hide = React.useCallback(() => {
    openRef.current = false;
    setActive(null);
  }, []);

  const visible = active !== null && box.width > 0;

  return (
    /* The panel is a DOM child of this wrapper, so moving the pointer from an
       icon up onto the card never fires this `mouseleave` — mouseleave counts
       descendants as inside, wherever they are painted. */
    <div
      ref={wrapperRef}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide();
      }}
      className={cn("relative inline-flex items-center", className)}
    >
      {/* ── Panel ──
             `pb-3` is the gap to the row, and it belongs to this wrapper rather
             than being a margin, so it stays hoverable: the pointer crosses it
             on the way to the card instead of leaving the dock. The shadow is a
             filter here so it follows the panel's animating shape. */}
      <div
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="absolute bottom-full left-0 z-20 pb-3 [filter:drop-shadow(0_12px_24px_rgb(0_0_0/0.14))_drop-shadow(0_2px_6px_rgb(0_0_0/0.08))]"
      >
        <motion.div
          ref={panelRef}
          initial={false}
          animate={{
            x: box.x,
            width: box.width,
            height: box.height,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            opacity: FADE,
            x: appearing ? { duration: 0 } : SPRING_MOVE,
            width: appearing ? { duration: 0 } : SPRING_SIZE,
            height: appearing ? { duration: 0 } : SPRING_SIZE,
          }}
          style={{ willChange: "transform, width, height, opacity" }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground"
        >
          <AnimatePresence initial={false}>
            {active && (
              <motion.div
                key={active.id}
                data-card={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={FADE}
                className="absolute left-0 top-0"
              >
                {links[active.index]?.card}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── The row itself ── */}
      <div className="relative z-10 flex items-center gap-2">
        {email && <CopyEmailButton email={email} />}
        {links.map((item, i) => (
          <a
            key={item.id}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            onMouseEnter={() => setActive({ index: i, id: item.id })}
            onFocus={() => setActive({ index: i, id: item.id })}
            className="rounded-md p-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-6"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialPreviewDock;
