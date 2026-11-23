/* catatan */
function rNotes(){const q=$("#q").value.toLowerCase().split(/\s+/).filter(Boolean),tags=[...new Set(S.n.flatMap(n=>n.g))].sort();
if(tag&&!tags.includes(tag))tag="";
$("#chips").innerHTML=["",...tags].map(t=>`<button class="chip" type="button" data-t="${esc(t)}" aria-pressed="${t===tag}">${t?"#"+esc(t):"Semua"}</button>`).join("");
const l=S.n.filter(n=>(mode==="t"?!!n.x:mode==="a"?!!n.a&&!n.x:!n.a&&!n.x)&&(!tag||n.g.includes(tag))&&q.every(w=>(n.t+" "+n.b+" "+n.g.join(" ")).toLowerCase().includes(w))).sort((a,b)=>b.p-a.p||b.u-a.u);
$("#grid").innerHTML=l.length?l.map((n,i)=>`<article class="note" tabindex="0" data-id="${n.id}" style="--i:${Math.min(i,10)};background:var(--n${n.c})"><h3>${n.p?"📌 ":""}${n.r?"⏰ ":""}${esc(n.t||"Tanpa judul")}</h3>${n.b.split("\n").slice(0,8).map((ln,i)=>{const m=ln.match(CHECK);return m?`<label class="${m[1]!==" "?"done":""}"><input type="checkbox" data-i="${i}" ${m[1]!==" "?"checked":""}><span>${esc(m[2])}</span></label>`:ln.trim()?`<p>${esc(ln)}</p>`:""}).join("")}<small>${n.g.map(t=>"#"+esc(t)).join(" ")} ${new Date(n.u).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}</small></article>`).join(""):
`<div class="empty"><img src="${S.n.length?IMG.ele:IMG.sheep}" alt="">${S.n.length?"Tidak ada catatan yang cocok.":"Belum ada catatan. Tekan + untuk menulis yang pertama."}</div>`}
$("#grid").addEventListener("click",e=>{const c=e.target.closest("article");if(!c)return;const n=S.n.find(x=>x.id===c.dataset.id);
if(e.target.type==="checkbox"){const L=n.b.split("\n"),i=+e.target.dataset.i,m=L[i].match(CHECK);L[i]=(e.target.checked?"[x] ":"[ ] ")+m[2];n.b=L.join("\n");n.u=Date.now();save();rNotes();return}
openEd(n.id)});
$("#grid").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches("article"))openEd(e.target.dataset.id)});
$("#chips").onclick=e=>{if(e.target.dataset.t!==undefined){tag=e.target.dataset.t;rNotes()}};
$("#q").oninput=rNotes;

/* editor */
for(let i=0;i<5;i++){const b=document.createElement("button");b.type="button";b.style.background=`var(--n${i})`;b.setAttribute("aria-label","Warna "+(i+1));b.onclick=()=>setCol(i);$("#cols").append(b)}
function setCol(i){col=i;[...$("#cols").children].forEach((b,j)=>b.setAttribute("aria-pressed",i===j))}
function sure(b,fn){if(b.dataset.s){fn();return}const t=b.textContent;b.dataset.s=1;b.textContent="Yakin?";setTimeout(()=>{delete b.dataset.s;b.textContent=t},2500)}
function syncRem(n){S.e=S.e.filter(e=>e.nid!==n.id);if(n.r&&!n.x)S.e.push({id:uid(),n:n.t||"Catatan",t:n.r.t,d:n.r.d,nid:n.id})}
function openEd(id){const n=S.n.find(x=>x.id===id);edId=n?n.id:null;
$("#et").value=n?n.t:"";$("#eb").value=n?n.b:"";$("#eg").value=n?n.g.join(", "):"";$("#ep").checked=!!(n&&n.p);
$("#erd").value=n&&n.r?n.r.d:"";$("#ert").value=n&&n.r?n.r.t:"";
$("#dl").hidden=!n;$("#dl").textContent=n&&n.x?"Hapus permanen":"Buang";
$("#ar").hidden=!n;$("#ar").textContent=n&&n.x?"Pulihkan":n&&n.a?"Keluarkan":"Arsipkan";$("#dp").hidden=!n||!!n.x;
setCol(n?n.c:0);$("#ed").showModal();$("#et").focus()}
$("#add").onclick=()=>openEd(null);
$("#cn").onclick=()=>$("#ed").close();
$("#ed").addEventListener("click",e=>{if(e.target===$("#ed"))$("#ed").close()});
$("#nf").onsubmit=e=>{e.preventDefault();const t=$("#et").value.trim(),b=$("#eb").value;
if(!t&&!b.trim()){$("#ed").close();return}
const rd=$("#erd").value,rt=$("#ert").value,d={t,b,g:[...new Set($("#eg").value.split(",").map(x=>x.trim().toLowerCase().replace(/^#/,"")).filter(Boolean))],c:col,p:$("#ep").checked,r:rd&&rt?{d:rd,t:rt}:null,u:Date.now()};
let o=S.n.find(n=>n.id===edId);if(o)Object.assign(o,d);else{o={id:uid(),...d};S.n.push(o)}
syncRem(o);save();$("#ed").close();rNotes();rDay();if(d.r)toast(`Pengingat diatur ${rd} ${rt}`)};
$("#ar").onclick=()=>{const n=S.n.find(x=>x.id===edId);if(!n)return;if(n.x){n.x=0;toast("Catatan dipulihkan.")}else{n.a=!n.a;toast(n.a?"Dipindah ke arsip.":"Dikeluarkan dari arsip.")}n.u=Date.now();syncRem(n);save();$("#ed").close();rNotes();rDay()};
$("#dp").onclick=()=>{const n=S.n.find(x=>x.id===edId);if(!n)return;S.n.push({...n,id:uid(),t:(n.t||"Catatan")+" (salinan)",r:null,u:Date.now()});save();$("#ed").close();rNotes();toast("Catatan digandakan.")};
$("#dl").onclick=()=>{const n=S.n.find(x=>x.id===edId);if(!n)return;
if(n.x)return sure($("#dl"),()=>{S.n=S.n.filter(m=>m.id!==edId);S.e=S.e.filter(v=>v.nid!==edId);save();$("#ed").close();rNotes();rDay()});
n.x=Date.now();syncRem(n);save();$("#ed").close();rNotes();rDay();toast("Dipindah ke sampah. Dihapus otomatis setelah 7 hari.")};
$("#modes").onclick=e=>{const m=e.target.dataset.m;if(m){mode=m;[...$("#modes").children].forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m));rNotes()}};
$("#lv").onclick=()=>{const g=$("#grid").classList.toggle("list");$("#lv").textContent=g?"Kotak":"Daftar"};
(async()=>{const add=text=>{const b=$("#eb");b.value+=(b.value&&!/\s$/.test(b.value)?" ":"")+text};
try{const d=window.claude&&await claude.use("dictation");if(d){$("#mic").hidden=false;d.onFinal(({text})=>add(text));d.onState(({state})=>$("#mic").textContent=state==="listening"?"Berhenti":"Suara");$("#mic").onclick=()=>{$("#mic").textContent==="Berhenti"?d.stop():d.start().catch(()=>{})};return}}catch{}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();r.lang="id-ID";r.continuous=true;let on=false;
r.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++)if(e.results[i].isFinal)add(e.results[i][0].transcript.trim())};
r.onend=()=>{on=false;$("#mic").textContent="Suara"};$("#mic").hidden=false;
$("#mic").onclick=()=>{if(on){r.stop();return}try{r.start();on=true;$("#mic").textContent="Berhenti"}catch{}}})();
