// lib/pro-server.js — SERVER ONLY. Never import from client components.
// Pro activation state lives ONLY in public.pro_orders, written ONLY by
// /api/pro-webhook after Cashfree signature + freshness + server-side
// gateway verification. Nothing here reads a client claim, a cookie flag,
// or localStorage, and nothing here touches delivery_orders (Diwali tokens).
import { getServiceClient } from "./delivery";
import { PRO_DURATION_DAYS } from "./pro";

export function isProOrderId(orderId) {
  return typeof orderId === "string" && orderId.startsWith("PRO149_");
}

export function computeProUntil(paidAt) {
  const d = paidAt ? new Date(paidAt) : new Date();
  return new Date(d.getTime() + PRO_DURATION_DAYS * 24 * 60 * 60 * 1000);
}

// Fail-closed: ANY error, missing env, or missing table returns isPro:false.
// A Pro grant must never come from an error path.
export async function getProByEmail(email) {
  const clean = String(email || "").trim().toLowerCase();
  if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { isPro: false, proUntil: null, orderId: null, checked: false };
  }
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("pro_orders")
      .select("cashfree_order_id, pro_until, status")
      .eq("customer_email", clean)
      .eq("status", "paid")
      .gt("pro_until", new Date().toISOString())
      .order("pro_until", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return { isPro: false, proUntil: null, orderId: null, checked: true };
    return { isPro: true, proUntil: data.pro_until, orderId: data.cashfree_order_id, checked: true };
  } catch {
    return { isPro: false, proUntil: null, orderId: null, checked: false };
  }
}

export async function getProByOrderId(orderId) {
  if (!isProOrderId(orderId)) {
    return { isPro: false, proUntil: null, checked: false };
  }
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("pro_orders")
      .select("cashfree_order_id, pro_until, status, customer_email")
      .eq("cashfree_order_id", orderId)
      .eq("status", "paid")
      .maybeSingle();
    if (error || !data) return { isPro: false, proUntil: null, checked: true };
    const active = data.pro_until && new Date(data.pro_until).getTime() > Date.now();
    return {
      isPro: active,
      proUntil: data.pro_until,
      orderId: data.cashfree_order_id,
      email: data.customer_email || null,
      checked: true,
    };
  } catch {
    return { isPro: false, proUntil: null, checked: false };
  }
}
