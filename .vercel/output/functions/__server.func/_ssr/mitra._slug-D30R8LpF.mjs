import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { a as Route$5, C as CATEGORY_LABEL, f as formatCountdown } from "./router-B0zevO1-.mjs";
import { u as useDemoStore, a as useTick, b as getPartnerBySlug, L as LISTINGS, g as getRemaining, f as formatIDR } from "./demo-data-X3DTJBeN.mjs";
import { R as ReportButton } from "./report-dialog-2K3rjmGt.mjs";
import "../_libs/sonner.mjs";
import "../_libs/react-dom.mjs";
import { c as CircleCheck, M as MapPin, m as Star, s as Flame, C as Clock } from "../_libs/lucide-react.mjs";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./reports-H3a1bCaM.mjs";
function PartnerDetail() {
  useDemoStore();
  useTick(1e3);
  const {
    slug
  } = Route$5.useParams();
  const partner = getPartnerBySlug(slug);
  if (!partner) throw notFound();
  const listings = LISTINGS.filter((l) => l.partner_id === partner.id).map((l) => ({
    ...l,
    remaining: getRemaining(l.id)
  })).filter((l) => l.remaining > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/kategori/$category", params: {
        category: partner.category
      }, className: "text-sm text-muted-foreground hover:text-foreground", children: [
        "← Kembali ke ",
        CATEGORY_LABEL[partner.category]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid lg:grid-cols-[1.5fr_1fr] gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden aspect-[16/9] bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: partner.cover_url, alt: partner.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold uppercase tracking-wider text-primary", children: CATEGORY_LABEL[partner.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-1 font-display text-3xl font-bold flex items-center gap-2", children: [
            partner.name,
            " ",
            partner.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            " ",
            partner.address
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm", children: partner.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: partner.total_rescued.toLocaleString("id-ID") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "porsi diselamatkan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary p-3 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: partner.rating.toFixed(1) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "rating mitra" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportButton, { target: partner.name, targetLabel: partner.name, targetType: "mitra", variant: "outline", label: "Laporkan mitra ini" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-primary" }),
          " Menu Tersedia (",
          listings.length,
          ")"
        ] }),
        listings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl p-8 text-center text-muted-foreground text-sm", children: "Saat ini belum ada makanan tersedia. Cek kembali nanti." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listing/$id", params: {
          id: l.id
        }, className: "group glass-card rounded-3xl overflow-hidden hover-lift", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] overflow-hidden bg-secondary relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image_url, alt: l.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-semibold", children: l.priority_label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold", children: formatIDR(l.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold leading-tight", children: l.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: l.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                l.remaining,
                " porsi"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                " ",
                formatCountdown(l.expires_at)
              ] })
            ] })
          ] })
        ] }, l.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  PartnerDetail as component
};
