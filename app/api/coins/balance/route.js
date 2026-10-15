import { NextResponse } from "next/server";
import { rpc } from "../../../../lib/coins";
import { getAuthSession } from "../../../../lib/supabase-server";

export async function GET() {
  const { user, token } = await getAuthSession();
  if (!user || !token)
    return NextResponse.json({ error: "login required" }, { status: 401 });
  try {
    const balance = await rpc("coin_balance", { p_user_id: user.id }, token);
    return NextResponse.json({ balance });
  } catch (e) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
