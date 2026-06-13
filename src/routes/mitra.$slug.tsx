import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { CATEGORY_LABEL, formatCountdown } from "@/lib/format";
import { MapPin, Clock, CheckCircle2, Star, Flame } from "lucide-react";
import { getPartnerBySlug, LISTINGS, formatIDR, getRemaining, useDemoStore, useTick } from "@/lib/demo-data";
import { ReportButton } from "@/components/report-dialog";

export const Route = createFileRoute("/mitra/$slug")({
  head: ({ params }) => ({ meta: [{ title: `Mitra ${params.slug} — PanganPeduli` }] }),
  notFoundComponent: () => <div className="min-h-screen grid place-items-center">Mitra tidak ditemukan</div>,
  errorComponent: ({ error }) => <div className="min-h-screen grid place-items-center text-sm">Gagal memuat: {error.message}</div>,
  component: PartnerDetail,
});

function PartnerDetail() {
  useDemoStore();
  useTick(1000);
  const { slug } = Route.useParams();
  const partner = getPartnerBySlug(slug);
  if (!partner) throw notFound();

  const listings = LISTINGS.filter((l) => l.partner_id === partner.id).map((l) => ({ ...l, remaining: getRemaining(l.id) })).filter((l) => l.remaining > 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link to="/kategori/$category" params={{ category: partner.category }} className="text-sm text-muted-foreground hover:text-foreground">← Kembali ke {CATEGORY_LABEL[partner.category]}</Link>

          <div className="mt-4 grid lg:grid-cols-[1.5fr_1fr] gap-6">
            <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-secondary">
              <img src={partner.cover_url} alt={partner.name} className="w-full h-full object-cover" />
            </div>
            <div className="glass-card rounded-3xl p-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary">{CATEGORY_LABEL[partner.category]}</span>
              <h1 className="mt-1 font-display text-3xl font-bold flex items-center gap-2">{partner.name} {partner.verified && <CheckCircle2 className="w-5 h-5 text-success" />}</h1>
              <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-4 h-4" /> {partner.address}</p>
              <p className="mt-4 text-sm">{partner.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-secondary p-3"><div className="font-display text-2xl font-bold">{partner.total_rescued.toLocaleString("id-ID")}</div><div className="text-[11px] text-muted-foreground">porsi diselamatkan</div></div>
                <div className="rounded-xl bg-secondary p-3 flex flex-col items-center justify-center"><div className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /><span className="font-bold text-foreground">{partner.rating.toFixed(1)}</span></div><div className="text-[11px] text-muted-foreground">rating mitra</div></div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
                <ReportButton target={partner.name} targetLabel={partner.name} targetType="mitra" variant="outline" label="Laporkan mitra ini" />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-2"><Flame className="w-5 h-5 text-primary" /> Menu Tersedia ({listings.length})</h2>
            {listings.length === 0 && <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground text-sm">Saat ini belum ada makanan tersedia. Cek kembali nanti.</div>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((l) => (
                <Link key={l.id} to="/listing/$id" params={{ id: l.id }} className="group glass-card rounded-3xl overflow-hidden hover-lift">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                    <img src={l.image_url} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-semibold">{l.priority_label}</div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">{formatIDR(l.price)}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold leading-tight">{l.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{l.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-semibold">{l.remaining} porsi</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {formatCountdown(l.expires_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
