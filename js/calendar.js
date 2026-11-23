/* kalender, agenda, diary */
function rCal(sw){const y=cm.getFullYear(),m=cm.getMonth(),f=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),td=D(new Date());
$("#my").textContent=cm.toLocaleDateString("id-ID",{month:"long",year:"numeric"});
let h="<span></span>".repeat(f);
for(let i=1;i<=n;i++){const k=D(new Date(y,m,i));h+=`<button class="d${k===td?" today":""}${S.e.some(e=>e.d===k)?" ev":""}" type="button" data-k="${k}" aria-pressed="${k===sel}" aria-label="${long(k)}">${i}</button>`}
$("#days").innerHTML=h;if(sw){const d=$("#days");d.classList.remove("sw");void d.offsetWidth;d.classList.add("sw")}}
$("#days").onclick=e=>{const k=e.target.dataset.k;if(k){sel=k;rDay()}};
$("#pm").onclick=()=>{cm.setMonth(cm.getMonth()-1);rCal(1)};
$("#nm").onclick=()=>{cm.setMonth(cm.getMonth()+1);rCal(1)};
function rDay(){rCal();$("#ad").textContent=long(sel);$("#dd").textContent=long(sel);
const l=S.e.filter(e=>e.d===sel).sort((a,b)=>a.t.localeCompare(b.t));
$("#ag").innerHTML=l.length?l.map(e=>`<div class="ev-i" data-r="${past(e)}"><time>${e.t}</time><div>${esc(e.n)}</div><button class="btn del" type="button" data-x="${e.id}" aria-label="Hapus ${esc(e.n)}">Hapus</button></div>`).join(""):`<div class="empty"><img src="${IMG.fox}" alt="">Belum ada jadwal untuk ${long(sel)}.</div>`;
tline($("#ag"));$("#di").value=S.d[sel]||"";$("#ds").textContent=""}
$("#ag").onclick=e=>{const b=e.target.closest("[data-x]");if(!b)return;sure(b,()=>{const x=b.dataset.x,ev=S.e.find(v=>v.id===x),nn=ev&&ev.nid&&S.n.find(m=>m.id===ev.nid);if(nn)nn.r=null;S.e=S.e.filter(v=>v.id!==x);save();rDay()})};
$("#ef").onsubmit=e=>{e.preventDefault();S.e.push({id:uid(),n:$("#en").value.trim(),t:$("#et2").value,d:sel});save();$("#ef").reset();rDay()};
let dt;$("#di").oninput=()=>{$("#ds").textContent="Menulis…";clearTimeout(dt);dt=setTimeout(()=>{S.d[sel]=$("#di").value;save();$("#ds").textContent="Tersimpan."},600)};

/* pengingat */
const fired=new Set();let ac;
function beep(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=784;g.gain.value=.15;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.6)}catch{}}
function tick(){const n=new Date(),d=D(n),t=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;
S.e.forEach(e=>{if(e.d!==d||e.t!==t||fired.has(e.id))return;fired.add(e.id);beep();toast(`${e.t} · ${e.n}`);
try{if("Notification"in window&&Notification.permission==="granted")new Notification(e.n,{body:"Waktunya jadwalmu."})}catch{}})}
setInterval(tick,10000);
$("#notif").onclick=async()=>{try{const p=await Notification.requestPermission();toast(p==="granted"?"Pengingat aktif. Biarkan halaman tetap terbuka.":"Izin notifikasi belum diberikan.")}catch{toast("Browser ini tidak mendukung notifikasi.")}};
