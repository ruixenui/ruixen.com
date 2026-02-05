"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { cn } from "@/lib/utils";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Flowing cloud waves + layered noise + grain
const fragment = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uTheme; // 0.0 = light, 1.0 = dark

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  vec2 uv = (st - 0.5) * 2.0;
  uv.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.25;

  uv *= rot(0.08 * sin(t * 1.7));

  vec2 p = uv * 1.2;

  // layered noise for cloud shapes
  float n  = fbm(p + vec2(t * 0.8, -t * 0.55));
  float m  = fbm(p * 1.8 - vec2(t * 0.35, t * 0.7));
  float n2 = fbm(p * 0.6 + vec2(-t * 0.3, t * 0.4) + n * 0.5);

  float w = 0.0;
  w += sin(p.x * 2.2 + t * 2.4 + n * 2.0);
  w += cos(p.y * 1.7 - t * 1.8 + m * 2.2);
  w *= 0.5;

  float bands = 0.5 + 0.5 * sin(w * 2.4 + n * 3.2);
  float glow  = smoothstep(0.15, 0.85, bands);

  // secondary glow from the extra noise layer — fills more of the canvas
  float glow2 = smoothstep(0.3, 0.8, n2);
  glow = max(glow, glow2 * 0.6);

  vec3 lightA = vec3(0.94, 0.97, 1.00);
  vec3 lightB = vec3(0.16, 0.46, 0.95);

  vec3 darkA  = vec3(0.06, 0.09, 0.16);
  vec3 darkB  = vec3(0.10, 0.72, 0.96);

  vec3 baseA = mix(lightA, darkA, uTheme);
  vec3 baseB = mix(lightB, darkB, uTheme);

  vec3 col = mix(baseA, baseB, glow);

  // soft highlight
  col += 0.10 * vec3(0.8, 0.9, 1.0) * glow * (0.4 + 0.6 * sin(uTime * 0.6));

  // subtle grain
  float g = (hash(gl_FragCoord.xy + uTime * 60.0) - 0.5) * 0.025;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  darkTheme?: boolean;
  resolutionScale?: number; // 0.5..2.0 recommended
  className?: string;
};

export default function WaveBackground({
  darkTheme = false,
  resolutionScale = 1.0,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const rafRef = useRef<number | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const startRef = useRef<number>(0);

  // Initialize once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
    const clampedScale = Math.min(Math.max(resolutionScale, 0.5), 2);

    const renderer = new Renderer({
      canvas,
      alpha: true,
      antialias: true,
      dpr: baseDpr * clampedScale,
    });

    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uTheme: { value: darkTheme ? 1 : 0 },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      // If parent has no height, nothing can render.
      if (!w || !h) return;

      renderer.setSize(w, h);

      // Match gl_FragCoord scale exactly:
      program.uniforms.uResolution.value.set(
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      );
    };

    roRef.current = new ResizeObserver(resize);
    roRef.current.observe(parent);

    // First resize after layout
    resize();

    startRef.current = performance.now();

    const loop = () => {
      const now = performance.now();
      program.uniforms.uTime.value = (now - startRef.current) / 1000;

      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      roRef.current?.disconnect();
      roRef.current = null;

      rendererRef.current = null;
      programRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme without recreating WebGL
  useEffect(() => {
    const program = programRef.current;
    if (!program) return;
    program.uniforms.uTheme.value = darkTheme ? 1 : 0;
  }, [darkTheme]);

  // Update render quality without recreating WebGL
  useEffect(() => {
    const renderer = rendererRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    if (!renderer || !program || !canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
    const clampedScale = Math.min(Math.max(resolutionScale, 0.5), 2);

    renderer.dpr = baseDpr * clampedScale;

    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (!w || !h) return;

    renderer.setSize(w, h);
    const gl = renderer.gl;
    program.uniforms.uResolution.value.set(
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
    );
  }, [resolutionScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full block pointer-events-none",
        className,
      )}
    />
  );
}
