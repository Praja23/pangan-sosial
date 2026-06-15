import { r as reactExports } from "../_libs/react.mjs";
const CITY_COORDS = {
  Jakarta: { lat: -6.2, lng: 106.816 },
  Bandung: { lat: -6.917, lng: 107.619 },
  Yogyakarta: { lat: -7.795, lng: 110.369 },
  Surabaya: { lat: -7.257, lng: 112.752 },
  Denpasar: { lat: -8.65, lng: 115.216 }
};
const PARTNERS = [
  // MBG
  { id: "p-mbg-1", slug: "smp-negeri-5-bandung", name: "SMP Negeri 5 Bandung", category: "mbg", city: "Bandung", address: "Jl. Sumatera No. 40, Bandung", description: "Sekolah pelaksana Program MBG. Menyalurkan kelebihan paket gizi harian.", cover_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", verified: true, rating: 4.9, total_rescued: 1280, lat: -6.91, lng: 107.62 },
  { id: "p-mbg-2", slug: "sdn-menteng-03-jakarta", name: "SDN Menteng 03 Jakarta", category: "mbg", city: "Jakarta", address: "Jl. Menteng Raya, Jakarta Pusat", description: "Sekolah dasar negeri penyalur MBG di pusat Jakarta.", cover_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", verified: true, rating: 4.8, total_rescued: 945, lat: -6.198, lng: 106.838 },
  { id: "p-mbg-3", slug: "smk-2-yogyakarta", name: "SMK 2 Yogyakarta", category: "mbg", city: "Yogyakarta", address: "Jl. AM Sangaji, Yogyakarta", description: "Pelaksana MBG dengan dapur sentral terverifikasi.", cover_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", verified: true, rating: 4.7, total_rescued: 612, lat: -7.78, lng: 110.36 },
  // Hotel
  { id: "p-htl-1", slug: "hotel-grand-mulia-jakarta", name: "Hotel Grand Mulia Jakarta", category: "hotel", city: "Jakarta", address: "Jl. Sudirman No. 12, Jakarta", description: "Hotel bintang 5 di pusat Jakarta dengan surplus harian dari restoran & banquet.", cover_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", verified: true, rating: 4.9, total_rescued: 2310, lat: -6.224, lng: 106.82 },
  { id: "p-htl-2", slug: "bali-pearl-resort", name: "Bali Pearl Resort", category: "hotel", city: "Denpasar", address: "Jl. Pantai Kuta No. 88, Bali", description: "Resort tepi pantai yang aktif mendonasikan surplus prasmanan.", cover_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", verified: true, rating: 4.8, total_rescued: 1820, lat: -8.72, lng: 115.17 },
  { id: "p-htl-3", slug: "surabaya-suites-hotel", name: "Surabaya Suites Hotel", category: "hotel", city: "Surabaya", address: "Jl. Pemuda, Surabaya", description: "Hotel bisnis dengan layanan donasi makanan rutin.", cover_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", verified: true, rating: 4.6, total_rescued: 980, lat: -7.27, lng: 112.74 },
  // UMKM
  { id: "p-umkm-1", slug: "warung-nasi-berkah", name: "Warung Nasi Berkah", category: "umkm", city: "Yogyakarta", address: "Jl. Malioboro Gg. 3, Yogyakarta", description: "Warung nasi sederhana yang menyalurkan sisa porsi sore hari.", cover_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800", verified: true, rating: 4.7, total_rescued: 540, lat: -7.79, lng: 110.36 },
  { id: "p-umkm-2", slug: "catering-bunda-yanti", name: "Catering Bunda Yanti", category: "umkm", city: "Surabaya", address: "Jl. Diponegoro, Surabaya", description: "Catering rumahan dengan kelebihan stok dari pesanan harian.", cover_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800", verified: true, rating: 4.8, total_rescued: 720, lat: -7.26, lng: 112.74 },
  { id: "p-umkm-3", slug: "warung-mama-rina", name: "Warung Mama Rina", category: "umkm", city: "Jakarta", address: "Jl. Tebet Raya, Jakarta Selatan", description: "Masakan rumahan halal & higienis. Surplus tiap sore.", cover_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800", verified: false, rating: 4.5, total_rescued: 310, lat: -6.23, lng: 106.85 },
  // Restoran
  { id: "p-rst-1", slug: "sate-khas-senayan", name: "Sate Khas Senayan", category: "restoran", city: "Jakarta", address: "Jl. Senayan, Jakarta", description: "Restoran Indonesia yang konsisten mendonasikan menu akhir hari.", cover_url: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800", verified: true, rating: 4.7, total_rescued: 1140, lat: -6.225, lng: 106.8 },
  { id: "p-rst-2", slug: "kopi-kenangan-senopati", name: "Kopi Kenangan Senopati", category: "restoran", city: "Jakarta", address: "Jl. Senopati No. 42, Jakarta", description: "Coffee shop yang mendonasikan pastry & sandwich akhir hari.", cover_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800", verified: true, rating: 4.6, total_rescued: 680, lat: -6.23, lng: 106.81 },
  { id: "p-rst-3", slug: "warung-mie-bandung", name: "Warung Mie Bandung", category: "restoran", city: "Bandung", address: "Jl. Braga No. 27, Bandung", description: "Restoran mie & nasi goreng dengan donasi rutin setiap malam.", cover_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800", verified: true, rating: 4.5, total_rescued: 520, lat: -6.92, lng: 107.61 },
  { id: "p-rst-4", slug: "cafe-tepi-laut-bali", name: "Cafe Tepi Laut Bali", category: "restoran", city: "Denpasar", address: "Jl. Pantai Sanur, Bali", description: "Cafe & restoran tepi pantai dengan menu seafood & pastry surplus.", cover_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", verified: true, rating: 4.8, total_rescued: 890, lat: -8.69, lng: 115.26 },
  { id: "p-rst-5", slug: "resto-keluarga-surabaya", name: "Resto Keluarga Surabaya", category: "restoran", city: "Surabaya", address: "Jl. Darmo No. 88, Surabaya", description: "Restoran keluarga dengan menu nusantara & paket prasmanan harian.", cover_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800", verified: false, rating: 4.4, total_rescued: 310, lat: -7.29, lng: 112.74 }
];
const img = {
  nasiBox: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800",
  pastry: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
  mbg: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  sate: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800",
  nasiGoreng: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
  bakso: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
  bento: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  ayam: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800"
};
const SEED = [
  // MBG (gratis)
  { id: "l-1", partner_id: "p-mbg-1", title: "Paket MBG Sisa Acara (Nasi + Sayur + Ayam)", description: "Paket gizi lengkap dari acara sekolah, masih hangat.", image_url: img.mbg, portions_total: 20, price: 0, expires_in_min: 55, pickup_address: "Jl. Sumatera No. 40, Bandung", category: "mbg", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-2", partner_id: "p-mbg-2", title: "Nasi Box MBG (Telur Balado)", description: "Sisa distribusi MBG hari ini. Higienis.", image_url: img.nasiBox, portions_total: 15, price: 0, expires_in_min: 90, pickup_address: "Jl. Menteng Raya, Jakarta", category: "mbg", priority_label: "⚡ Segera Diambil" },
  { id: "l-3", partner_id: "p-mbg-3", title: "Roti Susu MBG", description: "Roti susu produksi dapur sekolah.", image_url: img.pastry, portions_total: 30, price: 0, expires_in_min: 180, pickup_address: "Jl. AM Sangaji, Yogyakarta", category: "mbg", priority_label: "🌟 Dampak Sosial Tinggi" },
  // Hotel (max 10.000)
  { id: "l-4", partner_id: "p-htl-1", title: "Nasi Box Ayam Bakar Banquet", description: "Sisa banquet ballroom. Disajikan dalam kemasan eco-friendly.", image_url: img.ayam, portions_total: 25, price: 8e3, expires_in_min: 45, pickup_address: "Jl. Sudirman No. 12, Jakarta", category: "hotel", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-5", partner_id: "p-htl-1", title: "Pastry & Roti Breakfast", description: "Pastry sisa breakfast prasmanan.", image_url: img.pastry, portions_total: 40, price: 5e3, expires_in_min: 120, pickup_address: "Jl. Sudirman No. 12, Jakarta", category: "hotel", priority_label: "⚡ Segera Diambil" },
  { id: "l-6", partner_id: "p-htl-2", title: "Nasi Campur Bali Surplus", description: "Surplus prasmanan resort tepi pantai.", image_url: img.nasiBox, portions_total: 18, price: 1e4, expires_in_min: 60, pickup_address: "Jl. Pantai Kuta No. 88, Bali", category: "hotel", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-7", partner_id: "p-htl-3", title: "Bento Set Hotel", description: "Bento set sisa room service.", image_url: img.bento, portions_total: 12, price: 9e3, expires_in_min: 150, pickup_address: "Jl. Pemuda, Surabaya", category: "hotel", priority_label: "🌟 Dampak Sosial Tinggi" },
  // UMKM (max 10.000)
  { id: "l-8", partner_id: "p-umkm-1", title: "Nasi Rames Warung", description: "Nasi + lauk warung sore hari.", image_url: img.nasiBox, portions_total: 10, price: 7e3, expires_in_min: 75, pickup_address: "Jl. Malioboro Gg. 3, Yogyakarta", category: "umkm", priority_label: "⚡ Segera Diambil" },
  { id: "l-9", partner_id: "p-umkm-2", title: "Catering Box Sisa Acara", description: "Box catering acara keluarga.", image_url: img.bento, portions_total: 22, price: 6500, expires_in_min: 100, pickup_address: "Jl. Diponegoro, Surabaya", category: "umkm", priority_label: "⚡ Segera Diambil" },
  { id: "l-10", partner_id: "p-umkm-3", title: "Bakso Sapi Sisa Sore", description: "Bakso sapi siap saji, kuah hangat.", image_url: img.bakso, portions_total: 8, price: 8e3, expires_in_min: 50, pickup_address: "Jl. Tebet Raya, Jakarta", category: "umkm", priority_label: "🔥 Prioritas Tinggi" },
  // Restoran (max 10.000)
  { id: "l-11", partner_id: "p-rst-1", title: "Sate Ayam Akhir Hari (10 tusuk)", description: "Sate sisa stok akhir hari restoran.", image_url: img.sate, portions_total: 14, price: 1e4, expires_in_min: 40, pickup_address: "Jl. Senayan, Jakarta", category: "restoran", priority_label: "🔥 Prioritas Tinggi" },
  { id: "l-12", partner_id: "p-rst-2", title: "Pastry Coffee Shop", description: "Croissant & sandwich akhir hari.", image_url: img.pastry, portions_total: 18, price: 5e3, expires_in_min: 90, pickup_address: "Jl. Senopati No. 42, Jakarta", category: "restoran", priority_label: "⚡ Segera Diambil" },
  { id: "l-13", partner_id: "p-rst-1", title: "Nasi Goreng Spesial", description: "Nasi goreng sisa katering kantor.", image_url: img.nasiGoreng, portions_total: 16, price: 9e3, expires_in_min: 130, pickup_address: "Jl. Senayan, Jakarta", category: "restoran", priority_label: "🌟 Dampak Sosial Tinggi" }
];
const SEED_BOOTSTRAPPED_AT = Date.now();
const LISTINGS = SEED.map((l) => ({ ...l, expires_at: new Date(SEED_BOOTSTRAPPED_AT + l.expires_in_min * 6e4).toISOString() }));
const RES_KEY = "panganpeduli_reservations_v2";
const PORT_KEY = "panganpeduli_portions_v2";
const USER_LIST_KEY = "panganpeduli_user_listings_v2";
const listeners = /* @__PURE__ */ new Set();
function emit() {
  listeners.forEach((l) => l());
}
function useDemoStore() {
  const [, set] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const l = () => set((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
}
function useTick(ms = 1e3) {
  const [, set] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const i = setInterval(() => set((n) => n + 1), ms);
    return () => clearInterval(i);
  }, [ms]);
}
function readLS(k, fallback) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    emit();
  } catch {
  }
}
function getReservations() {
  if (typeof window === "undefined") return [];
  return readLS(RES_KEY, []);
}
function reserveListing(listing, partner, user, portions) {
  const remaining = getRemaining(listing.id);
  if (portions < 1) return { ok: false, error: "Jumlah porsi tidak valid" };
  if (portions > remaining) return { ok: false, error: `Hanya tersisa ${remaining} porsi` };
  const now = Date.now();
  const r = {
    id: crypto.randomUUID(),
    listingId: listing.id,
    listingTitle: listing.title,
    partnerId: listing.partner_id,
    partnerName: partner?.name ?? listing.pickup_address.split(",")[0]?.trim() ?? "Mitra PanganPeduli",
    image: listing.image_url,
    pickupAddress: listing.pickup_address,
    priority: listing.priority_label,
    price: listing.price,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userPhone: user.phone,
    portions,
    createdAt: now,
    expiresAt: now + 60 * 60 * 1e3,
    status: "active"
  };
  writeLS(RES_KEY, [r, ...getReservations()]);
  setRemaining(listing.id, remaining - portions);
  return { ok: true, reservation: r };
}
function updateReservation(id, patch) {
  const next = getReservations().map((r) => r.id === id ? { ...r, ...patch } : r);
  writeLS(RES_KEY, next);
}
function cancelReservation(id) {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return;
  if (r.status === "active") {
    setRemaining(r.listingId, getRemaining(r.listingId) + r.portions);
  }
  updateReservation(id, { status: "cancelled", sellerClaim: null });
}
function sellerConfirmPickup(id) {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return { ok: false, error: "Reservasi tidak ditemukan" };
  if (r.status !== "active") return { ok: false, error: "Reservasi tidak aktif" };
  updateReservation(id, { status: "picked_up", sellerClaim: null });
  return { ok: true };
}
const sellerClaimPickup = sellerConfirmPickup;
function sellerMarkProblem(id) {
  const r = getReservations().find((x) => x.id === id);
  if (!r) return { ok: false, error: "Reservasi tidak ditemukan" };
  if (r.status !== "active") return { ok: false, error: "Reservasi tidak aktif" };
  setRemaining(r.listingId, getRemaining(r.listingId) + r.portions);
  updateReservation(id, { status: "expired", sellerClaim: null });
  return { ok: true };
}
function getRemaining(listingId) {
  if (typeof window === "undefined") {
    const l2 = getAllListings().find((x) => x.id === listingId);
    return l2?.portions_total ?? 0;
  }
  const map = readLS(PORT_KEY, {});
  if (listingId in map) return map[listingId];
  const l = getAllListings().find((x) => x.id === listingId);
  return l?.portions_total ?? 0;
}
function setRemaining(listingId, n) {
  const map = readLS(PORT_KEY, {});
  map[listingId] = Math.max(0, n);
  writeLS(PORT_KEY, map);
}
function getUserListings() {
  if (typeof window === "undefined") return [];
  return readLS(USER_LIST_KEY, []);
}
function addUserListing(l) {
  writeLS(USER_LIST_KEY, [l, ...getUserListings()]);
}
function removeUserListing(id) {
  writeLS(USER_LIST_KEY, getUserListings().filter((l) => l.id !== id));
}
function getAllListings() {
  return [...getUserListings(), ...LISTINGS];
}
function getListingById(id) {
  return getAllListings().find((l) => l.id === id);
}
function getPartnerById(id) {
  return PARTNERS.find((p) => p.id === id);
}
function getPartnerBySlug(slug) {
  return PARTNERS.find((p) => p.slug === slug);
}
function distanceKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180;
  const la2 = b.lat * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
function formatIDR(n) {
  if (n <= 0) return "Gratis";
  return "Rp " + n.toLocaleString("id-ID");
}
export {
  CITY_COORDS as C,
  LISTINGS as L,
  PARTNERS as P,
  useTick as a,
  getPartnerBySlug as b,
  getListingById as c,
  distanceKm as d,
  getPartnerById as e,
  formatIDR as f,
  getRemaining as g,
  getUserListings as h,
  getReservations as i,
  updateReservation as j,
  addUserListing as k,
  removeUserListing as l,
  sellerMarkProblem as m,
  cancelReservation as n,
  reserveListing as r,
  sellerClaimPickup as s,
  useDemoStore as u
};
