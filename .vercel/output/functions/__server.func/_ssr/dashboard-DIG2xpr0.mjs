import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { u as useAuth } from "./router-B0zevO1-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDemoStore, a as useTick, i as getReservations, j as updateReservation, f as formatIDR, n as cancelReservation } from "./demo-data-X3DTJBeN.mjs";
import { A as AccountStatusBanner, R as ReportButton } from "./report-dialog-2K3rjmGt.mjs";
import { u as useReportsStore, c as checkUserStatus } from "./reports-H3a1bCaM.mjs";
import "../_libs/react-dom.mjs";
import { o as Heart, d as Leaf, T as Trophy, D as Award, S as Search, u as Package, C as Clock, M as MapPin, I as Info, K as CircleX } from "../_libs/lucide-react.mjs";
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
function PenerimaDashboard() {
  useDemoStore();
  useTick(1e3);
  useReportsStore();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      getReservations().forEach((r) => {
        if (r.status === "active" && r.expiresAt < now) updateReservation(r.id, {
          status: "expired"
        });
      });
    }, 1e3);
    return () => clearInterval(i);
  }, []);
  const reservations = user ? getReservations().filter((r) => r.userId === user.id) : [];
  const active = reservations.filter((r) => r.status === "active");
  const history = reservations.filter((r) => r.status !== "active");
  const status = user ? checkUserStatus([user.email]) : {
    warnings: 0,
    suspended: false
  };
  const stats = reactExports.useMemo(() => {
    const saved = reservations.filter((r) => r.status === "picked_up").reduce((s, r) => s + r.portions, 0);
    return {
      saved,
      co2: +(saved * 0.6).toFixed(1),
      activeCount: active.length,
      kontribusi: saved >= 50 ? "Hero" : saved >= 20 ? "Sustainer" : saved >= 5 ? "Aktivis" : "Pemula"
    };
  }, [reservations, active.length]);
  const onCancel = (id) => {
    cancelReservation(id);
    toast.success("Reservasi dibatalkan & stok dikembalikan");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleHeader, { title: "Dashboard Penerima", subtitle: `Halo ${user?.name}, pantau reservasi & dampak Anda.`, role: "Penerima", onSignOut: async () => {
        await signOut();
        navigate({
          to: "/"
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccountStatusBanner, { warnings: status.warnings, suspended: status.suspended }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Heart, label: "Porsi Diselamatkan", value: stats.saved.toString(), tint: "bg-rose-500/10 text-rose-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Leaf, label: "CO₂ Dicegah (kg)", value: stats.co2.toFixed(1), tint: "bg-emerald-500/10 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Trophy, label: "Reservasi Aktif", value: stats.activeCount.toString(), tint: "bg-amber-500/10 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Award, label: "Level Kontribusi", value: stats.kontribusi, tint: "bg-primary/10 text-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: "Reservasi Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cari", className: "text-sm font-semibold text-primary inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
            " Cari makanan"
          ] })
        ] }),
        active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-8 text-center text-muted-foreground text-sm", children: [
          "Tidak ada reservasi aktif. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cari", className: "text-primary font-semibold", children: "Cari makanan" }),
          " untuk mulai."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: active.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReservationCard, { r, onCancel: () => onCancel(r.id) }, r.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-4", children: "Riwayat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl divide-y divide-border", children: [
          history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-muted-foreground text-sm", children: "Belum ada riwayat." }),
          history.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm truncate", children: r.listingTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                r.portions,
                " porsi · ",
                r.partnerName,
                " · ",
                formatIDR(r.price * r.portions)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${r.status === "picked_up" ? "bg-success/10 text-success" : r.status === "cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`, children: r.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReportButton, { variant: "ghost", target: r.partnerName, targetLabel: r.partnerName, targetType: "mitra", label: "Lapor" })
          ] }, r.id))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function ReservationCard({
  r,
  onCancel
}) {
  const left = Math.max(0, r.expiresAt - Date.now());
  const m = Math.floor(left / 6e4);
  const s = Math.floor(left % 6e4 / 1e3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image, alt: r.listingTitle, className: "w-24 h-24 rounded-xl object-cover shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold leading-tight truncate", children: r.listingTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: r.partnerName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mt-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            " ",
            String(m).padStart(2, "0"),
            ":",
            String(s).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-semibold", children: r.priority }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-[10px] font-semibold", children: [
            r.portions,
            " porsi · ",
            formatIDR(r.price * r.portions)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
          " ",
          r.pickupAddress
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-3 rounded-xl border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Konfirmasi pengambilan dilakukan oleh penjual saat Anda datang. Anda hanya bisa membatalkan reservasi jika berubah pikiran — stok akan otomatis dikembalikan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onCancel, className: "flex-1 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold inline-flex items-center justify-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
      " Batalkan Reservasi"
    ] }) })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  tint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-9 h-9 rounded-xl grid place-items-center ${tint} mb-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: label })
  ] });
}
function RoleHeader({
  title,
  subtitle,
  role,
  onSignOut
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-full bg-primary/10 text-primary mb-2", children: role }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold truncate", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onSignOut, className: "shrink-0 px-3 py-2 rounded-lg border border-border text-sm hover:bg-accent", children: "Keluar" })
  ] });
}
export {
  RoleHeader,
  PenerimaDashboard as component
};
