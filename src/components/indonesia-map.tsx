import { useEffect, useRef, useState } from "react";
import { INDONESIA_PROVINCES } from "@/lib/indonesia-provinces";
import { Reveal } from "@/components/reveal";

// Koordinat dalam ruang viewBox asli peta (0 0 2021 922), dihitung dari
// posisi absolut tiap provinsi pada peta SVG yang akurat.
type CityPin = {
  name: string;
  x: number;
  y: number;
  mitra: string;
  highlight?: boolean;
};

const CITY_PINS: CityPin[] = [
  // Kalimantan
  { name: "Pontianak", x: 660, y: 400, mitra: "412 mitra" },
  { name: "Palangkaraya", x: 805, y: 470, mitra: "286 mitra", highlight: true },
  { name: "Banjarmasin", x: 885, y: 545, mitra: "498 mitra" },
  { name: "Samarinda", x: 955, y: 385, mitra: "357 mitra" },
  // Jawa
  { name: "Jabodetabek", x: 520, y: 690, mitra: "3.120 mitra" },
  { name: "Bandung", x: 558, y: 705, mitra: "1.480 mitra" },
  { name: "Semarang", x: 668, y: 705, mitra: "860 mitra" },
  { name: "Solo", x: 686, y: 722, mitra: "540 mitra" },
  { name: "Yogyakarta", x: 672, y: 745, mitra: "615 mitra" },
  { name: "Surabaya", x: 792, y: 728, mitra: "1.920 mitra" },
  { name: "Malang", x: 793, y: 752, mitra: "640 mitra" },
  // Bali
  { name: "Bali", x: 868, y: 774, mitra: "730 mitra" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

export function IndonesiaMapSection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const count = useCountUp(10000, 2200, inView);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Jangkauan Nasional</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">
              Total Mitra <span className="text-gradient">{count.toLocaleString("id-ID")}+</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tersebar di seluruh kota di Jawa, Sumatera, Sulawesi, Kalimantan &amp; Bali.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="relative glass-card rounded-3xl p-4 sm:p-8 overflow-hidden map-3d-enter"
            style={{ background: "var(--gradient-mesh)" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "2021 / 922" }}>
              <svg
                viewBox="0 0 2021 922"
                className="w-full h-full"
                role="img"
                aria-label="Peta persebaran mitra PanganPeduli di Indonesia"
              >
                <defs>
                  <filter id="islandGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="oklch(0.62 0.14 165)" floodOpacity="0.45" />
                  </filter>
                </defs>
                <g filter="url(#islandGlow)">
                  {INDONESIA_PROVINCES.map((p) => (
                    <path
                      key={p.id}
                      d={p.d}
                      transform={`translate(${p.tx}, ${p.ty})`}
                      className="indo-island"
                      fill="oklch(0.62 0.14 165 / 0.55)"
                      stroke="oklch(0.97 0.01 80 / 0.7)"
                      strokeWidth="0.8"
                    />
                  ))}
                </g>

                {CITY_PINS.map((c, i) => (
                  <g
                    key={c.name}
                    className="city-pin"
                    style={{ "--pin-delay": `${i * 90}ms` } as React.CSSProperties}
                    onMouseEnter={() => setActive(c.name)}
                    onMouseLeave={() => setActive((a) => (a === c.name ? null : a))}
                    onTouchStart={() => setActive((a) => (a === c.name ? null : c.name))}
                  >
                    {/* ripple */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.highlight ? 7 : 5}
                      className={c.highlight ? "pin-ripple pin-ripple-hub" : "pin-ripple"}
                      fill="none"
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.highlight ? 7 : 5}
                      className={c.highlight ? "pin-dot pin-dot-hub" : "pin-dot"}
                    />
                    <text
                      x={c.x}
                      y={c.y - (c.highlight ? 14 : 10)}
                      textAnchor="middle"
                      className={c.highlight ? "pin-label pin-label-hub" : "pin-label"}
                    >
                      {c.name}
                    </text>

                    {active === c.name && (
                      <g className="pin-tooltip" transform={`translate(${c.x}, ${c.y - 38})`}>
                        <rect x={-46} y={-22} width="92" height="26" rx="8" fill="oklch(0.22 0.025 50)" />
                        <text x={0} y={-4} textAnchor="middle" fill="oklch(0.99 0.005 80)" fontSize="11" fontWeight="600">
                          {c.mitra}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.7 0.17 55)" }} />
                Hub utama
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-destructive" />
                Kota mitra aktif
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.62 0.14 165)" }} />
                Wilayah pulau
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
