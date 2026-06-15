import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, h as useTheme } from "./router-B0zevO1-.mjs";
import { d as Leaf, g as Shield, _ as LayoutDashboard, U as User, $ as LogOut, X, a0 as Menu, a1 as Sun, a2 as Moon } from "../_libs/lucide-react.mjs";
function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      ref,
      className: `reveal ${className}`,
      style: { transitionDelay: `${delay}ms`, ...style },
      children
    }
  );
}
function ScrollProgress() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      el.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "scroll-progress", "aria-hidden": true });
}
function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      "aria-label": isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap",
      title: isDark ? "Mode terang" : "Mode gelap",
      className: `relative grid place-items-center w-9 h-9 rounded-lg border border-border bg-background/60 hover:bg-accent text-foreground transition-colors ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Sun,
          {
            className: `w-4 h-4 transition-all duration-500 ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Moon,
          {
            className: `absolute w-4 h-4 transition-all duration-500 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`
          }
        )
      ]
    }
  );
}
function SiteNav() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { user, roles, signOut } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isAdmin = roles.includes("admin");
  const isDonor = roles.some((r) => r.startsWith("donor_"));
  const links = [
    { to: "/", label: "Beranda" },
    { to: "/cari", label: "Cari Makanan" },
    { to: "/kategori/mbg", label: "MBG" },
    { to: "/kategori/hotel", label: "Hotel" },
    { to: "/kategori/umkm", label: "UMKM" },
    { to: "/kategori/restoran", label: "Restoran" }
  ];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: `fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-card shadow-soft" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-2 font-display font-bold text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid place-items-center w-9 h-9 rounded-xl bg-[image:var(--gradient-warm)] shadow-glow group-hover:scale-110 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-primary-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-xl animate-ring-pulse", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Pangan",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Peduli" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground", children: links.map((l) => {
          const active = pathname === l.to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: l.to,
              className: `relative px-3 py-2 rounded-lg transition-colors hover:text-foreground ${active ? "text-foreground" : ""}`,
              children: [
                l.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-warm)] origin-left transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`
                  }
                )
              ]
            },
            l.to
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
              " Admin"
            ] }),
            isDonor && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/donor", className: "text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" }),
              " Donor"
            ] }),
            !isAdmin && !isDonor && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              " Saya"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
              await signOut();
              navigate({ to: "/" });
            }, className: "text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              " Keluar"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "login" }, className: "text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent", children: "Masuk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "register" }, className: "text-sm font-semibold px-4 py-2 rounded-lg bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity", children: "Daftar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2", onClick: () => setOpen(!open), "aria-label": "Menu", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) })
        ] })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden mt-2 glass-card rounded-2xl p-4 animate-fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "px-3 py-2 rounded-lg hover:bg-accent", onClick: () => setOpen(false), children: l.label }, l.to)),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "px-3 py-2 rounded-lg hover:bg-accent", onClick: () => setOpen(false), children: "Dashboard Saya" }),
          isDonor && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/donor", className: "px-3 py-2 rounded-lg hover:bg-accent", onClick: () => setOpen(false), children: "Dashboard Donor" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "px-3 py-2 rounded-lg hover:bg-accent", onClick: () => setOpen(false), children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
            await signOut();
            setOpen(false);
            navigate({ to: "/" });
          }, className: "px-3 py-2 text-left rounded-lg hover:bg-accent", children: "Keluar" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "login" }, className: "px-3 py-2 rounded-lg hover:bg-accent", onClick: () => setOpen(false), children: "Masuk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "register" }, className: "px-3 py-2 rounded-lg bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold", onClick: () => setOpen(false), children: "Daftar" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function SiteFooter() {
  const cols = [
    {
      title: "Jelajah",
      links: [
        { to: "/", label: "Beranda" },
        { to: "/cari", label: "Cari Makanan" }
      ]
    },
    {
      title: "Kategori",
      links: [
        { to: "/kategori/mbg", label: "Program MBG" },
        { to: "/kategori/hotel", label: "Hotel" },
        { to: "/kategori/restoran", label: "Restoran" },
        { to: "/kategori/umkm", label: "UMKM" }
      ]
    },
    {
      title: "Mitra",
      links: [
        { to: "/auth", label: "Daftar Mitra" },
        { to: "/auth", label: "Masuk" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative mt-20 border-t border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 -z-10 opacity-60",
        style: { background: "var(--gradient-mesh)" },
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-display font-bold text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center w-9 h-9 rounded-xl bg-[image:var(--gradient-warm)] shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Pangan",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Peduli" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Satu porsi, satu kepedulian. Platform food rescue nasional untuk Indonesia tanpa food waste." })
      ] }),
      cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: c.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-300",
            children: l.label
          }
        ) }, l.label)) })
      ] }, c.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 PanganPeduli — Dibangun untuk Indonesia tanpa food waste." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-success animate-pulse" }),
        "Sistem aktif & mendistribusikan"
      ] })
    ] }) })
  ] });
}
export {
  Reveal as R,
  SiteNav as S,
  SiteFooter as a
};
