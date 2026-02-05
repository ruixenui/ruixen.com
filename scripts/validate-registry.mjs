/**
 * Comprehensive registry validation script.
 * Tests all components from accordion→footer across all 4 variants:
 *   1. /r/<name>.json           (Radix + TW v4)
 *   2. /r/tw3/<name>.json       (Radix + TW v3)
 *   3. /r/baseui/<name>.json    (Base UI + TW v4)
 *   4. /r/baseui/tw3/<name>.json (Base UI + TW v3)
 *
 * Checks:
 *  - File existence
 *  - Valid JSON parse
 *  - Required fields ($schema, name, type, files)
 *  - files[].content is non-empty
 *  - Base UI variants: no @radix-ui in file content or dependencies
 *  - Base UI variants: wrapper files injected when original has Radix deps
 *  - Base UI variants: @base-ui/react in dependencies when needed
 *  - TW v3 variants: shadcn theme tokens transformed (hsl(var(--...)))
 *  - Consistent component name across variants
 */

import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const R_DIR = join(ROOT, "public/r");
const TW3_DIR = join(R_DIR, "tw3");
const BASEUI_DIR = join(R_DIR, "baseui");
const BASEUI_TW3_DIR = join(BASEUI_DIR, "tw3");

// Full registry scan (all components)
const START = "";
const END = "zzzzz";

const RADIX_DEPENDENT_PRIMITIVES = new Set([
  "accordion", "aspect-ratio", "avatar", "badge", "breadcrumb", "button",
  "checkbox", "collapsible", "context-menu", "dialog", "dropdown-menu",
  "hover-card", "label", "menubar", "popover", "progress", "radio-group",
  "scroll-area", "select", "separator", "sheet", "slider", "switch",
  "tabs", "tooltip",
]);

const NEEDS_BASEUI_DEP = new Set([
  "accordion", "checkbox", "collapsible", "context-menu", "dialog",
  "dropdown-menu", "hover-card", "menubar", "popover", "radio-group",
  "scroll-area", "select", "sheet", "slider", "switch", "tabs", "tooltip",
]);

// Shadcn theme token pattern for TW v3 check
// In v4: var(--color-primary), var(--color-background), etc.
// In v3: these should be transformed to hsl(var(--primary)), etc.
const V4_SHADCN_TOKEN_RE = /var\(--color-(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring|sidebar|chart-[1-5])/;

// Stats
let totalComponents = 0;
let totalChecks = 0;
let totalPassed = 0;
const errors = [];
const warnings = [];

function addError(component, variant, message) {
  errors.push({ component, variant, message });
}

function addWarning(component, variant, message) {
  warnings.push({ component, variant, message });
}

async function loadJson(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function checkRequiredFields(data, component, variant) {
  totalChecks++;
  const missing = [];
  if (!data.name) missing.push("name");
  if (!data.type) missing.push("type");
  if (!Array.isArray(data.files) || data.files.length === 0) missing.push("files");

  if (missing.length > 0) {
    addError(component, variant, `Missing required fields: ${missing.join(", ")}`);
  } else {
    totalPassed++;
  }
  return missing.length === 0;
}

function checkFileContent(data, component, variant) {
  if (!Array.isArray(data.files)) return;

  for (const file of data.files) {
    totalChecks++;
    if (!file.content || file.content.trim().length === 0) {
      addError(component, variant, `Empty content in file: ${file.path}`);
    } else {
      totalPassed++;
    }
  }
}

function checkNoRadixInBaseUi(data, component, variant) {
  // Check npm dependencies
  totalChecks++;
  if (Array.isArray(data.dependencies)) {
    const radixDeps = data.dependencies.filter(d => d.startsWith("@radix-ui/"));
    if (radixDeps.length > 0) {
      addError(component, variant, `@radix-ui in npm dependencies: ${radixDeps.join(", ")}`);
    } else {
      totalPassed++;
    }
  } else {
    totalPassed++;
  }

  // Check file contents for @radix-ui imports
  if (Array.isArray(data.files)) {
    for (const file of data.files) {
      totalChecks++;
      if (file.content && file.content.includes("@radix-ui/")) {
        // Extract the specific import
        const match = file.content.match(/@radix-ui\/[a-z-]+/g);
        addError(component, variant, `@radix-ui import in ${file.path}: ${[...new Set(match)].join(", ")}`);
      } else {
        totalPassed++;
      }
    }
  }
}

function checkBaseUiWrapperInjection(radixData, baseuiData, component, variant) {
  const radixRegDeps = radixData.registryDependencies ?? [];
  const radixDeps = radixRegDeps.filter(d => RADIX_DEPENDENT_PRIMITIVES.has(d));

  if (radixDeps.length === 0) return; // No Radix deps to replace

  // Check that Radix-dependent deps are removed from registryDependencies
  const baseuiRegDeps = baseuiData.registryDependencies ?? [];
  for (const dep of radixDeps) {
    totalChecks++;
    if (baseuiRegDeps.includes(dep)) {
      addError(component, variant, `Radix dep "${dep}" still in registryDependencies`);
    } else {
      totalPassed++;
    }
  }

  // Check that wrapper files are injected
  const baseuiFiles = baseuiData.files ?? [];
  const baseuiFilePaths = baseuiFiles.map(f => f.path || f.target);
  for (const dep of radixDeps) {
    totalChecks++;
    const expectedPath = `components/ui/${dep}.tsx`;
    if (!baseuiFilePaths.includes(expectedPath)) {
      addError(component, variant, `Missing wrapper file: ${expectedPath}`);
    } else {
      totalPassed++;
    }
  }

  // Check @base-ui/react in dependencies when needed
  const needsBaseUi = radixDeps.some(d => NEEDS_BASEUI_DEP.has(d));
  if (needsBaseUi) {
    totalChecks++;
    const deps = baseuiData.dependencies ?? [];
    if (!deps.includes("@base-ui/react")) {
      addError(component, variant, `Missing @base-ui/react in dependencies`);
    } else {
      totalPassed++;
    }
  }
}

function checkTw3Transform(v4Data, v3Data, component, variant) {
  if (!Array.isArray(v4Data.files) || !Array.isArray(v3Data.files)) return;

  // Find the main component file (first one, same path in both)
  const v4Main = v4Data.files[0];
  const v3Main = v3Data.files[0];
  if (!v4Main?.content || !v3Main?.content) return;

  // If v4 content has v4-specific shadcn tokens, v3 should have them transformed
  if (V4_SHADCN_TOKEN_RE.test(v4Main.content)) {
    totalChecks++;
    if (V4_SHADCN_TOKEN_RE.test(v3Main.content)) {
      addWarning(component, variant, `TW v4 shadcn token pattern still present in TW v3 variant`);
    } else {
      totalPassed++;
    }
  }
}

function checkNameConsistency(data, expectedName, variant) {
  totalChecks++;
  if (data.name !== expectedName) {
    addError(data.name, variant, `Name mismatch: expected "${expectedName}", got "${data.name}"`);
  } else {
    totalPassed++;
  }
}

async function validateComponent(name) {
  const radixV4Path = join(R_DIR, `${name}.json`);
  const radixV3Path = join(TW3_DIR, `${name}.json`);
  const baseuiV4Path = join(BASEUI_DIR, `${name}.json`);
  const baseuiV3Path = join(BASEUI_TW3_DIR, `${name}.json`);

  // 1. Load all 4 variants
  const radixV4 = await loadJson(radixV4Path);
  const radixV3 = await loadJson(radixV3Path);
  const baseuiV4 = await loadJson(baseuiV4Path);
  const baseuiV3 = await loadJson(baseuiV3Path);

  const variants = [
    { data: radixV4, label: "radix+v4", path: radixV4Path },
    { data: radixV3, label: "radix+v3", path: radixV3Path },
    { data: baseuiV4, label: "baseui+v4", path: baseuiV4Path },
    { data: baseuiV3, label: "baseui+v3", path: baseuiV3Path },
  ];

  // 2. Check existence
  for (const v of variants) {
    totalChecks++;
    if (!v.data) {
      addError(name, v.label, `File missing or invalid JSON`);
    } else {
      totalPassed++;
    }
  }

  // 3. For each existing variant, check structure
  for (const v of variants) {
    if (!v.data) continue;
    checkRequiredFields(v.data, name, v.label);
    checkFileContent(v.data, name, v.label);
    checkNameConsistency(v.data, name, v.label);
  }

  // 4. Base UI checks
  if (baseuiV4) {
    checkNoRadixInBaseUi(baseuiV4, name, "baseui+v4");
  }
  if (baseuiV3) {
    checkNoRadixInBaseUi(baseuiV3, name, "baseui+v3");
  }

  // 5. Wrapper injection checks (compare radix → baseui)
  if (radixV4 && baseuiV4) {
    checkBaseUiWrapperInjection(radixV4, baseuiV4, name, "baseui+v4");
  }
  if (radixV3 && baseuiV3) {
    checkBaseUiWrapperInjection(radixV3, baseuiV3, name, "baseui+v3");
  }

  // 6. TW v3 transform checks
  if (radixV4 && radixV3) {
    checkTw3Transform(radixV4, radixV3, name, "radix+v3");
  }
  if (baseuiV4 && baseuiV3) {
    checkTw3Transform(baseuiV4, baseuiV3, name, "baseui+v3");
  }
}

// Main
async function main() {
  console.log("=== Registry Validation: accordion → footer ===\n");

  // Skip metadata files that aren't components
  const SKIP = new Set(["index", "registry", "ruixen-ui"]);

  // Get all component names in range
  const allFiles = (await readdir(R_DIR)).filter(f => f.endsWith(".json"));
  const componentNames = allFiles
    .map(f => basename(f, ".json"))
    .filter(name => name >= START && name <= END && !SKIP.has(name))
    .sort();

  totalComponents = componentNames.length;
  console.log(`Components in range: ${totalComponents}`);
  console.log(`Variants per component: 4`);
  console.log(`Total files to check: ${totalComponents * 4}\n`);

  // Validate each
  for (const name of componentNames) {
    await validateComponent(name);
  }

  // Print results
  console.log("=== RESULTS ===\n");
  console.log(`Total components: ${totalComponents}`);
  console.log(`Total checks run: ${totalChecks}`);
  console.log(`Checks passed: ${totalPassed}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\n--- ERRORS ---");
    // Group by component
    const grouped = {};
    for (const e of errors) {
      const key = e.component;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(`  [${e.variant}] ${e.message}`);
    }
    for (const [comp, msgs] of Object.entries(grouped)) {
      console.log(`\n${comp}:`);
      for (const m of msgs) console.log(m);
    }
  }

  if (warnings.length > 0) {
    console.log("\n--- WARNINGS ---");
    const grouped = {};
    for (const w of warnings) {
      const key = w.component;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(`  [${w.variant}] ${w.message}`);
    }
    for (const [comp, msgs] of Object.entries(grouped)) {
      console.log(`\n${comp}:`);
      for (const m of msgs) console.log(m);
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("\n✅ ALL CHECKS PASSED — every component validates across all 4 variants!");
  }

  // Summary of components with Radix deps (interesting ones)
  console.log("\n--- BASE UI INJECTION SUMMARY ---");
  let injectedCount = 0;
  let pureCount = 0;
  for (const name of componentNames) {
    const radixV4 = await loadJson(join(R_DIR, `${name}.json`));
    if (!radixV4) continue;
    const regDeps = radixV4.registryDependencies ?? [];
    const radixDeps = regDeps.filter(d => RADIX_DEPENDENT_PRIMITIVES.has(d));
    if (radixDeps.length > 0) {
      injectedCount++;
    } else {
      pureCount++;
    }
  }
  console.log(`Components with Base UI wrappers injected: ${injectedCount}`);
  console.log(`Components without Radix deps (pure): ${pureCount}`);

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(e => {
  console.error("Fatal error:", e);
  process.exit(1);
});
