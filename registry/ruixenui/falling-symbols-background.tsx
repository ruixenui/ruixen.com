"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface FallingSymbolsProps {
  symbols?: string; // characters to display
  symbolColors?: string[];
  fontSize?: number;
  backgroundColor?: string;
  glitchSpeed?: number;
  glitchIntensity?: number;
  fallSpeed?: number;
  outerVignette?: boolean;
  className?: string;
}

const FallingSymbolsBackground: React.FC<FallingSymbolsProps> = ({
  symbols = "░▒▓█▌▐",
  symbolColors = [
    "rgba(255,255,255,0.6)",
    "rgba(255,255,255,0.4)",
    "rgba(200,200,200,0.3)",
  ],
  fontSize = 16,
  backgroundColor = "#080A12",
  glitchSpeed = 80,
  glitchIntensity = 0.03,
  fallSpeed = 0.7,
  outerVignette = true,
  className = "w-full h-full",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const grid = useRef({ columns: 0, rows: 0, charWidth: 0, charHeight: 0 });
  const letters = useRef<
    Array<{ char: string; x: number; y: number; color: string }>
  >([]);
  const lastGlitchTime = useRef(0);

  const getRandomChar = useCallback(
    () => symbols[Math.floor(Math.random() * symbols.length)],
    [symbols],
  );

  const getRandomColor = useCallback(
    () => symbolColors[Math.floor(Math.random() * symbolColors.length)],
    [symbolColors],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const setup = () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // reset transform and rescale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      const charMetrics = ctx.measureText("M");
      grid.current = {
        columns: Math.floor(canvasWidth / charMetrics.width),
        rows: Math.floor(canvasHeight / (fontSize * 1.2)),
        charWidth: charMetrics.width,
        charHeight: fontSize * 1.2,
      };

      const extendedRows = grid.current.rows * 2;
      const totalLetters = grid.current.columns * extendedRows;
      letters.current = Array.from({ length: totalLetters }, (_, i) => {
        const col = i % grid.current.columns;
        const row = Math.floor(i / grid.current.columns);
        return {
          char: getRandomChar(),
          x: col * grid.current.charWidth,
          y:
            row * grid.current.charHeight -
            grid.current.rows * grid.current.charHeight,
          color: getRandomColor(),
        };
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const animate = (timestamp: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (timestamp - lastGlitchTime.current > glitchSpeed) {
        lastGlitchTime.current = timestamp;
        const updateCount = Math.floor(
          letters.current.length * glitchIntensity,
        );
        for (let i = 0; i < updateCount; i++) {
          const index = Math.floor(Math.random() * letters.current.length);
          if (letters.current[index]) {
            letters.current[index].char = getRandomChar();
            letters.current[index].color = getRandomColor();
          }
        }
      }

      const totalFieldHeight = grid.current.rows * grid.current.charHeight * 2;
      letters.current.forEach((letter) => {
        letter.y += fallSpeed;
        if (letter.y > canvasHeight) {
          letter.y -= totalFieldHeight;
        }
      });

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      letters.current.forEach((letter) => {
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, letter.x, letter.y);
      });
    };

    // ✅ Fixed debounce timer type
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setup, 150);
    };

    window.addEventListener("resize", handleResize);
    setup();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    symbols,
    symbolColors,
    fontSize,
    backgroundColor,
    glitchSpeed,
    glitchIntensity,
    fallSpeed,
    getRandomChar,
    getRandomColor,
  ]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      {outerVignette && (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,_transparent_70%,_black_100%)]"></div>
      )}
    </div>
  );
};

export default FallingSymbolsBackground;
