"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RecedingTextPlaneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Degrees the plane rakes away from the viewer. 0 is flat type; past ~45 the
   * near lines outrun the frame before the far ones have finished folding.
   */
  angle?: number;
  /**
   * Copy laid onto the plane. Long enough to wrap several times is the point —
   * the effect lives in the depth gap between one line and the next, so a
   * single line has nothing to read against.
   */
  children: React.ReactNode;
  /**
   * Slides the slab along the raked plane, in pixels — the framing knob. 0
   * centres it on the frame. Positive pushes the near, blown-out lines into
   * view; negative pulls the far, folded ones in.
   */
  offset?: number;
  /**
   * Viewer distance in pixels. A wide lens by default — at 200 the near lines
   * swell past 2x while the far ones fold into the horizon. Past ~600 the whole
   * thing flattens into a mild tilt.
   */
  perspective?: number;
}

export function RecedingTextPlane({
  angle = 30,
  children,
  className,
  offset = 0,
  perspective = 200,
  ...props
}: RecedingTextPlaneProps) {
  return (
    <div
      className={cn(
        "relative h-screen w-full overflow-hidden bg-muted",
        className,
      )}
      {...props}
    >
      {/*
        Pinned to the frame rather than sized by the copy. Let this box grow with
        the text and the pivot drifts down with it, so the same `offset` frames a
        short headline and a long paragraph completely differently.
      */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
      >
        {/*
          Rake, then slide, then lift off the plane — read right to left, the
          slab is pushed down the flat plane first and only then tipped, so
          `offset` moves the type along the ground rather than across the screen.
          The 10px of Z keeps the near edge off the plane itself, which stops the
          bottom line from clipping through the vanishing point.
        */}
        <p
          className="w-full max-w-4xl text-center text-4xl font-bold tracking-tighter text-chart-2 sm:text-5xl md:text-6xl"
          style={{
            transform: `rotateX(${angle}deg) translateY(${offset}px) translateZ(10px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
