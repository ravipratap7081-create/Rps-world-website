// Diwali Card renderer — pure Canvas 2D, no external assets.
// Renders a 1080x1350 portrait card. All art is vector-drawn (diyas,
// fireworks, marigolds, sparkles) so download/share output is identical
// to the live preview.

export const W = 1080;
export const H = 1350;

export const TEMPLATES = [
  { id: "royal", name: "Royal Diya", desc: "Maroon & gold classic", emoji: "🪔" },
  { id: "fireworks", name: "Firework Night", desc: "Celebration sky", emoji: "🎆" },
  { id: "marigold", name: "Marigold Utsav", desc: "Festive flowers", emoji: "🌼" },
  { id: "emerald", name: "Emerald Shubh", desc: "Green & gold royal", emoji: "💚" },
];

export const MESSAGES = [
  "May this Diwali light up your life with happiness, health & prosperity!",
  "Wishing you and your family a Diwali filled with love, laughter & light!",
  "Shubh Deepavali! May Goddess Lakshmi bless your home with wealth & joy!",
];

// Deterministic PRNG so preview === download, every time.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------------- decorative painters ---------------- */

function goldBorder(ctx, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.95;
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 2;
  ctx.strokeRect(58, 58, W - 116, H - 116);
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  const corners = [
    [36, 36],
    [W - 36, 36],
    [36, H - 36],
    [W - 36, H - 36],
  ];
  for (const [x, y] of corners) {
    ctx.beginPath();
    ctx.arc(x, y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
  }
  ctx.restore();
}

function diya(ctx, x, y, s) {
  // warm glow behind flame
  const glow = ctx.createRadialGradient(x, y - 70 * s, 8, x, y - 70 * s, 170 * s);
  glow.addColorStop(0, "rgba(255,180,60,0.5)");
  glow.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y - 70 * s, 170 * s, 0, Math.PI * 2);
  ctx.fill();

  // flame
  ctx.save();
  ctx.shadowColor = "#ffb43c";
  ctx.shadowBlur = 42 * s;
  const fg = ctx.createLinearGradient(0, y - 140 * s, 0, y - 30 * s);
  fg.addColorStop(0, "#fff8dc");
  fg.addColorStop(0.45, "#ffd34d");
  fg.addColorStop(1, "#ff7b1c");
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(x, y - 138 * s);
  ctx.bezierCurveTo(x + 36 * s, y - 96 * s, x + 27 * s, y - 56 * s, x, y - 38 * s);
  ctx.bezierCurveTo(x - 27 * s, y - 56 * s, x - 36 * s, y - 96 * s, x, y - 138 * s);
  ctx.fill();
  ctx.restore();

  // wick
  ctx.strokeStyle = "#3a2410";
  ctx.lineWidth = 6 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y - 40 * s);
  ctx.lineTo(x, y - 24 * s);
  ctx.stroke();

  // clay bowl
  const bg = ctx.createLinearGradient(0, y - 32 * s, 0, y + 44 * s);
  bg.addColorStop(0, "#d2691e");
  bg.addColorStop(1, "#7a3a10");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.ellipse(x, y, 96 * s, 42 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // oil surface
  ctx.fillStyle = "#46220a";
  ctx.beginPath();
  ctx.ellipse(x, y - 9 * s, 72 * s, 26 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // rim highlight
  ctx.strokeStyle = "rgba(255,215,130,0.75)";
  ctx.lineWidth = 4 * s;
  ctx.beginPath();
  ctx.ellipse(x, y, 96 * s, 42 * s, 0, Math.PI * 1.08, Math.PI * 1.92);
  ctx.stroke();
}

function firework(ctx, x, y, r, color, seed) {
  const rnd = mulberry32(seed);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * 0.25;
    const len = r * (0.65 + rnd() * 0.35);
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * r * 0.14, y + Math.sin(a) * r * 0.14);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + Math.cos(a) * len, y + Math.sin(a) * len, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function sparkle(ctx, x, y, s, color) {
  ctx.save();
  ctx.fillStyle = color || "rgba(255,222,140,0.9)";
  ctx.shadowColor = color || "rgba(255,222,140,0.9)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x, y - 15 * s);
  ctx.quadraticCurveTo(x, y, x + 15 * s, y);
  ctx.quadraticCurveTo(x, y, x, y + 15 * s);
  ctx.quadraticCurveTo(x, y, x - 15 * s, y);
  ctx.quadraticCurveTo(x, y, x, y - 15 * s);
  ctx.fill();
  ctx.restore();
}

function sparkleField(ctx, seed, count, top, bottom) {
  const rnd = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const x = 70 + rnd() * (W - 140);
    const y = top + rnd() * (bottom - top);
    sparkle(ctx, x, y, 0.5 + rnd() * 0.9);
  }
}

function garland(ctx, y, seed) {
  const rnd = mulberry32(seed);
  const n = 15;
  // leaf string
  ctx.strokeStyle = "rgba(96,150,64,0.95)";
  ctx.lineWidth = 7;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const x = 50 + (980 / n) * i;
    const yy = y - 26 + Math.sin(i * 1.15) * 9;
    if (i === 0) ctx.moveTo(x, yy);
    else ctx.lineTo(x, yy);
  }
  ctx.stroke();
  // marigold blooms
  for (let i = 0; i <= n; i++) {
    const x = 50 + (980 / n) * i;
    const yy = y + Math.sin(i * 1.15) * 9;
    const r = 27 + rnd() * 9;
    const warm = rnd() > 0.45;
    const g = ctx.createRadialGradient(x - 7, yy - 7, 4, x, yy, r);
    g.addColorStop(0, warm ? "#ffd34d" : "#ffb43c");
    g.addColorStop(1, warm ? "#dd7a00" : "#c25e00");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, yy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(120,50,0,0.45)";
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2 + rnd();
      ctx.beginPath();
      ctx.arc(
        x + Math.cos(a) * r * 0.55,
        yy + Math.sin(a) * r * 0.55,
        4.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
}

function dotRing(ctx, cx, cy, r, count, color, dotR) {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, dotR, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* ---------------- text helpers ---------------- */

function goldFill(ctx, yTop, yBot) {
  const g = ctx.createLinearGradient(0, yTop, 0, yBot);
  g.addColorStop(0, "#ffedb0");
  g.addColorStop(0.5, "#f5b301");
  g.addColorStop(1, "#c07f00");
  return g;
}

function wrapText(ctx, text, cx, y, maxW, lh) {
  const words = String(text).split(/\s+/);
  let line = "";
  let yy = y;
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line, cx, yy);
      line = w;
      yy += lh;
    } else {
      line = t;
    }
  }
  if (line) ctx.fillText(line, cx, yy);
  return yy;
}

/* ---------------- template backgrounds ---------------- */

function paintBackground(ctx, id, seed) {
  let stops;
  if (id === "royal") stops = ["#471010", "#1c0606", "#100303"];
  else if (id === "fireworks") stops = ["#181246", "#0b0926", "#050510"];
  else if (id === "marigold") stops = ["#5e230b", "#2c1204", "#180a02"];
  else stops = ["#0e3520", "#072013", "#030f08"]; // emerald

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, stops[0]);
  bg.addColorStop(0.55, stops[1]);
  bg.addColorStop(1, stops[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // soft vignette
  const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.72);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, W, H);

  const rnd = mulberry32(seed);

  if (id === "royal") {
    goldBorder(ctx, "#f5b301");
    sparkleField(ctx, seed + 1, 26, 380, 1020);
    diya(ctx, 200, 300, 0.95);
    diya(ctx, 880, 300, 0.95);
    diya(ctx, 540, 470, 2.1);
  } else if (id === "fireworks") {
    goldBorder(ctx, "#ffd34d");
    firework(ctx, 250, 250, 120, "#ffd34d", seed + 11);
    firework(ctx, 830, 210, 140, "#ff7ba9", seed + 22);
    firework(ctx, 620, 330, 90, "#7be4ff", seed + 33);
    sparkleField(ctx, seed + 2, 20, 420, 1020);
    const dx = [200, 370, 540, 710, 880];
    dx.forEach((x, i) => diya(ctx, x, 1130, 0.62 + (i % 2) * 0.12));
  } else if (id === "marigold") {
    goldBorder(ctx, "#ffb43c");
    garland(ctx, 120, seed + 5);
    garland(ctx, 1150, seed + 6);
    diya(ctx, 540, 330, 1.7);
    sparkleField(ctx, seed + 3, 16, 400, 1000);
  } else {
    // emerald
    goldBorder(ctx, "#e8c86a");
    dotRing(ctx, 540, 250, 120, 26, "rgba(232,200,106,0.55)", 6);
    dotRing(ctx, 540, 250, 170, 36, "rgba(232,200,106,0.28)", 4);
    diya(ctx, 540, 300, 1.55);
    diya(ctx, 180, 1180, 0.7);
    diya(ctx, 900, 1180, 0.7);
    sparkleField(ctx, seed + 4, 22, 420, 1040);
  }
}

/* ---------------- main render ---------------- */

export function renderCard(canvas, { template, name, message }) {
  const ctx = canvas.getContext("2d");
  canvas.width = W;
  canvas.height = H;
  const cx = W / 2;
  const safeName = (name || "").trim() || "आपका नाम";
  const seed = { royal: 101, fireworks: 202, marigold: 303, emerald: 404 }[template] || 101;

  paintBackground(ctx, template, seed);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Title — शुभ दीपावली
  ctx.save();
  ctx.shadowColor = "rgba(245,179,1,0.55)";
  ctx.shadowBlur = 34;
  ctx.fillStyle = goldFill(ctx, 560, 700);
  ctx.font = '700 118px "Noto Sans Devanagari", "Plus Jakarta Sans", sans-serif';
  ctx.fillText("शुभ दीपावली", cx, 690);
  ctx.restore();

  // Subtitle — HAPPY DIWALI (letterspaced)
  ctx.save();
  try {
    ctx.letterSpacing = "14px";
  } catch (e) {}
  ctx.fillStyle = "rgba(240,214,150,0.92)";
  ctx.font = '600 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("HAPPY DIWALI", cx + 7, 762);
  try {
    ctx.letterSpacing = "0px";
  } catch (e) {}
  ctx.restore();

  // divider — line, diamond, line
  ctx.save();
  ctx.strokeStyle = "rgba(245,179,1,0.6)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 250, 812);
  ctx.lineTo(cx - 40, 812);
  ctx.moveTo(cx + 40, 812);
  ctx.lineTo(cx + 250, 812);
  ctx.stroke();
  ctx.fillStyle = "#f5b301";
  ctx.translate(cx, 812);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-13, -13, 26, 26);
  ctx.restore();

  // message (wrapped, 2-3 lines)
  ctx.fillStyle = "rgba(246,238,220,0.94)";
  ctx.font = '400 35px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  wrapText(ctx, message, cx, 890, 880, 52);

  // name plaque
  ctx.font = '800 62px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  const nameW = Math.min(880, ctx.measureText(safeName).width + 130);
  const py = 1000;
  const pg = ctx.createLinearGradient(0, py, 0, py + 112);
  pg.addColorStop(0, "rgba(60,36,6,0.92)");
  pg.addColorStop(1, "rgba(30,17,3,0.92)");
  ctx.save();
  ctx.shadowColor = "rgba(245,179,1,0.35)";
  ctx.shadowBlur = 26;
  rr(ctx, cx - nameW / 2, py, nameW, 112, 56);
  ctx.fillStyle = pg;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#f5b301";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = goldFill(ctx, py + 18, py + 94);
  ctx.fillText(safeName, cx, py + 76);

  // watermark — the viral loop
  ctx.fillStyle = "rgba(245,179,1,0.9)";
  ctx.font = '700 30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("✨ Made with Pro Universe ✨", cx, 1252);
  ctx.fillStyle = "rgba(200,180,140,0.55)";
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText("rps-world-website.onrender.com/diwali-card", cx, 1290);
}
