import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound, S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const DEMO_ACCOUNTS = [
  // Admin
  { id: "admin-1", email: "admin@panganpeduli.id", password: "admin123", name: "Admin PanganPeduli", role: "admin" },
  // Penerima (masyarakat)
  { id: "user-1", email: "user1@demo.id", password: "user123", name: "Budi Santoso", role: "penerima", city: "Jakarta", phone: "0812-3456-7001" },
  { id: "user-2", email: "user2@demo.id", password: "user123", name: "Siti Rahayu", role: "penerima", city: "Bandung", phone: "0812-3456-7002" },
  // Penerima — contoh akun SUSPENDED (3x warning) untuk demo moderasi
  { id: "user-suspend", email: "suspended.user@demo.id", password: "user123", name: "Andi Tersuspend", role: "penerima", city: "Jakarta", phone: "0812-0000-0003" },
  // Hotel
  { id: "hotel-1", email: "hotel1@demo.id", password: "hotel123", name: "Manajer F&B", role: "donor_hotel", org: "Hotel Grand Mulia Jakarta", city: "Jakarta", phone: "021-555-0101" },
  { id: "hotel-2", email: "hotel2@demo.id", password: "hotel123", name: "Manajer F&B", role: "donor_hotel", org: "Bali Pearl Resort", city: "Denpasar", phone: "0361-555-0102" },
  // Hotel — contoh akun mitra SUSPENDED (3x warning)
  { id: "hotel-suspend", email: "suspended.mitra@demo.id", password: "hotel123", name: "Manajer F&B", role: "donor_hotel", org: "Hotel Bermasalah Demo", city: "Jakarta", phone: "021-000-0003" },
  // UMKM
  { id: "umkm-1", email: "umkm1@demo.id", password: "umkm123", name: "Pak Joko", role: "donor_umkm", org: "Warung Nasi Berkah", city: "Yogyakarta", phone: "0274-555-0201" },
  { id: "umkm-2", email: "umkm2@demo.id", password: "umkm123", name: "Bu Yanti", role: "donor_umkm", org: "Catering Bunda Yanti", city: "Surabaya", phone: "031-555-0202" },
  // MBG
  { id: "mbg-1", email: "mbg1@demo.id", password: "mbg123", name: "Kepala Sekolah", role: "donor_mbg", org: "SMP Negeri 5 Bandung", city: "Bandung", phone: "022-555-0301" },
  { id: "mbg-2", email: "mbg2@demo.id", password: "mbg123", name: "Kepala Sekolah", role: "donor_mbg", org: "SDN Menteng 03 Jakarta", city: "Jakarta", phone: "021-555-0302" },
  // Restoran
  { id: "resto-1", email: "resto1@demo.id", password: "resto123", name: "Owner", role: "donor_restoran", org: "Sate Khas Senayan", city: "Jakarta", phone: "021-555-0401" },
  { id: "resto-2", email: "resto2@demo.id", password: "resto123", name: "Owner", role: "donor_restoran", org: "Kopi Kenangan Senopati", city: "Jakarta", phone: "021-555-0402" }
];
const STORAGE_KEY$4 = "panganpeduli_demo_user";
const AuthCtx = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY$4) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {
    }
    setLoading(false);
  }, []);
  const login = reactExports.useCallback((email, password) => {
    const e = email.trim().toLowerCase();
    const found = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === e);
    if (!found) return { ok: false, error: "Email tidak terdaftar pada akun demo." };
    if (found.password !== password) return { ok: false, error: "Password salah. Silakan coba lagi." };
    setUser(found);
    localStorage.setItem(STORAGE_KEY$4, JSON.stringify(found));
    return { ok: true, user: found };
  }, []);
  const signOut = reactExports.useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY$4);
    setUser(null);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthCtx.Provider, { value: { user, roles: user ? [user.role] : [], loading, login, signOut }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
function dashboardPathFor(role) {
  if (role === "admin") return "/admin";
  if (role === "penerima") return "/dashboard";
  return "/donor";
}
function isDonorRole(r) {
  return r === "donor_hotel" || r === "donor_restoran" || r === "donor_umkm" || r === "donor_mbg";
}
const ThemeContext = reactExports.createContext(void 0);
const STORAGE_KEY$3 = "theme";
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY$3);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);
  reactExports.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = (e) => {
      try {
        if (!window.localStorage.getItem(STORAGE_KEY$3)) {
          const t = e.matches ? "dark" : "light";
          setThemeState(t);
          applyTheme(t);
        }
      } catch {
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  const setTheme = reactExports.useCallback((t) => {
    setThemeState(t);
    applyTheme(t);
    try {
      window.localStorage.setItem(STORAGE_KEY$3, t);
    } catch {
    }
  }, []);
  const toggleTheme = reactExports.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, setTheme, toggleTheme }, children });
}
function useTheme() {
  const ctx = reactExports.useContext(ThemeContext);
  if (!ctx) {
    return { theme: "light", setTheme: () => {
    }, toggleTheme: () => {
    } };
  }
  return ctx;
}
const themeInitScript = `(function(){try{var k='theme';var s=localStorage.getItem(k);var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.style.colorScheme='light';}}catch(e){}})();`;
const appCss = "/assets/styles-ClZfVdCD.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Halaman tidak ditemukan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Halaman yang Anda cari tidak tersedia atau telah dipindahkan." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Kembali ke beranda"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Halaman ini gagal dimuat" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Coba muat ulang atau kembali ke beranda." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          children: "Coba lagi"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent", children: "Beranda" })
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PanganPeduli — Satu Porsi, Satu Kepedulian" },
      { name: "description", content: "Platform distribusi makanan surplus nasional. Hubungkan hotel, restoran, UMKM, dan Program MBG dengan masyarakat yang membutuhkan." },
      { name: "author", content: "PanganPeduli" },
      { property: "og:title", content: "PanganPeduli — Satu Porsi, Satu Kepedulian" },
      { property: "og:description", content: "Selamatkan makanan, bantu sesama. Platform food rescue digital untuk Indonesia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "id", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: themeInitScript } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true })
  ] }) }) });
}
const $$splitComponentImporter$9 = () => import("./cari-JWoNt430.mjs");
const Route$9 = createFileRoute("/cari")({
  head: () => ({
    meta: [{
      title: "Cari Makanan Surplus Terdekat — PanganPeduli"
    }, {
      name: "description",
      content: "Cari makanan surplus terdekat dari hotel, restoran, UMKM, dan Program MBG."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./auth-DU9tmHhN.mjs");
const searchSchema = objectType({
  mode: enumType(["login", "register"]).optional()
});
const Route$8 = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Masuk / Daftar — PanganPeduli"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./route-BFsOu0JM.mjs");
const STORAGE_KEY$2 = "panganpeduli_demo_user";
const Route$7 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY$2) : null;
    if (!raw) throw redirect({
      to: "/auth",
      search: {
        mode: "login"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-BFTyoD5X.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "PanganPeduli — Selamatkan Makanan, Bantu Sesama"
    }, {
      name: "description",
      content: "Platform distribusi makanan surplus nasional yang menghubungkan hotel, restoran, UMKM, dan Program MBG dengan masyarakat yang membutuhkan."
    }, {
      property: "og:title",
      content: "PanganPeduli — Satu Porsi, Satu Kepedulian"
    }, {
      property: "og:description",
      content: "Selamatkan makanan, bantu sesama. Bergabunglah dengan gerakan food rescue nasional."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./mitra._slug-D30R8LpF.mjs");
const $$splitErrorComponentImporter$2 = () => import("./mitra._slug-BYKoW2xL.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./mitra._slug-Dh8yQQRR.mjs");
const Route$5 = createFileRoute("/mitra/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Mitra ${params.slug} — PanganPeduli`
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./listing._id-BY2SFwDa.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./listing._id-seZ8wQes.mjs");
const $$splitErrorComponentImporter$1 = () => import("./listing._id-BYKoW2xL.mjs");
const Route$4 = createFileRoute("/listing/$id")({
  head: () => ({
    meta: [{
      title: "Detail Makanan — PanganPeduli"
    }]
  }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const CATEGORY_LABEL = {
  mbg: "Program MBG",
  hotel: "Hotel",
  umkm: "UMKM & Warung",
  restoran: "Restoran & Cafe"
};
const CATEGORY_DESC = {
  mbg: "Sekolah & instansi pelaksana Program Makan Bergizi Gratis",
  hotel: "Hotel berbintang dengan surplus harian",
  umkm: "Usaha mikro & warung lokal",
  restoran: "Restoran & cafe dengan menu hari ini"
};
function formatCountdown(iso) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Kedaluwarsa";
  const m = Math.floor(ms / 6e4);
  const s = Math.floor(ms % 6e4 / 1e3);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}j ${m % 60}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}
const $$splitComponentImporter$3 = () => import("./kategori._category-CLXWOjDm.mjs");
const $$splitErrorComponentImporter = () => import("./kategori._category-BYKoW2xL.mjs");
const $$splitNotFoundComponentImporter = () => import("./kategori._category-B_0ths53.mjs");
const VALID = ["mbg", "hotel", "umkm", "restoran"];
const Route$3 = createFileRoute("/kategori/$category")({
  beforeLoad: ({
    params
  }) => {
    if (!VALID.includes(params.category)) throw notFound();
  },
  head: ({
    params
  }) => ({
    meta: [{
      title: `${CATEGORY_LABEL[params.category] ?? "Kategori"} — PanganPeduli`
    }, {
      name: "description",
      content: CATEGORY_DESC[params.category] ?? ""
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./donor-7sex_SAd.mjs");
const STORAGE_KEY$1 = "panganpeduli_demo_user";
const Route$2 = createFileRoute("/_authenticated/donor")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Dashboard Donor — PanganPeduli"
    }]
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY$1);
    if (!raw) throw redirect({
      to: "/auth",
      search: {
        mode: "login"
      }
    });
    const u = JSON.parse(raw);
    if (!isDonorRole(u.role)) throw redirect({
      to: u.role === "admin" ? "/admin" : "/dashboard"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard-DIG2xpr0.mjs");
const Route$1 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard Saya — PanganPeduli"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
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
const $$splitComponentImporter = () => import("./admin-Bns36zot.mjs");
const STORAGE_KEY = "panganpeduli_demo_user";
const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Admin — PanganPeduli"
    }]
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw redirect({
      to: "/auth",
      search: {
        mode: "login"
      }
    });
    const u = JSON.parse(raw);
    if (u.role !== "admin") throw redirect({
      to: u.role === "penerima" ? "/dashboard" : "/donor"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const CariRoute = Route$9.update({
  id: "/cari",
  path: "/cari",
  getParentRoute: () => Route$a
});
const AuthRoute = Route$8.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$a
});
const AuthenticatedRouteRoute = Route$7.update({
  id: "/_authenticated",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const MitraSlugRoute = Route$5.update({
  id: "/mitra/$slug",
  path: "/mitra/$slug",
  getParentRoute: () => Route$a
});
const ListingIdRoute = Route$4.update({
  id: "/listing/$id",
  path: "/listing/$id",
  getParentRoute: () => Route$a
});
const KategoriCategoryRoute = Route$3.update({
  id: "/kategori/$category",
  path: "/kategori/$category",
  getParentRoute: () => Route$a
});
const AuthenticatedDonorRoute = Route$2.update({
  id: "/donor",
  path: "/donor",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRoute = Route.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedDonorRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  CariRoute,
  KategoriCategoryRoute,
  ListingIdRoute,
  MitraSlugRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CATEGORY_LABEL as C,
  DEMO_ACCOUNTS as D,
  Route$8 as R,
  Route$5 as a,
  Route$4 as b,
  Route$3 as c,
  dashboardPathFor as d,
  CATEGORY_DESC as e,
  formatCountdown as f,
  RoleHeader as g,
  useTheme as h,
  router as r,
  useAuth as u
};
