import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Leaf, Mail, Lock, Loader2, Copy, CheckCircle2, Info, Shield, User, Hotel as HotelIcon, Store, GraduationCap, ChefHat, Image as ImageIcon, Phone, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth, DEMO_ACCOUNTS, dashboardPathFor, type Role } from "@/lib/auth-context";

const searchSchema = z.object({ mode: z.enum(["login", "register"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Masuk / Daftar — PanganPeduli" }] }),
  component: AuthPage,
});

const ROLE_META: Record<Role, { label: string; icon: any; tint: string }> = {
  admin: { label: "Admin", icon: Shield, tint: "bg-rose-500/10 text-rose-600" },
  penerima: { label: "Penerima", icon: User, tint: "bg-primary/10 text-primary" },
  donor_hotel: { label: "Hotel", icon: HotelIcon, tint: "bg-amber-500/10 text-amber-600" },
  donor_umkm: { label: "UMKM", icon: Store, tint: "bg-emerald-500/10 text-emerald-600" },
  donor_mbg: { label: "MBG / Sekolah", icon: GraduationCap, tint: "bg-blue-500/10 text-blue-600" },
  donor_restoran: { label: "Restoran", icon: ChefHat, tint: "bg-violet-500/10 text-violet-600" },
};

const REGISTER_ROLES: Array<{ role: Role; label: string }> = [
  { role: "penerima", label: "Penerima / Masyarakat" },
  { role: "donor_mbg", label: "MBG / Sekolah" },
  { role: "donor_hotel", label: "Hotel" },
  { role: "donor_umkm", label: "UMKM / Warung" },
  { role: "donor_restoran", label: "Restoran & Cafe" },
];

function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mode } = Route.useSearch();
  const [tab, setTab] = useState<"login" | "register">(mode === "register" ? "register" : "login");

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1fr_1.1fr] gap-8">
          <div>
            <div className="text-center lg:text-left mb-6">
              <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-[image:var(--gradient-warm)] shadow-glow mb-4">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{tab === "login" ? "Masuk ke" : "Daftar ke"} PanganPeduli</h1>
              <p className="mt-2 text-muted-foreground">{tab === "login" ? "Gunakan salah satu akun demo di sebelah kanan." : "Daftarkan diri atau mitra Anda untuk bergabung."}</p>
            </div>

            <div className="glass-card rounded-3xl p-2 mb-4 grid grid-cols-2 text-sm font-semibold">
              <button onClick={() => setTab("login")} className={`py-2.5 rounded-2xl transition ${tab === "login" ? "bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant" : "text-muted-foreground"}`}>Masuk</button>
              <button onClick={() => setTab("register")} className={`py-2.5 rounded-2xl transition ${tab === "register" ? "bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant" : "text-muted-foreground"}`}>Daftar</button>
            </div>

            {tab === "login" ? <LoginForm login={login} onSuccess={(role) => navigate({ to: dashboardPathFor(role) })} /> : <RegisterForm onDone={() => setTab("login")} />}
          </div>

          {/* Demo accounts panel */}
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-bold">Akun Demo Siap Pakai</h2>
                <p className="text-xs text-muted-foreground mt-1">Klik kartu untuk auto-isi kredensial.</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-full bg-primary/10 text-primary">FE only</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1">
              {DEMO_ACCOUNTS.map((a) => {
                const meta = ROLE_META[a.role];
                return (
                  <button type="button" key={a.id}
                    onClick={() => { (document.getElementById("auth-email") as HTMLInputElement | null)?.focus(); window.dispatchEvent(new CustomEvent("pp-fill-demo", { detail: a })); }}
                    className="text-left p-3 rounded-2xl border border-border hover:border-primary/60 hover:bg-accent/40 transition group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg grid place-items-center ${meta.tint}`}><meta.icon className="w-4 h-4" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{meta.label}</div>
                        <div className="text-sm font-bold truncate">{a.org ?? a.name}</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-[11px] font-mono">
                      <Row label="email" value={a.email} />
                      <Row label="pass" value={a.password} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function LoginForm({ login, onSuccess }: { login: ReturnType<typeof useAuth>["login"]; onSuccess: (role: Role) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // dengarkan event fill-demo
  if (typeof window !== "undefined") {
    (window as any).__pp_fill_handler__ ||= (e: CustomEvent) => { setEmail(e.detail.email); setPassword(e.detail.password); toast.success("Kredensial diisi. Klik Masuk."); };
    window.removeEventListener("pp-fill-demo", (window as any).__pp_fill_handler__);
    window.addEventListener("pp-fill-demo", (window as any).__pp_fill_handler__);
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) { toast.error(res.error); return; }
      toast.success(`Selamat datang, ${res.user.name}`);
      onSuccess(res.user.role);
    }, 250);
  };

  return (
    <form onSubmit={submit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
      <Field id="auth-email" icon={<Mail className="w-4 h-4" />} label="Email" type="email" value={email} onChange={setEmail} required />
      <Field icon={<Lock className="w-4 h-4" />} label="Password" type="password" value={password} onChange={setPassword} required />
      <button disabled={loading} className="w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant disabled:opacity-60 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />} Masuk
      </button>
      <div className="rounded-xl bg-secondary/60 p-3 flex gap-2 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 text-primary" />
        <p>Mode <strong>demo frontend</strong> — gunakan akun pada panel kanan untuk mencoba setiap dashboard role.</p>
      </div>
      <p className="text-xs text-center text-muted-foreground">
        <Link to="/" className="text-primary font-semibold">← Kembali ke beranda</Link>
      </p>
    </form>
  );
}

function RegisterForm({ onDone }: { onDone: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState<Role>("penerima");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Jakarta");
  const [photo, setPhoto] = useState<string>("");
  const [docPhoto, setDocPhoto] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onPick = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) { toast.error("Foto maksimal 4MB"); return; }
    const reader = new FileReader();
    reader.onload = () => set(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={submit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground">Daftar sebagai</label>
        <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REGISTER_ROLES.map((r) => (
            <button type="button" key={r.role} onClick={() => setRole(r.role)} className={`text-xs px-2 py-2 rounded-xl border text-center transition ${role === r.role ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"}`}>{r.label}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field icon={<User className="w-4 h-4" />} label="Nama Lengkap" value={name} onChange={setName} required />
        <Field icon={<Phone className="w-4 h-4" />} label="No. WhatsApp" value={phone} onChange={setPhone} />
      </div>
      {isDonor && <Field icon={<Building2 className="w-4 h-4" />} label="Nama Mitra / Organisasi" value={org} onChange={setOrg} required />}
      <div className="grid grid-cols-2 gap-3">
        <Field icon={<Mail className="w-4 h-4" />} label="Email" type="email" value={email} onChange={setEmail} required />
        <Field icon={<Lock className="w-4 h-4" />} label="Password" type="password" value={password} onChange={setPassword} required />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Kota</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full mt-1 px-3 py-2.5 rounded-xl border border-border bg-background">
          {["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Denpasar"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <PhotoField label={isDonor ? "Foto Pemilik / Penanggung Jawab" : "Foto Profil / KTP"} value={photo} onPick={onPick(setPhoto)} required />
      {isDonor && <PhotoField label="Foto Dokumen Legalitas (NIB / SK Program / NPWP)" value={docPhoto} onPick={onPick(setDocPhoto)} required />}

      <button disabled={loading} className="w-full py-3 rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold shadow-elegant disabled:opacity-60 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />} Daftar Sekarang
      </button>
      <p className="text-[11px] text-center text-muted-foreground">Mode <strong>demo</strong>. Data tidak dikirim ke server — gunakan akun demo untuk login.</p>
    </form>
  );
}

function PhotoField({ label, value, onPick, required }: { label: string; value: string; onPick: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label} {required && <span className="text-destructive">*</span>}</label>
      <div className="mt-1 flex items-center gap-3">
        {value ? (
          <img src={value} alt="preview" className="w-16 h-16 rounded-xl object-cover border border-border" />
        ) : (
          <div className="w-16 h-16 rounded-xl border border-dashed border-border grid place-items-center text-muted-foreground bg-secondary/40"><ImageIcon className="w-5 h-5" /></div>
        )}
        <input type="file" accept="image/*" onChange={onPick} className="text-xs flex-1" />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const copy = (e: React.MouseEvent) => { e.stopPropagation(); navigator.clipboard.writeText(value); toast.success(`${label} disalin`); };
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="text-[9px] uppercase w-8">{label}</span>
      <span className="truncate text-foreground flex-1">{value}</span>
      <button onClick={copy} className="p-1 rounded hover:bg-accent" aria-label={`Salin ${label}`}><Copy className="w-3 h-3" /></button>
    </div>
  );
}

function Field({ icon, label, type = "text", value, onChange, required, id }: { icon?: React.ReactNode; label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; id?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative mt-1">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
        <input id={id} type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? "pl-9" : "pl-3"} pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30`} />
      </div>
    </div>
  );
}
