// Files to cache 
 const cacheName = 'twinnybloggers'; 
 const appShellFiles = [ 
   '/twinnybloggers/pwa.twinnyblogger/', 
   '/twinnybloggers/pwa.twinnyblogger/app.js', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-32.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-64.png', 
   '/twinnybloggers/pwa.twinnyblogger/icon-96.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-128.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-168.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-192.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-256.png', 
   '/twinnybloggers/pwa.twinnyblogger/icons/icon-512.png', 
 ]; 
 const gamesImages = []; 
 for (let i = 0; i < games.length; i++) { 
   gamesImages.push(`data/img/${games[i].slug}.jpg`); 
 } 
 const contentToCache = appShellFiles.concat(gamesImages); 
  
 // Installing Service Worker 
 self.addEventListener('install', (e) => { 
   console.log('[Service Worker] Install'); 
   e.waitUntil((async () => { 
     const cache = await caches.open(cacheName); 
     console.log('[Service Worker] Caching all: app shell and content'); 
     await cache.addAll(contentToCache); 
   })()); 
 }); 
  
 // Fetching content using Service Worker 
 self.addEventListener('fetch', (e) => { 
   e.respondWith((async () => { 
     const r = await caches.match(e.request); 
     console.log(`[Service Worker] Fetching resource: ${e.request.url}`); 
     if (r) return r; 
     const response = await fetch(e.request); 
     const cache = await caches.open(cacheName); 
     console.log(`[Service Worker] Caching new resource: ${e.request.url}`); 
     cache.put(e.request, response.clone()); 
     return response; 
   })()); 
 });
