import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { CATEGORY_LABEL, formatCountdown } from "@/lib/format";
import { Search, Clock, Filter, MapPin, Locate, Loader2, X, Navigation, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import { CITY_COORDS, LISTINGS, PARTNERS, distanceKm, formatIDR, useDemoStore, useTick, getRemaining } from "@/lib/demo-data";

export const Route = createFileRoute("/cari")({
  head: () => ({
    meta: [
      { title: "Cari Makanan Surplus Terdekat — PanganPeduli" },
      { name: "description", content: "Cari makanan surplus terdekat dari hotel, restoran, UMKM, dan Program MBG." },
    ],
  }),
  component: SearchPage,
});

const CITIES = Object.keys(CITY_COORDS);

function SearchPage() {
  useDemoStore();
  useTick(1000);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"priority" | "expiry" | "distance">("priority");
  const [city, setCity] = useState<string>("Jakarta");
  const [radius, setRadius] = useState<number>(20);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState(CITY_COORDS.Jakarta);
  const [locModal, setLocModal] = useState<"closed" | "consent" | "detecting" | "success" | "denied">("closed");
  const [detectedCity, setDetectedCity] = useState<string | null>(null);

  const openLocationFlow = () => setLocModal("consent");

  const runDetect = () => {
    setLocModal("detecting");
    setLocating(true);
    const fallback = () => {
      setCoords(CITY_COORDS[city]);
      setDetectedCity(city);
      setLocModal("success");
      setLocating(false);
    };
    if (!navigator.geolocation) {
      setTimeout(fallback, 900);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(c);
        // pilih kota terdekat sebagai label
        let nearest = city, best = Infinity;
        Object.entries(CITY_COORDS).forEach(([name, cc]) => {
          const d = distanceKm(c, cc);
          if (d < best) { best = d; nearest = name; }
        });
        setDetectedCity(nearest);
        setSort("distance");
        setLocModal("success");
        setLocating(false);
      },
      () => {
        setLocModal("denied");
        setLocating(false);
      },
      { timeout: 6000 }
    );
  };

  const useCityFallback = () => {
    setCoords(CITY_COORDS[city]);
    setDetectedCity(city);
    setLocModal("success");
  };

  const items = useMemo(() => {
    const base = LISTINGS.map((l) => {
      const partner = PARTNERS.find((p) => p.id === l.partner_id);
      const dist = partner ? distanceKm(coords, { lat: partner.lat, lng: partner.lng }) : 999;
      return { l, partner, dist, remaining: getRemaining(l.id) };
    });
    let arr = base.filter((x) => x.remaining > 0);
    if (cat !== "all") arr = arr.filter((x) => x.l.category === cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      arr = arr.filter((x) => x.l.title.toLowerCase().includes(s) || x.partner?.name.toLowerCase().includes(s) || x.partner?.city.toLowerCase().includes(s));
    }
    arr = arr.filter((x) => x.dist <= radius);
    if (sort === "expiry") arr.sort((a, b) => new Date(a.l.expires_at).getTime() - new Date(b.l.expires_at).getTime());
    else if (sort === "distance") arr.sort((a, b) => a.dist - b.dist);
    else arr.sort((a, b) => labelWeight(b.l.priority_label) - labelWeight(a.l.priority_label));
    return arr;
  }, [q, cat, sort, radius, coords]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl p-6 sm:p-10 relative overflow-hidden mb-6" style={{ background: "var(--gradient-mesh)" }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Cari Makanan Surplus Terdekat</h1>
            <p className="mt-2 text-muted-foreground">Aktifkan lokasi & atur radius untuk menemukan makanan layak konsumsi di sekitar Anda.</p>
            <div className="mt-5 grid lg:grid-cols-[1fr_auto_auto] gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari menu, mitra, atau kota…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-3 rounded-xl bg-background border border-border">
                <option value="all">Semua Kategori</option>
                <option value="mbg">MBG</option>
                <option value="hotel">Hotel</option>
                <option value="umkm">UMKM</option>
                <option value="restoran">Restoran</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="px-4 py-3 rounded-xl bg-background border border-border">
                <option value="priority">Prioritas Tertinggi</option>
                <option value="expiry">Segera Habis</option>
                <option value="distance">Jarak Terdekat</option>
              </select>
            </div>

            <div className="mt-4 grid sm:grid-cols-[auto_1fr_auto] gap-3 items-center glass-card rounded-2xl p-3 bg-background/80">
              <button onClick={openLocationFlow} disabled={locating} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-shadow disabled:opacity-60">
                {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Locate className="w-4 h-4" />}
                {detectedCity ? `Lokasi: ${detectedCity}` : locating ? "Mendeteksi…" : "Aktifkan Lokasi"}
              </button>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <select value={city} onChange={(e) => { setCity(e.target.value); setCoords(CITY_COORDS[e.target.value]); }} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <input type="range" min={1} max={50} value={radius} onChange={(e) => setRadius(+e.target.value)} className="flex-1 accent-primary" />
                  <span className="text-sm font-semibold whitespace-nowrap w-20 text-right">{radius} km</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground sm:text-right">{items.length} hasil dalam radius</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map(({ l, partner, dist, remaining }) => (
              <Link key={l.id} to="/listing/$id" params={{ id: l.id }} className="group glass-card rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
                  <img src={l.image_url} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-semibold">{l.priority_label}</div>
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{formatIDR(l.price)}</div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] text-muted-foreground uppercase">{CATEGORY_LABEL[l.category]}</div>
                  <h3 className="font-display font-bold text-sm leading-tight mt-0.5 line-clamp-2">{l.title}</h3>
                  {partner && <p className="text-xs text-muted-foreground mt-1 truncate">{partner.name} • {partner.city}</p>}
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="font-semibold">{remaining} porsi</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {formatCountdown(l.expires_at)}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-primary font-semibold inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {dist.toFixed(1)} km</div>
                </div>
              </Link>
            ))}
          </div>

          {items.length === 0 && (
            <div className="glass-card rounded-3xl p-12 text-center text-muted-foreground">
              <Filter className="w-10 h-10 mx-auto mb-3 opacity-40" />
              Tidak ada makanan dalam radius {radius} km. Coba perluas radius atau ubah filter.
            </div>
          )}
        </div>
      </main>
      <SiteFooter />

      {locModal !== "closed" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setLocModal("closed")} />
          <div className="relative w-full max-w-md glass-card rounded-3xl shadow-float overflow-hidden animate-scale-in">
            <button onClick={() => setLocModal("closed")} className="absolute top-4 right-4 z-10 w-8 h-8 grid place-items-center rounded-full hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>

            {locModal === "consent" && (
              <div className="p-7 text-center">
                <div className="relative mx-auto w-24 h-24 mb-5">
                  <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-warm)] opacity-30 blur-2xl animate-glow-pulse" />
                  <div className="relative w-full h-full rounded-full bg-[image:var(--gradient-warm)] grid place-items-center shadow-elegant">
                    <Navigation className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold">Izinkan Akses Lokasi</h3>
                <p className="mt-2 text-sm text-muted-foreground">Kami butuh lokasi Anda untuk menampilkan makanan surplus <span className="font-semibold text-foreground">paling dekat</span> & menghemat waktu pengambilan.</p>
                <div className="mt-5 grid gap-2 text-left text-xs">
                  {[
                    { i: ShieldCheck, t: "Lokasi hanya dipakai di perangkat Anda — tidak disimpan di server." },
                    { i: MapPin, t: "Kami urutkan hasil dari jarak terdekat dalam radius pilihan Anda." },
                    { i: CheckCircle2, t: "Bisa dimatikan kapan saja melalui pengaturan browser." },
                  ].map(({ i: Icon, t }, idx) => (
                    <div key={idx} className="flex gap-2 items-start p-2.5 rounded-xl bg-secondary/60">
                      <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button onClick={useCityFallback} className="py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors">Pakai kota saja</button>
                  <button onClick={runDetect} className="py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-shadow inline-flex items-center justify-center gap-1.5"><Locate className="w-4 h-4" /> Izinkan</button>
                </div>
              </div>
            )}

            {locModal === "detecting" && (
              <div className="p-10 text-center">
                <div className="relative mx-auto w-28 h-28 mb-6">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-primary/30 animate-ping" style={{ animationDelay: "0.3s" }} />
                  <div className="absolute inset-4 rounded-full bg-primary/40 animate-ping" style={{ animationDelay: "0.6s" }} />
                  <div className="relative w-full h-full rounded-full bg-[image:var(--gradient-warm)] grid place-items-center shadow-elegant">
                    <MapPin className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold">Mendeteksi lokasi Anda…</h3>
                <p className="mt-2 text-sm text-muted-foreground">Mohon izinkan akses lokasi di pop-up browser.</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs text-primary font-semibold"><Loader2 className="w-4 h-4 animate-spin" /> Menyinkronkan GPS</div>
              </div>
            )}

            {locModal === "success" && (
              <div className="p-7 text-center">
                <div className="relative mx-auto w-24 h-24 mb-5">
                  <div className="absolute inset-0 rounded-full bg-success/30 blur-2xl animate-glow-pulse" />
                  <div className="relative w-full h-full rounded-full bg-success grid place-items-center shadow-elegant">
                    <CheckCircle2 className="w-12 h-12 text-success-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold">Lokasi Aktif</h3>
                <p className="mt-2 text-sm text-muted-foreground">Menampilkan makanan terdekat di sekitar <span className="font-semibold text-foreground">{detectedCity}</span>.</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-xs"><Building2 className="w-3.5 h-3.5 text-primary" /> Radius {radius} km • {items.length} hasil</div>
                <button onClick={() => setLocModal("closed")} className="mt-6 w-full py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant">Lihat Hasil</button>
              </div>
            )}

            {locModal === "denied" && (
              <div className="p-7 text-center">
                <div className="mx-auto w-20 h-20 mb-4 rounded-full bg-destructive/10 grid place-items-center">
                  <X className="w-10 h-10 text-destructive" />
                </div>
                <h3 className="font-display text-xl font-bold">Akses Lokasi Ditolak</h3>
                <p className="mt-2 text-sm text-muted-foreground">Tidak masalah — Anda tetap bisa mencari makanan menggunakan pilihan kota di bawah.</p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button onClick={() => setLocModal("closed")} className="py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors">Tutup</button>
                  <button onClick={useCityFallback} className="py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant">Pakai Kota</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function labelWeight(p: string) {
  if (p.includes("Prioritas")) return 3;
  if (p.includes("Segera")) return 2;
  return 1;
}
