/* Tanya: jawaban dari catatanmu, lengkap dengan rujukan */
const EX=new Set(),M=[];let ctrl=null;
const fmt=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\[(\d+)\]/g,'<button class="cite" type="button" data-i="$1" aria-label="Sumber $1">$1</button>').replace(/\n/g,"<br>");
const srcList=()=>S.n.filter(n=>!n.x&&!EX.has(n.id)).map((n,i)=>({i:i+1,id:n.id,t:n.t||"Tanpa judul",b:n.b}));
function rSrcs(){const all=S.n.filter(n=>!n.x);$("#srcs").innerHTML=`<h3>Sumber (${srcList().length}/${all.length})</h3>`+(all.length?`<div class="chips">${all.map(n=>`<button class="chip" type="button" data-id="${n.id}" aria-pressed="${!EX.has(n.id)}">${esc(n.t||"Tanpa judul")}</button>`).join("")}</div>`:'<p class="muted">Belum ada catatan. Tulis catatan atau tambah sumber .txt/.md.</p>')}
function rChat(){const c=$("#chat");c.innerHTML=M.length?M.map((m,i)=>`<div class="msg ${m.r}">${m.r==="u"?esc(m.t):m.t?fmt(m.t):'<span class="dots">Membaca sumber</span>'}${m.r==="a"&&m.t?`<small class="muted">${m.ai?"Dijawab Claude dari sumbermu":"Mode lokal (tanpa AI)"} <button class="btn ghost" type="button" data-sv="${i}">Simpan ke catatan</button></small>`:""}</div>`).join(""):'<p class="muted">Pilih sumber di atas, lalu tanya atau pakai tombol cepat. Jawaban memuat angka rujukan yang bisa diketuk.</p>';c.scrollTop=c.scrollHeight}
async function ask(q){const src=srcList();if(!src.length){toast("Pilih minimal satu sumber.");return}
if(ctrl)ctrl.abort();M.push({r:"u",t:q});const m={r:"a",t:"",q,src:src.map(x=>x.id)};M.push(m);rChat();
let sm=null;try{sm=window.claude?await claude.use("sample"):null}catch{}
if(sm){try{ctrl=new AbortController();
await sm(`Kamu asisten belajar seperti NotebookLM. Jawab dalam bahasa Indonesia hanya berdasarkan SUMBER di bawah. Beri rujukan seperti [1] atau [2] di setiap klaim. Jika jawabannya tidak ada di sumber, katakan terus terang. Singkat dan jelas.\n\nTUGAS: ${q}\n\nSUMBER:\n${src.map(x=>`[${x.i}] ${x.t}\n${x.b.slice(0,6000)}`).join("\n\n").slice(0,24000)}`,{onText:({text})=>{m.t=text;rChat()},signal:ctrl.signal,cache:false,modelTier:"quick"});m.ai=1;rChat();return}
catch(e){if(e&&e.name==="AbortError")return;if(e&&e.code==="rate_limited")toast("Terlalu sering bertanya. Coba lagi sebentar.");m.t=""}}
const w=q.toLowerCase().split(/\W+/).filter(x=>x.length>2);let out=[];
src.forEach(x=>x.b.split(/\n+/).forEach(p=>{const l=p.toLowerCase(),c=w.filter(k=>l.includes(k)).length;if(p.trim()&&c)out.push({c,i:x.i,p:p.replace(CHECK,"$2")})}));
out.sort((a,b)=>b.c-a.c);
if(!out.length)out=src.flatMap(x=>x.b.split(/\n+/).filter(p=>p.trim()).slice(0,2).map(p=>({c:0,i:x.i,p:p.replace(CHECK,"$2")}))).slice(0,4);
m.t=out.length?"Bagian sumber yang paling dekat:\n"+out.slice(0,4).map(o=>`• ${o.p} [${o.i}]`).join("\n"):"Sumber yang dipilih masih kosong.";rChat()}
$("#af").onsubmit=e=>{e.preventDefault();const q=$("#aq").value.trim();if(q){$("#aq").value="";ask(q)}};
$("#qa").onclick=e=>{if(e.target.dataset.k)ask(e.target.dataset.k)};
$("#srcs").onclick=e=>{const id=e.target.dataset.id;if(id){EX.has(id)?EX.delete(id):EX.add(id);rSrcs()}};
$("#chat").onclick=e=>{const c=e.target.closest(".cite"),v=e.target.dataset.sv;
if(c){const m=[...$("#chat").children].indexOf(c.closest(".msg")),id=M[m]&&M[m].src[+c.dataset.i-1];if(id)openEd(id)}
if(v){const m=M[+v];S.n.push({id:uid(),t:"Tanya: "+m.q.slice(0,40),b:m.t,g:["ai"],c:3,p:false,u:Date.now()});save();rNotes();toast("Disimpan ke catatan.")}};
$("#addsrc").onclick=()=>$("#sf").click();
$("#sf").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const t=await f.text();S.n.push({id:uid(),t:f.name.replace(/\.\w+$/,""),b:t.slice(0,60000),g:["sumber"],c:4,p:false,u:Date.now()});save();rNotes();rSrcs();toast("Sumber ditambahkan.")}catch{toast("File tidak bisa dibaca.")}e.target.value=""};
