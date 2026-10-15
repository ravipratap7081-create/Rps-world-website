import { NextResponse } from "next/server";
import { rpc } from "../../../../lib/coins";
import { getAuthSession } from "../../../../lib/supabase-server";

const EARN_ACTIONS = {
  daily_checkin: { amount: 10, reason: "Daily check-in", ttl: 30 },
  tool_used: { amount: 5, reason: "Tool used", ttl: 30 },
  shared: { amount: 20, reason: "Shared app", ttl: 30 },
  pro_interest: { amount: 15, reason: "Pro waitlist joined", ttl: 30 },
};

export async function POST(req) {
  const { user, token } = await getAuthSession();
  if (!user || !token)
    return NextResponse.json({ error: "login required" }, { status: 401 });
  try {
    const { action } = await req.json();
    if (!EARN_ACTIONS[action])
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    const a = EARN_ACTIONS[action];
    // user.id comes from verified session — never from client
    const balance = await rpc(
      "earn_coins",
      {
        p_user_id: user.id,
        p_amount: a.amount,
        p_reason: a.reason,
        p_ttl_days: a.ttl,
      },
      token
    );
    return NextResponse.json({ balance, earned: a.amount });
  } catch (e) {
    const msg = String(e?.message || "");
    if (msg.includes("already checked in"))
      return NextResponse.json({ error: "already checked in today" }, { status: 429 });
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
