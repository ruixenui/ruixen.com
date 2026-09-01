"use client";

import * as React from "react";
import {
  ArcWheelSelect,
  type ArcWheelItem,
} from "@/registry/ruixenui/arc-wheel-select";

/* Self-animating SVG icons. The keyframes belong to the icons, not to the
 * wheel — each one runs on its own clock whether or not it is selected, and
 * the wheel never touches them.
 *
 * `transform-box: view-box` is what makes this tractable: every icon shares
 * the same 24×24 viewBox, so `transform-origin: 12px 12px` means the same
 * point in all of them and a rotation is written in the coordinates you can
 * see in the path. With the default `border-box` the origin would be the
 * element's own box and every needle would swing around its own middle.
 *
 * The reduced-motion guard is the icons' job too — CSS can honour it, which
 * is the reason these are keyframes and not SMIL `<animate>` elements. */
const ICON_CSS = `
[class^="aw-"] {
  transform-box: view-box;
  transform-origin: 12px 12px;
}
.aw-swing { transform-origin: 12px 5px; animation: aw-swing 2.6s ease-in-out infinite; }
.aw-spin-slow { animation: aw-spin 14s linear infinite; }
.aw-spin { animation: aw-spin 1.3s linear infinite; }
.aw-sweep { animation: aw-sweep 4.5s ease-in-out infinite; }
.aw-flicker { transform-origin: 12px 21px; animation: aw-flicker 1.4s ease-in-out infinite; }
.aw-bob { animation: aw-bob 2.8s ease-in-out infinite; }
.aw-thrust { transform-origin: 12px 18px; animation: aw-thrust 0.6s ease-in-out infinite; }
.aw-lift { animation: aw-lift 2.4s ease-in-out infinite; }
.aw-blink { animation: aw-blink 3.6s ease-in-out infinite; }
.aw-wave { animation: aw-wave 1.8s ease-in-out infinite; }
.aw-twinkle { animation: aw-twinkle 2.2s ease-in-out infinite; }
.aw-draw { stroke-dasharray: 20 20; animation: aw-draw 2.2s linear infinite; }

@keyframes aw-swing { 0%, 100% { transform: rotate(-9deg); } 50% { transform: rotate(9deg); } }
@keyframes aw-spin { to { transform: rotate(360deg); } }
@keyframes aw-sweep { 0%, 100% { transform: rotate(-34deg); } 50% { transform: rotate(34deg); } }
@keyframes aw-flicker { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06, 1.12); } }
@keyframes aw-bob { 0%, 100% { transform: translateY(1px); } 50% { transform: translateY(-2px); } }
@keyframes aw-thrust { 0%, 100% { transform: scaleY(0.55); opacity: 0.35; } 50% { transform: scaleY(1.15); opacity: 1; } }
@keyframes aw-lift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
@keyframes aw-blink { 0%, 88%, 100% { transform: scale(1); } 94% { transform: scale(0.5); } }
@keyframes aw-wave { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
@keyframes aw-twinkle { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes aw-draw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  [class^="aw-"] { animation: none !important; }
}
`;

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const Bell = () => (
  <svg {...svg}>
    <g className="aw-swing">
      <path d="M7 10.5a5 5 0 0 1 10 0v3.2l1.8 3H5.2l1.8-3z" />
      <path d="M10 19.5a2 2 0 0 0 4 0" />
    </g>
  </svg>
);

const Sun = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="4" />
    <path
      className="aw-spin-slow"
      d="M12 2v2.6M12 19.4V22M2 12h2.6M19.4 12H22M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8"
    />
  </svg>
);

const Moon = () => (
  <svg {...svg}>
    <path d="M20.6 13.4A8.6 8.6 0 1 1 10.6 3.4a6.7 6.7 0 0 0 10 10z" />
    <path
      className="aw-twinkle"
      style={{ transformOrigin: "6.5px 6px" }}
      d="M6.5 4.6v2.8M5.1 6h2.8"
    />
    <path
      className="aw-twinkle"
      style={{ transformOrigin: "9.5px 10.5px", animationDelay: "0.9s" }}
      d="M9.5 9.5v2M8.5 10.5h2"
    />
  </svg>
);

const Flame = () => (
  <svg {...svg}>
    <path
      className="aw-flicker"
      d="M12.6 21.4c3.2 0 5.4-2.2 5.4-5.3 0-2.6-1.5-4.4-2.7-6-1-1.3-1.5-2.5-1.4-4.3-2.1 1.2-3.8 2.8-4.9 4.4-1.1 1.7-2.5 3.4-2.5 5.9 0 3.1 2.4 5.3 6.1 5.3z"
    />
    <path
      className="aw-flicker"
      style={{ animationDelay: "0.45s" }}
      d="M12.6 18.5c1.5 0 2.5-1 2.5-2.3 0-1.1-.7-1.9-1.3-2.7-.5-.6-.7-1.2-.7-2-1 .6-1.8 1.4-2.3 2.2-.5.8-1 1.6-1 2.5 0 1.3 1.1 2.3 2.8 2.3z"
    />
  </svg>
);

const Rocket = () => (
  <svg {...svg}>
    <g className="aw-bob">
      <path d="M12 2.8c2.9 2.7 4.4 6 4.4 9.4l-1.4 4H9l-1.4-4c0-3.4 1.5-6.7 4.4-9.4z" />
      <circle cx="12" cy="10" r="1.7" />
      <path className="aw-thrust" d="M10.6 18.4v2.8M13.4 18.4v2.8" />
    </g>
  </svg>
);

const Compass = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="9" />
    <path className="aw-sweep" d="M14.9 9.1l-2.2 5.8-5.6 2.2 2.2-5.8z" />
  </svg>
);

const Volume = () => (
  <svg {...svg}>
    <path d="M11 5 6.5 9H3.5v6h3l4.5 4z" />
    <path className="aw-wave" d="M15.2 9.2a4.5 4.5 0 0 1 0 5.6" />
    <path
      className="aw-wave"
      style={{ animationDelay: "0.35s" }}
      d="M18 6.6a8.5 8.5 0 0 1 0 10.8"
    />
  </svg>
);

const Layers = () => (
  <svg {...svg}>
    <path className="aw-lift" d="M12 3l8 4.5-8 4.5-8-4.5z" />
    <path d="M4 12.2 12 16.7l8-4.5" />
    <path d="M4 16.7 12 21.2l8-4.5" />
  </svg>
);

const Camera = () => (
  <svg {...svg}>
    <path d="M3.5 9.5A1.5 1.5 0 0 1 5 8h2l1.4-2h7.2L17 8h2a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z" />
    <circle
      className="aw-blink"
      style={{ transformOrigin: "12px 13.5px" }}
      cx="12"
      cy="13.5"
      r="3.4"
    />
  </svg>
);

const Signal = () => (
  <svg {...svg}>
    <path
      className="aw-wave"
      style={{ animationDelay: "0.5s" }}
      d="M4.5 12.5a10.5 10.5 0 0 1 15 0"
    />
    <path
      className="aw-wave"
      style={{ animationDelay: "0.25s" }}
      d="M7.8 15.6a6 6 0 0 1 8.4 0"
    />
    <circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const Pulse = () => (
  <svg {...svg}>
    <path className="aw-draw" d="M2.5 12h4L9 6l4 12 2.5-6h6" />
  </svg>
);

const Sync = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="9" opacity="0.25" />
    <path className="aw-spin" d="M12 3a9 9 0 0 1 9 9" />
  </svg>
);

const TOOLS: ArcWheelItem[] = [
  { value: "alerts", label: "Alerts", icon: <Bell /> },
  { value: "day", label: "Day", icon: <Sun /> },
  { value: "night", label: "Night", icon: <Moon /> },
  { value: "streak", label: "Streak", icon: <Flame /> },
  { value: "launch", label: "Launch", icon: <Rocket /> },
  { value: "explore", label: "Explore", icon: <Compass /> },
  { value: "volume", label: "Volume", icon: <Volume /> },
  { value: "layers", label: "Layers", icon: <Layers /> },
  { value: "capture", label: "Capture", icon: <Camera /> },
  { value: "signal", label: "Signal", icon: <Signal /> },
  { value: "activity", label: "Activity", icon: <Pulse /> },
  { value: "sync", label: "Sync", icon: <Sync /> },
];

export default function ArcWheelSelectDemo() {
  const [tool, setTool] = React.useState("launch");

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <style>{ICON_CSS}</style>
      <ArcWheelSelect
        items={TOOLS}
        value={tool}
        onValueChange={setTool}
        aria-label="Pick a tool"
      />
      <p className="text-center text-sm text-muted-foreground">
        Every icon animates itself — scroll, click or use the arrow keys.
        Currently{" "}
        <span className="font-medium text-foreground">
          {TOOLS.find((t) => t.value === tool)?.label}
        </span>
      </p>
    </div>
  );
}
