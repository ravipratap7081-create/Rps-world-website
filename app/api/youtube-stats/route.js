import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../../../lib/delivery";

export const dynamic = "force-dynamic";

const CHANNEL_IDS = [
  "UC_cQucADka8W2qDr_IHCNrw",
  "UCR3GiuhpJy8m8J2ZNsMd8eQ",
  "UCxWdkGVHIJoxkkLazHgUf3g",
  "UCr1X6qNqVGBQZkJEa2rXhAg",
];

/**
 * GET /api/youtube-stats
 * Public YouTube counts for Ravi's own 4 channels, via a server-side
 * YouTube Data API v3 key (YOUTUBE_API_KEY in Render env).
 * The key NEVER leaves the server: it is only used in this server-side
 * fetch and is never included in any response.
 * Returns only public statistics (subscriber/view/video counts) for the
 * 4 channel IDs above, in one batched channels.list call (1 quota unit).
 * If the key is not configured yet, fails closed with 503 and breaks
 * nothing else on the site.
 */
export async function GET(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`youtube-stats:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "youtube_not_configured" }, { status: 503 });
  }
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_IDS.join(",")}&key=${encodeURIComponent(key)}`;
  let r;
  try {
    r = await fetch(url, { cache: "no-store" });
  } catch {
    return NextResponse.json({ error: "youtube_upstream_error" }, { status: 502 });
  }
  if (!r.ok) {
    return NextResponse.json({ error: "youtube_upstream_error" }, { status: 502 });
  }
  const data = await r.json();
  const byId = new Map((data.items || []).map((it) => [it.id, it.statistics || {}]));
  return NextResponse.json({
    channels: CHANNEL_IDS.map((id) => {
      const s = byId.get(id);
      return {
        id,
        subs: s ? s.subscriberCount ?? null : null,
        views: s ? s.viewCount ?? null : null,
        videos: s ? s.videoCount ?? null : null,
      };
    }),
  });
}
