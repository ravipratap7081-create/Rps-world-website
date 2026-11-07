// Shared FAB injection for the 27 static demo pages (Mix audit P1-2, 7 Nov 2026).
//
// Demo pages are static HTML served via app/demo-*/route.js readFile, so
// they bypass app/layout.js — the layout-level RpsFab never reaches them.
// Inject the same Mix FAB here so the floating WhatsApp entry is genuinely
// site-wide. Self-contained (inline <style>): demo pages do not load
// app/globals.css.
//
// Behaviour matches the layout FAB, with one difference: z-40 (not 50).
// Demo interiors carry their OWN fixed bottom chrome — sticky bars at
// z-50..70, own wa-float buttons at z-70 — so the injected FAB must sit
// BELOW all of them (lowest demo bottom bar is z-50) and below the hire
// bar (z-9999): it never covers a demo's own buttons. On mobile demos
// with a sticky bar it stays behind that bar (whose own WhatsApp button
// serves the purpose); on desktop and on demos without a bottom bar it
// shows normally.
const FAB_HTML =
  '<!-- RPS-FAB (Mix, audit P1-2) -->' +
  '<style>.rps-fab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:40;display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:18px 6px 18px 6px;background:linear-gradient(180deg,#1FA855,#128C4A 60%,#0E7A3F);color:#fff;border:1px solid rgba(255,255,255,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 8px 24px rgba(18,140,74,.45),0 2px 6px rgba(0,0,0,.4);text-decoration:none}.rps-fab:hover{filter:brightness(1.08)}.rps-fab svg{width:28px;height:28px}}</style>' +
  '<a class="rps-fab" href="https://wa.me/919235039317?text=Namaste%2C%20mujhe%20website%20banwana%20hai." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp par baat karo — RPS World">' +
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.646-.235-.374a9.86 9.86 0 01-1.519-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>';

export function withDemoFab(html) {
  if (!html || html.includes("rps-fab")) return html;
  if (!html.includes("</body>")) return html + FAB_HTML;
  return html.replace("</body>", FAB_HTML + "</body>");
}
