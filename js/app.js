document.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".seg button").forEach(x=>x.setAttribute("aria-pressed",x===b));["ag","di"].forEach(k=>$("#p-"+k).hidden=k!==b.dataset.p);const p=$("#p-"+b.dataset.p);p.classList.remove("swp");void p.offsetWidth;p.classList.add("swp");segMove()});
function segMove(){const b=$(".seg [aria-pressed=true]"),i=$(".seg i");i.style.width=b.offsetWidth+"px";i.style.transform=`translateX(${b.offsetLeft}px)`}
$(".seg").onkeydown=e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){const n=[...document.querySelectorAll(".seg button")].find(b=>b.getAttribute("aria-pressed")!=="true");n.click();n.focus()}};
if(location.hash.length>1)L.classList.add("gone");
document.body.classList.toggle("locked",!L.classList.contains("gone"));
rNotes();rDay();rHome();route();
