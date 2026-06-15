import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as SiteNav, a as SiteFooter } from "./site-nav-BKggc9Q9.mjs";
import { u as useAuth, g as RoleHeader, D as DEMO_ACCOUNTS } from "./router-B0zevO1-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDemoStore, a as useTick, h as getUserListings, i as getReservations, j as updateReservation, f as formatIDR, k as addUserListing, l as removeUserListing, s as sellerClaimPickup, m as sellerMarkProblem } from "./demo-data-X3DTJBeN.mjs";
import { A as AccountStatusBanner, a as ReportDialog } from "./report-dialog-2K3rjmGt.mjs";
import { u as useReportsStore, c as checkUserStatus, i as isSuspended } from "./reports-H3a1bCaM.mjs";
import "../_libs/react-dom.mjs";
import { u as Package, z as TrendingUp, x as Tag, D as Award, E as Upload, k as Image, w as Plus, J as Trash2, C as Clock, T as Trophy, n as Users, h as Mail, P as Phone, c as CircleCheck, K as CircleX } from "../_libs/lucide-react.mjs";
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
function roleToCategory(r) {
  if (r === "donor_hotel") return "hotel";
  if (r === "donor_umkm") return "umkm";
  if (r === "donor_mbg") return "mbg";
  return "restoran";
}
const FALLBACK_IMG = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800";
function DonorDashboard() {
  useDemoStore();
  useTick(1e3);
  useReportsStore();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const myCategory = roleToCategory(user?.role ?? "donor_restoran");
  const isMBG = myCategory === "mbg";
  const fileRef = reactExports.useRef(null);
  const [title, setTitle] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [portions, setPortions] = reactExports.useState(10);
  const [price, setPrice] = reactExports.useState(isMBG ? 0 : 5e3);
  const [expIn, setExpIn] = reactExports.useState(90);
  const [photo, setPhoto] = reactExports.useState("");
  const items = getUserListings().filter((l) => l.category === myCategory);
  const reservations = user ? getReservations().filter((r) => r.partnerId === user.id || r.partnerName === user.org) : [];
  const identifiers = [user?.email ?? "", user?.org ?? ""].filter(Boolean);
  const status = checkUserStatus(identifiers);
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
  const stats = reactExports.useMemo(() => ({
    totalPorsi: items.reduce((s, l) => s + l.portions_total, 0),
    totalListing: items.length,
    avgPrice: items.length ? Math.round(items.reduce((s, l) => s + l.price, 0) / items.length) : 0,
    level: items.length >= 10 ? "Hero Mitra" : items.length >= 5 ? "Mitra Aktif" : "Mitra Baru"
  }), [items]);
  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      toast.error("Foto maksimal 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };
  const computePriority = (mins) => {
    if (mins <= 60) return "🔥 Prioritas Tinggi";
    if (mins <= 120) return "⚡ Segera Diambil";
    return "🌟 Dampak Sosial Tinggi";
  };
  const add = (e) => {
    e.preventDefault();
    if (user && (isSuspended(user.email) || user.org && isSuspended(user.org))) {
      return toast.error("Akun Anda di-suspend dan tidak dapat mempublikasikan listing.");
    }
    if (!title.trim()) return toast.error("Judul wajib diisi");
    if (portions < 1) return toast.error("Jumlah porsi minimal 1");
    if (!isMBG && price > 1e4) return toast.error("Harga maksimal Rp 10.000 untuk non-MBG");
    if (price < 0) return toast.error("Harga tidak valid");
    const finalPrice = isMBG ? 0 : price;
    const id = "u-" + crypto.randomUUID();
    const newListing = {
      id,
      partner_id: user?.id ?? "user",
      title: title.trim(),
      description: desc.trim() || "Makanan surplus dari " + (user?.org ?? user?.name ?? "mitra"),
      image_url: photo || FALLBACK_IMG,
      portions_total: portions,
      price: finalPrice,
      expires_in_min: expIn,
      expires_at: new Date(Date.now() + expIn * 6e4).toISOString(),
      pickup_address: user?.city ? `${user.org ?? user.name}, ${user.city}` : user?.org ?? "Lokasi mitra",
      category: myCategory,
      priority_label: computePriority(expIn)
    };
    addUserListing(newListing);
    setTitle("");
    setDesc("");
    setPortions(10);
    setPrice(isMBG ? 0 : 5e3);
    setExpIn(90);
    setPhoto("");
    if (fileRef.current) fileRef.current.value = "";
    toast.success("Listing makanan berhasil dipublikasikan");
  };
  const remove = (id) => {
    removeUserListing(id);
    toast.success("Listing dihapus");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleHeader, { title: `Donor · ${user?.org ?? user?.name}`, subtitle: "Kelola makanan surplus & lihat dampak Anda.", role: roleLabel(user?.role), onSignOut: async () => {
        await signOut();
        navigate({
          to: "/"
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccountStatusBanner, { warnings: status.warnings, suspended: status.suspended }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Package, label: "Total Porsi Aktif", value: String(stats.totalPorsi), tint: "bg-primary/10 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: TrendingUp, label: "Total Listing", value: String(stats.totalListing), tint: "bg-emerald-500/10 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Tag, label: "Rata-rata Harga", value: isMBG ? "Gratis" : formatIDR(stats.avgPrice), tint: "bg-amber-500/10 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Award, label: "Level Mitra", value: stats.level, tint: "bg-rose-500/10 text-rose-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid lg:grid-cols-[1fr_1.6fr] gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "glass-card rounded-2xl p-6 space-y-3 self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-primary" }),
            " Upload Makanan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Foto Makanan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-3", children: [
              photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo, alt: "preview", className: "w-20 h-20 rounded-xl object-cover border border-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl border border-dashed border-border grid place-items-center text-muted-foreground bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", onChange: onPickFile, className: "text-xs flex-1" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Judul / Menu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), maxLength: 120, placeholder: "Mis. Nasi Box Sisa Acara", className: "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Deskripsi singkat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: desc, onChange: (e) => setDesc(e.target.value), maxLength: 300, rows: 2, placeholder: "Mis. Masih hangat, kemasan box", className: "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Porsi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: portions, onChange: (e) => setPortions(+e.target.value), className: "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Habis dlm (menit)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 15, value: expIn, onChange: (e) => setExpIn(+e.target.value), className: "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-background" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
              " Harga per porsi ",
              isMBG ? "(MBG • wajib gratis)" : "(maks Rp 10.000)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Rp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: isMBG ? 0 : 1e4, step: 500, disabled: isMBG, value: isMBG ? 0 : price, onChange: (e) => setPrice(Math.min(1e4, Math.max(0, +e.target.value))), className: "flex-1 px-3 py-2 rounded-xl border border-border bg-background disabled:opacity-60" })
            ] }),
            !isMBG && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Harga max untuk Hotel / UMKM / Restoran adalah Rp 10.000." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full py-2.5 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant inline-flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Publikasikan Sekarang"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold mb-3", children: "Listing Aktif Saya" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl p-8 text-center text-sm text-muted-foreground", children: "Belum ada listing. Upload makanan pertama Anda di kiri." }),
            items.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image_url, alt: l.title, className: "w-20 h-20 rounded-xl object-cover shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold truncate", children: l.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(l.id), className: "shrink-0 p-1.5 rounded-lg hover:bg-destructive/10 text-destructive", "aria-label": "Hapus", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-1", children: l.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { icon: Package, text: `${l.portions_total} porsi` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { icon: Clock, text: `${l.expires_in_min}m` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { icon: Tag, text: formatIDR(l.price), tint: "bg-primary/10 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { icon: Trophy, text: l.priority_label, tint: "bg-amber-500/10 text-amber-700" })
                ] })
              ] })
            ] }, l.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReservationsPanel, { reservations })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function roleLabel(r) {
  if (r === "donor_hotel") return "Hotel";
  if (r === "donor_umkm") return "UMKM";
  if (r === "donor_mbg") return "MBG / Sekolah";
  if (r === "donor_restoran") return "Restoran";
  return "Donor";
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
function Pill({
  icon: Icon,
  text,
  tint = "bg-secondary text-foreground"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tint}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
    " ",
    text
  ] });
}
function ReservationsPanel({
  reservations
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 glass-card rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-destructive/10 text-destructive grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Penerima yang Reservasi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Data penerima tampil otomatis dari reservasi listing Anda, jadi laporan ke admin tidak perlu mengetik email manual." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
      reservations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-secondary/50 p-4 text-center text-xs text-muted-foreground", children: "Belum ada penerima yang melakukan reservasi pada listing Anda." }),
      reservations.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReservationRow, { reservation: r }, r.id))
    ] })
  ] });
}
function ReservationRow({
  reservation
}) {
  const [reportOpen, setReportOpen] = reactExports.useState(false);
  const account = DEMO_ACCOUNTS.find((a) => a.id === reservation.userId || a.email === reservation.userEmail);
  const email = reservation.userEmail ?? account?.email ?? reservation.userId;
  const phone = reservation.userPhone ?? account?.phone ?? "Belum tersedia";
  const targetLabel = `${reservation.userName} · ${email}`;
  const finalized = reservation.status === "picked_up";
  const confirmPickup = () => {
    const res = sellerClaimPickup(reservation.id);
    if (!res.ok) {
      toast.error(res.error ?? "Tidak bisa mengkonfirmasi");
      return;
    }
    toast.success("Pengambilan dikonfirmasi. Stok final.");
  };
  const markProblem = () => {
    const res = sellerMarkProblem(reservation.id);
    if (!res.ok) {
      toast.error(res.error ?? "Tidak bisa menandai bermasalah");
      return;
    }
    toast.success("Ditandai bermasalah & stok dikembalikan. Anda bisa lapor ke admin.");
    setReportOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/70 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: reservation.image, alt: reservation.listingTitle, className: "w-full sm:w-20 h-24 sm:h-20 rounded-xl object-cover bg-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm truncate", children: reservation.userName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: reservation.listingTitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${reservation.status === "picked_up" ? "bg-success/10 text-success" : reservation.status === "cancelled" ? "bg-destructive/10 text-destructive" : reservation.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: reservation.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" }),
            reservation.portions,
            " porsi · ",
            formatIDR(reservation.price * reservation.portions)
          ] })
        ] })
      ] })
    ] }),
    finalized && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl bg-success/10 border border-success/40 px-3 py-2 text-[11px] text-success", children: "Anda sudah mengkonfirmasi pengambilan. Stok final — tidak bisa diubah." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: confirmPickup, disabled: reservation.status !== "active", className: "flex-1 py-2 rounded-lg bg-success/10 text-success text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        " Sudah Diambil (final)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: markProblem, disabled: reservation.status !== "active", className: "flex-1 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
        " Tidak Hadir / Bermasalah"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setReportOpen(true), className: "px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent", children: "Lapor ke Admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-muted-foreground", children: 'Aturan stok: pembeli yang berkuasa atas konfirmasi pengambilan. "Sudah Diambil" hanya mengirim notifikasi & menunggu persetujuan pembeli, untuk mencegah penyalahgunaan.' }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReportDialog, { open: reportOpen, onClose: () => setReportOpen(false), target: email, targetLabel, targetType: "penerima" })
  ] });
}
export {
  DonorDashboard as component
};
