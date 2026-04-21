export interface LightSettings {
  keyX: number;
  keyY: number;
  keyZ: number;
  keyIntensity: number;
  ambientIntensity: number;
  shadowEnabled: boolean;
}

export const defaultLightSettings: LightSettings = {
  keyX: 2,
  keyY: 2,
  keyZ: 4,
  keyIntensity: 1.2,
  ambientIntensity: 0.3,
  shadowEnabled: true,
};

export type Export3DFormat = "stl" | "glb" | "obj" | "ply";
