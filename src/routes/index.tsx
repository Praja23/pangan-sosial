import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, MapPin, Clock, Sparkles, Leaf, Heart, TrendingUp,
  ShieldCheck, Utensils, Building2, Store, GraduationCap, Hotel,
  ChefHat, Package, Users, Activity, Trophy, Flame, Zap, Star,
  CheckCircle2, ChevronRight, Search, ChevronDown, Plus, Minus, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { IndonesiaMapSection } from "@/components/indonesia-map";
import { ShieldAlert } from "lucide-react";

import { Marquee } from "@/components/marquee";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PanganPeduli — Selamatkan Makanan, Bantu Sesama" },
      { name: "description", content: "Platform distribusi makanan surplus nasional yang menghubungkan hotel, restoran, UMKM, dan Program MBG dengan masyarakat yang membutuhkan." },
      { property: "og:title", content: "PanganPeduli — Satu Porsi, Satu Kepedulian" },
      { property: "og:description", content: "Selamatkan makanan, bantu sesama. Bergabunglah dengan gerakan food rescue nasional." },
    ],
  }),
  component: Landing,
});

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

// Nav moved to <SiteNav /> shared component


const HERO_WORDS = ["Makanan", "Kebaikan", "Surplus", "Berkah"];
function useWordCycle(words: string[], interval = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return words[i];
}

function Hero() {
  const word = useWordCycle(HERO_WORDS);
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
      <div
        className="absolute -top-24 -right-24 -z-10 w-[520px] h-[520px] opacity-30 animate-blob"
        style={{ background: "var(--gradient-warm)", filter: "blur(60px)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-20 -z-10 w-[420px] h-[420px] opacity-20 animate-blob"
        style={{ background: "var(--gradient-primary)", filter: "blur(70px)", animationDelay: "-9s" }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium mb-6 hover-lift">
            <span className="relative grid place-items-center w-4 h-4">
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <Sparkles className="relative w-3.5 h-3.5 text-primary" />
            </span>
            <span>Platform Food Rescue Nasional #1 Indonesia</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Selamatkan{" "}
            <span key={word} className="inline-block text-gradient animate-fade-up">
              {word}
            </span>
            ,<br />
            Bantu Sesama.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            PanganPeduli menghubungkan makanan surplus dari hotel, restoran, UMKM, dan Program MBG kepada masyarakat
            agar tidak terbuang sia-sia. Satu porsi, satu kepedulian.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cari"
              className="group btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[image:var(--gradient-warm)] animate-gradient text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              <MapPin className="w-4 h-4" />
              Cari Makanan Terdekat
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card font-semibold hover-lift"
            >
              Daftar Sebagai Mitra
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-3">
              {[
                { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop", alt: "Hotel Grand Mulia" },
                { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=120&h=120&fit=crop", alt: "Warung Nasi Berkah" },
                { src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=120&h=120&fit=crop", alt: "Sate Khas Senayan" },
                { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&h=120&fit=crop", alt: "SMP Negeri 5 Bandung" },
              ].map((p, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden shadow-soft hover:scale-110 hover:z-10 transition-transform">
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-[image:var(--gradient-warm)] grid place-items-center text-[10px] font-bold text-primary-foreground shadow-soft">
                +12k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="mt-0.5"><span className="font-semibold text-foreground">12.847+</span> mitra aktif</p>
            </div>
          </div>
        </div>
        <div className="relative animate-scale-in">
          <div className="relative aspect-square max-w-xl mx-auto">
            <div className="absolute inset-0 rounded-[3rem] bg-[image:var(--gradient-warm)] opacity-20 blur-3xl animate-glow-pulse" />
            <img src={heroImg} alt="Ilustrasi distribusi makanan PanganPeduli" className="relative w-full h-full object-contain animate-float" />
            <FloatCard className="absolute top-8 -left-2 sm:left-4 animate-float-slow" icon={<Leaf className="w-4 h-4 text-success" />} title="2,4 kg" subtitle="CO₂ diselamatkan" />
            <FloatCard className="absolute bottom-16 -right-2 sm:right-4" style={{ animation: "float 7s ease-in-out infinite" }} icon={<Users className="w-4 h-4 text-primary" />} title="127 orang" subtitle="Terbantu hari ini" />
            <FloatCard className="absolute bottom-0 left-8" style={{ animation: "float 5s ease-in-out infinite" }} icon={<Heart className="w-4 h-4 text-destructive" />} title="42 porsi" subtitle="Tersalurkan hari ini" />
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <a
          href="#solusi"
          className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Gulir untuk menjelajah</span>
          <ChevronDown className="w-4 h-4 animate-bounce-soft" />
        </a>
      </div>
    </section>
  );
}


function FloatCard({ icon, title, subtitle, className = "", style }: { icon: React.ReactNode; title: string; subtitle: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`glass-card rounded-2xl px-4 py-3 shadow-float flex items-center gap-3 min-w-[160px] ${className}`} style={style}>
      <div className="w-9 h-9 grid place-items-center rounded-xl bg-secondary">{icon}</div>
      <div>
        <div className="font-display font-bold text-sm">{title}</div>
        <div className="text-[11px] text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}

function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const stats = [
    { value: 248_750, label: "Porsi Diselamatkan", suffix: "+", icon: Utensils },
    { value: 12_847, label: "Mitra Aktif", suffix: "", icon: Building2 },
    { value: 89_320, label: "Pengguna Terdaftar", suffix: "", icon: Users },
    { value: 64, label: "Ton Food Waste Dicegah", suffix: "+", icon: Leaf },
  ];
  return (
    <section ref={ref} className="py-16 lg:py-24 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Real-time Impact</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Dampak yang Sedang Kita Bangun</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => <StatCard key={i} {...s} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, suffix, icon: Icon, inView }: { value: number; label: string; suffix: string; icon: any; inView: boolean }) {
  const v = useCountUp(value, 2200, inView);
  return (
    <div className="glass-card rounded-2xl p-6 hover-lift">
      <Icon className="w-7 h-7 text-primary mb-4" />
      <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
        {v.toLocaleString("id-ID")}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: ChefHat, title: "Mitra Upload Makanan", desc: "Hotel, restoran, UMKM, dan MBG mengunggah makanan surplus dengan lokasi & masa berlaku.", color: "bg-primary/10 text-primary" },
    { icon: MapPin, title: "User Temukan Terdekat", desc: "Sistem geolocation cerdas memprioritaskan makanan dalam radius pilihan Anda.", color: "bg-success/10 text-success" },
    { icon: Clock, title: "Reservasi 60 Menit", desc: "Timer otomatis menjaga stok terkunci. Aman, transparan, fair untuk semua.", color: "bg-amber-500/10 text-amber-600" },
    { icon: CheckCircle2, title: "Ambil & Konfirmasi", desc: "Pengambilan dikonfirmasi mitra. Makanan terselamatkan, dampak nyata tercatat.", color: "bg-emerald-500/10 text-emerald-600" },
  ];
  return (
    <section id="solusi" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Bagaimana Cara Kerjanya</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Dari Surplus Menjadi <span className="text-gradient">Berkah</span>.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Empat langkah sederhana untuk mengubah makanan yang akan terbuang menjadi solusi sosial nyata.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative glass-card rounded-2xl p-6 hover-lift tilt-card h-full magnetic-glow"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  const r = t.getBoundingClientRect();
                  t.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  t.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className={`w-12 h-12 rounded-xl grid place-items-center ${s.color} mb-4`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">STEP {String(i+1).padStart(2,"0")}</div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < 3 && <ChevronRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-border" />}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { to: "/kategori/mbg", icon: GraduationCap, title: "Program MBG", desc: "Makanan Bergizi Gratis dari sekolah & instansi pemerintah.", count: "1,240+", radius: "Nasional", className: "lg:col-span-2 lg:row-span-2", gradient: "from-primary/20 to-primary/5" },
    { to: "/kategori/hotel", icon: Hotel, title: "Hotel", desc: "Surplus dari hotel berbintang.", count: "320+", radius: "Kota besar", gradient: "from-amber-500/20 to-amber-500/5" },
    { to: "/kategori/restoran", icon: ChefHat, title: "Restoran & Cafe", desc: "Hidangan segar setiap hari.", count: "2,840+", radius: "Urban", gradient: "from-emerald-500/20 to-emerald-500/5" },
    { to: "/kategori/umkm", icon: Store, title: "UMKM & Warung", desc: "Dukungan untuk usaha lokal di sekitar Anda.", count: "8,447+", radius: "Lokal", className: "lg:col-span-2", gradient: "from-rose-500/20 to-rose-500/5" },
  ] as Array<{ to: string; icon: any; title: string; desc: string; count: string; radius: string; className?: string; gradient: string }>;
  return (
    <section id="kategori" className="py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Kategori Mitra</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Ekosistem yang <span className="text-gradient">Terhubung</span></h2>
          <p className="mt-3 text-muted-foreground">Klik kategori untuk melihat daftar mitra dan menu surplus yang tersedia.</p>
        </div>
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-6 auto-rows-[200px]">
          {cats.map((c, i) => (
            <Link key={i} to={c.to} className={`group glass-card rounded-3xl p-6 sm:p-8 hover-lift relative overflow-hidden ${c.className || ""}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60`} />
              <div className="relative h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-background grid place-items-center shadow-soft mb-4">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">{c.desc}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                  <div><span className="font-display font-bold text-2xl text-foreground">{c.count}</span><span className="text-muted-foreground ml-1">mitra</span></div>
                  <div className="flex items-center gap-1 text-primary font-semibold group-hover:translate-x-1 transition-transform">Lihat <ArrowRight className="w-3 h-3" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIScore() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const score = useCountUp(87, 2000, inView);
  return (
    <section id="ai-score" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            FITUR UNGGULAN
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            AI Food Rescue <span className="text-gradient">Score™</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Sistem penilaian cerdas yang menghitung tingkat kontribusi penyelamatan makanan dan dampak sosial dari setiap unggahan,
            pengguna, dan mitra — secara real-time dan transparan.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: Flame, label: "Prioritas Tinggi", desc: "Makanan mendekati masa kedaluwarsa" },
              { icon: Zap, label: "Segera Diambil", desc: "Reservasi cepat untuk hasil maksimal" },
              { icon: Trophy, label: "Dampak Sosial Tinggi", desc: "Berkontribusi pada keluarga yang membutuhkan" },
            ].map((b,i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl glass-card hover-lift">
                <div className="w-10 h-10 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{b.label}</div>
                  <div className="text-sm text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="glass-card rounded-[2.5rem] p-8 shadow-float">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono text-muted-foreground">RESCUE SCORE</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                <Trophy className="w-3 h-3" /> Sustainability Hero
              </div>
            </div>
            <div className="relative aspect-square max-w-[280px] mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="85" stroke="currentColor" className="text-secondary" strokeWidth="14" fill="none" />
                <circle cx="100" cy="100" r="85" stroke="url(#grad)" strokeWidth="14" fill="none" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 85}
                  strokeDashoffset={2 * Math.PI * 85 * (1 - score / 100)}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }} />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.16 45)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 60)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-6xl font-bold text-gradient">{score}</div>
                  <div className="text-xs text-muted-foreground mt-1">dari 100</div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">5kg</div><div className="text-[10px] text-muted-foreground">Dicegah</div></div>
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">12kg</div><div className="text-[10px] text-muted-foreground">CO₂ saved</div></div>
              <div className="p-3 rounded-xl bg-secondary"><div className="font-display font-bold">38</div><div className="text-[10px] text-muted-foreground">Porsi</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: MapPin,
      title: "Pencarian Berbasis Lokasi",
      desc: "Filter listing makanan berdasarkan kota & kategori mitra terdekat.",
    },
    {
      icon: Clock,
      title: "Reservasi 60 Menit",
      desc: "Slot terkunci otomatis; stok kembali jika tidak diambil tepat waktu.",
    },
    {
      icon: ShieldCheck,
      title: "Verifikasi Mitra oleh Admin",
      desc: "Admin meninjau & menyetujui mitra sebelum boleh publish listing.",
    },
    {
      icon: ShieldAlert,
      title: "Laporan Dua Arah + 3-Strike",
      desc: "User lapor mitra, mitra lapor user. 3 warning → akun otomatis suspended.",
    },
    {
      icon: Users,
      title: "Dashboard Peran",
      desc: "Tampilan berbeda untuk Penerima, Mitra/Donor, dan Admin.",
    },
    {
      icon: Package,
      title: "Riwayat Reservasi",
      desc: "Lacak status: aktif, sudah diambil, dibatalkan, atau kedaluwarsa.",
    },
  ];

  return (
    <section id="impact" className="pt-20 pb-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Fitur Lengkap</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">Semua yang Dibutuhkan untuk <span className="text-gradient">Food Rescue</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="group glass-card rounded-2xl p-6 hover-lift tilt-card magnetic-glow h-full"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  const r = t.getBoundingClientRect();
                  t.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  t.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-[image:var(--gradient-warm)] grid place-items-center mb-4 shadow-elegant group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <it.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="mitra" className="pt-4 pb-20 lg:pt-6 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-10 sm:p-14 lg:p-20 text-center flex flex-col items-center"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-primary-foreground/90 mb-4 animate-float" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-3xl leading-tight">
              Jadi bagian dari gerakan food rescue nasional.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/90 max-w-xl">
              Mulai selamatkan makanan hari ini. Setiap porsi yang kita selamatkan adalah satu langkah menuju Indonesia tanpa food waste.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/cari" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-background text-foreground font-semibold shadow-float hover:scale-105 transition-transform">
                <Search className="w-4 h-4" /> Cari Makanan Sekarang
              </Link>
              <Link to="/auth" search={{ mode: "register" }} className="px-7 py-4 rounded-xl bg-primary-foreground/15 backdrop-blur border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/25 transition-colors">
                Daftar Sebagai Mitra
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
              {[
                { to: "/kategori/mbg", label: "Program MBG" },
                { to: "/kategori/hotel", label: "Hotel" },
                { to: "/kategori/umkm", label: "UMKM" },
                { to: "/kategori/restoran", label: "Restoran" },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-primary-foreground hover:bg-primary-foreground/25 transition">{c.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Hotel Grand Mulia", icon: Hotel },
    { name: "Sate Khas Senayan", icon: ChefHat },
    { name: "Program MBG Bandung", icon: GraduationCap },
    { name: "Warung Berkah", icon: Store },
    { name: "Bakmi Karet Krekot", icon: Utensils },
    { name: "Hotel Santika", icon: Hotel },
    { name: "SD Negeri 12", icon: GraduationCap },
    { name: "Coffee Brewery", icon: ChefHat },
    { name: "UMKM Jaya", icon: Store },
  ];
  return (
    <section className="py-14 border-y border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Dipercaya oleh ribuan mitra di seluruh Indonesia
          </p>
        </Reveal>
        <Marquee>
          {partners.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <p.icon className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-lg whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "PanganPeduli mengubah surplus hotel kami menjadi kebaikan harian. Dashboardnya transparan dan timer reservasinya adil.",
      name: "Rangga Pratama",
      role: "GM, Hotel Grand Mulia",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop",
    },
    {
      quote:
        "Untuk warung kami yang kecil, sistem ini bantu mengurangi limbah sekaligus mengenalkan brand. Daftarnya mudah sekali.",
      name: "Ibu Sari Wulandari",
      role: "Pemilik Warung Berkah",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop",
    },
    {
      quote:
        "Program MBG kami selalu menyisakan porsi karena absensi murid. Sekarang setiap porsi sampai ke yang membutuhkan.",
      name: "Pak Bagus Hidayat",
      role: "Koordinator MBG, Bandung",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop",
    },
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Cerita Mitra</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">
              Suara dari yang <span className="text-gradient">menyelamatkan</span>.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 120}>
              <figure className="glass-card rounded-3xl p-7 h-full flex flex-col hover-lift tilt-card relative">
                <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/15" />
                <blockquote className="text-[15px] leading-relaxed text-foreground/90">
                  "{it.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-background shadow-soft"
                  />
                  <div>
                    <div className="font-semibold text-sm">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Apakah platform ini gratis untuk mitra?",
      a: "Ya. Pendaftaran dan distribusi makanan surplus melalui PanganPeduli tidak dipungut biaya. Misi kami menyelamatkan makanan, bukan mengambil margin.",
    },
    {
      q: "Bagaimana saya tahu makanan masih layak konsumsi?",
      a: "Setiap unggahan mitra mencantumkan masa berlaku, foto, dan kategori. AI Food Rescue Score™ memprioritaskan stok yang masih dalam kondisi optimal.",
    },
    {
      q: "Berapa lama waktu reservasi?",
      a: "Setiap reservasi terkunci selama 60 menit. Jika tidak diambil, stok kembali tersedia untuk pengguna lain — adil dan transparan.",
    },
    {
      q: "Apa saja persyaratan jadi mitra?",
      a: "Mitra cukup melengkapi NPWP/NIB/SK Program (untuk MBG) lalu menunggu verifikasi singkat oleh tim admin PanganPeduli.",
    },
    {
      q: "Apakah ada dashboard untuk melihat dampak?",
      a: "Tentu. Dashboard menampilkan jumlah porsi diselamatkan, CO₂ yang dicegah, leaderboard nasional, dan grafik growth secara real-time.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold">
              Pertanyaan yang sering ditanyakan
            </h2>
            <p className="mt-3 text-muted-foreground">Belum menemukan jawaban? Hubungi tim mitra kami.</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-shadow ${isOpen ? "shadow-elegant" : ""}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-accent/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold">{it.q}</span>
                    <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-[image:var(--gradient-warm)] text-primary-foreground transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Partners />
        <Stats />
        <IndonesiaMapSection />
        <HowItWorks />
        <Categories />
        <AIScore />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

