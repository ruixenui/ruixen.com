"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface RippleDistortionProps {
  imageSrc: string;
  width?: string | number;
  height?: string | number;
  frequency?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float frequency;
uniform float amplitude;
uniform float speed;
uniform vec2 uScale;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // maintain cover aspect ratio
  uv = (uv - 0.5) * uScale + 0.5;

  float dist = distance(uv, uMouse);
  float ripple = sin(dist * frequency - time * speed) * amplitude / (dist + 0.1);
  vec2 distortedUv = uv + normalize(uv - uMouse) * ripple;

  gl_FragColor = texture2D(uTexture, distortedUv);
}
`;

const RippleDistortion: React.FC<RippleDistortionProps> = ({
  imageSrc,
  width = "100%",
  height = "100%",
  frequency = 30.0,
  amplitude = 0.02,
  speed = 5.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      time: { value: 0 },
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      frequency: { value: frequency },
      amplitude: { value: amplitude },
      speed: { value: speed },
      uScale: { value: new THREE.Vector2(1, 1) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      uniforms.uTexture.value = texture;
      resize();
    });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h, false);

      const texture = uniforms.uTexture.value;
      if (texture && texture.image) {
        const imageAspect = texture.image.width / texture.image.height;
        const screenAspect = w / h;

        if (imageAspect > screenAspect) {
          uniforms.uScale.value.set(screenAspect / imageAspect, 1.0);
        } else {
          uniforms.uScale.value.set(1.0, imageAspect / screenAspect);
        }
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
    };

    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      uniforms.time.value += 0.02;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, [imageSrc, frequency, amplitude, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        position: "relative",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

export default RippleDistortion;
