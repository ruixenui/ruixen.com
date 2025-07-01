import { useEffect, useState } from "react";
import { Sparkle } from "lucide-react";
import { loadFull } from "tsparticles";
import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const options: ISourceOptions = {
  key: "star",
  name: "Star",
  particles: {
    number: {
      value: 20,
      density: { enable: false },
    },
    color: {
      value: ["#adfa1d", "#d4ff4a", "#b2f12b", "#caff72", "#e5ff98", "#c0ff33", "#9eea10"],
    },
    shape: {
      type: "star",
      options: { star: { sides: 3 } },
    },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 1 } },
    rotate: {
      value: { min: 0, max: 360 },
      enable: true,
      direction: "clockwise",
      animation: { enable: true, speed: 5, sync: false },
    },
    links: { enable: false },
    reduceDuplicates: true,
    move: {
      enable: true,
      center: { x: 120, y: 45 },
    },
  },
  interactivity: { events: {} },
  smooth: true,
  fpsLimit: 120,
  background: { color: "transparent", size: "cover" },
  fullScreen: { enable: false },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: { value: 1, density: 1, limit: { radius: 5, mass: 5 } },
      position: { x: 110, y: 45 },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: { wait: true },
      rate: { quantity: 5, delay: 0.5 },
      position: { x: 110, y: 45 },
    },
  ],
};

export const BrandButton = () => {
  const [particleState, setParticlesReady] = useState<"loaded" | "ready">();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesReady("loaded");
    });
  }, []);

  return (
    <button
      className="group relative rounded-full bg-gradient-to-r from-blue-200/30 via-indigo-400/30 via-40% to-fuchsia-500/30 p-1 text-white transition-transform hover:scale-110 active:scale-105"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 via-40% to-purple-500 px-2 py-1 text-white">
        <Sparkle className="size-3 -translate-y-0.5 animate-sparkle fill-white" />
        <Sparkle style={{ animationDelay: "1.5s", animationDuration: "2.5s" }} className="absolute left-4 top-4 size-1 -rotate-12 animate-sparkle fill-white" />
        <Sparkle style={{ animationDelay: "1.5s", animationDuration: "2.5s" }} className="absolute left-6 top-1.5 size-1 -rotate-12 animate-sparkle fill-white" />
        <Sparkle style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} className="absolute left-5 top-2 size-1.5 animate-sparkle fill-white" />

        <span className="font-medium text-xs">Request a component</span>
      </div>

      {!!particleState && (
        <Particles
          id="star-bg"
          className="pointer-events-none absolute -bottom-4 -left-4 -right-4 -top-4 z-0 opacity-100"
          particlesLoaded={async () => setParticlesReady("ready")}
          options={options}
        />
      )}
    </button>
  );
};
