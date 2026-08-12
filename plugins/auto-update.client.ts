export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return

  let currentBuildTime: string | null = null
  let isUpdating = false

  // Función para purgar cachés y forzar recarga limpia de la aplicación
  const forceAppUpdate = async () => {
    if (isUpdating) return
    isUpdating = true

    console.log('[Auto-Update] Nueva versión detectada. Limpiando cachés y recargando...')

    try {
      // 1. Limpiar Caché de la API de Caches (Service Worker)
      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      }

      // 2. Desregistrar Service Workers viejos
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
        }
      }
    } catch (err) {
      console.warn('[Auto-Update] Error limpiando cachés:', err)
    } finally {
      // 3. Recargar la página desde el servidor omitiendo la caché local
      window.location.reload()
    }
  }

  // Comprobar la versión instalada contra el servidor
  const checkVersion = async () => {
    try {
      // Usar timestamp dinámico en la query para evitar caché del navegador en la petición
      const data: any = await $fetch(`/api/version?_t=${Date.now()}`, {
        cache: 'no-store'
      })

      if (!data || !data.buildTime) return

      if (!currentBuildTime) {
        currentBuildTime = data.buildTime
      } else if (currentBuildTime !== data.buildTime) {
        await forceAppUpdate()
      }
    } catch (err) {
      console.warn('[Auto-Update] No se pudo verificar la versión:', err)
    }
  }

  // 1. Registrar Service Worker PWA para iOS / Android
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                forceAppUpdate()
              }
            })
          }
        })
      }).catch((err) => {
        console.warn('[PWA SW] Error al registrar Service Worker:', err)
      })
    })
  }

  // 2. Verificar versión inicial
  checkVersion()

  // 3. Verificar versión cuando la app vuelve al primer plano (Móviles iOS / Android)
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkVersion()
    }
  })

  window.addEventListener('focus', () => {
    checkVersion()
  })

  // 4. Verificar versión en cada navegación interna (SPA)
  const router = useRouter()
  router.afterEach(() => {
    checkVersion()
  })

  // 5. Polling cada 2 minutos en segundo plano
  setInterval(checkVersion, 2 * 60 * 1000)
})
