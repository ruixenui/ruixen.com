import { NextRequest } from "next/server";
import { FONTS } from "@/components/tools/svg-to-3d/lib/fonts";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return new Response("Missing font name", { status: 400 });
  }

  const def = FONTS.find((f) => f.name === name);
  if (!def) {
    return new Response("Unknown font", { status: 404 });
  }

  const upstream = await fetch(def.url, {
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!upstream.ok) {
    return new Response("Upstream font fetch failed", { status: 502 });
  }

  const body = await upstream.arrayBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "font/ttf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
