# 🏥 Simulator Penjadwalan Prioritas Ruang Gawat Darurat

**Simulator Penjadwalan Prioritas Ruang Gawat Darurat** adalah aplikasi berbasis web yang menyediakan **simulasi real-time** dari algoritma **Priority Scheduling** dalam konteks antrean **Unit Gawat Darurat (UGD)** rumah sakit.  
Proyek ini dikembangkan sebagai implementasi praktis dari konsep **Sistem Operasi** untuk tujuan akademis dan pembelajaran interaktif.

🔗 **[🌐 Lihat Live Preview](https://priority-scheduling-on-hospital.vercel.app)**

## 🚀 Tentang Proyek

Di ruang **UGD rumah sakit**, tidak semua pasien datang dengan tingkat urgensi yang sama.  
Sistem konvensional **First Come, First Served (FCFS)** sering kali tidak efisien dan bahkan berisiko bagi pasien kritis.

Proyek ini memvisualisasikan pendekatan yang lebih **cerdas dan adil** menggunakan algoritma **Priority Scheduling** — memungkinkan pengguna untuk:

- 💉 Mensimulasikan antrean pasien di UGD secara interaktif.
- ⚖️ Mengamati bagaimana pasien diprioritaskan berdasarkan tingkat keparahan kondisi.
- 🧩 Memahami konsep inti dari *priority scheduling* dengan cara yang nyata dan visual.

> Aplikasi ini cocok digunakan untuk mahasiswa, dosen, maupun peneliti yang ingin memahami implementasi algoritma penjadwalan proses dalam konteks medis.

---

## ✨ Fitur Utama

### ⚡ Simulasi Real-time  
Saksikan antrean pasien dan proses perawatan berjalan secara real-time dengan visualisasi yang intuitif.

### 🩺 Antrean Berbasis Prioritas  
Pasien otomatis diurutkan berdasarkan tingkat prioritas (P1 — Kritis hingga P5 — Non-Urgent).

### 👥 Manajemen Pasien Dinamis  
- Tambah pasien secara manual dengan nama, kondisi, dan prioritas spesifik.  
- Tambah pasien acak untuk mengisi antrean dengan cepat.  
- Tambah beberapa pasien sekaligus dalam satu klik.

### 🎛️ Kontrol Simulasi  
- Mulai, jeda, dan reset simulasi.  
- Kontrol kecepatan waktu (0.5x, 1x, 2x).  

### 📊 Statistik Komprehensif  
Metrik utama seperti **Average Waiting Time** dan **Average Treatment Time** dihitung dan diperbarui secara langsung.

### 🕒 Riwayat Lengkap  
Setiap pasien yang telah selesai akan tercatat dalam log hasil, lengkap dengan:
- Waktu kedatangan  
- Waktu mulai dan selesai  
- Lama perawatan  
- Waktu tunggu

---

## 🛠️ Dibangun Dengan

Proyek ini dikembangkan menggunakan **teknologi modern front-end** berikut:

| Teknologi | Deskripsi |
|------------|------------|
| ⚛️ [React](https://react.dev/) | Pustaka JavaScript untuk membangun antarmuka pengguna. |
| ⚡ [Vite](https://vitejs.dev/) | Perkakas front-end generasi berikutnya untuk pengembangan cepat. |
| 🎨 [Tailwind CSS](https://tailwindcss.com/) | Kerangka kerja CSS *utility-first* untuk pengembangan UI yang efisien. |
| 💎 [Lucide React](https://lucide.dev/) | Pustaka ikon modern yang ringan dan konsisten. |

---

## 🏁 Memulai

Ikuti langkah-langkah berikut untuk menjalankan aplikasi secara lokal di perangkat Anda.

### 🔧 Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 16.x atau lebih baru)
- [npm](https://www.npmjs.com/)

### ⚙️ Instalasi

```bash
# Clone repositori ini
git clone https://github.com/yehezkielg/priority-scheduling-on-hospital-queue.git

# Masuk ke direktori proyek
cd priority-scheduling-on-hospital-queue

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
