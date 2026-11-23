# Peta animasi

Token: `--ease` (hover, tab), `--ease-out` (masuk), `--spring` (memantul), `--dur-1/2/3` = 160/320/700 ms.
Hanya `transform`, `opacity`, dan `translate`/`scale` yang dianimasikan, tanpa `transition: all`. `prefers-reduced-motion` mematikan semuanya.

| Bagian | Animasi | Pemicu | Teknik | Berkas |
|---|---|---|---|---|
| Layar kunci | Bintang berkedip, bintang jatuh, paralaks latar | Waktu, gerak pointer | canvas 2D, satu loop `requestAnimationFrame`, berhenti saat tersembunyi | `js/home.js` |
| Layar kunci | Geser ke atas, balik memantul | Seret | `pointer` events + transisi spring | `js/home.js` |
| Antar halaman | Halaman lama memudar, isi baru masuk berurutan | Navigasi | kelas `leave`/`enter`, `--spring` | `js/home.js`, `css/style.css` |
| Navigasi, tab Agenda/Diary | Pil emas meluncur | Klik, panah | `transform` + `width` | `js/home.js`, `js/app.js` |
| Beranda | Rasi bintang 7 hari tergambar | Masuk halaman | `stroke-dashoffset` pada `pathLength=1` | `js/home.js` |
| Beranda, Agenda | Linimasa terisi, titik menyala | Masuk halaman | `scale` + kelas `is-reached` | `js/home.js` |
| Beranda | Carousel catatan, kartu aktif terang | Geser | `scroll-snap` + `IntersectionObserver` | `js/home.js` |
| Beranda | Akordeon Pengaturan | Klik | `grid-template-rows` 0fr ke 1fr | `css/style.css` |
| Catatan | Kartu masuk berurutan | Masuk halaman | `--i` x 45 ms | `js/notes.js` |
| Dialog, toast | Muncul memantul | Buka | keyframe `pop`, `translate` | `css/style.css` |
