import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { resolveGeo } from "@/lib/geo";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await resolveGeo(await headers());

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
