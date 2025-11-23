import type { GradientState, ColorStop } from "@/lib/use-gradient";

function stopToSvg(stop: ColorStop): string {
  const offset = (stop.position * 100).toFixed(2) + "%";
  return `<stop offset="${offset}" stop-color="${stop.color}" stop-opacity="${stop.opacity.toFixed(
    3
  )}"/>`;
}

export function downloadSVG(state: GradientState, filename = "gradient.svg") {
  if (typeof document === "undefined") return;

  const id = `g-${Date.now().toString(36)}`;
  const stops = state.stops.map(stopToSvg).join("");
  let gradientTag = "";
  const origin = `${(state.origin.x * 100).toFixed(1)}% ${(state.origin.y * 100).toFixed(1)}%`;

  if (state.type === "linear") {
    gradientTag = `<linearGradient id="${id}" gradientTransform="rotate(${state.angle})">
${stops}
</linearGradient>`;
  } else if (state.type === "radial") {
    gradientTag = `<radialGradient id="${id}" cx="${origin.split(" ")[0]}" cy="${
      origin.split(" ")[1]
    }" r="75%">
${stops}
</radialGradient>`;
  } else {
    // conic approximation: use radial as a fallback
    gradientTag = `<radialGradient id="${id}" cx="${origin.split(" ")[0]}" cy="${
      origin.split(" ")[1]
    }" r="75%">
${stops}
</radialGradient>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    ${gradientTag}
  </defs>
  <rect x="0" y="0" width="1200" height="800" fill="url(#${id})" />
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
