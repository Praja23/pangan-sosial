import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { C as CATEGORY_LABEL, f as formatCountdown } from "./router-B0zevO1-.mjs";
import { u as useDemoStore, a as useTick, C as CITY_COORDS, L as LISTINGS, P as PARTNERS, d as distanceKm, g as getRemaining, f as formatIDR } from "./demo-data-X3DTJBeN.mjs";
import "../_libs/sonner.mjs";
import { S as Search, L as LoaderCircle, a as Locate, M as MapPin, C as Clock, F as Funnel, X, N as Navigation, b as ShieldCheck, c as CircleCheck, B as Building2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const CITIES = Object.keys(CITY_COORDS);
function SearchPage() {
  useDemoStore();
  useTick(1e3);
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("priority");
  const [city, setCity] = reactExports.useState("Jakarta");
  const [radius, setRadius] = reactExports.useState(20);
  const [locating, setLocating] = reactExports.useState(false);
  const [coords, setCoords] = reactExports.useState(CITY_COORDS.Jakarta);
  const [locModal, setLocModal] = reactExports.useState("closed");
  const [detectedCity, setDetectedCity] = reactExports.useState(null);
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
    navigator.geolocation.getCurrentPosition((pos) => {
      const c = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setCoords(c);
      let nearest = city, best = Infinity;
      Object.entries(CITY_COORDS).forEach(([name, cc]) => {
        const d = distanceKm(c, cc);
        if (d < best) {
          best = d;
          nearest = name;
        }
      });
      setDetectedCity(nearest);
      setSort("distance");
      setLocModal("success");
      setLocating(false);
    }, () => {
      setLocModal("denied");
      setLocating(false);
    }, {
      timeout: 6e3
    });
  };
  const useCityFallback = () => {
    setCoords(CITY_COORDS[city]);
    setDetectedCity(city);
    setLocModal("success");
  };
  const items = reactExports.useMemo(() => {
    const base = LISTINGS.map((l) => {
      const partner = PARTNERS.find((p) => p.id === l.partner_id);
      const dist = partner ? distanceKm(coords, {
        lat: partner.lat,
        lng: partner.lng
      }) : 999;
      return {
        l,
        partner,
        dist,
        remaining: getRemaining(l.id)
      };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl p-6 sm:p-10 relative overflow-hidden mb-6", style: {
        background: "var(--gradient-mesh)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold", children: "Cari Makanan Surplus Terdekat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Aktifkan lokasi & atur radius untuk menemukan makanan layak konsumsi di sekitar Anda." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid lg:grid-cols-[1fr_auto_auto] gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Cari menu, mitra, atau kota…", className: "w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: cat, onChange: (e) => setCat(e.target.value), className: "px-4 py-3 rounded-xl bg-background border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Semua Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mbg", children: "MBG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hotel", children: "Hotel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "umkm", children: "UMKM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "restoran", children: "Restoran" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "px-4 py-3 rounded-xl bg-background border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "priority", children: "Prioritas Tertinggi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expiry", children: "Segera Habis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "distance", children: "Jarak Terdekat" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-[auto_1fr_auto] gap-3 items-center glass-card rounded-2xl p-3 bg-background/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openLocationFlow, disabled: locating, className: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-shadow disabled:opacity-60", children: [
            locating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Locate, { className: "w-4 h-4" }),
            detectedCity ? `Lokasi: ${detectedCity}` : locating ? "Mendeteksi…" : "Aktifkan Lokasi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => {
              setCity(e.target.value);
              setCoords(CITY_COORDS[e.target.value]);
            }, className: "px-3 py-2 rounded-lg border border-border bg-background text-sm", children: CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 1, max: 50, value: radius, onChange: (e) => setRadius(+e.target.value), className: "flex-1 accent-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold whitespace-nowrap w-20 text-right", children: [
                radius,
                " km"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground sm:text-right", children: [
            items.length,
            " hasil dalam radius"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: items.map(({
        l,
        partner,
        dist,
        remaining
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listing/$id", params: {
        id: l.id
      }, className: "group glass-card rounded-2xl overflow-hidden hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] bg-secondary overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image_url, alt: l.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 px-2 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-semibold", children: l.priority_label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold", children: formatIDR(l.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase", children: CATEGORY_LABEL[l.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm leading-tight mt-0.5 line-clamp-2", children: l.title }),
          partner && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: [
            partner.name,
            " • ",
            partner.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              remaining,
              " porsi"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              " ",
              formatCountdown(l.expires_at)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[11px] text-primary font-semibold inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
            " ",
            dist.toFixed(1),
            " km"
          ] })
        ] })
      ] }, l.id)) }),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-12 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
        "Tidak ada makanan dalam radius ",
        radius,
        " km. Coba perluas radius atau ubah filter."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    locModal !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm", onClick: () => setLocModal("closed") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md glass-card rounded-3xl shadow-float overflow-hidden animate-scale-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocModal("closed"), className: "absolute top-4 right-4 z-10 w-8 h-8 grid place-items-center rounded-full hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) }),
        locModal === "consent" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-24 h-24 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[image:var(--gradient-warm)] opacity-30 blur-2xl animate-glow-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full rounded-full bg-[image:var(--gradient-warm)] grid place-items-center shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-10 h-10 text-primary-foreground" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Izinkan Akses Lokasi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "Kami butuh lokasi Anda untuk menampilkan makanan surplus ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "paling dekat" }),
            " & menghemat waktu pengambilan."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-2 text-left text-xs", children: [{
            i: ShieldCheck,
            t: "Lokasi hanya dipakai di perangkat Anda — tidak disimpan di server."
          }, {
            i: MapPin,
            t: "Kami urutkan hasil dari jarak terdekat dalam radius pilihan Anda."
          }, {
            i: CircleCheck,
            t: "Bisa dimatikan kapan saja melalui pengaturan browser."
          }].map(({
            i: Icon,
            t
          }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start p-2.5 rounded-xl bg-secondary/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t })
          ] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: useCityFallback, className: "py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors", children: "Pakai kota saja" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: runDetect, className: "py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-shadow inline-flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Locate, { className: "w-4 h-4" }),
              " Izinkan"
            ] })
          ] })
        ] }),
        locModal === "detecting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-28 h-28 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full bg-primary/30 animate-ping", style: {
              animationDelay: "0.3s"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-4 rounded-full bg-primary/40 animate-ping", style: {
              animationDelay: "0.6s"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full rounded-full bg-[image:var(--gradient-warm)] grid place-items-center shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 text-primary-foreground" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Mendeteksi lokasi Anda…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Mohon izinkan akses lokasi di pop-up browser." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-2 text-xs text-primary font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            " Menyinkronkan GPS"
          ] })
        ] }),
        locModal === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-24 h-24 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-success/30 blur-2xl animate-glow-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full rounded-full bg-success grid place-items-center shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-success-foreground" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Lokasi Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "Menampilkan makanan terdekat di sekitar ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: detectedCity }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-primary" }),
            " Radius ",
            radius,
            " km • ",
            items.length,
            " hasil"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocModal("closed"), className: "mt-6 w-full py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant", children: "Lihat Hasil" })
        ] }),
        locModal === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-20 h-20 mb-4 rounded-full bg-destructive/10 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-10 h-10 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Akses Lokasi Ditolak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Tidak masalah — Anda tetap bisa mencari makanan menggunakan pilihan kota di bawah." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocModal("closed"), className: "py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition-colors", children: "Tutup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: useCityFallback, className: "py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground text-sm font-semibold shadow-elegant", children: "Pakai Kota" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function labelWeight(p) {
  if (p.includes("Prioritas")) return 3;
  if (p.includes("Segera")) return 2;
  return 1;
}
export {
  SearchPage as component
};
