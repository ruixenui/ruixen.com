/**
 * SVG3D engine types.
 *
 * Adapted from 3dsvg (MIT, © Renato Costa) — https://github.com/renatoworks/3dsvg
 */

export type MaterialPreset =
  | "default"
  | "plastic"
  | "metal"
  | "glass"
  | "rubber"
  | "chrome"
  | "gold"
  | "clay"
  | "emissive"
  | "holographic";

export interface SVG3DProps {
  text?: string;
  font?: string;
  svg?: string;
  svgString?: string;

  depth?: number;
  smoothness?: number;
  color?: string;

  material?: MaterialPreset;
  metalness?: number;
  roughness?: number;
  opacity?: number;
  wireframe?: boolean;

  rotationX?: number;
  rotationY?: number;
  zoom?: number;
  fov?: number;

  interactive?: boolean;
  cursorOrbit?: boolean;
  orbitStrength?: number;
  draggable?: boolean;
  scrollZoom?: boolean;
  resetOnIdle?: boolean;
  resetDelay?: number;

  texture?: string;
  textureRepeat?: number;
  textureRotation?: number;
  textureOffset?: [number, number];

  lightPosition?: [number, number, number];
  lightIntensity?: number;
  ambientIntensity?: number;
  shadow?: boolean;

  animate?:
    | "none"
    | "spin"
    | "float"
    | "pulse"
    | "wobble"
    | "spinFloat"
    | "swing";
  animateSpeed?: number;
  animateReverse?: boolean;

  intro?: "zoom" | "fade" | "none";
  introDuration?: number;
  introFrom?: { zoom?: number; opacity?: number };
  introTo?: { zoom?: number; opacity?: number };

  width?: string | number;
  height?: string | number;
  background?: string;
  className?: string;

  onReady?: () => void;
  onAnimationComplete?: () => void;
  onLoadingChange?: (loading: boolean, progress: number) => void;
  resetKey?: number;
  registerCanvas?: (canvas: HTMLCanvasElement) => void;
  children?: React.ReactNode;
}

export const defaultProps: Required<
  Pick<
    SVG3DProps,
    | "font"
    | "depth"
    | "smoothness"
    | "color"
    | "material"
    | "metalness"
    | "roughness"
    | "opacity"
    | "wireframe"
    | "rotationX"
    | "rotationY"
    | "zoom"
    | "fov"
    | "textureRepeat"
    | "textureRotation"
    | "textureOffset"
    | "lightPosition"
    | "lightIntensity"
    | "ambientIntensity"
    | "shadow"
    | "cursorOrbit"
    | "orbitStrength"
    | "draggable"
    | "scrollZoom"
    | "resetOnIdle"
    | "resetDelay"
    | "intro"
    | "introDuration"
    | "introFrom"
    | "introTo"
    | "width"
    | "height"
    | "background"
  >
> = {
  font: "DM Sans",
  depth: 1,
  smoothness: 0.2,
  color: "#ffffff",
  material: "default",
  metalness: 0.15,
  roughness: 0.35,
  opacity: 1,
  wireframe: false,
  rotationX: 0,
  rotationY: 0,
  zoom: 8,
  fov: 50,
  textureRepeat: 1,
  textureRotation: 0,
  textureOffset: [0, 0] as [number, number],
  lightPosition: [5, 8, 5] as [number, number, number],
  lightIntensity: 1.2,
  ambientIntensity: 0.3,
  shadow: true,
  cursorOrbit: true,
  orbitStrength: 0.15,
  draggable: true,
  scrollZoom: false,
  resetOnIdle: false,
  resetDelay: 2,
  intro: "zoom",
  introDuration: 2.5,
  introFrom: { zoom: 18, opacity: 0 },
  introTo: { zoom: 8, opacity: 1 },
  width: "100%",
  height: "100%",
  background: "transparent",
};
