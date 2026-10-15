"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ModeShell from "../../../components/ModeShell";
import { createClient } from "../../../lib/supabase-client";
import { PageHeader, PremiumCard, SkeletonRow, EmptyState, SuccessCheck, TrustBadge } from "../../../components/Premium";
import {
  IconLock, IconFingerprint, IconUpload, IconDownload,
  IconTrash, IconFileText, IconImage, IconShield, IconCheck,
} from "../../../components/icons";

function fmtSize(b) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}
function fmtDate(s) {
  try {
    return new Date(s).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return ""; }
}
function typeIcon(mime, size = 22) {
  if (mime === "application/pdf") return <IconFileText size={size} />;
  if (mime?.startsWith("image/")) return <IconImage size={size} />;
  return <IconFileText size={size} />;
}

export default function VaultPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [justUploaded, setJustUploaded] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setLoggedIn(!!data?.user);
      if (data?.user) load();
      else setLoading(false);
    });
  }, []);

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const r = await fetch("/api/vault/list");
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "load failed");
      setDocs(j.documents || []);
    } catch (e) {
      setErr("Documents load nahi ho paye. Internet check karke dobara try karo.");
    }
    setLoading(false);
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setErr(""); setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/vault/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "upload failed");
      setJustUploaded(true);
      setMsg("File securely upload ho gayi");
      setTimeout(() => setJustUploaded(false), 2500);
      load();
    } catch (e) {
      const m = (e.message || "").toLowerCase();
      if (m.includes("too large") || m.includes("10"))
        setErr("File 10 MB se badi hai — chhoti file try karo.");
      else
        setErr("Upload nahi ho paya — internet check karke dobara try karo.");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setTimeout(() => { setMsg(""); setErr(""); }, 4500);
  };

  const download = async (id, filename) => {
    try {
      const r = await fetch(`/api/vault/download?id=${encodeURIComponent(id)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "unavailable");
      const a = document.createElement("a");
      a.href = j.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      setErr("Download nahi ho paya — dobara try karo.");
      setTimeout(() => setErr(""), 3000);
    }
  };

  const remove = async (id, filename) => {
    if (!confirm(`Permanently delete "${filename}"?`)) return;
    setDeleting(id); setErr("");
    try {
      const r = await fetch("/api/vault/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const j = await r.json();
      if (!r.ok && j.deleted !== "partial") throw new Error(j.error || "delete failed");
      if (j.deleted === "partial") setErr("⚠️ " + (j.warning || "partial delete"));
      else setMsg("File securely delete ho gayi");
      load();
    } catch (e) {
      setErr("Delete nahi ho paya — dobara try karo.");
    }
    setDeleting(null);
    setTimeout(() => { setMsg(""); setErr(""); }, 4500);
  };

  if (loggedIn === false) {
    return (
      <ModeShell mode="sarkari">
        <EmptyState
          icon={<IconFingerprint size={26} />}
          title="Log in to use Vault"
          desc="Your documents stay in an encrypted locker — only you can see them."
          actionLabel="Log In"
          onAction={() => router.push("/login")}
        />
      </ModeShell>
    );
  }

  return (
    <ModeShell mode="sarkari">
      <PageHeader
        title="Document Vault"
        subtitle="Your private locker"
        right={
          <TrustBadge icon={<IconLock size={12} />} text="Encrypted" />
        }
      />

      {/* Upload card */}
      <PremiumCard accent className="p-5 mb-5">
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={upload}
          className="hidden"
          id="vault-file"
        />
        <label
          htmlFor="vault-file"
          className={`pu-press flex items-center justify-center gap-2.5 text-center font-bold py-4 rounded-2xl ${
            uploading ? "bg-white/8 text-mist-500" : "pu-btn-primary"
          }`}
        >
          <IconUpload size={19} />
          {uploading ? "Uploading…" : "Upload Document"}
        </label>
        <p className="text-mist-600 text-[11.5px] mt-2.5 text-center">
          PDF, JPG, PNG, WebP — max 10 MB
        </p>
        <p className="text-mist-500 text-[11.5px] mt-1 text-center flex items-center justify-center gap-1">
          <IconShield size={12} className="text-emerald-400" />
          Your files are encrypted — only you can see them
        </p>
      </PremiumCard>

      {msg && (
        <div className="flex items-center gap-2.5 mb-4 animate-fadeUp">
          {justUploaded && <SuccessCheck size={36} />}
          <p className="text-emerald-300 text-[13.5px] font-semibold">{msg}</p>
        </div>
      )}
      {err && (
        <p className="text-red-400 text-[13px] font-medium mb-4 animate-fadeUp">{err}</p>
      )}

      {/* Document list */}
      <p className="pu-section-label">My documents</p>
      {loading ? (
        <div className="space-y-3">
          <SkeletonRow /><SkeletonRow /><SkeletonRow />
        </div>
      ) : docs.length === 0 ? (
        <EmptyState
          icon={<IconLock size={26} />}
          title="Abhi koi document nahi hai"
          desc="Upload your first file — takes 30 seconds. This locker is only yours."
          actionLabel="Upload your first file"
          onAction={() => fileRef.current?.click()}
        />
      ) : (
        <div className="space-y-3 pu-stagger">
          {docs.map((d, idx) => (
            <PremiumCard key={d.id} i={idx} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  {typeIcon(d.mime_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-mist-100 text-[14px] truncate">
                    {d.filename}
                  </div>
                  <div className="text-mist-600 text-[11.5px] mt-0.5">
                    {fmtSize(d.file_size)} • {fmtDate(d.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3.5">
                <button
                  onClick={() => download(d.id, d.filename)}
                  className="pu-press flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-bold bg-emerald-500/12 text-emerald-300 border border-emerald-500/30 py-2.5 rounded-xl"
                >
                  <IconDownload size={15} />
                  Download
                </button>
                <button
                  onClick={() => remove(d.id, d.filename)}
                  disabled={deleting === d.id}
                  className="pu-press flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-bold bg-red-500/10 text-red-300 border border-red-500/30 py-2.5 rounded-xl disabled:opacity-50"
                >
                  <IconTrash size={15} />
                  {deleting === d.id ? "Delete…" : "Delete"}
                </button>
              </div>
            </PremiumCard>
          ))}
        </div>
      )}

      {/* Honest security note */}
      <PremiumCard className="mt-6 p-4" style={{ borderColor: "rgba(245,179,1,0.22)" }}>
        <p className="text-gold text-[12.5px] font-bold mb-1.5 flex items-center gap-1.5">
          <IconLock size={13} />
          Security note
        </p>
        <p className="text-mist-500 text-[11.5px] leading-relaxed">
          Files are sent over HTTPS and stored in private encrypted storage.
          Ye <b className="text-mist-300">end-to-end encryption nahi</b> hai — Aadhaar,
          PAN ya bank statements jaise sensitive documents abhi upload{" "}
          <b className="text-mist-300">na karo</b>. Client-side encryption agle phase me aayega.
        </p>
      </PremiumCard>
    </ModeShell>
  );
}
