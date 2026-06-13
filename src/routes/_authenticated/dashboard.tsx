import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useAuth } from "@/lib/auth-context";
import { Clock, XCircle, Package, MapPin, Search, Leaf, Trophy, Heart, Award, Info } from "lucide-react";
import { toast } from "sonner";
import { getReservations, cancelReservation, updateReservation, useDemoStore, useTick, formatIDR } from "@/lib/demo-data";
import { AccountStatusBanner, ReportButton } from "@/components/report-dialog";
import { checkUserStatus, useReportsStore } from "@/lib/reports";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard Saya — PanganPeduli" }] }),
  component: PenerimaDashboard,
});

function PenerimaDashboard() {
  useDemoStore();
  useTick(1000);
  useReportsStore();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // tick tiap detik untuk countdown + auto-expire
  useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      getReservations().forEach((r) => {
        if (r.status === "active" && r.expiresAt < now) updateReservation(r.id, { status: "expired" });
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const reservations = user ? getReservations().filter((r) => r.userId === user.id) : [];
  const active = reservations.filter((r) => r.status === "active");
  const history = reservations.filter((r) => r.status !== "active");

  const status = user ? checkUserStatus([user.email]) : { warnings: 0, suspended: false, matchedKey: null };

  const stats = useMemo(() => {
    const saved = reservations.filter((r) => r.status === "picked_up").reduce((s, r) => s + r.portions, 0);
    return {
      saved,
      co2: +(saved * 0.6).toFixed(1),
      activeCount: active.length,
      kontribusi: saved >= 50 ? "Hero" : saved >= 20 ? "Sustainer" : saved >= 5 ? "Aktivis" : "Pemula",
    };
  }, [reservations, active.length]);

  const onCancel = (id: string) => { cancelReservation(id); toast.success("Reservasi dibatalkan & stok dikembalikan"); };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RoleHeader title="Dashboard Penerima" subtitle={`Halo ${user?.name}, pantau reservasi & dampak Anda.`} role="Penerima" onSignOut={async () => { await signOut(); navigate({ to: "/" }); }} />
          <AccountStatusBanner warnings={status.warnings} suspended={status.suspended} />

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat icon={Heart} label="Porsi Diselamatkan" value={stats.saved.toString()} tint="bg-rose-500/10 text-rose-600" />
            <Stat icon={Leaf} label="CO₂ Dicegah (kg)" value={stats.co2.toFixed(1)} tint="bg-emerald-500/10 text-emerald-600" />
            <Stat icon={Trophy} label="Reservasi Aktif" value={stats.activeCount.toString()} tint="bg-amber-500/10 text-amber-600" />
            <Stat icon={Award} label="Level Kontribusi" value={stats.kontribusi} tint="bg-primary/10 text-primary" />
          </div>

          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">Reservasi Aktif</h2>
              <Link to="/cari" className="text-sm font-semibold text-primary inline-flex items-center gap-1"><Search className="w-4 h-4" /> Cari makanan</Link>
            </div>
            {active.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground text-sm">
                Tidak ada reservasi aktif. <Link to="/cari" className="text-primary font-semibold">Cari makanan</Link> untuk mulai.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {active.map((r) => <ReservationCard key={r.id} r={r} onCancel={() => onCancel(r.id)} />)}
              </div>
            )}
          </section>

          <section className="mt-12">
            <h2 className="font-display text-xl font-bold mb-4">Riwayat</h2>
            <div className="glass-card rounded-2xl divide-y divide-border">
              {history.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">Belum ada riwayat.</div>}
              {history.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-4">
                  <Package className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{r.listingTitle}</div>
                    <div className="text-xs text-muted-foreground">{r.portions} porsi · {r.partnerName} · {formatIDR(r.price * r.portions)}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${r.status === "picked_up" ? "bg-success/10 text-success" : r.status === "cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
                  <ReportButton variant="ghost" target={r.partnerName} targetLabel={r.partnerName} targetType="mitra" label="Lapor" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ReservationCard({ r, onCancel }: { r: ReturnType<typeof getReservations>[number]; onCancel: () => void }) {
  const left = Math.max(0, r.expiresAt - Date.now());
  const m = Math.floor(left / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="flex gap-4 p-4">
        <img src={r.image} alt={r.listingTitle} className="w-24 h-24 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold leading-tight truncate">{r.listingTitle}</h3>
          <p className="text-xs text-muted-foreground mt-1 truncate">{r.partnerName}</p>
          <div className="flex gap-1 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tabular-nums">
              <Clock className="w-3 h-3" /> {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-semibold">{r.priority}</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-[10px] font-semibold">{r.portions} porsi · {formatIDR(r.price * r.portions)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.pickupAddress}</p>
        </div>
      </div>
      <div className="mx-4 mb-3 rounded-xl border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground flex gap-2">
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
        <span>Konfirmasi pengambilan dilakukan oleh penjual saat Anda datang. Anda hanya bisa membatalkan reservasi jika berubah pikiran — stok akan otomatis dikembalikan.</span>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={onCancel} className="flex-1 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold inline-flex items-center justify-center gap-1"><XCircle className="w-4 h-4" /> Batalkan Reservasi</button>
      </div>
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

export function RoleHeader({ title, subtitle, role, onSignOut }: { title: string; subtitle: string; role: string; onSignOut: () => void }) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
      <div className="min-w-0">
        <span className="inline-block text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-full bg-primary/10 text-primary mb-2">{role}</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold truncate">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <button onClick={onSignOut} className="shrink-0 px-3 py-2 rounded-lg border border-border text-sm hover:bg-accent">Keluar</button>
    </header>
  );
}
