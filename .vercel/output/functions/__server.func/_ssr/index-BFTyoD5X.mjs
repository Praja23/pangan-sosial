import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter, R as Reveal } from "./site-nav-BKggc9Q9.mjs";
import "../_libs/sonner.mjs";
import { l as Sparkles, M as MapPin, A as ArrowRight, m as Star, d as Leaf, n as Users, o as Heart, p as ChevronDown, H as Hotel, e as ChefHat, G as GraduationCap, f as Store, q as Utensils, B as Building2, C as Clock, c as CircleCheck, r as ChevronRight, s as Flame, Z as Zap, T as Trophy, b as ShieldCheck, t as Activity, u as Package, Q as Quote, v as Minus, w as Plus, S as Search } from "../_libs/lucide-react.mjs";
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
import "./router-B0zevO1-.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const heroImg = "/assets/hero-illustration-BsEeUsAk.png";
function Marquee({ children, className = "", fade = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative overflow-hidden ${className}`,
      style: fade ? {
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
      } : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-max animate-marquee gap-12 pr-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-12 shrink-0", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-12 shrink-0", "aria-hidden": true, children })
      ] })
    }
  );
}
function useCountUp(target, duration = 2e3, start = false) {
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}
function useInView() {
  const ref = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), {
      threshold: 0.2
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
const HERO_WORDS = ["Makanan", "Kebaikan", "Surplus", "Berkah"];
function useWordCycle(words, interval = 2400) {
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return words[i];
}
function Hero() {
  const word = useWordCycle(HERO_WORDS);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
      background: "var(--gradient-mesh)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 -z-10 w-[520px] h-[520px] opacity-30 animate-blob", style: {
      background: "var(--gradient-warm)",
      filter: "blur(60px)"
    }, "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -left-20 -z-10 w-[420px] h-[420px] opacity-20 animate-blob", style: {
      background: "var(--gradient-primary)",
      filter: "blur(70px)",
      animationDelay: "-9s"
    }, "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium mb-6 hover-lift", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative grid place-items-center w-4 h-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-primary/20 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "relative w-3.5 h-3.5 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Platform Food Rescue Nasional #1 Indonesia" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight", children: [
          "Selamatkan",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-gradient animate-fade-up", children: word }, word),
          ",",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Bantu Sesama."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed", children: "PanganPeduli menghubungkan makanan surplus dari hotel, restoran, UMKM, dan Program MBG kepada masyarakat agar tidak terbuang sia-sia. Satu porsi, satu kepedulian." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cari", className: "group btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[image:var(--gradient-warm)] animate-gradient text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            "Cari Makanan Terdekat",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: {
            mode: "register"
          }, className: "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card font-semibold hover-lift", children: [
            "Daftar Sebagai Mitra",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-6 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-3", children: [
            [{
              src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop",
              alt: "Hotel Grand Mulia"
            }, {
              src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=120&h=120&fit=crop",
              alt: "Warung Nasi Berkah"
            }, {
              src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=120&h=120&fit=crop",
              alt: "Sate Khas Senayan"
            }, {
              src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&h=120&fit=crop",
              alt: "SMP Negeri 5 Bandung"
            }].map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background overflow-hidden shadow-soft hover:scale-110 hover:z-10 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.src, alt: p.alt, className: "w-full h-full object-cover", loading: "lazy" }) }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background bg-[image:var(--gradient-warm)] grid place-items-center text-[10px] font-bold text-primary-foreground shadow-soft", children: "+12k" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-amber-500", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "12.847+" }),
              " mitra aktif"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative animate-scale-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square max-w-xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-[3rem] bg-[image:var(--gradient-warm)] opacity-20 blur-3xl animate-glow-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Ilustrasi distribusi makanan PanganPeduli", className: "relative w-full h-full object-contain animate-float" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatCard, { className: "absolute top-8 -left-2 sm:left-4 animate-float-slow", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-success" }), title: "2,4 kg", subtitle: "CO₂ diselamatkan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatCard, { className: "absolute bottom-16 -right-2 sm:right-4", style: {
          animation: "float 7s ease-in-out infinite"
        }, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }), title: "127 orang", subtitle: "Terbantu hari ini" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatCard, { className: "absolute bottom-0 left-8", style: {
          animation: "float 5s ease-in-out infinite"
        }, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-destructive" }), title: "42 porsi", subtitle: "Tersalurkan hari ini" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#solusi", className: "group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Gulir untuk menjelajah" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 animate-bounce-soft" })
    ] }) })
  ] });
}
function FloatCard({
  icon,
  title,
  subtitle,
  className = "",
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass-card rounded-2xl px-4 py-3 shadow-float flex items-center gap-3 min-w-[160px] ${className}`, style, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 grid place-items-center rounded-xl bg-secondary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: subtitle })
    ] })
  ] });
}
function Stats() {
  const [ref, inView] = useInView();
  const stats = [{
    value: 248750,
    label: "Porsi Diselamatkan",
    suffix: "+",
    icon: Utensils
  }, {
    value: 12847,
    label: "Mitra Aktif",
    suffix: "",
    icon: Building2
  }, {
    value: 89320,
    label: "Pengguna Terdaftar",
    suffix: "",
    icon: Users
  }, {
    value: 64,
    label: "Ton Food Waste Dicegah",
    suffix: "+",
    icon: Leaf
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "py-16 lg:py-24 border-y border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Real-time Impact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl sm:text-4xl font-bold", children: "Dampak yang Sedang Kita Bangun" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, inView }, i)) })
  ] }) });
}
function StatCard({
  value,
  label,
  suffix,
  icon: Icon,
  inView
}) {
  const v = useCountUp(value, 2200, inView);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 hover-lift", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-primary mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl sm:text-4xl font-bold tracking-tight", children: [
      v.toLocaleString("id-ID"),
      suffix
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: label })
  ] });
}
function HowItWorks() {
  const steps = [{
    icon: ChefHat,
    title: "Mitra Upload Makanan",
    desc: "Hotel, restoran, UMKM, dan MBG mengunggah makanan surplus dengan lokasi & masa berlaku.",
    color: "bg-primary/10 text-primary"
  }, {
    icon: MapPin,
    title: "User Temukan Terdekat",
    desc: "Sistem geolocation cerdas memprioritaskan makanan dalam radius pilihan Anda.",
    color: "bg-success/10 text-success"
  }, {
    icon: Clock,
    title: "Reservasi 60 Menit",
    desc: "Timer otomatis menjaga stok terkunci. Aman, transparan, fair untuk semua.",
    color: "bg-amber-500/10 text-amber-600"
  }, {
    icon: CircleCheck,
    title: "Ambil & Konfirmasi",
    desc: "Pengambilan dikonfirmasi mitra. Makanan terselamatkan, dampak nyata tercatat.",
    color: "bg-emerald-500/10 text-emerald-600"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "solusi", className: "py-20 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Bagaimana Cara Kerjanya" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-4xl sm:text-5xl font-bold", children: [
        "Dari Surplus Menjadi ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Berkah" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Empat langkah sederhana untuk mengubah makanan yang akan terbuang menjadi solusi sosial nyata." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative glass-card rounded-2xl p-6 hover-lift tilt-card h-full magnetic-glow", onMouseMove: (e) => {
      const t = e.currentTarget;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl grid place-items-center ${s.color} mb-4`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-muted-foreground mb-2", children: [
        "STEP ",
        String(i + 1).padStart(2, "0")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-2", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s.desc }),
      i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-border" })
    ] }) }, i)) })
  ] }) });
}
function Categories() {
  const cats = [{
    to: "/kategori/mbg",
    icon: GraduationCap,
    title: "Program MBG",
    desc: "Makanan Bergizi Gratis dari sekolah & instansi pemerintah.",
    count: "1,240+",
    radius: "Nasional",
    className: "lg:col-span-2 lg:row-span-2",
    gradient: "from-primary/20 to-primary/5"
  }, {
    to: "/kategori/hotel",
    icon: Hotel,
    title: "Hotel",
    desc: "Surplus dari hotel berbintang.",
    count: "320+",
    radius: "Kota besar",
    gradient: "from-amber-500/20 to-amber-500/5"
  }, {
    to: "/kategori/restoran",
    icon: ChefHat,
    title: "Restoran & Cafe",
    desc: "Hidangan segar setiap hari.",
    count: "2,840+",
    radius: "Urban",
    gradient: "from-emerald-500/20 to-emerald-500/5"
  }, {
    to: "/kategori/umkm",
    icon: Store,
    title: "UMKM & Warung",
    desc: "Dukungan untuk usaha lokal di sekitar Anda.",
    count: "8,447+",
    radius: "Lokal",
    className: "lg:col-span-2",
    gradient: "from-rose-500/20 to-rose-500/5"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "kategori", className: "py-20 lg:py-32 bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Kategori Mitra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-4xl sm:text-5xl font-bold", children: [
        "Ekosistem yang ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Terhubung" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Klik kategori untuk melihat daftar mitra dan menu surplus yang tersedia." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-6 auto-rows-[200px]", children: cats.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: c.to, className: `group glass-card rounded-3xl p-6 sm:p-8 hover-lift relative overflow-hidden ${c.className || ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-background grid place-items-center shadow-soft mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl sm:text-2xl", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: c.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-6 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-foreground", children: c.count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: "mitra" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-primary font-semibold group-hover:translate-x-1 transition-transform", children: [
            "Lihat ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] })
        ] })
      ] })
    ] }, i)) })
  ] }) });
}
function AIScore() {
  const [ref, inView] = useInView();
  const score = useCountUp(87, 2e3, inView);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "ai-score", ref, className: "py-20 lg:py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
      background: "var(--gradient-mesh)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
          "FITUR UNGGULAN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl sm:text-5xl font-bold leading-tight", children: [
          "AI Food Rescue ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Score™" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground leading-relaxed", children: "Sistem penilaian cerdas yang menghitung tingkat kontribusi penyelamatan makanan dan dampak sosial dari setiap unggahan, pengguna, dan mitra — secara real-time dan transparan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: [{
          icon: Flame,
          label: "Prioritas Tinggi",
          desc: "Makanan mendekati masa kedaluwarsa"
        }, {
          icon: Zap,
          label: "Segera Diambil",
          desc: "Reservasi cepat untuk hasil maksimal"
        }, {
          icon: Trophy,
          label: "Dampak Sosial Tinggi",
          desc: "Berkontribusi pada keluarga yang membutuhkan"
        }].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4 rounded-2xl glass-card hover-lift", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: b.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: b.desc })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-[2.5rem] p-8 shadow-float", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-muted-foreground", children: "RESCUE SCORE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }),
            " Sustainability Hero"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square max-w-[280px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 200", className: "w-full h-full -rotate-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "85", stroke: "currentColor", className: "text-secondary", strokeWidth: "14", fill: "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "85", stroke: "url(#grad)", strokeWidth: "14", fill: "none", strokeLinecap: "round", strokeDasharray: 2 * Math.PI * 85, strokeDashoffset: 2 * Math.PI * 85 * (1 - score / 100), style: {
              transition: "stroke-dashoffset 0.1s linear"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "grad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.58 0.16 45)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 60)" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl font-bold text-gradient", children: score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "dari 100" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: "5kg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Dicegah" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: "12kg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "CO₂ saved" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: "38" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Porsi" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function Features() {
  const items = [{
    icon: MapPin,
    title: "Smart Radius System",
    desc: "Geolocation otomatis dengan slider radius 1-20 km."
  }, {
    icon: Clock,
    title: "60-Minute Timer",
    desc: "Reservasi terkunci, stok kembali otomatis jika expired."
  }, {
    icon: ShieldCheck,
    title: "Verifikasi Mitra",
    desc: "Validasi NPWP, NIB, SK Program oleh tim admin."
  }, {
    icon: Activity,
    title: "Analytics Dashboard",
    desc: "Heatmap distribusi, growth chart, impact tracker."
  }, {
    icon: Trophy,
    title: "Leaderboard Mitra",
    desc: "Ranking nasional berdasarkan kontribusi."
  }, {
    icon: Package,
    title: "Auto Cleanup",
    desc: "Makanan otomatis terhapus sesuai masa berlaku."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "impact", className: "pt-20 pb-10 lg:pt-28 lg:pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Fitur Lengkap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-4xl sm:text-5xl font-bold", children: [
        "Semua yang Dibutuhkan untuk ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Food Rescue" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass-card rounded-2xl p-6 hover-lift tilt-card magnetic-glow h-full", onMouseMove: (e) => {
      const t = e.currentTarget;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center mb-4 shadow-elegant group-hover:scale-110 group-hover:rotate-6 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold mb-2", children: it.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: it.desc })
    ] }) }, i)) })
  ] }) });
}
function CTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "mitra", className: "pt-4 pb-20 lg:pt-6 lg:pb-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[2.5rem] overflow-hidden p-10 sm:p-14 lg:p-20 text-center flex flex-col items-center", style: {
    background: "var(--gradient-warm)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-0 opacity-30 pointer-events-none", style: {
      background: "var(--gradient-mesh)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-10 h-10 text-primary-foreground/90 mb-4 animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-3xl leading-tight", children: "Jadi bagian dari gerakan food rescue nasional." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-primary-foreground/90 max-w-xl", children: "Mulai selamatkan makanan hari ini. Setiap porsi yang kita selamatkan adalah satu langkah menuju Indonesia tanpa food waste." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cari", className: "inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-background text-foreground font-semibold shadow-float hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
          " Cari Makanan Sekarang"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          mode: "register"
        }, className: "px-7 py-4 rounded-xl bg-primary-foreground/15 backdrop-blur border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/25 transition-colors", children: "Daftar Sebagai Mitra" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-2 text-xs", children: [{
        to: "/kategori/mbg",
        label: "Program MBG"
      }, {
        to: "/kategori/hotel",
        label: "Hotel"
      }, {
        to: "/kategori/umkm",
        label: "UMKM"
      }, {
        to: "/kategori/restoran",
        label: "Restoran"
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.to, className: "px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-primary-foreground hover:bg-primary-foreground/25 transition", children: c.label }, c.to)) })
    ] })
  ] }) }) });
}
function Partners() {
  const partners = [{
    name: "Hotel Grand Mulia",
    icon: Hotel
  }, {
    name: "Sate Khas Senayan",
    icon: ChefHat
  }, {
    name: "Program MBG Bandung",
    icon: GraduationCap
  }, {
    name: "Warung Berkah",
    icon: Store
  }, {
    name: "Bakmi Karet Krekot",
    icon: Utensils
  }, {
    name: "Hotel Santika",
    icon: Hotel
  }, {
    name: "SD Negeri 12",
    icon: GraduationCap
  }, {
    name: "Coffee Brewery",
    icon: ChefHat
  }, {
    name: "UMKM Jaya",
    icon: Store
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 border-y border-border bg-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8", children: "Dipercaya oleh ribuan mitra di seluruh Indonesia" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, { children: partners.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-lg whitespace-nowrap", children: p.name })
    ] }, i)) })
  ] }) });
}
function Testimonials() {
  const items = [{
    quote: "PanganPeduli mengubah surplus hotel kami menjadi kebaikan harian. Dashboardnya transparan dan timer reservasinya adil.",
    name: "Rangga Pratama",
    role: "GM, Hotel Grand Mulia",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop"
  }, {
    quote: "Untuk warung kami yang kecil, sistem ini bantu mengurangi limbah sekaligus mengenalkan brand. Daftarnya mudah sekali.",
    name: "Ibu Sari Wulandari",
    role: "Pemilik Warung Berkah",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop"
  }, {
    quote: "Program MBG kami selalu menyisakan porsi karena absensi murid. Sekarang setiap porsi sampai ke yang membutuhkan.",
    name: "Pak Bagus Hidayat",
    role: "Koordinator MBG, Bandung",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Cerita Mitra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-4xl sm:text-5xl font-bold", children: [
        "Suara dari yang ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "menyelamatkan" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "glass-card rounded-3xl p-7 h-full flex flex-col hover-lift tilt-card relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-5 right-5 w-10 h-10 text-primary/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-[15px] leading-relaxed text-foreground/90", children: [
        '"',
        it.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 pt-5 border-t border-border flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.img, alt: it.name, loading: "lazy", className: "w-11 h-11 rounded-full object-cover ring-2 ring-background shadow-soft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: it.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: it.role })
        ] })
      ] })
    ] }) }, i)) })
  ] }) });
}
function FAQ() {
  const items = [{
    q: "Apakah platform ini gratis untuk mitra?",
    a: "Ya. Pendaftaran dan distribusi makanan surplus melalui PanganPeduli tidak dipungut biaya. Misi kami menyelamatkan makanan, bukan mengambil margin."
  }, {
    q: "Bagaimana saya tahu makanan masih layak konsumsi?",
    a: "Setiap unggahan mitra mencantumkan masa berlaku, foto, dan kategori. AI Food Rescue Score™ memprioritaskan stok yang masih dalam kondisi optimal."
  }, {
    q: "Berapa lama waktu reservasi?",
    a: "Setiap reservasi terkunci selama 60 menit. Jika tidak diambil, stok kembali tersedia untuk pengguna lain — adil dan transparan."
  }, {
    q: "Apa saja persyaratan jadi mitra?",
    a: "Mitra cukup melengkapi NPWP/NIB/SK Program (untuk MBG) lalu menunggu verifikasi singkat oleh tim admin PanganPeduli."
  }, {
    q: "Apakah ada dashboard untuk melihat dampak?",
    a: "Tentu. Dashboard menampilkan jumlah porsi diselamatkan, CO₂ yang dicegah, leaderboard nasional, dan grafik growth secara real-time."
  }];
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl sm:text-5xl font-bold", children: "Pertanyaan yang sering ditanyakan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Belum menemukan jawaban? Hubungi tim mitra kami." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((it, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass-card rounded-2xl overflow-hidden transition-shadow ${isOpen ? "shadow-elegant" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-accent/40 transition-colors", "aria-expanded": isOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold", children: it.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 grid place-items-center w-8 h-8 rounded-full bg-[image:var(--gradient-warm)] text-primary-foreground transition-transform duration-300", style: {
            transform: isOpen ? "rotate(180deg)" : "rotate(0)"
          }, children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid transition-all duration-500", style: {
          gridTemplateRows: isOpen ? "1fr" : "0fr"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-5 text-sm text-muted-foreground leading-relaxed", children: it.a }) }) })
      ] }) }, i);
    }) })
  ] }) });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Partners, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AIScore, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Landing as component
};
