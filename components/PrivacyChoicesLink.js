"use client";

// "Privacy choices" footer link — reopens the consent banner.
// Renders as a discreet underlined button that blends into the footer.
// Carries data-rps-consent-link so the banner's DOM injection skips
// footers that already have this link (no duplicates).
export default function PrivacyChoicesLink({ className }) {
  return (
    <button
      type="button"
      data-rps-consent-link="1"
      onClick={() => {
        try {
          if (typeof window.openConsentBanner === "function") window.openConsentBanner();
        } catch (e) {}
      }}
      className={className || ""}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        font: "inherit",
        color: "inherit",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      Privacy choices
    </button>
  );
}
