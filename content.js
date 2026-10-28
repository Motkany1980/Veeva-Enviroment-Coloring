(() => {
 "use strict";
 const DEFAULTS=[];
 const BADGE="gr-veeva-env-badge";let env=null,lastUrl=location.href,scheduled=false,currentHeader=null,original=new WeakMap();
 function rgb(v){const m=(v||"").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return m?m.slice(1,4).map(Number):null}
 function green(el){const c=rgb(getComputedStyle(el).backgroundColor);return !!c&&c[1]>c[0]*1.15&&c[1]>c[2]*1.08&&c[1]>55&&c[0]<145}
 function score(el){const r=el.getBoundingClientRect();if(r.width<innerWidth*.65||r.height<25||r.height>110||r.top< -8||r.top>100)return -1;const t=(el.innerText||"").replace(/\s+/g," ");let s=0;if(green(el))s+=25;if(/\bSBX\b/i.test(t))s+=10;if(/veeva/i.test(t))s+=6;if(/RIM/i.test(t))s+=3;if(r.top<=10)s+=4;return s}
 function findHeader(){let b=null,bs=-1;for(const el of document.querySelectorAll("header,[role=banner],body div,body nav")){const s=score(el);if(s>bs){b=el;bs=s}}return bs>=10?b:null}
 function setBg(el,color){if(!original.has(el))original.set(el,{background:el.style.getPropertyValue("background"),backgroundColor:el.style.getPropertyValue("background-color"),backgroundImage:el.style.getPropertyValue("background-image")});el.style.setProperty("background",color,"important");el.style.setProperty("background-color",color,"important");el.style.setProperty("background-image","none","important")}
 function restore(){if(!currentHeader)return;for(const el of [currentHeader,...currentHeader.querySelectorAll("*")]){const o=original.get(el);if(o){for(const [k,v] of Object.entries({background:o.background,"background-color":o.backgroundColor,"background-image":o.backgroundImage}))v?el.style.setProperty(k,v):el.style.removeProperty(k)}}document.getElementById(BADGE)?.remove();currentHeader=null}
 function apply(){scheduled=false;if(!env||!document.body){restore();return}const h=findHeader();if(!h)return;currentHeader=h;setBg(h,env.color);for(const c of h.querySelectorAll("*"))if(green(c))setBg(c,env.color);let badge=document.getElementById(BADGE);if(!badge){badge=document.createElement("span");badge.id=BADGE}badge.textContent=env.label;badge.style.cssText="margin-left:8px;padding:2px 8px;border:1px solid rgba(255,255,255,.9);border-radius:3px;background:rgba(0,0,0,.22);color:#fff;font:700 11px/16px Arial,sans-serif;letter-spacing:.4px;pointer-events:none;z-index:2147483647";if(!h.contains(badge)){const sbx=[...h.querySelectorAll("*")].find(x=>(x.textContent||"").trim()==="SBX");(sbx?.parentElement||h).appendChild(badge)}}
 function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(apply)}
 async function load(){const d=await chrome.storage.sync.get("environments"),list=Array.isArray(d.environments)?d.environments:DEFAULTS;env=list.find(x=>x.host===location.hostname)||null;schedule();setTimeout(schedule,300);setTimeout(schedule,1200)}
 chrome.storage.onChanged.addListener((c,a)=>{if(a==="sync"&&c.environments)load()});
 for(const m of ["pushState","replaceState"]){const o=history[m];history[m]=function(...a){const r=o.apply(this,a);schedule();setTimeout(schedule,300);return r}}
 addEventListener("popstate",schedule);addEventListener("hashchange",schedule);addEventListener("pageshow",schedule);addEventListener("load",schedule);document.addEventListener("DOMContentLoaded",schedule,{once:true});
 new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style"]});
 setInterval(()=>{if(location.href!==lastUrl)lastUrl=location.href;schedule()},2000);load();
})();
