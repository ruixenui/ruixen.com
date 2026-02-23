import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { ComponentDNA } from "@/lib/dna/types";
import { createDNAFingerprint } from "@/lib/dna/registry-dna";

// ─── TYPES ────────────────────────────────────────────────────────

interface SubmitRequest {
  fingerprint: string;
  dna: ComponentDNA;
  code: string;
  source: string; // e.g., "mcp-generated"
  timestamp: string;
  metadata?: {
    prompt?: string;
    model?: string;
    tokensUsed?: number;
  };
}

interface SubmitResponse {
  success: boolean;
  id?: string;
  fingerprint: string;
  status: "queued" | "duplicate" | "rejected";
  message: string;
}

// ─── SUBMISSION QUEUE ─────────────────────────────────────────────

// In-memory queue for submissions (in production, use a database)
const submissionQueue: Map<
  string,
  SubmitRequest & { receivedAt: string; status: string }
> = new Map();

// File-based persistence for submissions
const SUBMISSIONS_DIR = path.join(process.cwd(), ".submissions");

async function ensureSubmissionsDir() {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

async function persistSubmission(
  fingerprint: string,
  submission: SubmitRequest,
) {
  await ensureSubmissionsDir();

  const filePath = path.join(SUBMISSIONS_DIR, `${fingerprint}.json`);
  const data = {
    ...submission,
    receivedAt: new Date().toISOString(),
    status: "pending-review",
  };

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function checkDuplicate(fingerprint: string): Promise<boolean> {
  await ensureSubmissionsDir();

  const filePath = path.join(SUBMISSIONS_DIR, `${fingerprint}.json`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// ─── VALIDATION ───────────────────────────────────────────────────

function validateSubmission(body: SubmitRequest): string | null {
  if (!body.fingerprint || typeof body.fingerprint !== "string") {
    return "fingerprint is required";
  }

  if (!body.dna || typeof body.dna !== "object") {
    return "dna is required";
  }

  if (!body.dna.type || typeof body.dna.type !== "string") {
    return "dna.type is required";
  }

  if (!body.code || typeof body.code !== "string") {
    return "code is required";
  }

  if (body.code.length < 100) {
    return "code is too short (minimum 100 characters)";
  }

  if (body.code.length > 50000) {
    return "code is too long (maximum 50000 characters)";
  }

  // Verify fingerprint matches DNA
  const calculatedFingerprint = createDNAFingerprint(body.dna);
  if (calculatedFingerprint !== body.fingerprint) {
    return "fingerprint does not match DNA";
  }

  // Basic code validation
  if (
    !body.code.includes("export") &&
    !body.code.includes("function") &&
    !body.code.includes("const")
  ) {
    return "code must be valid TypeScript/React";
  }

  return null;
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // Rate limiting (simple in-memory, use Redis in production)
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";

    const body: SubmitRequest = await req.json();

    // Validate
    const validationError = validateSubmission(body);
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          fingerprint: body.fingerprint || "",
          status: "rejected",
          message: validationError,
        } as SubmitResponse,
        { status: 400 },
      );
    }

    // Check for duplicate
    const isDuplicate = await checkDuplicate(body.fingerprint);
    if (isDuplicate) {
      return NextResponse.json({
        success: true,
        fingerprint: body.fingerprint,
        status: "duplicate",
        message: "Component with this fingerprint already submitted",
      } as SubmitResponse);
    }

    // ═══════════════════════════════════════════════════════════════
    // QUEUE SUBMISSION
    // ═══════════════════════════════════════════════════════════════

    await persistSubmission(body.fingerprint, body);

    // Add to in-memory queue
    submissionQueue.set(body.fingerprint, {
      ...body,
      receivedAt: new Date().toISOString(),
      status: "pending-review",
    });

    const response: SubmitResponse = {
      success: true,
      id: `sub_${body.fingerprint.slice(4)}`, // Remove "dna_" prefix
      fingerprint: body.fingerprint,
      status: "queued",
      message:
        "Component submitted for review. If approved, it will be added to the registry.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Registry submit error:", error);
    return NextResponse.json(
      {
        success: false,
        fingerprint: "",
        status: "rejected",
        message: error instanceof Error ? error.message : "Internal error",
      } as SubmitResponse,
      { status: 500 },
    );
  }
}

// ─── GET: List pending submissions (admin only) ───────────────────

export async function GET(req: NextRequest) {
  try {
    // In production, add admin authentication here
    const authHeader = req.headers.get("authorization");

    // Simple auth check (use proper auth in production)
    if (authHeader !== `Bearer ${process.env.REGISTRY_ADMIN_KEY}`) {
      // Return basic stats for public access
      return NextResponse.json({
        queueSize: submissionQueue.size,
        message: "Use admin key to view submissions",
      });
    }

    // Return all submissions for admin
    await ensureSubmissionsDir();

    const files = await fs.readdir(SUBMISSIONS_DIR);
    const submissions = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(
            path.join(SUBMISSIONS_DIR, file),
            "utf-8",
          );
          return JSON.parse(content);
        }),
    );

    return NextResponse.json({
      count: submissions.length,
      submissions: submissions.sort(
        (a, b) =>
          new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime(),
      ),
    });
  } catch (error) {
    console.error("Registry submissions list error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}
