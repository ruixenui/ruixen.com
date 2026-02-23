import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { ComponentDNA, RegistryComponent } from "@/lib/dna/types";
import {
  REGISTRY_DNA,
  createDNAFingerprint,
  lookupByFingerprint,
  findBestMatch,
  findSimilarComponents,
} from "@/lib/dna/registry-dna";
import { ui } from "@/registry/registry-ui";
import { examples } from "@/registry/registry-examples";

// ─── TYPES ────────────────────────────────────────────────────────

interface LookupRequest {
  fingerprint?: string;
  dna?: ComponentDNA;
}

interface LookupResponse {
  found: boolean;
  component?: {
    id: string;
    name: string;
    title: string;
    description: string;
    code: string;
    dna: ComponentDNA;
    dependencies: string[];
    files: string[];
    createdAt: string;
    usageCount: number;
    successRate: number;
    avgRating: number;
  };
  fingerprint: string;
  source: "exact" | "similar" | "none";
  similarComponents?: {
    name: string;
    similarity: number;
  }[];
}

// ─── HELPERS ──────────────────────────────────────────────────────

/**
 * Find registry item by name from UI or examples
 */
function findRegistryItem(name: string): any {
  const uiItem = ui.find((item) => item.name === name);
  if (uiItem) return { item: uiItem, type: "ui" };

  const exampleItem = examples.find(
    (item) => item.name === name || item.name === `${name}-demo`,
  );
  if (exampleItem) return { item: exampleItem, type: "example" };

  return null;
}

/**
 * Read component code from filesystem
 */
async function getComponentCode(name: string): Promise<string | null> {
  const registryResult = findRegistryItem(name);
  if (!registryResult) return null;

  const { item } = registryResult;
  if (!item.files || item.files.length === 0) return null;

  try {
    // Get the primary file
    const primaryFile = item.files[0];
    const filePath = path.join(process.cwd(), primaryFile.path);
    const code = await fs.readFile(filePath, "utf-8");
    return code;
  } catch (error) {
    console.error(`Failed to read component ${name}:`, error);
    return null;
  }
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: LookupRequest = await req.json();
    const { fingerprint: requestFingerprint, dna } = body;

    // Validate input
    if (!requestFingerprint && !dna) {
      return NextResponse.json(
        { error: "Either fingerprint or dna is required" },
        { status: 400 },
      );
    }

    // Calculate fingerprint from DNA if not provided
    const fingerprint =
      requestFingerprint || (dna ? createDNAFingerprint(dna) : "");

    // ═══════════════════════════════════════════════════════════════
    // EXACT MATCH: Look up by fingerprint
    // ═══════════════════════════════════════════════════════════════
    const exactMatch = lookupByFingerprint(fingerprint);

    if (exactMatch) {
      const registryResult = findRegistryItem(exactMatch);
      const code = await getComponentCode(exactMatch);
      const componentDna = REGISTRY_DNA[exactMatch];

      if (registryResult && code) {
        const { item } = registryResult;

        const response: LookupResponse = {
          found: true,
          component: {
            id: `ruixen_${exactMatch}`,
            name: exactMatch,
            title: item.title || exactMatch,
            description: item.description || "",
            code,
            dna: componentDna,
            dependencies: item.dependencies || [],
            files: item.files?.map((f: any) => f.path) || [],
            createdAt: "2024-01-01T00:00:00Z",
            usageCount: 1000,
            successRate: 0.98,
            avgRating: 4.9,
          },
          fingerprint,
          source: "exact",
        };

        return NextResponse.json(response);
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // SIMILARITY MATCH: Find best match by DNA similarity
    // ═══════════════════════════════════════════════════════════════
    if (dna) {
      const bestMatch = findBestMatch(dna);

      if (bestMatch && bestMatch.similarity >= 0.85) {
        const registryResult = findRegistryItem(bestMatch.name);
        const code = await getComponentCode(bestMatch.name);
        const componentDna = REGISTRY_DNA[bestMatch.name];

        if (registryResult && code) {
          const { item } = registryResult;

          const response: LookupResponse = {
            found: true,
            component: {
              id: `ruixen_${bestMatch.name}`,
              name: bestMatch.name,
              title: item.title || bestMatch.name,
              description: item.description || "",
              code,
              dna: componentDna,
              dependencies: item.dependencies || [],
              files: item.files?.map((f: any) => f.path) || [],
              createdAt: "2024-01-01T00:00:00Z",
              usageCount: 800,
              successRate: 0.95,
              avgRating: 4.7,
            },
            fingerprint,
            source: "similar",
            similarComponents: [bestMatch],
          };

          return NextResponse.json(response);
        }
      }

      // Return similar components for reference even if no match found
      const similar = findSimilarComponents(dna, 5);

      const response: LookupResponse = {
        found: false,
        fingerprint,
        source: "none",
        similarComponents: similar.length > 0 ? similar : undefined,
      };

      return NextResponse.json(response, { status: 404 });
    }

    // ═══════════════════════════════════════════════════════════════
    // NO MATCH
    // ═══════════════════════════════════════════════════════════════
    const response: LookupResponse = {
      found: false,
      fingerprint,
      source: "none",
    };

    return NextResponse.json(response, { status: 404 });
  } catch (error) {
    console.error("Registry lookup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}

// ─── GET: List all components ─────────────────────────────────────

export async function GET() {
  try {
    const components = Object.entries(REGISTRY_DNA).map(([name, dna]) => {
      const registryResult = findRegistryItem(name);
      const item = registryResult?.item;

      return {
        name,
        title: item?.title || name,
        description: item?.description || "",
        dna,
        fingerprint: createDNAFingerprint(dna),
        dependencies: item?.dependencies || [],
      };
    });

    return NextResponse.json({
      count: components.length,
      components,
    });
  } catch (error) {
    console.error("Registry list error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}
