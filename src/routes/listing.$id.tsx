import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { formatCountdown } from "@/lib/format";
import { useAuth } from "@/lib/auth-context";
import { MapPin, Clock, Package, AlertCircle, Tag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getListingById, getPartnerById, getRemaining, reserveListing, useDemoStore, useTick, formatIDR } from "@/lib/demo-data";
import { ReportButton } from "@/components/report-dialog";
import { isSuspended, useReportsStore } from "@/lib/reports";

export const Route = createFileRoute("/listing/$id")({
  head: () => ({ meta: [{ title: "Detail Makanan — PanganPeduli" }] }),
  errorComponent: ({ error }) => <div className="min-h-screen grid place-items-center text-sm">Gagal memuat: {error.message}</div>,
  notFoundComponent: () => <div className="min-h-screen grid place-items-center">Listing tidak ditemukan</div>,
  component: ListingDetail,
});

function ListingDetail() {
  useDemoStore();
  useTick(1000);
  useReportsStore();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [portions, setPortions] = useState(1);

  const listing = getListingById(id);
  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="pt-32 mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-2xl font-bold">Listing tidak ditemukan</h1>
          <Link to="/cari" className="text-primary mt-2 inline-block">← Kembali ke pencarian</Link>
        </div>
      </div>
    );
  }
  const partner = getPartnerById(listing.partner_id);
  const remaining = getRemaining(listing.id);
  const expired = new Date(listing.expires_at).getTime() < Date.now();
  const available = !expired && remaining > 0;

  const onReserve = () => {
    if (!user) {
      navigate({ to: "/auth", search: { mode: "login" } });
      return;
    }
    if (isSuspended(user.email)) { toast.error("Akun Anda di-suspend dan tidak dapat melakukan reservasi."); return; }
    const res = reserveListing(listing, partner, { id: user.id, name: user.name, email: user.email, phone: user.phone }, portions);
    if (!res.ok) { toast.error(res.error); return; }
    toast.success("Reservasi berhasil! Timer 60 menit dimulai.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {partner && <Link to="/mitra/$slug" params={{ slug: partner.slug }} className="text-sm text-muted-foreground hover:text-foreground">← Kembali ke {partner.name}</Link>}
          <div className="mt-4 grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-secondary relative">
              <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold">{listing.priority_label}</div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">{formatIDR(listing.price)}</div>
            </div>
            <div className="glass-card rounded-3xl p-6 flex flex-col">
              {partner && <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold inline-flex items-center gap-1"><Sparkles className="w-3 h-3" /> {partner.name}</div>}
              <h1 className="mt-1 font-display text-3xl font-bold">{listing.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{listing.description}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {listing.pickup_address}</div>
                <div className="flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Sisa <span className="font-semibold">{remaining}</span> porsi</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Habis dalam <span className="font-semibold">{formatCountdown(listing.expires_at)}</span></div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> Harga: <span className="font-semibold">{formatIDR(listing.price)}</span> {listing.price === 0 && <span className="text-success text-xs">(MBG • gratis)</span>}</div>
              </div>

              <div className="mt-auto pt-5">
                {!available ? (
                  <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Makanan ini sudah tidak tersedia.</div>
                ) : !user ? (
                  <Link to="/auth" search={{ mode: "login" }} className="block text-center w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant">
                    Masuk untuk Reservasi
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Jumlah porsi:</label>
                      <input type="number" min={1} max={remaining} value={portions} onChange={(e) => setPortions(Math.max(1, Math.min(remaining, +e.target.value || 1)))}
                        className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background" />
                      <span className="text-xs text-muted-foreground">Total: {formatIDR(listing.price * portions)}</span>
                    </div>
                    <button onClick={onReserve}
                      className="w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant flex items-center justify-center gap-2">
                      Reservasi Sekarang (60 menit)
                    </button>
                    <p className="text-[11px] text-center text-muted-foreground">Setelah reservasi, Anda punya waktu 60 menit untuk mengambil.</p>
                  </div>
                )}
                {partner && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Menemukan masalah pada makanan ini?</span>
                    <ReportButton variant="ghost" target={partner.name} targetLabel={partner.name} targetType="mitra" label="Laporkan mitra" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
