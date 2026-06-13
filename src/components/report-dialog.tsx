import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Flag, X, ShieldAlert, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { addReport, getReportReasons, type ReportTargetType } from "@/lib/reports";
import { useAuth } from "@/lib/auth-context";

type Props = {
  open: boolean;
  onClose: () => void;
  target: string;
  targetLabel: string;
  targetType: ReportTargetType;
};

export function ReportDialog({ open, onClose, target, targetLabel, targetType }: Props) {
  const { user } = useAuth();
  const reasons = getReportReasons(targetType);
  const [reason, setReason] = useState<string>(reasons[0]);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) { setReason(reasons[0]); setDetails(""); setSuccess(false); }
  }, [open, reasons]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Masuk dulu untuk mengirim laporan"); return; }
    if (details.trim().length < 10) { toast.error("Mohon jelaskan minimal 10 karakter"); return; }
    setSubmitting(true);
    setTimeout(() => {
      addReport({
        target,
        targetLabel,
        targetType,
        reason,
        details: details.trim(),
        reporter: user.email,
        reporterRole: user.role,
      });
      setSubmitting(false);
      setSuccess(true);
      toast.success("Laporan terkirim. Tim admin akan meninjau.");
      setTimeout(() => onClose(), 1400);
    }, 500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center px-4 animate-in fade-in duration-200">
      <button aria-label="Tutup" onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header strip */}
        <div className="relative h-24 bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-destructive/20 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-destructive/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 w-32 h-32 rounded-full bg-amber-500/20 blur-2xl" />
          <div className="relative h-full flex items-center gap-3 px-6">
            <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur grid place-items-center shadow-lg">
              <ShieldAlert className="w-6 h-6 text-destructive" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-bold leading-tight">Laporkan ke Admin</div>
              <div className="text-xs text-muted-foreground truncate">Target: <span className="font-semibold text-foreground">{targetLabel}</span></div>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur grid place-items-center hover:bg-background transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/15 text-success grid place-items-center mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold">Laporan terkirim</h3>
            <p className="text-sm text-muted-foreground mt-1">Admin akan meninjau dalam 1×24 jam. Terima kasih telah menjaga komunitas.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-5">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex gap-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-900 dark:text-amber-200/90">
                Setelah <b>3 warning</b> terverifikasi, akun yang dilaporkan akan <b>otomatis disuspend</b> dari platform.
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kategori Pelanggaran</label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reasons.map((r) => (
                  <label key={r} className={`cursor-pointer flex items-start gap-2 p-2.5 rounded-xl border text-xs transition ${reason === r ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`}>
                    <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="mt-0.5 accent-primary" />
                    <span className="font-medium leading-tight">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deskripsi (wajib, min. 10 karakter)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Jelaskan kronologi singkat & bukti yang Anda miliki…"
                className="mt-2 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              />
              <div className="text-[10px] text-right text-muted-foreground mt-1">{details.length}/500</div>
            </div>

            <div className="flex gap-2 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-accent transition">Batal</button>
              <button type="submit" disabled={submitting}
                className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-destructive to-rose-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60 inline-flex items-center justify-center gap-2">
                <Flag className="w-4 h-4" /> {submitting ? "Mengirim…" : "Kirim Laporan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

/** Tombol pelaporan yang reusable. */
export function ReportButton(props: { target: string; targetLabel: string; targetType: ReportTargetType; variant?: "ghost" | "outline" | "soft"; className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const variant = props.variant ?? "outline";
  const base = "inline-flex items-center gap-1.5 text-xs font-semibold transition";
  const styles =
    variant === "ghost" ? "text-muted-foreground hover:text-destructive"
    : variant === "soft" ? "px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/15"
    : "px-3 py-2 rounded-lg border border-border hover:border-destructive/50 hover:text-destructive";

  const handle = () => {
    if (!user) { toast.error("Masuk dulu untuk melaporkan"); return; }
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handle} className={`${base} ${styles} ${props.className ?? ""}`}>
        <Flag className="w-3.5 h-3.5" /> {props.label ?? "Laporkan"}
      </button>
      <ReportDialog open={open} onClose={() => setOpen(false)} target={props.target} targetLabel={props.targetLabel} targetType={props.targetType} />
    </>
  );
}

/** Banner status akun: tampil saat akun pengguna menerima warning / suspend. */
export function AccountStatusBanner({ warnings, suspended }: { warnings: number; suspended: boolean }) {
  if (warnings <= 0) return null;
  if (suspended) {
    return (
      <div className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-destructive text-destructive-foreground grid place-items-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display font-bold text-destructive">Akun Anda di-suspend</div>
          <p className="text-xs text-destructive/80 mt-0.5">
            Akun mencapai 3 warning dari admin. Anda tidak dapat membuat reservasi atau mempublikasikan listing baru.
            Ajukan banding dengan menghubungi <b>support@panganpeduli.id</b>.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white grid place-items-center shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="font-display font-bold text-amber-700 dark:text-amber-300">Peringatan: {warnings}/3</div>
        <p className="text-xs text-amber-800/80 dark:text-amber-200/80 mt-0.5">
          Akun Anda menerima warning dari admin. Pada warning ke-3, akun akan otomatis di-suspend dari platform.
        </p>
      </div>
    </div>
  );
}