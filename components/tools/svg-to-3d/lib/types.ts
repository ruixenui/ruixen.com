import { materialPresets } from "../engine";

export type { MaterialSettings, MaterialPreset } from "../engine";
export { materialPresets } from "../engine";

export const defaultMaterialSettings = {
  preset: "default" as const,
  metalness: materialPresets.default.metalness,
  roughness: materialPresets.default.roughness,
  opacity: materialPresets.default.opacity,
  transparent: materialPresets.default.transparent,
  wireframe: false,
};

export interface TextureSettings {
  offsetX: number;
  offsetY: number;
  repeatX: number;
  repeatY: number;
  rotation: number;
}

export const defaultTextureSettings: TextureSettings = {
  offsetX: 0,
  offsetY: 0,
  repeatX: 1,
  repeatY: 1,
  rotation: 0,
};
