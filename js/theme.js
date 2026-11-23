/* tema */
function theme(t){document.documentElement.dataset.theme=t;$("#theme").textContent=t==="dark"?"Mode siang":"Mode malam";try{localStorage.setItem(KEY+"-t",t)}catch{}}
let t0=null;try{t0=localStorage.getItem(KEY+"-t")}catch{}
theme(t0||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
$("#theme").onclick=()=>theme(document.documentElement.dataset.theme==="dark"?"light":"dark");
