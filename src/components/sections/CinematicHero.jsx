import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import bgSrc from "../../assets/hero section sky /Background.webp";
import buildingSrc from "../../assets/hero section sky /building.png";
import cloud1Src from "../../assets/hero section sky /claud1.png";
import cloud2Src from "../../assets/hero section sky /claud2.png";
import skySrc from "../../assets/hero section sky /full_width_sky.png";

const GPU = { willChange: "transform, opacity", backfaceVisibility: "hidden" };

export default function CinematicHero() {
  const heroRef   = useRef(null);
  const buildingRef = useRef(null);
  const cloudLRef = useRef(null);
  const cloudRRef = useRef(null);
  const skyRef    = useRef(null);
  const textRef   = useRef(null);

  // Set initial hidden states before first paint
  useLayoutEffect(() => {
    gsap.set(buildingRef.current, { yPercent: 100 });
    gsap.set(cloudLRef.current,   { x: -120, opacity: 0 });
    gsap.set(cloudRRef.current,   { x: 120,  opacity: 0 });
    gsap.set(textRef.current,     { opacity: 0, y: 30 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Load animations ─────────────────────────────────────────────────
      gsap.to(buildingRef.current, { yPercent: 50, duration: 1.8, ease: "power4.out", delay: 0.1 });
      gsap.to(cloudLRef.current,   { x: 0, opacity: 1, duration: 2.2, ease: "power3.out" });
      gsap.to(cloudRRef.current,   { x: 0, opacity: 1, duration: 2.2, ease: "power3.out", delay: 0.2 });
      gsap.to(textRef.current,     { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.4 });

      // ── Pin the section once ─────────────────────────────────────────────
      // All scroll animations share this single trigger; only this one pins.
      const pinST = ScrollTrigger.create({
        trigger:      heroRef.current,
        start:        "top top",
        end:          "+=1400",
        pin:          true,
        anticipatePin: 1,
      });

      const scrollBase = {
        trigger: heroRef.current,
        start:   "top top",
        end:     "+=1400",
        scrub:   1.2,
      };

      // Building: 50% → 10% (fully rises) while pinned
      gsap.fromTo(buildingRef.current,
        { yPercent: 50 },
        { yPercent: 10, ease: "none", scrollTrigger: scrollBase }
      );

      // Clouds drift outward
      gsap.to(cloudLRef.current, { x: -250, y: -60, ease: "none", scrollTrigger: scrollBase });
      gsap.to(cloudRRef.current, { x:  250, y: -60, ease: "none", scrollTrigger: scrollBase });

      // Sky slowly scales
      gsap.to(skyRef.current, {
        scale: 1.12, ease: "none",
        scrollTrigger: { ...scrollBase, scrub: 2 },
      });

      // Text fades out in first 400px
      gsap.to(textRef.current, {
        y: -80, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start:   "top top",
          end:     "+=400",
          scrub:   true,
        },
      });

      return () => pinST.kill();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      {/* Clip wrapper — overflow:hidden on child, NOT on the GSAP-pinned section */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#B8D4E8" }}>

        {/* Layer 0 — Background sky */}
        <img
          src={bgSrc}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, ...GPU }}
        />

        {/* Layer 1 — Building, zIndex 15 so it rises in front of text */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 15, width: "115vw", pointerEvents: "none" }}>
          <img
            ref={buildingRef}
            src={buildingSrc}
            alt=""
            style={{ display: "block", width: "100%", height: "auto", ...GPU }}
          />
        </div>

        {/* Layer 2 — Clouds */}
        <img ref={cloudLRef} src={cloud1Src} alt="" style={{ position: "absolute", left: "-8%", bottom: "22%", width: "55%", zIndex: 2, filter: "blur(0.6px)", ...GPU }} />
        <img ref={cloudRRef} src={cloud2Src} alt="" style={{ position: "absolute", right: "-8%", bottom: "22%", width: "55%", zIndex: 2, filter: "blur(0.6px)", ...GPU }} />

        {/* Layer 3 — Horizon sky strip */}
        <img
          ref={skyRef}
          src={skySrc}
          alt=""
          style={{ position: "absolute", bottom: -150, left: 0, width: "150%", height: "34vh", objectPosition: "bottom center", zIndex: 3, transformOrigin: "bottom center", ...GPU }}
        />

        {/* Layer 4 — Text (centering wrapper is CSS-only, inner div is GSAP'd) */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "clamp(7rem, 13vh, 14vh)", zIndex: 10, pointerEvents: "none" }}>
          <div ref={textRef} style={{ textAlign: "center", width: "90%", maxWidth: "960px", pointerEvents: "auto", ...GPU }}>
            <p style={{ fontSize: "clamp(0.58rem, 0.9vw, 0.7rem)", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(20,18,14,0.55)", marginBottom: "1.2rem", fontWeight: 500 }}>
              LUXURY ARCHITECTURE
            </p>
            <h1 style={{ fontFamily: "inherit", fontSize: "clamp(2rem, 5.2vw, 4.8rem)", fontWeight: 700, color: "#1A1814", lineHeight: 1.15, marginBottom: "1.4rem", letterSpacing: "-0.015em" }}>
              Crafting timeless spaces
            </h1>
            <p style={{ fontSize: "clamp(0.82rem, 1.3vw, 1rem)", fontWeight: 300, color: "rgba(20,18,14,0.60)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 2.4rem" }}>
              Designing iconic residences with vision, precision, and artistry.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                style={{ padding: "0.9rem 2.4rem", background: "#1A1814", color: "#FAFAF8", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "opacity 0.2s ease", fontFamily: "inherit" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Explore Projects
              </button>
            </div>
          </div>
        </div>

      </div>{/* end clip wrapper */}
    </section>
  );
}
