(()=>{"use strict";
const sections=Object.freeze({kw:"sections/koowexa.html",ac:"sections/academy.html",kx:"sections/kambex.html",px:"sections/promox.html"});
const tabs=[...document.querySelectorAll("[data-tab]")];
const frames=new Map([...document.querySelectorAll("[data-module]")].map(frame=>[frame.dataset.module,frame]));
const loaded=new Set();
function activate(key){
 if(!Object.hasOwn(sections,key))return;
 for(const tab of tabs){const active=tab.dataset.tab===key;tab.setAttribute("aria-selected",String(active));tab.tabIndex=active?0:-1;}
 for(const [name,frame] of frames){const active=name===key;frame.hidden=!active;if(active&&!loaded.has(name)){frame.src=sections[name];loaded.add(name);}}
}
for(const tab of tabs)tab.addEventListener("click",()=>activate(tab.dataset.tab));
window.addEventListener("message",event=>{
 const frame=[...frames.values()].find(item=>item.contentWindow===event.source);
 if(!frame||event.origin!==window.location.origin)return;
 const data=event.data;
 if(data&&typeof data.kwModule==="string")activate(data.kwModule);
});
document.addEventListener("keydown",event=>{
 if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
 const index=tabs.indexOf(document.activeElement);if(index<0)return;
 event.preventDefault();
 const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(index+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
 tabs[next].focus();tabs[next].click();
});
activate("kw");
})();