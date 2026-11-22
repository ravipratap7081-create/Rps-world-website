"use client";
import { useEffect, useRef, useState } from "react";
import FileDrop from "../../../components/tools/FileDrop";

const PROMPT_PREFIX =
  "Is student ke sawal ka jawab Hindi me simple bhasha me step-by-step do (short, exam-style): ";
const AI_ENDPOINT = "https://text.pollinations.ai/";
const TESSERACT_SRC = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";

// Load Tesseract.js (OCR) lazily from CDN — only when a photo is chosen.
// Resolves true if the global is usable, false otherwise (caller shows fallback).
let tessState = "idle"; // idle | loading | ready | fail
let tessWaiters = [];
function loadTesseract() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Tesseract) {
    tessState = "ready";
    return Promise.resolve(true);
  }
  if (tessState === "fail") return Promise.resolve(false);
  return new Promise((resolve) => {
    tessWaiters.push(resolve);
    if (tessState === "loading") return;
    tessState = "loading";
    const s = document.createElement("script");
    s.src = TESSERACT_SRC;
    s.async = true;
    s.onload = () => {
      tessState = window.Tesseract ? "ready" : "fail";
      tessWaiters.forEach((w) => w(tessState === "ready"));
      tessWaiters = [];
    };
    s.onerror = () => {
      tessState = "fail";
      tessWaiters.forEach((w) => w(false));
      tessWaiters = [];
    };
    document.head.appendChild(s);
  });
}

function pickHindiVoice() {
  try {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang && v.lang.startsWith("hi")) ||
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang && v.lang.startsWith("en")) ||
      null
    );
  } catch {
    return null;
  }
}

export default function Tool() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [ocrStatus, setOcrStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | ocr | solving | done | error
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const photoUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
      try {
        window.speechSynthesis && window.speechSynthesis.cancel();
      } catch {}
    };
  }, []);

  async function onPhoto(file) {
    setError("");
    if (!file.type || !file.type.startsWith("image/")) {
      setError("Sirf photo (image) file choose karo.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Photo 10MB se badi hai — chhoti photo try karo.");
      return;
    }
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;
    setPhotoUrl(url);
    setPhase("ocr");
    setOcrStatus("📖 Photo padh raha hun... (10-30 sec lag sakte hain)");
    const ok = await loadTesseract();
    if (!ok) {
      setPhase("idle");
      setOcrStatus("");
      setError(
        "Photo reader load nahi ho paya (network slow?). Koi baat nahi — question neeche type karke Solve karo, jawab wahi milega."
      );
      return;
    }
    try {
      const { data } = await window.Tesseract.recognize(file, "eng+hin");
      const text = (data && data.text ? data.text : "").trim();
      if (text) {
        setQuestion(text.slice(0, 500));
        setOcrStatus("✅ Photo ka text mil gaya! Neeche check karke Solve dabao.");
      } else {
        setOcrStatus("");
        setError("⚠️ Photo se text clear nahi mila — saaf/roshni wali photo try karo, ya question type kar do.");
      }
    } catch {
      setOcrStatus("");
      setError("⚠️ Photo read nahi hui — question type karke Solve karo.");
    }
    setPhase("idle");
  }

  async function solve() {
    setError("");
    const q = question.trim();
    if (q.length < 3) {
      setError("Pehle photo lo ya question type karo.");
      return;
    }
    setPhase("solving");
    setAnswer("");
    try {
      const ctrl = new AbortController();
      const killer = setTimeout(() => ctrl.abort(), 45000);
      // POST: sawal URL me nahi, body me jata hai (privacy + lambi query safe).
      const r = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: PROMPT_PREFIX + q.slice(0, 500) }],
          model: "openai-fast",
        }),
        signal: ctrl.signal,
      });
      clearTimeout(killer);
      if (!r.ok) throw new Error("http " + r.status);
      const text = (await r.text()).trim();
      if (!text) throw new Error("empty");
      setAnswer(text.slice(0, 2000));
      setPhase("done");
    } catch {
      setPhase("error");
      setError("AI service abhi jawab nahi de raha (network/service busy ho sakta hai). Thodi der baad dobara try karo.");
    }
  }

  function listen() {
    if (!("speechSynthesis" in window)) {
      setError("Is browser me voice support nahi hai.");
      return;
    }
    if (!answer) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(answer.slice(0, 500));
    u.lang = "hi-IN";
    u.rate = 0.95;
    const v = pickHindiVoice();
    if (v) u.voice = v;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }

  function stopListen() {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setSpeaking(false);
  }

  async function share() {
    const data = {
      title: "RPS World — AI Doubt Solver",
      text: "📸 AI Doubt Solver — photo se sawal pucho, turant jawab! Try karo:",
      url: "https://rpsworld.in/genz/doubt-solver",
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.text + " " + data.url);
        setError("");
        setOcrStatus("✅ Link copy ho gaya!");
      }
    } catch {}
  }

  const busy = phase === "solving" || phase === "ocr";

  return (
    <div>
      <FileDrop
        accept="image/*"
        onFile={onPhoto}
        icon="📷"
        title="Question ki Photo Lo / Choose Karo"
        hint="AI photo padh kar sawal nikal lega — ya neeche seedha type karo"
        accent="#14b8a6"
      />

      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt="question" className="w-full rounded-2xl mt-3 border border-white/10" />
      )}
      {ocrStatus && <p className="text-[12px] text-mist-400 mt-2">{ocrStatus}</p>}

      {/* Honest AI disclosure: this tool has no local answer engine — on AI failure it shows an error and the user retries. */}
      <p className="text-[11px] text-mist-500 mt-3">
        ℹ️ Answers come from a free external AI service and may be slow or unavailable — if it fails, you&apos;ll see an error and can retry.
      </p>

      <div className="flex gap-2 mt-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="...ya yahan question type karo (Maths, Science, GK...)"
          rows={3}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400/60 text-mist-100 placeholder:text-mist-500"
        />
        <button
          onClick={solve}
          disabled={busy}
          className="font-extrabold px-5 rounded-xl text-sm text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#0f766e,#14b8a6)" }}
        >
          {phase === "solving" ? "Soch raha hai..." : "Solve ✨"}
        </button>
      </div>

      {error && (
        <p className="text-[13px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2.5 mt-3 leading-snug">
          {error}
        </p>
      )}

      {(phase === "solving" || phase === "done") && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4">
          <p className="font-bold text-teal-300 text-sm mb-2">✅ AI Solution:</p>
          {phase === "solving" ? (
            <p className="text-sm text-mist-400">🤔 AI is thinking...</p>
          ) : (
            <p className="text-sm text-mist-200 whitespace-pre-wrap leading-relaxed">{answer}</p>
          )}
          {phase === "done" && (
            <>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={listen}
                  className="flex-1 bg-teal-700 hover:bg-teal-600 font-bold py-2.5 rounded-xl text-sm text-white"
                >
                  🔊 {speaking ? "Speaking..." : "Listen"}
                </button>
                <button
                  onClick={stopListen}
                  className="px-4 bg-red-900/60 hover:bg-red-800/60 font-bold py-2.5 rounded-xl text-sm text-white"
                  title="Stop"
                >
                  ⏹️
                </button>
              </div>
              <button
                onClick={share}
                className="w-full mt-3 bg-purple-700 font-bold py-2 rounded-xl text-sm text-white"
              >
                📤 Share with Friends
              </button>
            </>
          )}
        </div>
      )}

      <p className="text-center text-[11px] text-mist-600 mt-4">Ask daily, learn daily! 📚</p>
    </div>
  );
}
