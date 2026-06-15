import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { b as Route$4, u as useAuth, f as formatCountdown } from "./router-B0zevO1-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDemoStore, a as useTick, c as getListingById, e as getPartnerById, g as getRemaining, f as formatIDR, r as reserveListing } from "./demo-data-X3DTJBeN.mjs";
import { R as ReportButton } from "./report-dialog-2K3rjmGt.mjs";
import { u as useReportsStore, i as isSuspended } from "./reports-H3a1bCaM.mjs";
import "../_libs/react-dom.mjs";
import { l as Sparkles, M as MapPin, u as Package, C as Clock, x as Tag, y as CircleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function ListingDetail() {
  useDemoStore();
  useTick(1e3);
  useReportsStore();
  const {
    id
  } = Route$4.useParams();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [portions, setPortions] = reactExports.useState(1);
  const listing = getListingById(id);
  if (!listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-32 mx-auto max-w-3xl px-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Listing tidak ditemukan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cari", className: "text-primary mt-2 inline-block", children: "← Kembali ke pencarian" })
      ] })
    ] });
  }
  const partner = getPartnerById(listing.partner_id);
  const remaining = getRemaining(listing.id);
  const expired = new Date(listing.expires_at).getTime() < Date.now();
  const available = !expired && remaining > 0;
  const onReserve = () => {
    if (!user) {
      navigate({
        to: "/auth",
        search: {
          mode: "login"
        }
      });
      return;
    }
    if (isSuspended(user.email)) {
      toast.error("Akun Anda di-suspend dan tidak dapat melakukan reservasi.");
      return;
    }
    const res = reserveListing(listing, partner, {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }, portions);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Reservasi berhasil! Timer 60 menit dimulai.");
    navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
      partner && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/mitra/$slug", params: {
        slug: partner.slug
      }, className: "text-sm text-muted-foreground hover:text-foreground", children: [
        "← Kembali ke ",
        partner.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid lg:grid-cols-[1.3fr_1fr] gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden aspect-[4/3] bg-secondary relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: listing.image_url, alt: listing.title, className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold", children: listing.priority_label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold", children: formatIDR(listing.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 flex flex-col", children: [
          partner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            " ",
            partner.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-3xl font-bold", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: listing.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
              " ",
              listing.pickup_address
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
              " Sisa ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: remaining }),
              " porsi"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              " Habis dalam ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatCountdown(listing.expires_at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
              " Harga: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatIDR(listing.price) }),
              " ",
              listing.price === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success text-xs", children: "(MBG • gratis)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-5", children: [
            !available ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
              " Makanan ini sudah tidak tersedia."
            ] }) : !user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
              mode: "login"
            }, className: "block text-center w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant", children: "Masuk untuk Reservasi" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm", children: "Jumlah porsi:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: remaining, value: portions, onChange: (e) => setPortions(Math.max(1, Math.min(remaining, +e.target.value || 1))), className: "w-20 px-2 py-1.5 rounded-lg border border-border bg-background" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Total: ",
                  formatIDR(listing.price * portions)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onReserve, className: "w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant flex items-center justify-center gap-2", children: "Reservasi Sekarang (60 menit)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground", children: "Setelah reservasi, Anda punya waktu 60 menit untuk mengambil." })
            ] }),
            partner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Menemukan masalah pada makanan ini?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ReportButton, { variant: "ghost", target: partner.name, targetLabel: partner.name, targetType: "mitra", label: "Laporkan mitra" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ListingDetail as component
};
