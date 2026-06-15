import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { u as useAuth, g as RoleHeader } from "./router-B0zevO1-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useReportsStore, b as getReports, d as getAllWarnings, i as isSuspended, r as resolveReport } from "./reports-H3a1bCaM.mjs";
import { n as Users, B as Building2, u as Package, d as Leaf, b as ShieldCheck, W as Check, X, V as TriangleAlert, Y as Ban, T as Trophy, t as Activity } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const PENDING_SEED = [{
  id: "p1",
  org: "Hotel Santika Premiere",
  category: "Hotel",
  city: "Bandung",
  license: "NIB-2024-00123"
}, {
  id: "p2",
  org: "Warung Padang Sederhana",
  category: "UMKM",
  city: "Padang",
  license: "NIB-2024-00456"
}, {
  id: "p3",
  org: "SDN Cipinang 02",
  category: "MBG",
  city: "Jakarta",
  license: "SK-MBG-2024-789"
}];
function AdminDashboard() {
  useReportsStore();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = reactExports.useState(PENDING_SEED);
  const reports = getReports();
  const warnings = getAllWarnings();
  const verify = (id, ok) => {
    setPending((arr) => arr.filter((p) => p.id !== id));
    toast.success(ok ? "Mitra diverifikasi" : "Pengajuan ditolak");
  };
  const onResolve = (r, sanction) => {
    const res = resolveReport(r.id, sanction);
    if (!sanction) {
      toast.success("Laporan ditutup tanpa sanksi");
      return;
    }
    if (res?.suspended) toast.warning(`${r.targetLabel} dikenai SUSPEND otomatis (3 warning)`);
    else toast.success(`Warning diberikan (${res?.warningCount}/3)`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleHeader, { title: "Admin Console", subtitle: `Login sebagai ${user?.email} · kontrol penuh platform.`, role: "Admin", onSignOut: async () => {
        await signOut();
        navigate({
          to: "/"
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Pengguna Terdaftar", value: "89.320", tint: "bg-primary/10 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Building2, label: "Mitra Aktif", value: "12.847", tint: "bg-amber-500/10 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Package, label: "Porsi Diselamatkan", value: "248.750", tint: "bg-emerald-500/10 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Leaf, label: "Food Waste Dicegah", value: "64 ton", tint: "bg-success/10 text-success" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }),
          " Verifikasi Mitra (",
          pending.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl divide-y divide-border", children: [
          pending.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-center text-muted-foreground", children: "Tidak ada pengajuan menunggu." }),
          pending.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center gap-3 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: p.org }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                p.category,
                " · ",
                p.city,
                " · ",
                p.license
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => verify(p.id, true), className: "px-3 py-2 rounded-lg bg-success text-success-foreground text-xs font-semibold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                " Verifikasi"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => verify(p.id, false), className: "px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                " Tolak"
              ] })
            ] })
          ] }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-500" }),
          " Laporan (",
          reports.filter((r) => r.status === "open").length,
          " terbuka)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl divide-y divide-border", children: [
          reports.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-center text-muted-foreground", children: "Belum ada laporan masuk." }),
          reports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm truncate flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono", children: r.targetType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: r.targetLabel }),
                warnings[r.target] ? isSuspended(r.target) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" }),
                  " SUSPENDED"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700", children: [
                  warnings[r.target],
                  "/3 warning"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: r.reason }),
                " — ",
                r.details
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                "oleh ",
                r.reporter,
                " · ",
                new Date(r.createdAt).toLocaleString("id-ID")
              ] })
            ] }),
            r.status === "open" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onResolve(r, true), className: "px-3 py-2 rounded-lg bg-amber-500/10 text-amber-700 text-xs font-semibold hover:bg-amber-500/20", children: "Beri Warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onResolve(r, false), className: "px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent", children: "Tutup" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded-full font-semibold ${r.status === "resolved_warning" ? "bg-amber-500/15 text-amber-700" : "bg-success/10 text-success"}`, children: r.status === "resolved_warning" ? "Warning diberikan" : "Ditutup" })
          ] }, r.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-amber-500" }),
          " Leaderboard Mitra (Top 5)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl divide-y divide-border", children: [{
          rank: 1,
          org: "Hotel Grand Mulia Jakarta",
          porsi: 4820
        }, {
          rank: 2,
          org: "Bali Pearl Resort",
          porsi: 3940
        }, {
          rank: 3,
          org: "Catering Bunda Yanti",
          porsi: 2810
        }, {
          rank: 4,
          org: "Sate Khas Senayan",
          porsi: 2305
        }, {
          rank: 5,
          org: "SMP Negeri 5 Bandung",
          porsi: 1990
        }].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-8 h-8 rounded-lg bg-[image:var(--gradient-warm)] grid place-items-center font-display font-bold text-primary-foreground text-sm shrink-0", children: [
            "#",
            l.rank
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 font-semibold truncate", children: l.org }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-mono text-primary shrink-0", children: [
            l.porsi.toLocaleString("id-ID"),
            " porsi"
          ] })
        ] }, l.rank)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 glass-card rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }),
          " Aktivitas Real-time"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: "[live]" }),
            " Hotel Grand Mulia mempublikasikan 15 porsi nasi box."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: "[1m]" }),
            " user1@demo.id reservasi 3 porsi."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: "[3m]" }),
            " SMPN 5 Bandung verifikasi disetujui."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: "[7m]" }),
            " Warung Berkah dilaporkan oleh 2 pengguna."
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
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
export {
  AdminDashboard as component
};
