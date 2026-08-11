<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(true)
const isMobileMenuOpen = ref(false)
const isEmergencyMode = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleEmergencyMode = () => {
  isEmergencyMode.value = !isEmergencyMode.value
  if (isEmergencyMode.value) {
    document.body.classList.add('emergency-mode')
  } else {
    document.body.classList.remove('emergency-mode')
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  // Activar Dark Mode por defecto para estética ciberseguridad / Active Directory profesional
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <div 
    :class="[
      isDark ? 'dark' : '', 
      isEmergencyMode ? 'emergency-mode' : ''
    ]" 
    class="min-h-screen flex bg-midnight-bg text-slate-100 font-sans transition-colors duration-300 relative"
  >
    
    <!-- Backdrop Overlay para Móviles -->
    <Transition name="fade">
      <div 
        v-if="isMobileMenuOpen" 
        @click="closeMobileMenu"
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-30 lg:hidden"
      ></div>
    </Transition>

    <!-- Barra Lateral (Sidebar) — Responsive con Drawer & Style Bento -->
    <aside 
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'w-64 bg-[#090D14] text-white flex flex-col fixed h-screen z-40 shadow-2xl border-r border-white/10 transition-transform duration-300 ease-in-out'
      ]"
    >
      <!-- Logo y Marca -->
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div 
            :class="isEmergencyMode ? 'from-rose-600 to-red-600 shadow-glow-coral' : 'from-cyan-500 to-blue-600 shadow-glow-cyan'"
            class="w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center border border-white/20 transition-all duration-500"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 class="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              Directorio Activo <span :class="isEmergencyMode ? 'text-neon-coral' : 'text-neon-cyan'">Ren</span>
            </h1>
            <span class="text-[10px] text-slate-400 block font-mono">MDM & Active Directory</span>
          </div>
        </div>

        <button 
          @click="closeMobileMenu"
          class="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      
      <!-- Navegación Lateral -->
      <nav class="flex-grow p-3 space-y-1 overflow-y-auto custom-scrollbar">
        <!-- Dashboard MDM -->
        <NuxtLink 
          to="/" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
          exact-active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/>
          </svg>
          Dashboard Bento Grid
        </NuxtLink>

        <!-- Active Directory Core -->
        <NuxtLink 
          to="/active-directory" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          Nodos AD & Core
          <span class="ml-auto text-[9px] bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 px-1.5 py-0.5 rounded-full font-bold">AD</span>
        </NuxtLink>

        <!-- Colaboradores -->
        <NuxtLink 
          to="/colaboradores" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          Colaboradores
        </NuxtLink>

        <!-- Dispositivos Enrolados -->
        <NuxtLink 
          to="/equipos" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Dispositivos Enrolados
        </NuxtLink>

        <!-- Políticas y Perfiles -->
        <NuxtLink 
          to="/politicas" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Políticas & GPOs
        </NuxtLink>

        <!-- Centro de Enrolamiento -->
        <NuxtLink 
          to="/enrolamiento" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
          </svg>
          Centro Enrolamiento
        </NuxtLink>

        <!-- Matriz de Accesos -->
        <NuxtLink 
          to="/aplicaciones" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Matriz de Accesos
        </NuxtLink>

        <!-- AnyDesk API -->
        <NuxtLink 
          to="/anydesk" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          AnyDesk API
          <span class="ml-auto text-[9px] bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 px-1.5 py-0.5 rounded-full font-bold">API</span>
        </NuxtLink>

        <!-- Google Workspace Admin -->
        <NuxtLink 
          to="/google/admin" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-5.625-3.75"/>
          </svg>
          Google Workspace
        </NuxtLink>

        <!-- Microsoft 365 Admin -->
        <NuxtLink 
          to="/microsoft/admin" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"/>
          </svg>
          Microsoft 365
        </NuxtLink>

        <!-- Bitácora de Auditoría -->
        <NuxtLink 
          to="/auditorias" 
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800/60 hover:text-white group text-sm"
          active-class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-glow-cyan"
        >
          <svg class="w-4.5 h-4.5 text-slate-400 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
          Bitácora Auditoría
        </NuxtLink>
      </nav>

      <!-- Pie del Sidebar -->
      <div class="p-4 border-t border-white/10 text-[11px] text-slate-400 text-center bg-[#070a12]/50 font-mono">
        DIRECTORIO ACTIVO REN v3.0.0 &copy; 2026
      </div>
    </aside>

    <!-- Área de Contenido Principal -->
    <div class="flex-1 lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
      
      <!-- Banner Flotante de Emergencia (Modo Misión Crítica) -->
      <Transition name="fade">
        <div 
          v-if="isEmergencyMode" 
          class="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white py-2 px-4 text-xs font-mono font-bold flex items-center justify-between shadow-glow-coral animate-emergency-radar z-30"
        >
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>🚨 MODO MISIÓN CRÍTICA ACTIVADO: SEGUIMIENTO EN TIEMPO REAL DE AMENAZAS & DISPOSITIVOS EN RIESGO</span>
          </div>
          <button @click="toggleEmergencyMode" class="text-white hover:underline text-[10px] uppercase font-bold">
            [ Desactivar ]
          </button>
        </div>
      </Transition>

      <!-- Encabezado Superior (Header Glassmorphic) -->
      <header class="h-16 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-300">
        
        <!-- Izquierda: Botón Menual Móvil + Status Badge -->
        <div class="flex items-center gap-3">
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <span class="text-xs font-semibold bg-neon-cyan/10 text-neon-cyan px-3 py-1.5 rounded-full border border-neon-cyan/30 flex items-center gap-2 shadow-glow-cyan">
            <span class="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span>
            Directorio Activo: Conectado
          </span>
        </div>

        <!-- Derecha: BOTÓN MISIÓN CRÍTICA + Theme Toggle + User Profile -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Botón Especial Misión Crítica (2026 Feature) -->
          <button
            @click="toggleEmergencyMode"
            :class="isEmergencyMode ? 'bg-rose-600 text-white border-rose-400 shadow-glow-coral animate-pulse' : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'"
            class="py-1.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5"
            title="Activa el modo táctico de respuesta ante incidentes cibernéticos"
          >
            <span>🚨</span>
            <span class="hidden sm:inline">Modo Misión Crítica</span>
          </button>

          <!-- Botón Dark Mode -->
          <button
            @click="toggleDark"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all border border-white/10 bg-slate-800/60 backdrop-blur-md shadow-sm hover:scale-105 active:scale-95 text-neon-cyan"
          >
            <svg v-if="!isDark" class="w-4.5 h-4.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <svg v-else class="w-4.5 h-4.5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </button>

          <div class="hidden sm:block text-right">
            <p class="text-xs sm:text-sm font-bold text-white">Administrador TI</p>
            <p class="text-[10px] text-slate-400 font-mono">admin@renconsultores.com.co</p>
          </div>
          
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-glow-cyan border border-white/20">
            AD
          </div>
        </div>
      </header>

      <!-- Renderizado de las Páginas -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
