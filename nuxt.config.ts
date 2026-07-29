// nuxt.config.ts
export default defineNuxtConfig({
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
