/* Service worker: aplikasi tetap jalan offline. Naikkan angka versi V setiap kali mengubah file. */
const V="catatan-v1",FILES=["./", "index.html", "manifest.json", "css/style.css", "js/storage.js", "js/theme.js", "js/home.js", "js/notes.js", "js/calendar.js", "js/ask.js", "js/backup.js", "js/app.js", "js/pwa.js", "assets/bg_blue.webp", "assets/birds.png", "assets/diary.png", "assets/elephant.png", "assets/fox.png", "assets/home.png", "assets/moon.png", "assets/paper.webp", "assets/plane.png", "assets/planet.png", "assets/prince.png", "assets/rose.png", "assets/sheep.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("index.html"))))});
