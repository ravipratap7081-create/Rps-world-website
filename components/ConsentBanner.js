"use client";
import { useEffect, useState } from "react";

// RPS World consent banner — DISCREET bottom bar.
// Same contract as ProTools: localStorage 'rps-consent-v1' with
// {analytics, recordings, decided_at, version:'v2'}.
// Accept = both true (loads Clarity project z9hgilk6b4 immediately,
// mirroring the loader in app/layout.js); Reject = both false.
// No animation, no overlay, no modal — a small footer-like bar.
// Accept and Reject are the same size and weight: Reject is never
// hidden, smaller, or greyed out. DNT is respected at load time.
// Footer "Privacy choices" link (injected into every <footer>)
// re-opens the bar; window.openConsentBanner does the same.
const KEY = "rps-consent-v1";
const CLARITY_ID = "z9hgilk6b4";
const LINK_ATTR = "data-rps-consent-link";

function readChoice() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function dntOn() {
  try {
    return navigator.doNotTrack === "1" || window.doNotTrack === "1";
  } catch (e) {
    return false;
  }
}

function loadClarity() {
  try {
    if (dntOn()) return;
    if (typeof window.clarity === "function") {
      window.clarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
      return;
    }
    window.clarity =
      window.clarity ||
      function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
    const t = document.createElement("script");
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    const y = document.getElementsByTagName("script")[0];
    y.parentNode.insertBefore(t, y);
    try {
      window.clarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
    } catch (e) {}
  } catch (e) {}
}

function stopClarity() {
  try {
    if (typeof window.clarity === "function") {
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      window.clarity("stop");
    }
  } catch (e) {}
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = readChoice();
    if (!c || c.version !== "v2") setVisible(true);
    // Footer "Privacy choices" link in every <footer> on the page.
    try {
      const footers = document.querySelectorAll("footer");
      footers.forEach((f) => {
        if (f.querySelector("[" + LINK_ATTR + "]")) return;
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute(LINK_ATTR, "1");
        b.textContent = "Privacy choices";
        b.style.cssText =
          "background:none;border:none;padding:0;margin:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer;";
        b.addEventListener("click", () => setVisible(true));
        const host = f.querySelector("div") || f;
        host.appendChild(b);
      });
    } catch (e) {}
    window.openConsentBanner = () => setVisible(true);
  }, []);

  function choose(analytics, recordings) {
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({
          analytics: analytics === true,
          recordings: recordings === true,
          decided_at: new Date().toISOString(),
          version: "v2",
        })
      );
    } catch (e) {}
    if (recordings) loadClarity();
    else stopClarity();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy consent"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: "#14141f",
        borderTop: "1px solid #2e2c3a",
        color: "#c9c3d4",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "10px 14px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 12px",
        }}
      >
        <p style={{ flex: "1 1 260px", fontSize: 12.5, lineHeight: 1.45, margin: 0 }}>
          Hum anonymous usage stats se site behtar banate hain. Accept par Microsoft Clarity
          recordings/heatmaps bhi chalte hain — aapki files kabhi upload nahi hoti.{" "}
          <a href="/privacy-policy" style={{ color: "#d0bcff", textDecoration: "underline" }}>
            Privacy Policy
          </a>
        </p>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => choose(true, true)}
            style={{
              font: "inherit",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "7px 16px",
              minWidth: 84,
              borderRadius: 999,
              cursor: "pointer",
              border: "1px solid transparent",
              background: "#4f378b",
              color: "#eaddff",
            }}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose(false, false)}
            style={{
              font: "inherit",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "7px 16px",
              minWidth: 84,
              borderRadius: 999,
              cursor: "pointer",
              border: "1px solid #4a4757",
              background: "transparent",
              color: "#e6e0e9",
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
