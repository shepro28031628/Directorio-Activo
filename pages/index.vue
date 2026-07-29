<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/dashboard/stats')

const activeHoverLocation = ref<any>(null)

const requestUrl = useRequestURL()
const currentOrigin = computed(() => requestUrl?.origin || 'http://localhost:3000')

const triggerSync = async () => {
  try {
    await refreshNuxtData()
  } catch (err) {
    console.error('Error al refrescar', err)
  }
}

const copyToClipboard = (text: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Encabezado con información del sistema -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
          Consola Central <span class="text-brand-purple">RenovaMDM</span>
        </h1>
        <p class="text-slate-500 text-sm mt-1">Supervisión en tiempo real de telemetría de hardware, políticas de seguridad y ejecución de comandos remotos.</p>
      </div>
      <button 
        @click="triggerSync" 
        class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
        </svg>
        Sincronizar Flota
      </button>
    </div>

    <!-- Indicador de Carga -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-pulse">
      <div v-for="i in 6" :key="i" class="h-28 bg-white rounded-2xl border border-slate-100 shadow-sm"></div>
    </div>

    <!-- KPIs MDM -->
    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <!-- Dispositivos Totales -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
        <div class="flex justify-between items-start text-slate-400">
          <span class="text-xs font-bold uppercase tracking-wider">Total Enrolados</span>
          <span class="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-slate-800">{{ data.kpis.totalDevices }}</p>
          <p class="text-xs text-slate-500 font-medium mt-1">Dispositivos en flota</p>
        </div>
      </div>

      <!-- Dispositivos Activos/Online -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
        <div class="flex justify-between items-start text-slate-400">
          <span class="text-xs font-bold uppercase tracking-wider">En Línea</span>
          <span class="p-2 bg-emerald-50 text-emerald-600 rounded-xl relative">
            <span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-emerald-600">{{ data.kpis.devicesOnline }}</p>
          <p class="text-xs text-emerald-500 font-medium mt-1">Transmitiendo ping</p>
        </div>
      </div>

      <!-- Dispositivos Offline -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
        <div class="flex justify-between items-start text-slate-400">
          <span class="text-xs font-bold uppercase tracking-wider">Fuera de Línea</span>
          <span class="p-2 bg-slate-100 text-slate-600 rounded-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M21 3L3 21M3 3l3.536 3.536M9.172 9.172a4 4 0 015.656 5.656"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-slate-500">{{ data.kpis.devicesOffline }}</p>
          <p class="text-xs text-slate-400 font-medium mt-1">Sin conexión reciente</p>
        </div>
      </div>

      <!-- Dispositivos Bloqueados -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
        <div class="flex justify-between items-start text-slate-400">
          <span class="text-xs font-bold uppercase tracking-wider">Bloqueados</span>
          <span class="p-2 bg-red-50 text-red-600 rounded-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-red-600">{{ data.kpis.blockedDevices }}</p>
          <p class="text-xs text-red-500 font-medium mt-1">En cuarentena / Baja</p>
        </div>
      </div>

      <!-- Cumplimiento de Políticas -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
        <div class="flex justify-between items-start text-slate-400">
          <span class="text-xs font-bold uppercase tracking-wider">Cumplimiento</span>
          <span class="p-2 bg-violet-50 text-brand-purple rounded-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-brand-purple">{{ data.kpis.complianceRate }}%</p>
          <p class="text-xs text-violet-500 font-medium mt-1">Dispositivos conformes</p>
        </div>
      </div>

      <!-- Alertas Activas -->
      <div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none shadow-md shadow-orange-500/10">
        <div class="flex justify-between items-start text-orange-100">
          <span class="text-xs font-bold uppercase tracking-wider">Alertas Activas</span>
          <span class="p-2 bg-white/20 text-white rounded-xl relative">
            <span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold">{{ data.kpis.activeAlerts }}</p>
          <p class="text-[10px] text-orange-100 font-medium mt-1">Requiere atención TI</p>
        </div>
      </div>
    </div>

    <!-- Sección: Enrolamiento e Instalación del Agente -->
    <div class="glass-card p-6 border-l-4 border-l-brand-purple bg-gradient-to-r from-slate-900/5 via-transparent to-transparent">
      <div class="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div class="space-y-1 max-w-2xl">
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            Despliegue Rápido del Agente MDM v2.0
          </h2>
          <p class="text-xs text-slate-500">
            Copia el comando de PowerShell y ejecútalo como <strong>Administrador</strong> en cualquier estación de trabajo Windows para instalar el agente de telemetría y habilitar el sistema de bloqueo remoto instantáneo.
          </p>
        </div>
        <NuxtLink 
          to="/enrolamiento" 
          class="shrink-0 text-xs font-bold text-brand-purple hover:underline flex items-center gap-1"
        >
          Ir al Administrador de Tokens
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </NuxtLink>
      </div>

      <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Token -->
        <div class="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-between">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Token de Enrolamiento de Prueba</span>
          <div class="flex items-center justify-between mt-2">
            <span class="font-mono text-sm font-bold text-brand-purple">token-SR-6753</span>
            <button 
              @click="copyToClipboard('token-SR-6753')"
              class="text-xs text-slate-500 hover:text-brand-purple hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              title="Copiar Token"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            </button>
          </div>
        </div>

        <!-- Instrucción de Instalación Completa -->
        <div class="md:col-span-2 bg-slate-900 text-slate-100 p-4 rounded-xl relative group">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Comando de PowerShell (Ejecutar como Administrador)</span>
          <code class="font-mono text-[11px] block break-all text-emerald-400 select-all pr-8">
            powershell -ExecutionPolicy Bypass -Command "iwr -useb {{ currentOrigin }}/agent/install.ps1 | iex; Enroll-Device -Token 'token-SR-6753'"
          </code>
          <button 
            @click="copyToClipboard('powershell -ExecutionPolicy Bypass -Command \&quot;iwr -useb ' + currentOrigin + '/agent/install.ps1 | iex; Enroll-Device -Token \'token-SR-6753\'\&quot;')"
            class="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
            title="Copiar Comando Completo"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Geolocalización y Control Remoto -->
    <div v-if="data" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Mapa MDM de Geolocalización Interactiva -->
      <div class="glass-card p-6 lg:col-span-2 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
        <div>
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-brand-purple animate-pulse"></span>
            Geolocalización Activa de la Flota (Colombia)
          </h2>
          <p class="text-xs text-slate-400 mt-1">Última ubicación reportada por el agente de seguridad.</p>
        </div>

        <!-- Visualización del Mapa (Colombia Mock SVG Grid) -->
        <div class="flex-grow my-6 relative bg-slate-950/5 border border-slate-200/50 rounded-2xl min-h-[280px] flex items-center justify-center overflow-hidden">
          
          <!-- Cuadrícula futurista de fondo -->
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.08),rgba(255,255,255,0))]"></div>
          <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <!-- Silueta SVG de Colombia estilizada minimalista para MDM -->
          <svg class="w-64 h-80 text-slate-300 opacity-60 pointer-events-none" viewBox="0 0 100 120" fill="currentColor">
            <path d="M 50,5 C 53,8 54,12 55,16 C 58,18 62,17 65,19 C 68,22 66,28 69,32 C 73,35 78,33 81,37 C 84,41 82,46 80,51 C 77,54 75,58 72,61 C 67,65 63,68 60,72 C 58,76 59,82 58,87 C 56,92 53,96 50,100 C 47,105 45,110 42,115 C 39,114 36,112 34,109 C 32,106 31,102 32,98 C 33,93 35,89 36,84 C 36,80 34,76 33,72 C 31,69 29,66 28,63 C 27,58 28,52 26,47 C 23,44 20,42 18,39 C 21,37 24,38 27,36 C 30,32 33,28 36,24 C 39,21 42,17 44,13 C 46,9 47,6 50,5 Z" />
          </svg>

          <!-- Pines interactivos en base a coordenadas mapeadas a porcentajes CSS -->
          <!-- Bogotá: 60% top, 48% left -->
          <div 
            class="absolute top-[52%] left-[49%] group cursor-pointer"
            @mouseenter="activeHoverLocation = data.deviceMapLocations[0]"
            @mouseleave="activeHoverLocation = null"
          >
            <span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-md"></div>
          </div>

          <!-- Medellín: 42% top, 38% left -->
          <div 
            class="absolute top-[40%] left-[38%] group cursor-pointer"
            @mouseenter="activeHoverLocation = data.deviceMapLocations[1]"
            @mouseleave="activeHoverLocation = null"
          >
            <span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-md"></div>
          </div>

          <!-- Cali: 64% top, 31% left -->
          <div 
            class="absolute top-[62%] left-[32%] group cursor-pointer"
            @mouseenter="activeHoverLocation = data.deviceMapLocations[2]"
            @mouseleave="activeHoverLocation = null"
          >
            <span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-slate-400/30 animate-ping"></span>
            <div class="w-3 h-3 rounded-full bg-slate-400 border border-white shadow-md"></div>
          </div>

          <!-- Caja de detalles contextual del dispositivo en el mapa -->
          <div 
            v-if="activeHoverLocation"
            class="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700 shadow-xl flex justify-between items-center transition-all duration-300 animate-slide-up"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm text-brand-purple">{{ activeHoverLocation.hostname }}</span>
                <span class="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">{{ activeHoverLocation.ip }}</span>
              </div>
              <p class="text-xs text-slate-300">{{ activeHoverLocation.so }} &bull; {{ activeHoverLocation.ciudad }}</p>
            </div>
            <div class="text-right shrink-0">
              <span 
                class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                :class="activeHoverLocation.estado === 'En Línea' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-300 border border-slate-600'"
              >
                {{ activeHoverLocation.estado }}
              </span>
              <p class="text-[9px] text-slate-400 mt-1">Ubicación por Telemetría IP</p>
            </div>
          </div>

          <div v-else class="absolute bottom-4 left-4 right-4 text-center text-[10px] text-slate-400 italic bg-white/40 backdrop-blur-sm border border-slate-200/50 py-1 px-4 rounded-full pointer-events-none">
            Coloca el cursor sobre los pines para ver telemetría e IP del dispositivo en vivo.
          </div>
        </div>

        <div class="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-400">
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Bogotá y Medellín (Online)
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span> Cali (Offline)
          </span>
        </div>
      </div>

      <!-- Cola de Comandos de MDM Remotos -->
      <div class="glass-card p-6 flex flex-col justify-between">
        <div class="space-y-1">
          <h2 class="text-lg font-bold text-slate-800">Cola de Comandos</h2>
          <p class="text-xs text-slate-400">Comandos transmitidos recientemente vía Socket.IO y API.</p>
        </div>

        <div class="flex-grow my-4 space-y-3 overflow-y-auto max-h-[300px] pr-1">
          <div 
            v-for="cmd in data.commandsQueue" 
            :key="cmd.id" 
            class="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex items-start gap-3 transition-colors"
          >
            <div 
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
              :class="{
                'bg-red-50 text-red-600': cmd.tipo === 'danger',
                'bg-blue-50 text-brand-blue': cmd.tipo === 'info',
                'bg-emerald-50 text-emerald-600': cmd.tipo === 'success',
                'bg-amber-50 text-amber-600': cmd.tipo === 'warning'
              }"
            >
              <svg v-if="cmd.tipo === 'danger'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <svg v-else-if="cmd.tipo === 'info'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <svg v-else-if="cmd.tipo === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/></svg>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-start">
                <span class="font-bold text-xs text-slate-800">{{ cmd.comando }}</span>
                <span class="text-[9px] font-bold text-slate-400">{{ cmd.fecha }}</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-0.5">Destino: <span class="font-mono">{{ cmd.dispositivo }}</span></p>
              
              <div class="mt-2 flex justify-between items-center">
                <span 
                  class="inline-block px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider"
                  :class="{
                    'bg-slate-100 text-slate-600': cmd.estado === 'Transmitido',
                    'bg-green-100 text-green-700': cmd.estado === 'Ejecutado'
                  }"
                >
                  {{ cmd.estado }}
                </span>
                <span class="text-[8px] text-slate-400 font-mono">ID: CMD-00{{ cmd.id }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-3">
          <NuxtLink to="/auditorias" class="text-xs font-bold text-brand-purple hover:text-brand-purpleHover flex items-center justify-center gap-1">
            Ver todas las acciones remotas
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Sección de Auditorías Recientes y Cumplimiento -->
    <div v-if="data" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Eventos Críticos de Auditoría -->
      <div class="glass-card p-6 lg:col-span-2 space-y-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-brand-purple"></span>
          Auditoría de Eventos Críticos y Desvinculaciones
        </h2>
        
        <div class="space-y-3">
          <div 
            v-for="log in data.recentAudits" 
            :key="log.id" 
            class="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors"
          >
            <div 
              class="p-2 rounded-xl shrink-0"
              :class="log.accion.includes('Desvinculación') || log.accion.includes('Bloque') ? 'bg-red-50 text-red-600' : 'bg-violet-50 text-brand-purple'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            
            <div class="flex-grow">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-sm text-slate-800">{{ log.accion }}</h4>
                <ClientOnly>
                  <span class="text-xs text-slate-400 font-medium">
                    {{ new Date(log.fecha).toLocaleTimeString() }}
                  </span>
                </ClientOnly>
              </div>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">{{ log.detalles }}</p>
              <div class="flex gap-4 mt-2 text-[10px] text-slate-400 font-semibold">
                <span>Auditor: {{ log.usuario_auditor }}</span>
                <span>IP: {{ log.ip_origen || '127.0.0.1' }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.recentAudits.length === 0" class="text-center py-8 text-slate-400 text-sm">
            No hay registros de auditoría recientes.
          </div>
        </div>
      </div>

      <!-- Distribución por Estado y OS -->
      <div class="glass-card p-6 space-y-6">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Distribución de Flota</h2>
          <p class="text-xs text-slate-400 mt-0.5">Estados de conexión y tipos de dispositivos en Renova.</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="item in data.statusDistribution" :key="item.estado" class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-600">
              <span class="flex items-center gap-2">
                <span 
                  class="w-2 h-2 rounded-full"
                  :class="{
                    'bg-emerald-500': item.estado === 'Asignado' || item.estado === 'Disponible',
                    'bg-slate-400': item.estado === 'Inactivo',
                    'bg-red-500': item.estado === 'Bloqueado',
                    'bg-amber-500': item.estado === 'Mantenimiento' || item.estado === 'En_mantenimiento'
                  }"
                ></span>
                {{ item.estado.replace('_', ' ') }}
              </span>
              <span>{{ item.count }} ({{ Math.round((item.count / data.kpis.totalDevices) * 100) }}%)</span>
            </div>
            
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-500" 
                :class="{
                  'bg-emerald-500': item.estado === 'Asignado' || item.estado === 'Disponible',
                  'bg-slate-400': item.estado === 'Inactivo',
                  'bg-red-500': item.estado === 'Bloqueado',
                  'bg-amber-500': item.estado === 'Mantenimiento' || item.estado === 'En_mantenimiento'
                }"
                :style="{ width: `${(item.count / data.kpis.totalDevices) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Sistemas Operativos Distribución -->
        <div class="border-t border-slate-100 pt-5 space-y-3">
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Sistemas Operativos</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
              <span class="text-brand-blue bg-blue-50 p-1.5 rounded-lg">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z"/></svg>
              </span>
              <div>
                <p class="text-xs text-slate-400">Windows</p>
                <p class="text-sm font-extrabold text-slate-800">100%</p>
              </div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 opacity-60">
              <span class="text-slate-600 bg-slate-100 p-1.5 rounded-lg">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </span>
              <div>
                <p class="text-xs text-slate-400">Móviles / iOS</p>
                <p class="text-sm font-extrabold text-slate-800">0%</p>
              </div>
            </div>
          </div>
          
          <p class="text-[10px] text-slate-400 text-center italic">Enrola dispositivos móviles desde la sección "Centro Enrolamiento".</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
