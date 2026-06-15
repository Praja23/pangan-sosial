import { useEffect, useRef, useState } from "react";
import { Leaf } from "lucide-react";

const SESSION_KEY = "pp_intro_played";

type Phase =
  | "hidden" // belum mulai
  | "enter" // logo spin masuk + teks fade in
  | "idle" // diam sebentar
  | "fly" // logo terbang smooth ke navbar (FLIP)
  | "gone"; // overlay fade out, selesai

export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const logoRef = useRef<HTMLDivElement>(null);

  // CSS custom properties untuk FLIP transform
  const [flipVars, setFlipVars] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof sessionStorage === "undefined") return;

    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (already) return;

    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => setPhase("enter"));
    } else {
      setPhase("enter");
    }

    const tFly = setTimeout(() => triggerFly(), 2000);
    const tGone = setTimeout(() => setPhase("gone"), 3000);

    return () => {
      clearTimeout(tFly);
      clearTimeout(tGone);
    };
  }, []);

  function triggerFly(fast = false) {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;
    if (!logoRef.current) return;

    // FIRST — posisi logo saat ini (center screen)
    const from = logoRef.current.getBoundingClientRect();

    // LAST — posisi anchor logo di navbar
    const anchor = document.getElementById("site-logo-anchor");
    const to = anchor
      ? anchor.getBoundingClientRect()
      : { top: 16, left: 16, width: 36, height: 36 };

    // INVERT — hitung delta agar logo "pindah" lewat transform saja
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const scale = Math.min(to.width / from.width, to.height / from.height);

    setFlipVars({
      "--flip-dx": `${dx}px`,
      "--flip-dy": `${dy}px`,
      "--flip-scale": `${scale}`,
      "--flip-dur": fast ? "0.5s" : "0.82s",
    } as React.CSSProperties);

    setPhase("fly");
  }

  function handleSkip() {
    if (typeof window === "undefined") return;
    if (phase === "fly" || phase === "gone") return;

    triggerFly(true);
    setTimeout(() => setPhase("gone"), 600);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof sessionStorage === "undefined") return;

    if (phase === "gone") {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    }
  }, [phase]);

  if (phase === "hidden" || phase === "gone") return null;

  const isFly = phase === "fly";

  return (
    <div
      className={`intro-splash${isFly ? " intro-splash--exit" : ""}`}
      aria-label="Memuat PanganPeduli"
      role="status"
    >
      <div className="intro-glow" aria-hidden />

      <div className={`intro-content${isFly ? " intro-content--exit" : ""}`}>
        {/*
          Logo tetap in-flow (tidak jadi fixed).
          Saat phase "fly", class intro-logo--fly aktif dan
          CSS @keyframes menggeser lewat translate+scale.
        */}
        <div
          ref={logoRef}
          className={[
            "intro-logo",
            phase === "enter" || phase === "idle" ? "intro-logo--enter" : "",
            isFly ? "intro-logo--fly" : "",
          ].join(" ")}
          style={isFly ? flipVars : {}}
        >
          <Leaf className="text-primary-foreground intro-logo__icon" />
        </div>

        <h1 className="intro-wordmark">
          Pangan<span className="text-primary">Peduli</span>
        </h1>
        <p className="intro-tagline">Berbagi · Peduli · Lestari</p>
      </div>

      {!isFly && (
        <button onClick={handleSkip} className="intro-skip glass-card">
          Lewati
        </button>
      )}
    </div>
  );
}
