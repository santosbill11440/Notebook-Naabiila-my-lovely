/* kunci, rute, beranda */
const L=$("#lock"),RM=matchMedia("(prefers-reduced-motion: reduce)").matches;let cur=null;
const hm=n=>`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;
function enter(n){n.classList.remove("enter");void n.offsetWidth;n.classList.add("enter");clearTimeout(n._t);n._t=setTimeout(()=>n.classList.remove("enter"),1400)}
function pill(){const a=document.querySelector("nav a[aria-current=page]"),p=$(".pill");if(a){p.style.width=a.offsetWidth+"px";p.style.transform=`translateX(${a.offsetLeft}px)`}}
function route(){const h=(location.hash||"#home").slice(1),v=["home","notes","day","ask"].includes(h)?h:"home",n=$("#"+v),o=cur&&$("#"+cur);
document.querySelectorAll("nav a").forEach(a=>a.setAttribute("aria-current",a.hash==="#"+v?"page":"false"));pill();
if(v===cur)return;cur=v;
const go=()=>{document.querySelectorAll(".view").forEach(e=>e.hidden=e!==n);n.scrollTop=0;if(v==="home")rHome();if(v==="day")requestAnimationFrame(segMove);if(v==="ask"){rSrcs();rChat()}if(L.classList.contains("gone"))enter(n)};
if(o&&!RM){o.classList.add("leave");setTimeout(()=>{o.classList.remove("leave");go()},170)}else go()}
addEventListener("hashchange",route);addEventListener("resize",pill);document.fonts&&document.fonts.ready.then(pill);
const act=()=>new Set([...S.n.map(n=>D(new Date(n.u))),...Object.keys(S.d).filter(k=>S.d[k].trim())]);
function streak(){const days=act();let s=0,d=new Date();if(!days.has(D(d)))d.setDate(d.getDate()-1);while(days.has(D(d))){s++;d.setDate(d.getDate()-1)}return s}
const past=e=>+(e.d<D(new Date())||(e.d===D(new Date())&&e.t<=hm(new Date())));
function tline(el){el.classList.remove("tl");const it=[...el.querySelectorAll(".ev-i")];if(!it.length)return;el.classList.add("tl");
requestAnimationFrame(()=>{el.style.setProperty("--tp",it.filter(x=>x.dataset.r==="1").length/it.length);it.forEach((x,i)=>{x.style.setProperty("--dl",i*150+"ms");if(x.dataset.r==="1")x.classList.add("is-reached")})})}
function conste(){const a=act(),Y=[44,22,40,16,36,24,32],P=[],t=new Date();
for(let i=0;i<7;i++){const d=new Date(t);d.setDate(t.getDate()-6+i);P.push({x:24+i*38,y:Y[i],on:a.has(D(d)),w:d.toLocaleDateString("id-ID",{weekday:"narrow"})})}
let h="";P.forEach((p,i)=>{if(i&&P[i-1].on&&p.on){const q=P[i-1];h+=`<line x1="${q.x}" y1="${q.y}" x2="${p.x}" y2="${p.y}" pathLength="1" class="cl" style="animation-delay:${i*140}ms"/>`}});
P.forEach((p,i)=>{h+=`<circle cx="${p.x}" cy="${p.y}" r="${p.on?5:3}" class="cd${p.on?" on":""}" style="animation-delay:${i*140}ms"/><text x="${p.x}" y="64" text-anchor="middle">${p.w}</text>`});$("#cons").innerHTML=h}
function lockT(){const n=new Date();$("#lkc").textContent=hm(n);$("#lkd").textContent=long(D(n))}
function rHome(){lockT();conste();const n=new Date(),h=n.getHours(),td=D(n),s=streak();
$("#hi").textContent=h<11?"Selamat pagi":h<15?"Selamat siang":h<19?"Selamat sore":"Selamat malam";$("#hd").textContent=long(td);
$("#sk").textContent=s+" hari";$("#skt").textContent=s?"Mawarmu dirawat berturut-turut.":"Tulis sesuatu hari ini untuk merawat mawarmu.";
const ev=S.e.filter(e=>e.d===td).sort((a,b)=>a.t.localeCompare(b.t)),pin=S.n.filter(x=>x.p).slice(0,6),nx=ev.find(e=>e.t>=hm(n));
$("#st2").textContent=`${S.n.filter(n=>!n.x).length} catatan · ${ev.length} jadwal hari ini`;
$("#hnext").innerHTML=ev.length?ev.slice(0,3).map(e=>`<div class="ev-i" data-r="${past(e)}"><time>${e.t}</time><div>${esc(e.n)}</div></div>`).join(""):'<p class="muted">Tidak ada jadwal hari ini.</p>';
tline($("#hnext"));const car=$("#hpin");car.innerHTML=pin.length?`<div class="car">${pin.map(x=>`<article class="pc" tabindex="0" data-id="${x.id}" style="background:var(--n${x.c})"><h3>${esc(x.t||"Tanpa judul")}</h3><p>${esc(x.b.split("\n").find(l=>l.trim())||"")}</p></article>`).join("")}</div>`:'<p class="muted">Belum ada catatan yang disematkan.</p>';
const tr=car.firstElementChild;if(tr){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("on",e.isIntersecting)),{root:tr,threshold:.6});tr.querySelectorAll(".pc").forEach(c=>io.observe(c))}
$("#lkw").innerHTML=`<div class="lk-c"><b>${nx?nx.t+" · "+esc(nx.n):"Tidak ada jadwal lagi hari ini"}</b><span>Jadwal berikutnya</span></div><div class="lk-c"><b>Mawarmu: ${s} hari</b><span>${S.n.filter(n=>!n.x).length} catatan tersimpan</span></div>`}
setInterval(lockT,5000);
$("#hpin").onclick=e=>{const c=e.target.closest(".pc");if(c){location.hash="#notes";setTimeout(()=>openEd(c.dataset.id),450)}};
$("#accb").onclick=()=>{const o=$(".acc").toggleAttribute("data-open");$("#accb").setAttribute("aria-expanded",o)};
/* layar kunci: bintang, paralaks, geser ke atas */
let px=0,py=0,tx=0,ty=0,y0=null,dy=0;
if(!RM)addEventListener("pointermove",e=>{if(y0===null){tx=(e.clientX/innerWidth-.5)*-14;ty=(e.clientY/innerHeight-.5)*-10}});
const cv=$("#stars"),cx=cv.getContext("2d"),ST=[...Array(80)].map(()=>({x:Math.random(),y:Math.random()*.62,z:.3+Math.random()*.9,r:.6+Math.random()*1.5,p:Math.random()*6.3,s:.6+Math.random()*1.4})),SM=[];let sw=0,sh=0,nextS=3000,tm=performance.now(),last=tm;
function draw(t){cx.clearRect(0,0,sw,sh);cx.fillStyle="#fff6dd";ST.forEach(s=>{cx.globalAlpha=RM?.8:.3+.7*(.5+.5*Math.sin(t/1000*s.s+s.p));cx.beginPath();cx.arc(s.x*sw+px*s.z*2.2,s.y*sh+py*s.z*2.2,s.r,0,6.283);cx.fill()});
SM.forEach(m=>{const g=cx.createLinearGradient(m.x,m.y,m.x-m.vx*.22,m.y-m.vy*.22);g.addColorStop(0,"rgba(255,255,255,"+m.a+")");g.addColorStop(1,"rgba(255,255,255,0)");cx.globalAlpha=1;cx.strokeStyle=g;cx.lineWidth=2;cx.beginPath();cx.moveTo(m.x,m.y);cx.lineTo(m.x-m.vx*.22,m.y-m.vy*.22);cx.stroke()})}
function sz(){const r=devicePixelRatio||1;sw=innerWidth;sh=innerHeight;cv.width=sw*r;cv.height=sh*r;cx.setTransform(r,0,0,r,0,0);draw(0)}
addEventListener("resize",sz);sz();
(function f(now){const dt=Math.min(.05,(now-last)/1000);last=now;px+=(tx-px)*.06;py+=(ty-py)*.06;
if(!L.classList.contains("gone")&&!document.hidden){$(".lk-bg").style.transform=`translate(${px}px,${py}px)`;
if(!RM){if(now-tm>nextS){tm=now;nextS=6000+Math.random()*5000;SM.push({x:sw*(.5+Math.random()*.5),y:sh*Math.random()*.25,vx:-460,vy:210,a:1})}
SM.forEach(m=>{m.x+=m.vx*dt;m.y+=m.vy*dt;m.a-=dt*.7});for(let k=SM.length;k--;)if(SM[k].a<=0)SM.splice(k,1);draw(now)}}
requestAnimationFrame(f)})(performance.now());
function unlock(){L.classList.add("gone");document.body.classList.remove("locked");const n=$("#"+cur);setTimeout(()=>enter(n),260)}
$("#unlock").onclick=unlock;
$("#relock").onclick=()=>{rHome();document.body.classList.add("locked");L.classList.remove("gone")};
L.addEventListener("pointerdown",e=>{y0=e.clientY;dy=0;L.classList.add("drag")});
addEventListener("pointermove",e=>{if(y0===null)return;dy=Math.min(0,e.clientY-y0);L.style.transform=`translateY(${dy}px) scale(${1+dy/3500})`;L.style.opacity=Math.max(.3,1+dy/(innerHeight*1.2))});
const endDrag=()=>{if(y0===null)return;y0=null;L.classList.remove("drag");const go=-dy>innerHeight*.2;L.style.transform=L.style.opacity="";if(go)unlock()};
addEventListener("pointerup",endDrag);addEventListener("pointercancel",endDrag);
addEventListener("keydown",e=>{if(!L.classList.contains("gone")&&(e.key==="ArrowUp"||e.key==="Enter"))unlock()});
