import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import bgSrc from "../../assets/hero section sky /Background.webp";
import buildingSrc from "../../assets/hero section sky /building.png";
import cloud1Src from "../../assets/hero section sky /claud1.png";
import cloud2Src from "../../assets/hero section sky /claud2.png";
import skySrc from "../../assets/hero section sky /full_width_sky.png";

export default function CinematicHero() {
  const heroRef = useRef(null);
  const buildingRef = useRef(null);
  const cloudLRef = useRef(null);
  const cloudRRef = useRef(null);
  const skyRef = useRef(null);
  const textRef = useRef(null);

  // Set initial hidden states before first paint
  useLayoutEffect(() => {
    gsap.set(buildingRef.current, { yPercent: 250 });
    gsap.set(cloudLRef.current, { x: -120, opacity: 0 });
    gsap.set(cloudRRef.current, { x: 120, opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    // Sky: start pushed down so only 40% peeks above the bottom edge
    gsap.set(skyRef.current, { yPercent: 60 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Load animations ─────────────────────────────────────────────────
      gsap.to(buildingRef.current, {
        yPercent: 50,
        duration: 1.3,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.to(cloudLRef.current, {
        x: 0,
        opacity: 1,
        duration: 2.2,
        ease: "power3.out",
      });
      gsap.to(cloudRRef.current, {
        x: 0,
        opacity: 1,
        duration: 2.2,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0,
      });

      // ── Single pinned timeline — one ScrollTrigger with scrub owns pin + all animations ──
      const pinTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1400",
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      pinTL
        .fromTo(
          buildingRef.current,
          { yPercent: 50 },
          { yPercent: 10, ease: "none" },
          0,
        )
        .fromTo(
          cloudLRef.current,
          { x: 0 },
          { x: -250, y: -60, ease: "none" },
          0,
        )
        .fromTo(
          cloudRRef.current,
          { x: 0 },
          { x: 250, y: -60, ease: "none" },
          0,
        )
        .fromTo(
          skyRef.current,
          { yPercent: 20 },
          { yPercent: -40, ease: "none" },
          0,
        )
        // Text fades + moves down in parallel with all other animations (same 1400px duration)
        .fromTo(
          textRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: 80, ease: "none" },
          0,
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      {/* Clip wrapper — isolation:isolate forces a proper stacking context so z-index
          values on children are resolved correctly even when willChange/transform
          creates sub-stacking-contexts on animated elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "#B8D4E8",
          isolation: "isolate",
        }}
      >
        {/* z=0 — Background */}
        <img
          src={bgSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* z=1 — Text: sits behind building so building rises in front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "clamp(7rem, 13vh, 14vh)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div
            ref={textRef}
            style={{
              textAlign: "center",
              width: "90%",
              maxWidth: "960px",
              pointerEvents: "auto",
              willChange: "transform, opacity",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.58rem, 0.9vw, 0.7rem)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(20,18,14,0.55)",
                marginBottom: "1.2rem",
                fontWeight: 500,
              }}
            >
              LUXURY ARCHITECTURE
            </p>
            <h1
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(2rem, 5.2vw, 4.8rem)",
                fontWeight: 700,
                color: "#1A1814",
                lineHeight: 1.15,
                marginBottom: "1.4rem",
                letterSpacing: "-0.015em",
              }}
            >
              Crafting timeless spaces
            </h1>
            <p
              style={{
                fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
                fontWeight: 300,
                color: "rgba(20,18,14,0.60)",
                lineHeight: 1.7,
                maxWidth: "500px",
                margin: "0 auto 2.4rem",
              }}
            >
              Designing iconic residences with vision, precision, and artistry.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                style={{
                  padding: "0.9rem 2.4rem",
                  background: "#1A1814",
                  color: "#FAFAF8",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Explore Projects
              </button>
            </div>
          </div>
        </div>

        {/* z=2 — Building: in front of text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "115vw",
            pointerEvents: "none",
          }}
        >
          <img
            ref={buildingRef}
            src={buildingSrc}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              willChange: "transform",
            }}
          />
        </div>

        {/* z=10 — Clouds: in front of building */}
        <img
          ref={cloudLRef}
          src={cloud1Src}
          alt=""
          style={{
            position: "absolute",
            left: "-8%",
            bottom: "22%",
            width: "55%",
            zIndex: 10,
            filter: "blur(0.6px)",
            willChange: "transform, opacity",
          }}
        />
        <img
          ref={cloudRRef}
          src={cloud2Src}
          alt=""
          style={{
            position: "absolute",
            right: "-8%",
            bottom: "22%",
            width: "55%",
            zIndex: 10,
            filter: "blur(0.6px)",
            willChange: "transform, opacity",
          }}
        />

        {/* z=20 — Sky strip: foreground atmospheric haze, on top of all layers */}
        <img
          ref={skyRef}
          src={skySrc}
          alt=""
          style={{
            position: "absolute",
            bottom: -170,
            left: 0,
            width: "100%",
            height: "50vh",
            objectFit: "",
            objectPosition: "bottom center",
            zIndex: 20,
            willChange: "transform",
          }}
        />
      </div>
      {/* end clip wrapper */}
    </section>
  );
}
