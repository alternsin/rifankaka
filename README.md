# Phone Peeking — Interactive iPhone Story

Simulasi iPhone bergaya iOS yang berjalan langsung di browser. Proyek ini menggunakan HTML, CSS, dan JavaScript biasa sehingga mudah diimpor ke GitHub dan dapat dipublikasikan melalui GitHub Pages.

## Fitur

- Lockscreen menggunakan foto pertama (`assets/wallpaper-lock.jpg`).
- Homescreen menggunakan foto kedua (`assets/wallpaper-home.jpg`).
- Geser layar ke atas atau tekan petunjuk untuk membuka keypad.
- Kode sandi **1809** wajib dimasukkan sebelum homescreen dapat dibuka.
- Notifikasi WhatsApp di lockscreen.
- Homescreen dengan ikon aplikasi, termasuk Instagram, WhatsApp, dan Music.
- Instagram, WhatsApp, dan Music membuka halaman splash sederhana tanpa isi aplikasi, sesuai desain mockup.
- Mendukung layar sentuh dan keyboard desktop.

> Ini adalah simulasi front-end untuk cerita/visualisasi, bukan sistem keamanan sungguhan. Kode sandi dapat dilihat di `app.js`.

## Struktur repository

```text
phone-peeking/
├── assets/
│   ├── wallpaper-lock.jpg
│   └── wallpaper-home.jpg
├── index.html
├── style.css
├── app.js
└── README.md
```

## Menjalankan secara lokal

1. Unduh atau clone repository.
2. Pastikan kedua gambar berada di folder `assets/`.
3. Buka `index.html` di browser. Untuk pengalaman yang lebih konsisten, gunakan ekstensi Live Server pada VS Code.

## Import ke GitHub

1. Buat repository baru di GitHub.
2. Unggah semua file dan folder di atas, dengan struktur yang sama.
3. Buka **Settings → Pages**.
4. Pada bagian build/deployment, pilih **Deploy from a branch**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
5. Tunggu proses deploy selesai dan buka URL GitHub Pages yang diberikan GitHub.

## Mengubah foto wallpaper

Ganti file `assets/wallpaper-lock.jpg` untuk foto lockscreen dan `assets/wallpaper-home.jpg` untuk foto homescreen. Pertahankan nama file agar tidak perlu mengubah CSS.

## Kode sandi

`1809`
