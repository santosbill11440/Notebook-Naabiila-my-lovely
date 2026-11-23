# Catatan Pangeran Kecil

Aplikasi catatan, jadwal, diary, dan tanya-jawab dari catatan sendiri, bertema *Le Petit Prince*.
Gaya: tulisan tangan + piksel + sedikit kaca cair (liquid glass). Berjalan penuh di browser, tanpa server dan tanpa database online.

## Fitur
- **Layar kunci**: jam besar, bintang canvas berparalaks, bintang jatuh, kartu jadwal berikutnya dan streak. Geser ke atas untuk membuka.
- **Beranda**: rasi bintang 7 hari (garis tergambar untuk hari berturut-turut), jadwal hari ini dengan linimasa, carousel catatan yang disematkan.
- **Catatan** (ala Google Keep): judul, isi, tag, 5 warna, sematkan, daftar centang (`[ ]`), arsip, sampah (hapus otomatis 7 hari), gandakan, tampilan kotak/daftar, pencarian, pengingat per catatan, catatan suara.
- **Hari**: kalender, agenda dengan alarm (suara + notifikasi), diary yang tersimpan otomatis.
- **Tanya** (ala NotebookLM): pilih catatan sebagai sumber, lalu tanya atau pakai tombol Ringkas, Kuis, Panduan belajar, FAQ. Jawaban memuat angka rujukan yang bisa diketuk. Bisa menambah sumber dari file `.txt`/`.md`.
- Mode siang/malam, ekspor/impor cadangan JSON, PWA (bisa dipasang dan jalan offline).

## Struktur
```
index.html        kerangka halaman
manifest.json     info PWA
sw.js             service worker (offline)
css/style.css     semua tampilan
js/               storage, theme, home, notes, calendar, ask, backup, app, pwa
assets/           stiker piksel + latar
icons/            ikon aplikasi
docs/             peta animasi
```
**Urutan `<script>` di `index.html` penting, jangan diubah.** Semua file berbagi variabel global yang sama.

## Menjalankan
- Cek cepat: buka folder di VS Code, pasang Live Server, klik "Go Live". Service worker hanya aktif lewat HTTPS atau localhost, bukan lewat `file://`.
- Online gratis: push ke GitHub, lalu Settings, Pages, branch `main`, folder `/ (root)`.
- Di HP: buka link-nya di Chrome, menu titik tiga, "Tambahkan ke layar utama".

## Penting
- Data tersimpan di browser (localStorage). Ekspor cadangan berkala lewat Beranda, Pengaturan, Ekspor.
- Setelah mengubah file, naikkan versi `V` di `sw.js` supaya HP mengambil pembaruan.
- **Mode AI**: fitur Tanya memakai Claude hanya saat halaman dijalankan sebagai artifact claude.ai. Di GitHub Pages, Tanya berjalan dalam **mode lokal**: menampilkan bagian sumber yang paling cocok dengan kata kunci, tanpa AI. Jangan menaruh API key di kode frontend; kalau ingin AI sendiri, buat proxy server kecil dan ubah fungsi `ask()` di `js/ask.js`.
- Font (Caveat, Patrick Hand, Pixelify Sans) dimuat dari Google Fonts. Saat offline, tampil font cadangan.
- Catatan suara memakai Web Speech API: paling andal di Chrome/Edge.

## Kustomisasi
- Warna dan token gerak: bagian `:root` di `css/style.css`.
- Aset piksel dibuat dari ilustrasi asli dengan mengecilkan lalu mengurangi palet warna, ditampilkan dengan `image-rendering: pixelated`.
