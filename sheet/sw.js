/* «Чистий аркуш» is closed (moved to Baobook, https://baobook.matamata.app).
   Browsers that still have the old worker fetch this file on their next update check. It removes only the old app's
   caches (sheet-*), never other apps' caches on this shared origin, then unregisters itself and reloads open pages,
   so they show the closing page with the notes export. Notes in IndexedDB and localStorage are not touched. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('sheet-')).map(k => caches.delete(k)));
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
