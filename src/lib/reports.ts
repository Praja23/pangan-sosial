// =====================================================
// SISTEM PELAPORAN — FRONTEND ONLY (localStorage)
// Dipakai bersama oleh user, mitra, dan admin.
// =====================================================
import { useEffect, useState } from "react";

export type ReportTargetType = "mitra" | "listing" | "penerima";
export type ReportStatus = "open" | "resolved_warning" | "resolved_dismissed";

export type Report = {
  id: string;
  target: string;           // identitas target (email / nama mitra / id listing)
  targetLabel: string;      // label tampilan
  targetType: ReportTargetType;
  reason: string;           // kategori
  details: string;          // deskripsi bebas
  reporter: string;         // email pelapor
  reporterRole: string;
  createdAt: number;
  status: ReportStatus;
};

const REPORTS_KEY = "panganpeduli_reports_v1";
const WARNINGS_KEY = "panganpeduli_warnings_v1";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function useReportsStore() {
  const [, set] = useState(0);
  useEffect(() => {
    const l = () => set((n) => n + 1);
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === REPORTS_KEY || e.key === WARNINGS_KEY) l();
    };
    window.addEventListener("storage", onStorage);
    return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
  }, []);
}

function readLS<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function writeLS(k: string, v: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); emit(); } catch {}
}

// ============ SEED awal (sekali) ============
const SEED_FLAG = "panganpeduli_reports_seeded_v2";
function seedOnce() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_FLAG)) return;
  const now = Date.now();
  const seed: Report[] = [
    {
      id: "rp-seed-1", target: "Warung Berkah", targetLabel: "Warung Berkah", targetType: "mitra",
      reason: "Makanan tidak layak", details: "Makanan kedaluwarsa diposting ulang sebagai baru.",
      reporter: "user1@demo.id", reporterRole: "penerima", createdAt: now - 3600_000 * 6, status: "open",
    },
    {
      id: "rp-seed-2", target: "user2@demo.id", targetLabel: "user2@demo.id", targetType: "penerima",
      reason: "Tidak hadir saat pengambilan", details: "Tidak datang ambil reservasi 3x berturut-turut.",
      reporter: "hotel1@demo.id", reporterRole: "donor_hotel", createdAt: now - 3600_000 * 24, status: "open",
    },
    // ===== Akun penerima SUSPENDED (3x warning) — untuk demo moderasi =====
    {
      id: "rp-seed-u3-1", target: "suspended.user@demo.id", targetLabel: "Andi Tersuspend · suspended.user@demo.id",
      targetType: "penerima", reason: "Tidak hadir saat pengambilan",
      details: "Reservasi 5 porsi nasi box, tidak datang sampai timer habis.",
      reporter: "hotel1@demo.id", reporterRole: "donor_hotel", createdAt: now - 86400_000 * 7, status: "resolved_warning",
    },
    {
      id: "rp-seed-u3-2", target: "suspended.user@demo.id", targetLabel: "Andi Tersuspend · suspended.user@demo.id",
      targetType: "penerima", reason: "Reservasi palsu / penyalahgunaan akun",
      details: "Mereservasi 20 porsi sekaligus, hanya datang ambil 2 porsi.",
      reporter: "resto1@demo.id", reporterRole: "donor_restoran", createdAt: now - 86400_000 * 4, status: "resolved_warning",
    },
    {
      id: "rp-seed-u3-3", target: "suspended.user@demo.id", targetLabel: "Andi Tersuspend · suspended.user@demo.id",
      targetType: "penerima", reason: "Pelecehan / kata-kata kasar",
      details: "Komentar kasar ke staf saat pengambilan.",
      reporter: "umkm1@demo.id", reporterRole: "donor_umkm", createdAt: now - 86400_000 * 2, status: "resolved_warning",
    },
    // ===== Akun mitra SUSPENDED (3x warning) — untuk demo moderasi =====
    {
      id: "rp-seed-m3-1", target: "Hotel Bermasalah Demo", targetLabel: "Hotel Bermasalah Demo",
      targetType: "mitra", reason: "Makanan tidak layak / kedaluwarsa",
      details: "Beberapa box nasi sudah basi saat pengambilan.",
      reporter: "user1@demo.id", reporterRole: "penerima", createdAt: now - 86400_000 * 9, status: "resolved_warning",
    },
    {
      id: "rp-seed-m3-2", target: "Hotel Bermasalah Demo", targetLabel: "Hotel Bermasalah Demo",
      targetType: "mitra", reason: "Kualitas tidak sesuai deskripsi",
      details: "Listing mengatakan 'masih hangat' tetapi makanan sudah dingin dan keras.",
      reporter: "user2@demo.id", reporterRole: "penerima", createdAt: now - 86400_000 * 5, status: "resolved_warning",
    },
    {
      id: "rp-seed-m3-3", target: "Hotel Bermasalah Demo", targetLabel: "Hotel Bermasalah Demo",
      targetType: "mitra", reason: "Penipuan / informasi palsu",
      details: "Foto pada listing tidak sesuai dengan barang yang diterima.",
      reporter: "user1@demo.id", reporterRole: "penerima", createdAt: now - 86400_000 * 1, status: "resolved_warning",
    },
  ];
  const warns: Record<string, number> = {
    "user2@demo.id": 2,
    "suspended.user@demo.id": 3,
    "Hotel Bermasalah Demo": 3,
    "suspended.mitra@demo.id": 3,
  };
  localStorage.setItem(REPORTS_KEY, JSON.stringify(seed));
  localStorage.setItem(WARNINGS_KEY, JSON.stringify(warns));
  localStorage.setItem(SEED_FLAG, "1");
}

// ============ Reports CRUD ============
export function getReports(): Report[] {
  seedOnce();
  return readLS<Report[]>(REPORTS_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
}

export function addReport(input: Omit<Report, "id" | "createdAt" | "status">) {
  seedOnce();
  const r: Report = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    status: "open",
  };
  writeLS(REPORTS_KEY, [r, ...readLS<Report[]>(REPORTS_KEY, [])]);
  return r;
}

export function resolveReport(id: string, sanction: boolean): { warningCount: number; suspended: boolean } | null {
  const list = readLS<Report[]>(REPORTS_KEY, []);
  const r = list.find((x) => x.id === id);
  if (!r) return null;
  const next = list.map((x) => (x.id === id ? { ...x, status: (sanction ? "resolved_warning" : "resolved_dismissed") as ReportStatus } : x));
  writeLS(REPORTS_KEY, next);
  if (!sanction) return { warningCount: getWarningCount(r.target), suspended: isSuspended(r.target) };
  const warns = readLS<Record<string, number>>(WARNINGS_KEY, {});
  const count = (warns[r.target] ?? 0) + 1;
  warns[r.target] = count;
  writeLS(WARNINGS_KEY, warns);
  return { warningCount: count, suspended: count >= 3 };
}

// ============ Warnings & Suspend ============
export function getAllWarnings(): Record<string, number> {
  seedOnce();
  return readLS<Record<string, number>>(WARNINGS_KEY, {});
}

export function getWarningCount(target: string): number {
  return getAllWarnings()[target] ?? 0;
}

/**
 * 3 warning = akun otomatis SUSPEND.
 * Akun yang suspend tidak bisa: membuat reservasi, mempublikasikan listing,
 * atau mengirim laporan. Banner peringatan tampil di dashboard.
 */
export function isSuspended(target: string): boolean {
  return getWarningCount(target) >= 3;
}

/** Cek apakah identitas user saat ini terkena warning/suspend. */
export function checkUserStatus(identifiers: string[]): { warnings: number; suspended: boolean; matchedKey: string | null } {
  const all = getAllWarnings();
  let best = 0;
  let matched: string | null = null;
  for (const id of identifiers) {
    const w = all[id] ?? 0;
    if (w > best) { best = w; matched = id; }
  }
  return { warnings: best, suspended: best >= 3, matchedKey: matched };
}

export const PARTNER_REPORT_REASONS = [
  "Makanan tidak layak / kedaluwarsa",
  "Penipuan / informasi palsu",
  "Pelecehan / kata-kata kasar",
  "Kualitas tidak sesuai deskripsi",
  "Spam atau konten tidak relevan",
  "Lainnya",
] as const;

export const RECIPIENT_REPORT_REASONS = [
  "Tidak hadir saat pengambilan",
  "Reservasi palsu / penyalahgunaan akun",
  "Mengambil porsi tidak sesuai reservasi",
  "Pelecehan / kata-kata kasar",
  "Spam atau perilaku mengganggu",
  "Lainnya",
] as const;

export const REPORT_REASONS = PARTNER_REPORT_REASONS;

export function getReportReasons(targetType: ReportTargetType): readonly string[] {
  return targetType === "penerima" ? RECIPIENT_REPORT_REASONS : PARTNER_REPORT_REASONS;
}