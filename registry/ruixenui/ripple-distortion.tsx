"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface RippleDistortionProps {
  imageSrc: string;
  frequency?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

const vertexShader = `
uniform float time;
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

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Distance from mouse
  float dist = distance(uv, uMouse);

  // Ripple effect
  float ripple = sin(dist * frequency - time * speed) * amplitude / (dist + 0.1);

  vec2 distortedUv = uv + normalize(uv - uMouse) * ripple;
  gl_FragColor = texture2D(uTexture, distortedUv);
}
`;

const RippleDistortion: React.FC<RippleDistortionProps> = ({
  imageSrc,
  frequency = 30.0,
  amplitude = 0.02,
  speed = 5.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      uTexture: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      frequency: { value: frequency },
      amplitude: { value: amplitude },
      speed: { value: speed },
    };

    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (texture: THREE.Texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
      resize();
    });

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height);
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
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default RippleDistortion;
