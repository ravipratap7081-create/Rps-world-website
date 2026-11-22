"use client";
import { useEffect, useRef } from "react";

// Aurora Glass v2 motion system (spec §8) — faithful port of the preview's
// single IIFE, as a React client component. Rendered once from app/page.js.
// Gates: reduceMotion = prefers-reduced-motion, finePointer = hover+fine.
// No content lives here; all copy is server-rendered in page.js.
export default function AuroraMotion() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!finePointer || reduceMotion) {
      document.body.classList.add("no-cursor");
    }

    const revealAll = () => {
      document
        .querySelectorAll(".reveal, .reveal-l, .reveal-r")
        .forEach((el) => el.classList.add("in"));
    };

    // --- Scroll reveals + 2.5s safety net + 300ms pre-reveal (spec §8.7) ---
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      document
        .querySelectorAll(".reveal, .reveal-l, .reveal-r")
        .forEach((el) => io.observe(el));
      setTimeout(revealAll, 2500);
      setTimeout(() => {
        document
          .querySelectorAll(".reveal, .reveal-l, .reveal-r")
          .forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0)
              el.classList.add("in");
          });
      }, 300);
    }

    // --- Flip toggles (mobile tap / keyboard; spec §8.2) ---
    // Event delegation so the server-rendered flip cards need no client code.
    const onFlipClick = (e) => {
      const btn = e.target.closest(".flip-toggle");
      if (!btn) return;
      e.stopPropagation();
      const card = btn.closest(".tool-card");
      if (!card) return;
      const flipped = card.classList.toggle("flipped");
      btn.setAttribute("aria-expanded", flipped ? "true" : "false");
    };
    document.addEventListener("click", onFlipClick);

    if (reduceMotion || !finePointer) return () => {
      document.removeEventListener("click", onFlipClick);
    };

    // --- Custom cursor (spec §8.1): dot instant, ring lerp 0.16 ---
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring)
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onEnter = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (!t) return;
      if (label) label.textContent = t.getAttribute("data-cursor") || "View";
      if (ring) ring.classList.add("big");
    };
    const onLeave = (e) => {
      if (e.target.closest("[data-cursor]") && ring)
        ring.classList.remove("big");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(loop);

    // --- Tilt (spec §8.7): data-tilt or default 6 ---
    const tiltCards = Array.from(document.querySelectorAll(".tilt"));
    const tiltHandlers = tiltCards.map((card) => {
      const max = parseFloat(card.getAttribute("data-tilt") || "6");
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
      };
      const leave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      return () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });

    // --- Magnetic buttons (spec §8.7): translate x*0.22, y*0.28 ---
    const magBtns = Array.from(document.querySelectorAll(".magnetic"));
    const magHandlers = magBtns.map((b) => {
      const move = (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      };
      const leave = () => {
        b.style.transform = "";
      };
      b.addEventListener("mousemove", move);
      b.addEventListener("mouseleave", leave);
      return () => {
        b.removeEventListener("mousemove", move);
        b.removeEventListener("mouseleave", leave);
      };
    });

    // --- Orb scroll parallax (spec §8.8): speeds o1 .15, o2 .25, o3 .10, o4 .20 ---
    const orbs = Array.from(document.querySelectorAll(".orb"));
    const speeds = [0.15, 0.25, 0.1, 0.2];
    let ticking = false;
    const applyOrbParallax = () => {
      const y = window.scrollY || 0;
      orbs.forEach((o, i) => {
        o.style.setProperty("--py", `${y * (speeds[i] || 0.15)}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyOrbParallax);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyOrbParallax();

    // --- Hero mouse parallax (spec §8.8): card ±6px, chips ±4px ---
    const hero = document.querySelector(".hero");
    const heroCard = document.querySelector(".hero-card");
    const chips = Array.from(document.querySelectorAll(".float-chip"));
    const onHeroMove = (e) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      if (heroCard)
        heroCard.style.transform = `translate(${nx * 12}px, ${ny * 12}px)`;
      chips.forEach((c) => {
        c.style.setProperty("--cx", `${nx * 8}px`);
        c.style.setProperty("--cy", `${ny * 8}px`);
      });
    };
    const onHeroLeave = () => {
      if (heroCard) heroCard.style.transform = "";
      chips.forEach((c) => {
        c.style.setProperty("--cx", "0px");
        c.style.setProperty("--cy", "0px");
      });
    };
    if (hero) {
      hero.addEventListener("mousemove", onHeroMove);
      hero.addEventListener("mouseleave", onHeroLeave);
    }

    return () => {
      document.removeEventListener("click", onFlipClick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
      tiltHandlers.forEach((fn) => fn());
      magHandlers.forEach((fn) => fn());
      window.removeEventListener("scroll", onScroll);
      if (hero) {
        hero.removeEventListener("mousemove", onHeroMove);
        hero.removeEventListener("mouseleave", onHeroLeave);
      }
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" ref={dotRef} />
      <div className="cursor-ring" aria-hidden="true" ref={ringRef}>
        <span className="cursor-label" ref={labelRef}>
          View
        </span>
      </div>
    </>
  );
}
