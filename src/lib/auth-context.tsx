import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Role =
  | "admin"
  | "donor_hotel"
  | "donor_restoran"
  | "donor_umkm"
  | "donor_mbg"
  | "penerima";

export type DemoUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  org?: string;
  city?: string;
  phone?: string;
};

// =====================================================
// AKUN DEMO — FRONTEND ONLY (tidak menggunakan database)
// =====================================================
export const DEMO_ACCOUNTS: DemoUser[] = [
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
  { id: "resto-2", email: "resto2@demo.id", password: "resto123", name: "Owner", role: "donor_restoran", org: "Kopi Kenangan Senopati", city: "Jakarta", phone: "021-555-0402" },
];

const STORAGE_KEY = "panganpeduli_demo_user";

type Ctx = {
  user: DemoUser | null;
  roles: Role[];
  loading: boolean;
  login: (email: string, password: string) => { ok: true; user: DemoUser } | { ok: false; error: string };
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const e = email.trim().toLowerCase();
    const found = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === e);
    if (!found) return { ok: false as const, error: "Email tidak terdaftar pada akun demo." };
    if (found.password !== password) return { ok: false as const, error: "Password salah. Silakan coba lagi." };
    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return { ok: true as const, user: found };
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, roles: user ? [user.role] : [], loading, login, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function dashboardPathFor(role: Role): string {
  if (role === "admin") return "/admin";
  if (role === "penerima") return "/dashboard";
  return "/donor";
}

export function isDonorRole(r: Role) {
  return r === "donor_hotel" || r === "donor_restoran" || r === "donor_umkm" || r === "donor_mbg";
}
