const CACHE='perfusiones-simulador-v09';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.svg','./icon-512.svg','./icon-192.png','./icon-512.png','./biblioteca-farmacos.json','./matriz-concentraciones-publicadas.json','./marco-neonatal-bandas-nppg.json','./auditoria-fuentes.json','./matriz-presentaciones-aemps.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});