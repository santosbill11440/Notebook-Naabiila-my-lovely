/* cadangan */
$("#exp").onclick=async()=>{const name=`catatan-${D(new Date())}.json`,data=JSON.stringify(S,null,2);
try{const d=window.claude&&await claude.use("downloads");if(d){await d.save({filename:name,data});toast("Cadangan disimpan.");return}}catch(e){if(e&&e.code==="declined")return}
const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download=name;a.click();URL.revokeObjectURL(a.href)};
$("#imp").onchange=async e=>{const f=e.target.files[0];if(!f)return;
try{const d=JSON.parse(await f.text()),mg=(c,i)=>[...c,...(i||[]).filter(x=>!c.some(y=>y.id===x.id))];
S.n=mg(S.n,d.n);S.e=mg(S.e,d.e);Object.assign(S.d,d.d||{});save();rNotes();rDay();rHome();toast("Data berhasil diimpor.")}
catch{toast("File tidak valid. Pilih file hasil ekspor aplikasi ini.")}e.target.value=""};
