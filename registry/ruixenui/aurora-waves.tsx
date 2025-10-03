"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uGlow;
uniform float uTheme; // 0 = dark, 1 = light

// Simple smooth palette (Aurora-like)
vec3 palette(float t) {
    return mix(
      vec3(0.1, 0.2, 0.5), // deep blue
      vec3(0.8, 0.4, 0.9), // magenta
      0.5 + 0.5 * sin(t)
    );
}

// Multiple flowing waves
float wave(vec2 uv, float freq, float phase) {
    return 0.4 * sin(uv.x * freq + uTime * uSpeed + phase);
}

// Glow
float glow(float d, float strength) {
    return exp(-d * d * strength);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float y = uv.y;

    // Combine multiple waves
    float w1 = wave(uv, 3.0, 0.0);
    float w2 = wave(uv, 5.0, 1.0);
    float w3 = wave(uv, 7.0, 2.5);

    float waveLine = w1 + w2 * 0.6 + w3 * 0.4;

    // Distance to wave line
    float dist = abs(y - waveLine);

    // Glow around waves
    float g = glow(dist, uGlow);

    // Aurora gradient
    vec3 col = palette(waveLine + y);

    // Apply theme blending (dark → black bg, light → white bg)
    vec3 bg = mix(vec3(0.02, 0.02, 0.05), vec3(1.0), uTheme);

    // Blend glow with background
    col = mix(bg, col, g * 1.5);

    gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  speed?: number;
  glow?: number;
  theme?: "dark" | "light";
  resolutionScale?: number;
};

export default function AuroraWaves({
  speed = 1.0,
  glow = 15.0,
  theme = "dark",
  resolutionScale = 1.0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const parent = canvas.parentElement as HTMLElement;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uSpeed: { value: speed },
        uGlow: { value: glow },
        uTheme: { value: theme === "light" ? 1.0 : 0.0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth,
        h = parent.clientHeight;
      renderer.setSize(w * resolutionScale, h * resolutionScale);
      program.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let frame = 0;

    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [speed, glow, theme, resolutionScale]);

  return <canvas ref={ref} className="w-full h-full block" />;
}
