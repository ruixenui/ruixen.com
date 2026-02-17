"use client";

/**
 * Grain Gradient Background — vivid green→teal gradient with coarse film grain.
 *
 * Key techniques:
 *   1. Saturated CSS gradient (bright green → deep dark teal)
 *   2. SVG feTurbulence → feComponentTransfer (contrast boost) → feColorMatrix (desaturate)
 *   3. Coarse base frequency (0.55) for large visible speckles
 *   4. High-opacity overlay blend for punchy grain
 *   5. Edge vignette for depth
 */

export function GrainGradientBg({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(145deg, #8ec63f 0%, #5db848 16%, #34a853 32%, #1e9660 48%, #138567 64%, #0a7058 80%, #04503e 100%)",
      }}
    >
      {/* Grain noise — coarse, high-contrast speckle */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ isolation: "isolate" }}
      >
        <defs>
          {/* Coarse grain with contrast boost */}
          <filter id="grain-coarse" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves={4}
              stitchTiles="stitch"
              result="noise"
            />
            {/* Boost contrast: stretch midtones → darks become darker, lights brighter */}
            <feComponentTransfer in="noise" result="boosted">
              <feFuncR type="linear" slope={3} intercept={-0.8} />
              <feFuncG type="linear" slope={3} intercept={-0.8} />
              <feFuncB type="linear" slope={3} intercept={-0.8} />
            </feComponentTransfer>
            {/* Desaturate to pure grayscale grain */}
            <feColorMatrix type="saturate" values="0" in="boosted" />
          </filter>

          {/* Fine secondary grain for density between the coarse speckles */}
          <filter id="grain-fine" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={3}
              stitchTiles="stitch"
              result="fnoise"
            />
            <feComponentTransfer in="fnoise" result="fboosted">
              <feFuncR type="linear" slope={2.5} intercept={-0.6} />
              <feFuncG type="linear" slope={2.5} intercept={-0.6} />
              <feFuncB type="linear" slope={2.5} intercept={-0.6} />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0" in="fboosted" />
          </filter>
        </defs>

        {/* Primary layer — coarse, prominent speckles */}
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-coarse)"
          style={{ opacity: 0.85, mixBlendMode: "overlay" }}
        />
        {/* Secondary layer — finer grain fills gaps */}
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-fine)"
          style={{ opacity: 0.5, mixBlendMode: "overlay" }}
        />
      </svg>

      {/* Vignette — edge darkening for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(2,30,20,0.35) 100%)",
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </div>
  );
}

export default GrainGradientBg;
