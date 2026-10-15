const U = process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Calls a Supabase RPC. Pass the user's JWT so the database can verify
// auth.uid() — never rely on the anon key alone for user-scoped RPCs.
async function rpc(fn, body, userToken) {
  if (!U || !K) throw new Error("coins backend not configured");
  const r = await fetch(`${U}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: K,
      Authorization: `Bearer ${userToken || K}`,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`rpc ${fn} failed: ${r.status}`);
  return r.json();
}

export { U, K, rpc };
