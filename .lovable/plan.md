# Rencana Lengkap PanganPeduli — Fungsional End-to-End

Saya akan melengkapi project menjadi platform yang benar-benar bisa didemokan: kategori bisa diklik, auth multi-role, halaman pencarian makanan, dan backend penuh via **Lovable Cloud** (database + auth + storage + server functions).

## 1. Aktifkan Lovable Cloud (Backend)
- Database PostgreSQL, Auth (email/password + Google), Storage untuk foto makanan
- Tanpa setup eksternal, langsung tersedia

## 2. Skema Database
```text
profiles            — data umum user (nama, telepon, alamat, avatar)
user_roles          — role: donor_hotel | donor_restoran | donor_umkm | donor_mbg | penerima | admin
donor_profiles      — detail donor (nama instansi, NPWP/izin, lokasi, verifikasi)
food_listings       — makanan surplus (judul, kategori, porsi, exp, lat/lng, foto, status, priority_score)
reservations        — reservasi penerima (60 menit timer, status: pending/picked/expired/cancelled)
reports             — laporan pengguna (target_user, alasan, bukti)
sanctions           — sanksi otomatis (warning/suspend/ban)
leaderboard_stats   — agregat porsi diselamatkan per donor (untuk peringkat)
```
RLS aktif penuh, role di tabel terpisah dengan fungsi `has_role()` security-definer.

## 3. Routing & Halaman Baru
```text
/                              landing (perbaikan section "Cari Makanan Sekarang")
/auth                          login / register dengan tab role
/kategori/mbg                  list sekolah → /kategori/mbg/$schoolId (menu)
/kategori/hotel                list hotel → /kategori/hotel/$hotelId (menu)
/kategori/umkm                 list UMKM → /kategori/umkm/$umkmId (menu)
/kategori/restoran             list restoran (opsional, dasar)
/cari                          halaman pencarian + filter + map Leaflet + radius
/listing/$id                   detail makanan + tombol reservasi
/_authenticated/dashboard      dashboard penerima (reservasi aktif + timer)
/_authenticated/donor          dashboard donor (upload, kelola listing, statistik)
/_authenticated/admin          dashboard admin (verifikasi donor, laporan, sanksi, analytics)
/_authenticated/leaderboard    papan peringkat donor
```

## 4. Fitur Inti
- **Kategori klik → list mitra → list menu** (MBG, Hotel, UMKM, Restoran)
- **Auth multi-role** dengan form khusus tiap role saat register
- **Upload makanan** (foto via Storage, lokasi, exp date, porsi)
- **AI Food Rescue Score** otomatis dihitung dari waktu exp + jumlah porsi
- **Label prioritas**: 🔥 Prioritas Tinggi / ⚡ Segera Diambil / 🌟 Dampak Sosial Tinggi
- **Reservasi 60 menit** dengan countdown realtime
- **Peta Leaflet** + filter radius geolokasi
- **Leaderboard** donor teratas
- **Sistem laporan + sanksi otomatis** (3 warning → suspend)
- **Admin dashboard**: verifikasi donor, moderasi listing, tangani laporan, statistik global

## 5. Perbaikan UI Existing
- Section "Cari Makanan Sekarang" diisi: search bar besar + quick filter kategori + CTA ke `/cari`
- Tombol "Masuk" di header → `/auth`
- Card kategori jadi `<Link>` ke halaman kategori masing-masing

## Catatan Teknis
- Tetap di TanStack Start (Lovable tidak mendukung Next.js — sudah dijelaskan sebelumnya). Kode React/Tailwind/shadcn 95% bisa di-port ke Next.js nanti.
- Server logic pakai `createServerFn` + `requireSupabaseAuth`, bukan Edge Functions.
- Storage publik untuk foto makanan, signed URL untuk dokumen verifikasi.

## Urutan Eksekusi
1. Enable Cloud + migration skema + RLS + grants + storage bucket
2. Auth pages (login + register multi-role tab)
3. Halaman kategori (list + detail mitra + menu)
4. Halaman `/cari` + listing detail + reservasi flow
5. Dashboard penerima + donor + admin
6. Leaderboard + report/sanksi
7. Perbaikan landing (section cari + link kategori + tombol masuk)
8. Seed data demo agar langsung bisa didemokan

Setujui rencana ini dan saya mulai eksekusi sekaligus (akan butuh beberapa batch besar karena scope-nya luas).