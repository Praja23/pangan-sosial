import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { CATEGORY_DESC, CATEGORY_LABEL } from "@/lib/format";
import { MapPin, Star, CheckCircle2, Package } from "lucide-react";
import { PARTNERS, type Category } from "@/lib/demo-data";

const VALID = ["mbg", "hotel", "umkm", "restoran"] as const;

export const Route = createFileRoute("/kategori/$category")({
  beforeLoad: ({ params }) => {
    if (!(VALID as readonly string[]).includes(params.category)) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: `${CATEGORY_LABEL[params.category] ?? "Kategori"} — PanganPeduli` },
      { name: "description", content: CATEGORY_DESC[params.category] ?? "" },
    ],
  }),
  notFoundComponent: () => <div className="min-h-screen grid place-items-center">Kategori tidak ditemukan</div>,
  errorComponent: ({ error }) => <div className="min-h-screen grid place-items-center text-sm">Gagal memuat: {error.message}</div>,
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const partners = PARTNERS.filter((p) => p.category === (category as Category)).sort((a, b) => b.total_rescued - a.total_rescued);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Kategori Mitra</p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold">{CATEGORY_LABEL[category]}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{CATEGORY_DESC[category]}</p>
          </div>

          {partners.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center text-muted-foreground">Belum ada mitra terdaftar pada kategori ini.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {partners.map((p) => (
                <Link key={p.id} to="/mitra/$slug" params={{ slug: p.slug }} className="group glass-card rounded-3xl overflow-hidden hover-lift">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img src={p.cover_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-lg leading-tight">{p.name}</h3>
                      {p.verified && <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-1" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{p.city} — {p.address}</p>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <div className="inline-flex items-center gap-1 text-amber-500"><Star className="w-3.5 h-3.5 fill-current" /><span className="text-foreground font-semibold">{p.rating.toFixed(1)}</span></div>
                      <div className="inline-flex items-center gap-1 text-muted-foreground"><Package className="w-3.5 h-3.5" /><span className="text-foreground font-semibold">{p.total_rescued.toLocaleString("id-ID")}</span> porsi</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
