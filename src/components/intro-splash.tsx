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
  // PERBAIKAN: inisialisasi state secara sinkron.
  // Jika sessionStorage sudah menandai pernah diputar, langsung "gone".
  // Selain itu, langsung "enter" (bukan "hidden") agar overlay langsung tampil.
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") return "enter";
    try {
      const already = sessionStorage.getItem(SESSION_KEY) === "1";
      return already ? "gone" : "enter";
    } catch {
      return "enter";
    }
  });

  const logoRef = useRef<HTMLDivElement>(null);
  const [flipVars, setFlipVars] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Jika sudah "gone" atau bukan "enter", jalankan timer? Tidak perlu.
    // Timer hanya perlu jika fase awal "enter"
    if (phase !== "enter") return;

    // Catatan: sessionStorage sudah dicek di atas, jadi jika sampai sini berarti belum pernah diputar.
    // Timer untuk auto-play
    const tFly = setTimeout(() => triggerFly(), 2000);
    const tGone = setTimeout(() => setPhase("gone"), 3000);

    return () => {
      clearTimeout(tFly);
      clearTimeout(tGone);
    };
  }, [phase]); // efek bergantung pada phase, hanya sekali karena phase === "enter"

  function triggerFly(fast = false) {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;
    if (!logoRef.current) return;

    const from = logoRef.current.getBoundingClientRect();
    const anchor = document.getElementById("site-logo-anchor");
    const to = anchor
      ? anchor.getBoundingClientRect()
      : { top: 16, left: 16, width: 36, height: 36 };

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

  // PERBAIKAN: jika phase "gone", tidak render. Jika "hidden" (tidak akan pernah terjadi), juga tidak render.
  // Tapi karena kita tidak pernah set "hidden", maka aman.
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
