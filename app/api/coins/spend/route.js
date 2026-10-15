import { NextResponse } from "next/server";
import { rpc } from "../../../../lib/coins";
import { getAuthSession } from "../../../../lib/supabase-server";

const REWARDS = {
  pro_7day: { amount: 100, reason: "7-day Pro trial" },
  pro_30day: { amount: 300, reason: "30-day Pro trial" },
};

export async function POST(req) {
  const { user, token } = await getAuthSession();
  if (!user || !token)
    return NextResponse.json({ error: "login required" }, { status: 401 });
  try {
    const { reward } = await req.json();
    if (!REWARDS[reward])
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    const r = REWARDS[reward];
    const balance = await rpc(
      "spend_coins",
      {
        p_user_id: user.id,
        p_amount: r.amount,
        p_reason: r.reason,
      },
      token
    );
    return NextResponse.json({ balance, redeemed: r.reason });
  } catch (e) {
    const msg = String(e?.message || "");
    if (msg.includes("insufficient"))
      return NextResponse.json({ error: "insufficient coins" }, { status: 402 });
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
