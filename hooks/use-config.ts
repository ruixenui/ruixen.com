import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  tailwindVersion: "3" | "4";
  uiLibrary: "radix" | "baseui";
};

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
  tailwindVersion: "4",
  uiLibrary: "radix",
});

export function useConfig() {
  return useAtom(configAtom);
}
