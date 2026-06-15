import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Leaf, Menu, X, LogOut, User as UserIcon, LayoutDashboard, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { ScrollProgress } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";


export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, roles, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
    { to: "/kategori/restoran", label: "Restoran" },
  ] as const;

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
    <ScrollProgress />
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-card shadow-soft" : ""}`}>
          <Link to="/" className="group flex items-center gap-2 font-display font-bold text-lg">
            <div id="site-logo-anchor" className="relative grid place-items-center w-9 h-9 rounded-xl bg-[image:var(--gradient-warm)] shadow-glow group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-primary-foreground" />
              <span className="absolute inset-0 rounded-xl animate-ring-pulse" aria-hidden />
            </div>
            <span>Pangan<span className="text-primary">Peduli</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-2 rounded-lg transition-colors hover:text-foreground ${active ? "text-foreground" : ""}`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-warm)] origin-left transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5">
                    <Shield className="w-4 h-4" /> Admin
                  </Link>
                )}
                {isDonor && (
                  <Link to="/donor" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" /> Donor
                  </Link>
                )}
                {!isAdmin && !isDonor && (
                  <Link to="/dashboard" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4" /> Saya
                  </Link>
                )}
                <button onClick={async () => { await signOut(); navigate({ to: "/" }); }} className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent flex items-center gap-1.5">
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" search={{ mode: "login" }} className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent">Masuk</Link>
                <Link to="/auth" search={{ mode: "register" }} className="text-sm font-semibold px-4 py-2 rounded-lg bg-[image:var(--gradient-warm)] text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity">
                  Daftar
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-4 animate-fade-up">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setOpen(false)}>Dashboard Saya</Link>
                  {isDonor && <Link to="/donor" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setOpen(false)}>Dashboard Donor</Link>}
                  {isAdmin && <Link to="/admin" className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setOpen(false)}>Admin</Link>}
                  <button onClick={async () => { await signOut(); setOpen(false); navigate({ to: "/" }); }} className="px-3 py-2 text-left rounded-lg hover:bg-accent">Keluar</button>
                </>
              ) : (
                <>
                  <Link to="/auth" search={{ mode: "login" }} className="px-3 py-2 rounded-lg hover:bg-accent" onClick={() => setOpen(false)}>Masuk</Link>
                  <Link to="/auth" search={{ mode: "register" }} className="px-3 py-2 rounded-lg bg-[image:var(--gradient-warm)] text-primary-foreground font-semibold" onClick={() => setOpen(false)}>Daftar</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
}


export function SiteFooter() {
  const cols: { title: string; links: { to: string; label: string }[] }[] = [
    {
      title: "Jelajah",
      links: [
        { to: "/", label: "Beranda" },
        { to: "/cari", label: "Cari Makanan" },
      ],
    },
    {
      title: "Kategori",
      links: [
        { to: "/kategori/mbg", label: "Program MBG" },
        { to: "/kategori/hotel", label: "Hotel" },
        { to: "/kategori/restoran", label: "Restoran" },
        { to: "/kategori/umkm", label: "UMKM" },
      ],
    },
    {
      title: "Mitra",
      links: [
        { to: "/auth", label: "Daftar Mitra" },
        { to: "/auth", label: "Masuk" },
      ],
    },
  ];
  return (
    <footer className="relative mt-20 border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-mesh)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-[image:var(--gradient-warm)] shadow-glow">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>Pangan<span className="text-primary">Peduli</span></span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Satu porsi, satu kepedulian. Platform food rescue nasional untuk Indonesia tanpa food waste.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">
              {c.title}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to as any}
                    className="hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-muted-foreground">
          <div>© 2026 PanganPeduli — Dibangun untuk Indonesia tanpa food waste.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            Sistem aktif &amp; mendistribusikan
          </div>
        </div>
      </div>
    </footer>
  );
}

