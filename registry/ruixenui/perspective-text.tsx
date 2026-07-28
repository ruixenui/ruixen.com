"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PerspectiveTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** The headline. Set on an arc, so it stays real selectable text. */
  text: string;
  /** How deep the arc bows, as a fraction of the headline's width. 0 is a flat baseline. */
  curve?: number;
  /** Degrees the plane tips toward the viewer, giving the letters their taper. 0 is flat type. */
  tilt?: number;
  /** Vertical scale applied before the tilt, undoing its foreshortening and then some. */
  stretch?: number;
  /** Typeface for the headline. Heavy condensed faces hold up best under the tilt. */
  fontFamily?: string;
  /** Element wrapping the headline. Use a heading on a real page. */
  as?: React.ElementType;
}

/** Font size the geometry is authored at. One em === this many user units. */
const EM = 100;

/**
 * Average glyph advance for a heavy condensed face, measured from Impact
 * (0.502 em/char). Only sizes the box — the type is never scaled to fit it.
 */
const ADVANCE = 0.5;

/** Cap height and descender as fractions of the em, for sizing the viewBox. */
const CAP = 0.72;
const DESCENDER = 0.25;

/** Viewer distance for the projection. In em, so the warp holds at any headline size. */
const VIEWER_DISTANCE = 2.8;

/** How far past the estimated word the path runs, so wide faces still fit on it. */
const OVERRUN = 3;

/** Ceiling on the arc's half-angle, keeping it short of wrapping the full circle. */
const MAX_HALF_ANGLE = 2.9;

/** Impact is the one heavy condensed face that ships on both macOS and Windows. */
const DISPLAY_STACK =
  'Impact, Haettenschweiler, "Arial Narrow Bold", "Franklin Gothic Bold", sans-serif';

export function PerspectiveText({
  text,
  as: Component = "span",
  className,
  curve = 0.08,
  fontFamily = DISPLAY_STACK,
  stretch = 1.35,
  style,
  tilt = 30,
  ...props
}: PerspectiveTextProps) {
  // Ids must survive into an href fragment, and useId's colons do not.
  const pathId = `arc-${React.useId().replace(/:/g, "")}`;

  const geometry = React.useMemo(() => {
    const width = Math.max(1, text.length) * ADVANCE * EM;
    const sagitta = Math.max(curve, 0) * width;

    // Baseline sits low enough that the arc's apex still clears the top edge.
    const baseline = sagitta + CAP * EM;
    // Reserving descender room a word never uses leaves dead space at the
    // bottom of the box, which reads as the headline sitting too high once the
    // box is centred. Only pay for it when something actually descends.
    // ponytail: Latin descenders only — widen the class for other scripts.
    const height = baseline + (/[gjpqy]/.test(text) ? DESCENDER * EM : 0);

    // The path runs well past the box on both sides. A glyph that falls off the
    // end of a textPath is not drawn at all, so a face wider than the estimate
    // would silently lose its first and last letters. Running long costs
    // nothing — the path is never stroked — and the text is centred on it.
    if (sagitta < EM * 0.002) {
      const half = width * OVERRUN;
      return {
        d: `M ${width / 2 - half} ${baseline} L ${width / 2 + half} ${baseline}`,
        height,
        width,
      };
    }

    // Radius of the circle through both chord ends and the apex.
    const radius = (width * width + 4 * sagitta * sagitta) / (8 * sagitta);
    const centerY = CAP * EM + radius;

    // Half-angle the estimated word occupies, then the same circle carried
    // further round so anything wider still lands on the path. Curvature is set
    // by the radius alone, so the bow is identical whatever the extension.
    const nominal = Math.asin(Math.min(1, width / 2 / radius));
    const half = Math.min(nominal * OVERRUN, MAX_HALF_ANGLE);
    const dx = radius * Math.sin(half);
    const dy = centerY - radius * Math.cos(half);
    const largeArc = 2 * half > Math.PI ? 1 : 0;
    const r = radius.toFixed(3);

    return {
      d: `M ${(width / 2 - dx).toFixed(3)} ${dy.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${(width / 2 + dx).toFixed(3)} ${dy.toFixed(3)}`,
      height,
      width,
    };
  }, [curve, text]);

  return (
    <Component
      className={cn("inline-block", className)}
      style={{ fontFamily, ...style }}
      {...props}
    >
      <svg
        aria-label={text}
        // Sized in em, so the SVG, the perspective distance, and the type all
        // scale together off whatever font-size lands on the wrapper.
        height={`${(geometry.height / EM).toFixed(4)}em`}
        role="img"
        style={{
          display: "block",
          overflow: "visible",
          // Negative rotateX brings the cap line toward the viewer, so strokes
          // read wide at the top and taper to the baseline.
          transform: `perspective(${VIEWER_DISTANCE}em) rotateX(${-tilt}deg) scaleY(${stretch})`,
          // Pivot on the middle, not the baseline. Hinging at the bottom sends
          // every bit of the projection's extra height upward, so the layout box
          // ends up under the artwork and centring the box does not centre it.
          transformOrigin: "50% 50%",
        }}
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        width={`${(geometry.width / EM).toFixed(4)}em`}
      >
        <path d={geometry.d} fill="none" id={pathId} />
        {/*
          Anchoring the middle of the string to the middle of the arc centres the
          headline by construction — for any typeface, any string. Pinning it to
          the path's full length instead would force every glyph to match a width
          guessed from the character count, which distorts the letterforms by
          however far that guess is off.
        */}
        <text fill="currentColor" fontSize={EM} textAnchor="middle">
          <textPath href={`#${pathId}`} startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </Component>
  );
}
