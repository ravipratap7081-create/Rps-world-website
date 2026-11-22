// Floating WhatsApp button (Mix design, audit P1-2 fix, 7 Nov 2026).
// Site-wide at layout level, next to the global RpsNav — one entry point,
// not per-page. Deep-green gradient block, rounded-square 18px/6px corners,
// white WhatsApp glyph (inline SVG, never an emoji).
// z-index 50 (see .mix-fab): above page content, but BELOW the consent
// banner (z-60) and the demo hire bar (z-9999), so it never overlaps
// either while they are up — it appears once they are dismissed/closed.
// AURORA GLASS v2 (22 Nov 2026): .aurora-fab glass ring added only —
// wa.me link, icon and z-index UNCHANGED.
import WhatsAppIcon from "./WhatsAppIcon";

export default function RpsFab() {
  return (
    <a
      href="https://wa.me/919235039317?text=Namaste%2C%20mujhe%20website%20banwana%20hai."
      className="mix-fab aurora-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp par baat karo — RPS World"
    >
      <WhatsAppIcon className="mix-fab__icon" />
    </a>
  );
}
