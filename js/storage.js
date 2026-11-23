const $=s=>document.querySelector(s),S={n:[],e:[],d:{}},KEY="petitprince-v1";
try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch{}
S.n=S.n.filter(n=>!n.x||Date.now()-n.x<6048e5);
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{toast("Penyimpanan browser penuh atau dimatikan.")}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const D=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const long=k=>new Date(k+"T12:00").toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const CHECK=/^\[( |x)\]\s?(.*)$/i,IMG={sheep:"assets/sheep.png",fox:"assets/fox.png",ele:"assets/elephant.png"};
let sel=D(new Date()),cm=new Date(),tag="",mode="n",edId=null,col=0,tt;
cm.setDate(1);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),3500)}
