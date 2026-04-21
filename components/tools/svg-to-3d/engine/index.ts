/**
 * Engine barrel — pure helpers reused by the viewer and editor.
 *
 * Nothing here depends on @react-three/fiber. The actual 3D rendering
 * lives in ../svg-to-3d-viewer.tsx using vanilla Three.js.
 */

export type { SVG3DProps, MaterialPreset } from "./types";
export { defaultProps } from "./types";
export { materialPresets, resolveMaterial } from "./materials";
export type { MaterialSettings } from "./materials";
export { useFont, textToSvg, loadFont, fontList } from "./use-font";

export type AnimationType =
  | "none"
  | "spin"
  | "float"
  | "pulse"
  | "wobble"
  | "spinFloat"
  | "swing";
