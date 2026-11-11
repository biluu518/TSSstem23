/* STEM HUB CLUB - offline support. Put this file in the same folder as index.html. */
const V="stem-offline-v1",ROOT=new URL("./",self.location).href;
const PRE=["https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js","https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap"];
const HOSTS=["www.gstatic.com","cdnjs.cloudflare.com","cdn.jsdelivr.net","unpkg.com","ajax.googleapis.com","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil((async()=>{const c=await caches.open(V);try{await c.add(new Request(ROOT,{cache:"reload"}))}catch(x){}await Promise.allSettled(PRE.map(u=>c.add(new Request(u,{mode:"no-cors"}))))})())});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(r.mode==="navigate"&&u.origin===self.location.origin){e.respondWith((async()=>{const c=await caches.open(V);try{const n=await Promise.race([fetch(r),new Promise((_,j)=>setTimeout(j,5000))]);if(n&&n.ok)c.put(ROOT,n.clone());return n}catch(x){return(await c.match(ROOT))||(await c.match(r))||Response.error()}})());return}
 if(u.origin!==self.location.origin&&HOSTS.includes(u.hostname)){e.respondWith((async()=>{const c=await caches.open(V),m=await c.match(r);
  if(m){e.waitUntil(fetch(r).then(n=>{if(n&&(n.ok||n.type==="opaque"))c.put(r,n)}).catch(()=>{}));return m}
  try{const n=await fetch(r);if(n&&(n.ok||n.type==="opaque"))c.put(r,n.clone());return n}catch(x){return Response.error()}})())}});
