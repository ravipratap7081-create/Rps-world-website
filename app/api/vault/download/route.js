import { NextResponse } from "next/server";
import { createClient, getAuthUser } from "../../../../lib/supabase-server";

// Returns a short-lived signed URL only after verifying ownership.
export async function GET(req) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const supabase = await createClient();

    // Ownership check: row must exist AND belong to this user
    const { data: doc, error: docErr } = await supabase
      .from("vault_documents")
      .select("storage_path, mime_type")
      .eq("id", id)
      .eq("owner_id", user.id)
      .single();

    if (docErr || !doc)
      return NextResponse.json({ error: "not found" }, { status: 404 });

    // Defense in depth: storage path must live inside this user's own folder.
    // Blocks forged DB records pointing at another user's file.
    if (!doc.storage_path.startsWith(user.id + "/"))
      return NextResponse.json({ error: "not found" }, { status: 404 });

    // 60-second signed URL — never a permanent public link
    const { data, error } = await supabase.storage
      .from("vault-docs")
      .createSignedUrl(doc.storage_path, 60);

    if (error || !data?.signedUrl)
      return NextResponse.json({ error: "unavailable" }, { status: 500 });

    return NextResponse.json({ url: data.signedUrl });
  } catch (e) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
