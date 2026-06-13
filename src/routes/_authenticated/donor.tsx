import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { DEMO_ACCOUNTS, useAuth, isDonorRole, type Role } from "@/lib/auth-context";
import { RoleHeader } from "./dashboard";
import { Plus, Trash2, Package, Clock, Trophy, TrendingUp, Upload, Image as ImageIcon, Tag, Award, Users, CheckCircle2, XCircle, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { addUserListing, getReservations, getUserListings, removeUserListing, updateReservation, useDemoStore, useTick, sellerClaimPickup, sellerMarkProblem, formatIDR, type Category, type Listing, type Priority, type Reservation } from "@/lib/demo-data";
import { AccountStatusBanner, ReportDialog } from "@/components/report-dialog";
import { checkUserStatus, isSuspended, useReportsStore } from "@/lib/reports";

const STORAGE_KEY = "panganpeduli_demo_user";

export const Route = createFileRoute("/_authenticated/donor")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dashboard Donor — PanganPeduli" }] }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw redirect({ to: "/auth", search: { mode: "login" } });
    const u = JSON.parse(raw) as { role: Role };
    if (!isDonorRole(u.role)) throw redirect({ to: u.role === "admin" ? "/admin" : "/dashboard" });
  },
  component: DonorDashboard,
});

function roleToCategory(r: Role): Category {
  if (r === "donor_hotel") return "hotel";
  if (r === "donor_umkm") return "umkm";
  if (r === "donor_mbg") return "mbg";
  return "restoran";
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800";

function DonorDashboard() {
  useDemoStore();
  useTick(1000);
  useReportsStore();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const myCategory = roleToCategory(user?.role ?? "donor_restoran");
  const isMBG = myCategory === "mbg";
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [portions, setPortions] = useState(10);
  const [price, setPrice] = useState(isMBG ? 0 : 5000);
  const [expIn, setExpIn] = useState(90);
  const [photo, setPhoto] = useState<string>("");

  const items = getUserListings().filter((l) => l.category === myCategory);
  const reservations = user ? getReservations().filter((r) => r.partnerId === user.id || r.partnerName === user.org) : [];
  const identifiers = [user?.email ?? "", user?.org ?? ""].filter(Boolean);
  const status = checkUserStatus(identifiers);

  useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      getReservations().forEach((r) => {
        if (r.status === "active" && r.expiresAt < now) updateReservation(r.id, { status: "expired" });
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const stats = useMemo(() => ({
    totalPorsi: items.reduce((s, l) => s + l.portions_total, 0),
    totalListing: items.length,
    avgPrice: items.length ? Math.round(items.reduce((s, l) => s + l.price, 0) / items.length) : 0,
    level: items.length >= 10 ? "Hero Mitra" : items.length >= 5 ? "Mitra Aktif" : "Mitra Baru",
  }), [items]);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) { toast.error("Foto maksimal 4MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const computePriority = (mins: number): Priority => {
    if (mins <= 60) return "🔥 Prioritas Tinggi";
    if (mins <= 120) return "⚡ Segera Diambil";
    return "🌟 Dampak Sosial Tinggi";
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && (isSuspended(user.email) || (user.org && isSuspended(user.org)))) {
      return toast.error("Akun Anda di-suspend dan tidak dapat mempublikasikan listing.");
    }
    if (!title.trim()) return toast.error("Judul wajib diisi");
    if (portions < 1) return toast.error("Jumlah porsi minimal 1");
    if (!isMBG && price > 10000) return toast.error("Harga maksimal Rp 10.000 untuk non-MBG");
    if (price < 0) return toast.error("Harga tidak valid");

    const finalPrice = isMBG ? 0 : price;
    const id = "u-" + crypto.randomUUID();
    const newListing: Listing = {
      id,
      partner_id: user?.id ?? "user",
      title: title.trim(),
      description: desc.trim() || "Makanan surplus dari " + (user?.org ?? user?.name ?? "mitra"),
      image_url: photo || FALLBACK_IMG,
      portions_total: portions,
      price: finalPrice,
      expires_in_min: expIn,
      expires_at: new Date(Date.now() + expIn * 60000).toISOString(),
      pickup_address: user?.city ? `${user.org ?? user.name}, ${user.city}` : (user?.org ?? "Lokasi mitra"),
      category: myCategory,
      priority_label: computePriority(expIn),
    };
    addUserListing(newListing);
    setTitle(""); setDesc(""); setPortions(10); setPrice(isMBG ? 0 : 5000); setExpIn(90); setPhoto("");
    if (fileRef.current) fileRef.current.value = "";
    toast.success("Listing makanan berhasil dipublikasikan");
  };

  const remove = (id: string) => { removeUserListing(id); toast.success("Listing dihapus"); };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RoleHeader title={`Donor · ${user?.org ?? user?.name}`} subtitle="Kelola makanan surplus & lihat dampak Anda." role={roleLabel(user?.role)} onSignOut={async () => { await signOut(); navigate({ to: "/" }); }} />
          <AccountStatusBanner warnings={status.warnings} suspended={status.suspended} />

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat icon={Package} label="Total Porsi Aktif" value={String(stats.totalPorsi)} tint="bg-primary/10 text-primary" />
            <Stat icon={TrendingUp} label="Total Listing" value={String(stats.totalListing)} tint="bg-emerald-500/10 text-emerald-600" />
            <Stat icon={Tag} label="Rata-rata Harga" value={isMBG ? "Gratis" : formatIDR(stats.avgPrice)} tint="bg-amber-500/10 text-amber-600" />
            <Stat icon={Award} label="Level Mitra" value={stats.level} tint="bg-rose-500/10 text-rose-600" />
          </div>

          <div className="mt-10 grid lg:grid-cols-[1fr_1.6fr] gap-6">
            <form onSubmit={add} className="glass-card rounded-2xl p-6 space-y-3 self-start">
              <h2 className="font-display text-lg font-bold flex items-center gap-2"><Upload className="w-5 h-5 text-primary" /> Upload Makanan</h2>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Foto Makanan</label>
                <div className="mt-1 flex items-center gap-3">
                  {photo ? (
                    <img src={photo} alt="preview" className="w-20 h-20 rounded-xl object-cover border border-border" />
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-border grid place-items-center text-muted-foreground bg-secondary/40"><ImageIcon className="w-6 h-6" /></div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} className="text-xs flex-1" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Judul / Menu</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="Mis. Nasi Box Sisa Acara" className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Deskripsi singkat</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={300} rows={2} placeholder="Mis. Masih hangat, kemasan box" className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Porsi</label>
                  <input type="number" min={1} value={portions} onChange={(e) => setPortions(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Habis dlm (menit)</label>
                  <input type="number" min={15} value={expIn} onChange={(e) => setExpIn(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Harga per porsi {isMBG ? "(MBG • wajib gratis)" : "(maks Rp 10.000)"}
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rp</span>
                  <input type="number" min={0} max={isMBG ? 0 : 10000} step={500} disabled={isMBG} value={isMBG ? 0 : price} onChange={(e) => setPrice(Math.min(10000, Math.max(0, +e.target.value)))} className="flex-1 px-3 py-2 rounded-xl border border-border bg-background disabled:opacity-60" />
                </div>
                {!isMBG && <p className="text-[11px] text-muted-foreground mt-1">Harga max untuk Hotel / UMKM / Restoran adalah Rp 10.000.</p>}
              </div>

              <button className="w-full py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Publikasikan Sekarang
              </button>
            </form>

            <section>
              <h2 className="font-display text-lg font-bold mb-3">Listing Aktif Saya</h2>
              <div className="space-y-3">
                {items.length === 0 && <div className="glass-card rounded-2xl p-8 text-center text-sm text-muted-foreground">Belum ada listing. Upload makanan pertama Anda di kiri.</div>}
                {items.map((l) => (
                  <div key={l.id} className="glass-card rounded-2xl p-4 flex gap-4">
                    <img src={l.image_url} alt={l.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold truncate">{l.title}</h3>
                        <button onClick={() => remove(l.id)} className="shrink-0 p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" aria-label="Hapus"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{l.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Pill icon={Package} text={`${l.portions_total} porsi`} />
                        <Pill icon={Clock} text={`${l.expires_in_min}m`} />
                        <Pill icon={Tag} text={formatIDR(l.price)} tint="bg-primary/10 text-primary" />
                        <Pill icon={Trophy} text={l.priority_label} tint="bg-amber-500/10 text-amber-700" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ReservationsPanel reservations={reservations} />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function roleLabel(r?: Role) {
  if (r === "donor_hotel") return "Hotel";
  if (r === "donor_umkm") return "UMKM";
  if (r === "donor_mbg") return "MBG / Sekolah";
  if (r === "donor_restoran") return "Restoran";
  return "Donor";
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

function Pill({ icon: Icon, text, tint = "bg-secondary text-foreground" }: { icon: any; text: string; tint?: string }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tint}`}><Icon className="w-3 h-3" /> {text}</span>;
}

function ReservationsPanel({ reservations }: { reservations: Reservation[] }) {
  return (
    <div className="mt-8 glass-card rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive grid place-items-center shrink-0"><Users className="w-5 h-5" /></div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold">Penerima yang Reservasi</h3>
          <p className="text-xs text-muted-foreground mt-1">Data penerima tampil otomatis dari reservasi listing Anda, jadi laporan ke admin tidak perlu mengetik email manual.</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {reservations.length === 0 && <div className="rounded-xl bg-secondary/50 p-4 text-center text-xs text-muted-foreground">Belum ada penerima yang melakukan reservasi pada listing Anda.</div>}
        {reservations.map((r) => <ReservationRow key={r.id} reservation={r} />)}
      </div>
    </div>
  );
}

function ReservationRow({ reservation }: { reservation: Reservation }) {
  const [reportOpen, setReportOpen] = useState(false);
  const account = DEMO_ACCOUNTS.find((a) => a.id === reservation.userId || a.email === reservation.userEmail);
  const email = reservation.userEmail ?? account?.email ?? reservation.userId;
  const phone = reservation.userPhone ?? account?.phone ?? "Belum tersedia";
  const targetLabel = `${reservation.userName} · ${email}`;
  const finalized = reservation.status === "picked_up";

  const confirmPickup = () => {
    const res = sellerClaimPickup(reservation.id);
    if (!res.ok) { toast.error(res.error ?? "Tidak bisa mengkonfirmasi"); return; }
    toast.success("Pengambilan dikonfirmasi. Stok final.");
  };
  const markProblem = () => {
    const res = sellerMarkProblem(reservation.id);
    if (!res.ok) { toast.error(res.error ?? "Tidak bisa menandai bermasalah"); return; }
    toast.success("Ditandai bermasalah & stok dikembalikan. Anda bisa lapor ke admin.");
    setReportOpen(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <img src={reservation.image} alt={reservation.listingTitle} className="w-full sm:w-20 h-24 sm:h-20 rounded-xl object-cover bg-secondary" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{reservation.userName}</div>
              <div className="text-xs text-muted-foreground truncate">{reservation.listingTitle}</div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${reservation.status === "picked_up" ? "bg-success/10 text-success" : reservation.status === "cancelled" ? "bg-destructive/10 text-destructive" : reservation.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{reservation.status}</span>
          </div>
          <div className="mt-3 grid sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 min-w-0"><Mail className="w-3 h-3 shrink-0" /><span className="truncate">{email}</span></span>
            <span className="inline-flex items-center gap-1 min-w-0"><Phone className="w-3 h-3 shrink-0" /><span className="truncate">{phone}</span></span>
            <span className="inline-flex items-center gap-1"><Package className="w-3 h-3" />{reservation.portions} porsi · {formatIDR(reservation.price * reservation.portions)}</span>
          </div>
        </div>
      </div>
      {finalized && (
        <div className="mt-3 rounded-xl bg-success/10 border border-success/40 px-3 py-2 text-[11px] text-success">
          Anda sudah mengkonfirmasi pengambilan. Stok final — tidak bisa diubah.
        </div>
      )}
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <button type="button" onClick={confirmPickup} disabled={reservation.status !== "active"} className="flex-1 py-2 rounded-lg bg-success/10 text-success text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50">
          <CheckCircle2 className="w-4 h-4" /> Sudah Diambil (final)
        </button>
        <button type="button" onClick={markProblem} disabled={reservation.status !== "active"} className="flex-1 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50">
          <XCircle className="w-4 h-4" /> Tidak Hadir / Bermasalah
        </button>

        <button type="button" onClick={() => setReportOpen(true)} className="px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent">Lapor ke Admin</button>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        Aturan stok: pembeli yang berkuasa atas konfirmasi pengambilan. "Sudah Diambil" hanya mengirim notifikasi & menunggu persetujuan pembeli, untuk mencegah penyalahgunaan.
      </p>
      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} target={email} targetLabel={targetLabel} targetType="penerima" />
    </div>
  );
}
