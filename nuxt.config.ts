// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Directorio Activo REN',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        // Directivas de no caché para el cascarón HTML de la SPA en Safari iOS y Chrome Android
        { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { 'http-equiv': 'Expires', content: '0' },
        // Meta etiquetas para soporte PWA standalone en iOS y Android
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Directorio Activo' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'theme-color', content: '#7c3aed' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: [
    '~/assets/css/style.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  experimental: {
    appManifest: false
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {
      wsEndpoint: process.env.WS_ENDPOINT || 'ws://localhost:3001'
    }
  },
  vite: {
    server: {
      allowedHosts: true
    }
  },
  compatibilityDate: '2026-06-26'
})
