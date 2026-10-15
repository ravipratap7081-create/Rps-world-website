import { NextResponse } from "next/server";
import { createClient, getAuthUser } from "../../../../lib/supabase-server";

export async function DELETE(req) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

  let id;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = await createClient();

  // Ownership check first
  const { data: doc, error: docErr } = await supabase
    .from("vault_documents")
    .select("storage_path")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (docErr || !doc)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  // Delete metadata first (RLS enforces ownership)
  const { error: dbErr } = await supabase
    .from("vault_documents")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (dbErr) return NextResponse.json({ error: "delete failed" }, { status: 500 });

  // Then delete the file — report honestly if this half fails
  const { error: fileErr } = await supabase.storage
    .from("vault-docs")
    .remove([doc.storage_path]);

  if (fileErr) {
    return NextResponse.json(
      { deleted: "partial", warning: "record removed but file cleanup needs retry" },
      { status: 207 }
    );
  }

  return NextResponse.json({ deleted: true });
}
