const DEFAULTS = [];
const rows=document.querySelector("#rows"), tpl=document.querySelector("#rowTemplate"), status=document.querySelector("#status");
function normalizeHost(v){v=v.trim();if(!v)return "";try{return new URL(v.includes("://")?v:`https://${v}`).hostname.toLowerCase()}catch{return ""}}
function validHex(v){return /^#[0-9a-f]{6}$/i.test(v)}
function addRow(item={host:"",label:"",color:"#1565C0"}){
 const node=tpl.content.firstElementChild.cloneNode(true), host=node.querySelector(".host"), label=node.querySelector(".label"), color=node.querySelector(".color"), hex=node.querySelector(".hex");
 host.value=item.host||"";label.value=item.label||"";color.value=validHex(item.color)?item.color:"#1565C0";hex.value=color.value.toUpperCase();
 color.addEventListener("input",()=>hex.value=color.value.toUpperCase());
 hex.addEventListener("input",()=>{if(validHex(hex.value))color.value=hex.value});
 node.querySelector(".remove").addEventListener("click",()=>node.remove());rows.appendChild(node);
}
async function load(){const data=await chrome.storage.sync.get("environments");if (Array.isArray(data.environments)) {
  data.environments.forEach(addRow);
} else {
  addRow();
}}
document.querySelector("#add").addEventListener("click",()=>addRow());
document.querySelector("#save").addEventListener("click",async()=>{
 status.textContent="";status.className="";const envs=[];const seen=new Set();
 for(const row of rows.querySelectorAll(".row")){
  const host=normalizeHost(row.querySelector(".host").value), label=row.querySelector(".label").value.trim().toUpperCase(), color=row.querySelector(".hex").value.trim().toUpperCase();
  if(!host||!label||!validHex(color)){status.textContent="Minden sorban érvényes host, címke és #RRGGBB szín szükséges.";status.className="error";return}
  if(!host.endsWith(".veevavault.com")||seen.has(host)){status.textContent="Csak egyedi *.veevavault.com hostnevek adhatók meg.";status.className="error";return}
  seen.add(host);envs.push({host,label,color});
 }
 await chrome.storage.sync.set({environments:envs});status.textContent="Mentve. A nyitott Vault oldalak automatikusan frissülnek.";
});
load();
