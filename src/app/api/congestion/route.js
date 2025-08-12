import { NextResponse } from "next/server";

export async function GET() {
  const now = Date.now();
  const mk = (minsAgo, v) => ({
    timestamp: new Date(now - minsAgo * 60_000).toISOString(),
    west: v + 1,
    north: v - 2,
    south: v - 1,
    houston: v + 0.5,
    panhandle: v - 0.7
  });
  const sample = [mk(60, 10), mk(45, 12), mk(30, 8), mk(15, 14), mk(0, 9)];
  return NextResponse.json(sample);
}
