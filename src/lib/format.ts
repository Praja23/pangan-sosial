export const CATEGORY_LABEL: Record<string, string> = {
  mbg: "Program MBG",
  hotel: "Hotel",
  umkm: "UMKM & Warung",
  restoran: "Restoran & Cafe",
};

export const CATEGORY_DESC: Record<string, string> = {
  mbg: "Sekolah & instansi pelaksana Program Makan Bergizi Gratis",
  hotel: "Hotel berbintang dengan surplus harian",
  umkm: "Usaha mikro & warung lokal",
  restoran: "Restoran & cafe dengan menu hari ini",
};

export function priorityFromScore(score: number): string {
  if (score >= 85) return "🔥 Prioritas Tinggi";
  if (score >= 70) return "⚡ Segera Diambil";
  return "🌟 Dampak Sosial Tinggi";
}

export function minutesUntil(iso: string): number {
  return Math.max(0, Math.floor((new Date(iso).getTime() - Date.now()) / 60000));
}

export function formatCountdown(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Kedaluwarsa";
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}j ${m % 60}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}
