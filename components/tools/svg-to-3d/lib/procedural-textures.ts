/**
 * Canvas-based procedural texture generators.
 *
 * Adapted from 3dsvg (MIT, © Renato Costa).
 */

export interface TexturePreset {
  name: string;
  generate: () => string;
}

function createCanvas(
  size: number = 512,
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  return [canvas, ctx];
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function noise(
  ctx: CanvasRenderingContext2D,
  size: number,
  scale: number,
  seed: number = 42,
) {
  const rng = seededRandom(seed);
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const v = Math.floor(rng() * scale);
      data[i] = data[i] + v;
      data[i + 1] = data[i + 1] + v;
      data[i + 2] = data[i + 2] + v;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

export const texturePresets: TexturePreset[] = [
  {
    name: "Marble",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#f0f0f0");
      grad.addColorStop(0.3, "#e8e8e8");
      grad.addColorStop(0.5, "#d0d0d0");
      grad.addColorStop(0.7, "#e8e8e8");
      grad.addColorStop(1, "#f5f5f5");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      const rng = seededRandom(123);
      ctx.strokeStyle = "rgba(180,180,190,0.3)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        let x = rng() * 512;
        let y = rng() * 512;
        ctx.moveTo(x, y);
        for (let j = 0; j < 8; j++) {
          x += (rng() - 0.5) * 120;
          y += (rng() - 0.3) * 80;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      noise(ctx, 512, 15, 77);
      return canvas.toDataURL();
    },
  },
  {
    name: "Wood",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      ctx.fillStyle = "#c4956a";
      ctx.fillRect(0, 0, 512, 512);

      const rng = seededRandom(99);
      for (let i = 0; i < 60; i++) {
        const y = i * 8.5 + rng() * 4;
        ctx.strokeStyle = `rgba(${100 + rng() * 40}, ${60 + rng() * 30}, ${30 + rng() * 20}, ${0.15 + rng() * 0.2})`;
        ctx.lineWidth = 1 + rng() * 3;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < 512; x += 20) {
          ctx.lineTo(x, y + (rng() - 0.5) * 3);
        }
        ctx.stroke();
      }
      noise(ctx, 512, 12, 55);
      return canvas.toDataURL();
    },
  },
  {
    name: "Concrete",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      ctx.fillStyle = "#b0b0b0";
      ctx.fillRect(0, 0, 512, 512);
      noise(ctx, 512, 40, 33);

      const rng = seededRandom(200);
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(${140 + rng() * 40}, ${140 + rng() * 40}, ${140 + rng() * 40}, 0.3)`;
        const x = rng() * 512;
        const y = rng() * 512;
        const w = 2 + rng() * 8;
        const h = 2 + rng() * 8;
        ctx.fillRect(x, y, w, h);
      }
      return canvas.toDataURL();
    },
  },
  {
    name: "Gradient",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, "#667eea");
      grad.addColorStop(1, "#764ba2");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      return canvas.toDataURL();
    },
  },
  {
    name: "Sunset",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#f093fb");
      grad.addColorStop(0.5, "#f5576c");
      grad.addColorStop(1, "#fda085");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      return canvas.toDataURL();
    },
  },
  {
    name: "Ocean",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      const grad = ctx.createLinearGradient(0, 0, 256, 512);
      grad.addColorStop(0, "#2193b0");
      grad.addColorStop(1, "#6dd5ed");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      noise(ctx, 512, 20, 88);
      return canvas.toDataURL();
    },
  },
  {
    name: "Dots",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = "#333333";
      const spacing = 24;
      for (let y = spacing / 2; y < 512; y += spacing) {
        for (let x = spacing / 2; x < 512; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return canvas.toDataURL();
    },
  },
  {
    name: "Stripes",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = "#1a1a2e";
      for (let i = 0; i < 512; i += 20) {
        ctx.fillRect(i, 0, 10, 512);
      }
      return canvas.toDataURL();
    },
  },
  {
    name: "Checker",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      const cellSize = 32;
      for (let y = 0; y < 512; y += cellSize) {
        for (let x = 0; x < 512; x += cellSize) {
          const isEven = (x / cellSize + y / cellSize) % 2 === 0;
          ctx.fillStyle = isEven ? "#ffffff" : "#222222";
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
      return canvas.toDataURL();
    },
  },
  {
    name: "Noise",
    generate: () => {
      const [canvas, ctx] = createCanvas();
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, 512, 512);
      const imageData = ctx.getImageData(0, 0, 512, 512);
      const data = imageData.data;
      const rng = seededRandom(42);
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.floor(rng() * 255);
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    },
  },
];
