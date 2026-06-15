import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, R as Route$8, d as dashboardPathFor, D as DEMO_ACCOUNTS } from "./router-B0zevO1-.mjs";
import { d as Leaf, e as ChefHat, G as GraduationCap, f as Store, H as Hotel, U as User, g as Shield, h as Mail, i as Lock, L as LoaderCircle, I as Info, P as Phone, B as Building2, j as Copy, k as Image } from "../_libs/lucide-react.mjs";
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
const ROLE_META = {
  admin: {
    label: "Admin",
    icon: Shield,
    tint: "bg-rose-500/10 text-rose-600"
  },
  penerima: {
    label: "Penerima",
    icon: User,
    tint: "bg-primary/10 text-primary"
  },
  donor_hotel: {
    label: "Hotel",
    icon: Hotel,
    tint: "bg-amber-500/10 text-amber-600"
  },
  donor_umkm: {
    label: "UMKM",
    icon: Store,
    tint: "bg-emerald-500/10 text-emerald-600"
  },
  donor_mbg: {
    label: "MBG / Sekolah",
    icon: GraduationCap,
    tint: "bg-blue-500/10 text-blue-600"
  },
  donor_restoran: {
    label: "Restoran",
    icon: ChefHat,
    tint: "bg-violet-500/10 text-violet-600"
  }
};
const REGISTER_ROLES = [{
  role: "penerima",
  label: "Penerima / Masyarakat"
}, {
  role: "donor_mbg",
  label: "MBG / Sekolah"
}, {
  role: "donor_hotel",
  label: "Hotel"
}, {
  role: "donor_umkm",
  label: "UMKM / Warung"
}, {
  role: "donor_restoran",
  label: "Restoran & Cafe"
}];
function AuthPage() {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const {
    mode
  } = Route$8.useSearch();
  const [tab, setTab] = reactExports.useState(mode === "register" ? "register" : "login");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-32 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 grid lg:grid-cols-[1fr_1.1fr] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center lg:text-left mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-grid place-items-center w-14 h-14 rounded-2xl bg-[image:var(--gradient-warm)] shadow-glow mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-7 h-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold", children: [
            tab === "login" ? "Masuk ke" : "Daftar ke",
            " PanganPeduli"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: tab === "login" ? "Gunakan salah satu akun demo di sebelah kanan." : "Daftarkan diri atau mitra Anda untuk bergabung." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-2 mb-4 grid grid-cols-2 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("login"), className: `py-2.5 rounded-2xl transition ${tab === "login" ? "bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant" : "text-muted-foreground"}`, children: "Masuk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("register"), className: `py-2.5 rounded-2xl transition ${tab === "register" ? "bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant" : "text-muted-foreground"}`, children: "Daftar" })
        ] }),
        tab === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, { login, onSuccess: (role) => navigate({
          to: dashboardPathFor(role)
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, { onDone: () => setTab("login") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: "Akun Demo Siap Pakai" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Klik kartu untuk auto-isi kredensial." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-full bg-primary/10 text-primary", children: "FE only" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1", children: DEMO_ACCOUNTS.map((a) => {
          const meta = ROLE_META[a.role];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            document.getElementById("auth-email")?.focus();
            window.dispatchEvent(new CustomEvent("pp-fill-demo", {
              detail: a
            }));
          }, className: "text-left p-3 rounded-2xl border border-border hover:border-primary/60 hover:bg-accent/40 transition group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-lg grid place-items-center ${meta.tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(meta.icon, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: meta.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold truncate", children: a.org ?? a.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-[11px] font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "email", value: a.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "pass", value: a.password })
            ] })
          ] }, a.id);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function LoginForm({
  login,
  onSuccess
}) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  if (typeof window !== "undefined") {
    window.__pp_fill_handler__ ||= (e) => {
      setEmail(e.detail.email);
      setPassword(e.detail.password);
      toast.success("Kredensial diisi. Klik Masuk.");
    };
    window.removeEventListener("pp-fill-demo", window.__pp_fill_handler__);
    window.addEventListener("pp-fill-demo", window.__pp_fill_handler__);
  }
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success(`Selamat datang, ${res.user.name}`);
      onSuccess(res.user.role);
    }, 250);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "glass-card rounded-3xl p-6 sm:p-8 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "auth-email", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }), label: "Email", type: "email", value: email, onChange: setEmail, required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }), label: "Password", type: "password", value: password, onChange: setPassword, required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading, className: "w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant disabled:opacity-60 flex items-center justify-center gap-2", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
      " Masuk"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary/60 p-3 flex gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Mode ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "demo frontend" }),
        " — gunakan akun pada panel kanan untuk mencoba setiap dashboard role."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary font-semibold", children: "← Kembali ke beranda" }) })
  ] });
}
function RegisterForm({
  onDone
}) {
  reactExports.useRef(null);
  const [role, setRole] = reactExports.useState("penerima");
  const [name, setName] = reactExports.useState("");
  const [org, setOrg] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("Jakarta");
  const [photo, setPhoto] = reactExports.useState("");
  const [docPhoto, setDocPhoto] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onPick = (set) => (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      toast.error("Foto maksimal 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set(reader.result);
    reader.readAsDataURL(f);
  };
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 4) return toast.error("Lengkapi nama, email, dan password (min 4 karakter)");
    if (!photo) return toast.error("Wajib upload foto profil / KTP");
    if (role !== "penerima" && !org.trim()) return toast.error("Nama mitra wajib diisi");
    if (role !== "penerima" && !docPhoto) return toast.error("Wajib upload foto dokumen legalitas (NIB/SK/NPWP)");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Pendaftaran berhasil diajukan (demo). Tim admin akan memverifikasi data Anda.");
      onDone();
    }, 600);
  };
  const isDonor = role !== "penerima";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "glass-card rounded-3xl p-6 sm:p-8 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Daftar sebagai" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2", children: REGISTER_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(r.role), className: `text-xs px-2 py-2 rounded-xl border text-center transition ${role === r.role ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"}`, children: r.label }, r.role)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }), label: "Nama Lengkap", value: name, onChange: setName, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }), label: "No. WhatsApp", value: phone, onChange: setPhone })
    ] }),
    isDonor && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }), label: "Nama Mitra / Organisasi", value: org, onChange: setOrg, required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }), label: "Email", type: "email", value: email, onChange: setEmail, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }), label: "Password", type: "password", value: password, onChange: setPassword, required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Kota" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full mt-1 px-3 py-2.5 rounded-xl border border-border bg-background", children: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Denpasar"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoField, { label: isDonor ? "Foto Pemilik / Penanggung Jawab" : "Foto Profil / KTP", value: photo, onPick: onPick(setPhoto), required: true }),
    isDonor && /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoField, { label: "Foto Dokumen Legalitas (NIB / SK Program / NPWP)", value: docPhoto, onPick: onPick(setDocPhoto), required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading, className: "w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant disabled:opacity-60 flex items-center justify-center gap-2", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
      " Daftar Sekarang"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-center text-muted-foreground", children: [
      "Mode ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "demo" }),
      ". Data tidak dikirim ke server — gunakan akun demo untuk login."
    ] })
  ] });
}
function PhotoField({
  label,
  value,
  onPick,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-medium text-muted-foreground", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-3", children: [
      value ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "preview", className: "w-16 h-16 rounded-xl object-cover border border-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl border border-dashed border-border grid place-items-center text-muted-foreground bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: onPick, className: "text-xs flex-1" })
    ] })
  ] });
}
function Row({
  label,
  value
}) {
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    toast.success(`${label} disalin`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase w-8", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground flex-1", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "p-1 rounded hover:bg-accent", "aria-label": `Salin ${label}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }) })
  ] });
}
function Field({
  icon,
  label,
  type = "text",
  value,
  onChange,
  required,
  id
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, type, required, value, onChange: (e) => onChange(e.target.value), className: `w-full ${icon ? "pl-9" : "pl-3"} pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30` })
    ] })
  ] });
}
export {
  AuthPage as component
};
