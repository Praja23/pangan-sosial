import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as reactDomExports } from "../_libs/react-dom.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getReportReasons, a as addReport } from "./reports-H3a1bCaM.mjs";
import { u as useAuth } from "./router-B0zevO1-.mjs";
import { O as Flag, R as ShieldAlert, V as TriangleAlert, X, W as Check } from "../_libs/lucide-react.mjs";
function ReportDialog({ open, onClose, target, targetLabel, targetType }) {
  const { user } = useAuth();
  const reasons = getReportReasons(targetType);
  const [reason, setReason] = reactExports.useState(reasons[0]);
  const [details, setDetails] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      setReason(reasons[0]);
      setDetails("");
      setSuccess(false);
    }
  }, [open, reasons]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open || typeof window === "undefined") return null;
  const submit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Masuk dulu untuk mengirim laporan");
      return;
    }
    if (details.trim().length < 10) {
      toast.error("Mohon jelaskan minimal 10 karakter");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addReport({
        target,
        targetLabel,
        targetType,
        reason,
        details: details.trim(),
        reporter: user.email,
        reporterRole: user.role
      });
      setSubmitting(false);
      setSuccess(true);
      toast.success("Laporan terkirim. Tim admin akan meninjau.");
      setTimeout(() => onClose(), 1400);
    }, 500);
  };
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] grid place-items-center px-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Tutup",
          onClick: onClose,
          className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24 bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-destructive/20 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 -right-6 w-32 h-32 rounded-full bg-destructive/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-8 -left-6 w-32 h-32 rounded-full bg-amber-500/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex items-center gap-3 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-background/80 backdrop-blur grid place-items-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-6 h-6 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold leading-tight", children: "Laporkan ke Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
                "Target: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: targetLabel })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur grid place-items-center hover:bg-background transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
        ] }),
        success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center animate-in fade-in duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-success/15 text-success grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Laporan terkirim" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Admin akan meninjau dalam 1×24 jam. Terima kasih telah menjaga komunitas." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-amber-900 dark:text-amber-200/90", children: [
              "Setelah ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "3 warning" }),
              " terverifikasi, akun yang dilaporkan akan ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "otomatis disuspend" }),
              " dari platform."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Kategori Pelanggaran" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2", children: reasons.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `cursor-pointer flex items-start gap-2 p-2.5 rounded-xl border text-xs transition ${reason === r ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "reason", value: r, checked: reason === r, onChange: () => setReason(r), className: "mt-0.5 accent-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium leading-tight", children: r })
            ] }, r)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Deskripsi (wajib, min. 10 karakter)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: details,
                onChange: (e) => setDetails(e.target.value),
                rows: 4,
                maxLength: 500,
                placeholder: "Jelaskan kronologi singkat & bukti yang Anda miliki…",
                className: "mt-2 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-right text-muted-foreground mt-1", children: [
              details.length,
              "/500"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-accent transition", children: "Batal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                disabled: submitting,
                className: "flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-destructive to-rose-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60 inline-flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" }),
                  " ",
                  submitting ? "Mengirim…" : "Kirim Laporan"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    document.body
  );
}
function ReportButton(props) {
  const [open, setOpen] = reactExports.useState(false);
  const { user } = useAuth();
  const variant = props.variant ?? "outline";
  const base = "inline-flex items-center gap-1.5 text-xs font-semibold transition";
  const styles = variant === "ghost" ? "text-muted-foreground hover:text-destructive" : variant === "soft" ? "px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/15" : "px-3 py-2 rounded-lg border border-border hover:border-destructive/50 hover:text-destructive";
  const handle = () => {
    if (!user) {
      toast.error("Masuk dulu untuk melaporkan");
      return;
    }
    setOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handle, className: `${base} ${styles} ${props.className ?? ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
      " ",
      props.label ?? "Laporkan"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReportDialog, { open, onClose: () => setOpen(false), target: props.target, targetLabel: props.targetLabel, targetType: props.targetType })
  ] });
}
function AccountStatusBanner({ warnings, suspended }) {
  if (warnings <= 0) return null;
  if (suspended) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-destructive text-destructive-foreground grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-destructive", children: "Akun Anda di-suspend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive/80 mt-0.5", children: [
          "Akun mencapai 3 warning dari admin. Anda tidak dapat membuat reservasi atau mempublikasikan listing baru. Ajukan banding dengan menghubungi ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "support@panganpeduli.id" }),
          "."
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500 text-white grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-amber-700 dark:text-amber-300", children: [
        "Peringatan: ",
        warnings,
        "/3"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800/80 dark:text-amber-200/80 mt-0.5", children: "Akun Anda menerima warning dari admin. Pada warning ke-3, akun akan otomatis di-suspend dari platform." })
    ] })
  ] });
}
export {
  AccountStatusBanner as A,
  ReportButton as R,
  ReportDialog as a
};
