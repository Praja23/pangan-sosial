import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useAuth, type Role } from "@/lib/auth-context";
import { RoleHeader } from "./dashboard";
import { Users, Building2, Package, AlertTriangle, ShieldCheck, X, Check, Activity, Leaf, Trophy, Ban } from "lucide-react";
import { toast } from "sonner";
import { getReports, resolveReport as resolveReportStore, getAllWarnings, isSuspended, useReportsStore, type Report } from "@/lib/reports";

const STORAGE_KEY = "panganpeduli_demo_user";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — PanganPeduli" }] }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw redirect({ to: "/auth", search: { mode: "login" } });
    const u = JSON.parse(raw) as { role: Role };
    if (u.role !== "admin") throw redirect({ to: u.role === "penerima" ? "/dashboard" : "/donor" });
  },
  component: AdminDashboard,
});

type Pending = { id: string; org: string; category: string; city: string; license: string };

const PENDING_SEED: Pending[] = [
  { id: "p1", org: "Hotel Santika Premiere", category: "Hotel", city: "Bandung", license: "NIB-2024-00123" },
  { id: "p2", org: "Warung Padang Sederhana", category: "UMKM", city: "Padang", license: "NIB-2024-00456" },
  { id: "p3", org: "SDN Cipinang 02", category: "MBG", city: "Jakarta", license: "SK-MBG-2024-789" },
];

function AdminDashboard() {
  useReportsStore();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(PENDING_SEED);
  const reports = getReports();
  const warnings = getAllWarnings();

  const verify = (id: string, ok: boolean) => {
    setPending((arr) => arr.filter((p) => p.id !== id));
    toast.success(ok ? "Mitra diverifikasi" : "Pengajuan ditolak");
  };

  const onResolve = (r: Report, sanction: boolean) => {
    const res = resolveReportStore(r.id, sanction);
    if (!sanction) { toast.success("Laporan ditutup tanpa sanksi"); return; }
    if (res?.suspended) toast.warning(`${r.targetLabel} dikenai SUSPEND otomatis (3 warning)`);
    else toast.success(`Warning diberikan (${res?.warningCount}/3)`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RoleHeader title="Admin Console" subtitle={`Login sebagai ${user?.email} · kontrol penuh platform.`} role="Admin" onSignOut={async () => { await signOut(); navigate({ to: "/" }); }} />

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat icon={Users} label="Pengguna Terdaftar" value="89.320" tint="bg-primary/10 text-primary" />
            <Stat icon={Building2} label="Mitra Aktif" value="12.847" tint="bg-amber-500/10 text-amber-600" />
            <Stat icon={Package} label="Porsi Diselamatkan" value="248.750" tint="bg-emerald-500/10 text-emerald-600" />
            <Stat icon={Leaf} label="Food Waste Dicegah" value="64 ton" tint="bg-success/10 text-success" />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Verifikasi Mitra ({pending.length})</h2>
            <div className="glass-card rounded-2xl divide-y divide-border">
              {pending.length === 0 && <div className="p-6 text-sm text-center text-muted-foreground">Tidak ada pengajuan menunggu.</div>}
              {pending.map((p) => (
                <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{p.org}</div>
                    <div className="text-xs text-muted-foreground">{p.category} · {p.city} · {p.license}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => verify(p.id, true)} className="px-3 py-2 rounded-lg bg-success text-success-foreground text-xs font-semibold inline-flex items-center gap-1"><Check className="w-3 h-3" /> Verifikasi</button>
                    <button onClick={() => verify(p.id, false)} className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold inline-flex items-center gap-1"><X className="w-3 h-3" /> Tolak</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Laporan ({reports.filter((r) => r.status === "open").length} terbuka)</h2>
            <div className="glass-card rounded-2xl divide-y divide-border">
              {reports.length === 0 && <div className="p-6 text-sm text-center text-muted-foreground">Belum ada laporan masuk.</div>}
              {reports.map((r) => (
                <div key={r.id} className="p-4 grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">{r.targetType}</span>
                      <span className="truncate">{r.targetLabel}</span>
                      {warnings[r.target] ? (
                        isSuspended(r.target)
                          ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive inline-flex items-center gap-1"><Ban className="w-3 h-3" /> SUSPENDED</span>
                          : <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700">{warnings[r.target]}/3 warning</span>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5"><span className="font-medium text-foreground/70">{r.reason}</span> — {r.details}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">oleh {r.reporter} · {new Date(r.createdAt).toLocaleString("id-ID")}</div>
                  </div>
                  {r.status === "open" ? (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => onResolve(r, true)} className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-700 text-xs font-semibold hover:bg-amber-500/20">Beri Warning</button>
                      <button onClick={() => onResolve(r, false)} className="px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent">Tutup</button>
                    </div>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${r.status === "resolved_warning" ? "bg-amber-500/15 text-amber-700" : "bg-success/10 text-success"}`}>
                      {r.status === "resolved_warning" ? "Warning diberikan" : "Ditutup"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500" /> Leaderboard Mitra (Top 5)</h2>
            <div className="glass-card rounded-2xl divide-y divide-border">
              {[
                { rank: 1, org: "Hotel Grand Mulia Jakarta", porsi: 4820 },
                { rank: 2, org: "Bali Pearl Resort", porsi: 3940 },
                { rank: 3, org: "Catering Bunda Yanti", porsi: 2810 },
                { rank: 4, org: "Sate Khas Senayan", porsi: 2305 },
                { rank: 5, org: "SMP Negeri 5 Bandung", porsi: 1990 },
              ].map((l) => (
                <div key={l.rank} className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-lg bg-[image:var(--gradient-warm)] grid place-items-center font-display font-bold text-primary-foreground text-sm shrink-0">#{l.rank}</div>
                  <div className="flex-1 min-w-0 font-semibold truncate">{l.org}</div>
                  <div className="text-sm font-mono text-primary shrink-0">{l.porsi.toLocaleString("id-ID")} porsi</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 glass-card rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Aktivitas Real-time</h2>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground"><span className="font-mono text-primary mr-2">[live]</span> Hotel Grand Mulia mempublikasikan 15 porsi nasi box.</li>
              <li className="text-muted-foreground"><span className="font-mono text-primary mr-2">[1m]</span> user1@demo.id reservasi 3 porsi.</li>
              <li className="text-muted-foreground"><span className="font-mono text-primary mr-2">[3m]</span> SMPN 5 Bandung verifikasi disetujui.</li>
              <li className="text-muted-foreground"><span className="font-mono text-primary mr-2">[7m]</span> Warung Berkah dilaporkan oleh 2 pengguna.</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ icon: Icon, label, value, tint }: { icon: any; label: string; value: string; tint: string }) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className={`w-9 h-9 rounded-xl grid place-items-center ${tint} mb-3`}><Icon className="w-5 h-5" /></div>
      <div className="font-display font-bold text-xl">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
