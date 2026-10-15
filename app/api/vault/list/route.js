import { NextResponse } from "next/server";
import { createClient, getAuthUser } from "../../../../lib/supabase-server";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

    const supabase = await createClient();
    // RLS enforces owner-only; explicit filter as defense in depth
    const { data, error } = await supabase
      .from("vault_documents")
      .select("id, filename, mime_type, file_size, created_at")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: "unavailable" }, { status: 500 });
    return NextResponse.json({ documents: data || [] });
  } catch (e) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
