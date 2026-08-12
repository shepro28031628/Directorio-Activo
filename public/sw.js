// Service Worker con política Network-First / Immediate Activation
const CACHE_NAME = 'dir-activo-v1'

self.addEventListener('install', (event) => {
  // Forzar que el nuevo Service Worker se active inmediatamente sin esperar
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Tomar control inmediato de todas las pestañas/clientes abiertos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Estrategia Network First para peticiones de datos
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  // No interceptar peticiones de API o WebSocket
  if (event.request.url.includes('/api/') || event.request.url.includes('socket.io')) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar y guardar copia en caché de respaldo
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        return caches.match(event.request)
      })
  )
})
