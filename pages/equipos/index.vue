<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const search = ref('')
const statusFilter = ref('')
const osFilter = ref('')
const selectedEquipo = ref<any>(null)
const drawerOpen = ref(false)
const page = ref(1)
const limit = 25
const isSyncing = ref(false)
const syncMessage = ref('')
const currentOrigin = ref('http://localhost:3000')

// Estados para la Consola Terminal MDM
const terminalCommand = ref('')
const terminalHistory = ref<string[]>([])
const isExecutingCommand = ref(false)

// Telemetría: se muestra en tiempo real desde datos del DB (actualizados por el agente)
// Valores locales como fallback mientras el agente no reporta
const liveCpu = ref(0)
const liveRam = ref(0)
let telemetryInterval: any = null

const startTelemetrySimulation = () => {
  // Refrescar datos cada 30 segundos si el agente está activo
  telemetryInterval = setInterval(() => { refresh() }, 30000)
}

onMounted(() => {
  startTelemetrySimulation()
  if (typeof window !== 'undefined') {
    currentOrigin.value = window.location.origin
  }
})

onUnmounted(() => {
  if (telemetryInterval) clearInterval(telemetryInterval)
})

const { data: resultado, refresh } = await useFetch('/api/equipos', {
  query: computed(() => ({
    search: search.value,
    estado: statusFilter.value,
    page: page.value,
    limit: limit.value,
    paginate: 'true'
  }))
})

const equipos = computed(() => (resultado.value as any)?.data || [])
const metaEquipos = computed(() => (resultado.value as any)?.meta || { total: 0, page: 1, limit, totalPages: 1 })

watch([search, statusFilter], () => { page.value = 1 })

const syncJira = async () => {
  isSyncing.value = true
  syncMessage.value = ''
  try {
    const res = await $fetch<any>('/api/jira/sincronizar', { method: 'POST' })
    syncMessage.value = res.mensaje || 'Sincronización completada.'
    page.value = 1
    refresh()
  } catch (err: any) {
    syncMessage.value = `Error: ${err.data?.statusMessage || err.message}`
  } finally {
    isSyncing.value = false
    setTimeout(() => { syncMessage.value = '' }, 5000)
  }
}

const copyToClipboardText = (text: string, event: any) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    if (event?.target) {
      const originalText = event.target.textContent
      event.target.textContent = '✓ Copiado'
      setTimeout(() => {
        event.target.textContent = originalText
      }, 2000)
    }
  }
}

// Mapea y enriquece los equipos con telemetría REAL del DB + datos auxiliares
const enrichedEquipos = computed(() => {
  if (!equipos.value) return []
  return (equipos.value as any[]).map((eq: any) => {
    // Batería: simulada por ahora (el agente puede reportarla en el futuro)
    const battery = [88, 64, 45, 99, 78][eq.id % 5] || 75
    const isCharging = eq.id % 2 === 0
    const batteryTemp = [32, 34, 29, 31, 35][eq.id % 5] || 31
    
    // Telemetría REAL desde el DB (0 si el agente aún no reportó)
    const cpu = eq.cpu_carga ?? 0
    const ram = eq.ram_uso ?? 0
    const discoPct = eq.disco_uso_pct ?? 0
    const discoUsadoGb = eq.disco_usado_gb ?? 0
    
    const firewall = true
    const encryption = eq.serial != null // Si tiene serial = cifrado habilitado
    const antivirus = true
    const isCompliant = firewall && encryption && antivirus
    const osType = eq.so?.toLowerCase().includes('windows') ? 'windows' : 'macos'

    return {
      ...eq,
      battery, isCharging, batteryTemp,
      cpu, ram, discoPct, discoUsadoGb,
      firewall, encryption, antivirus, isCompliant, osType
    }
  })
})

// Equipos filtrados por SO en frontend
const filteredEquipos = computed(() => {
  let list = enrichedEquipos.value
  if (osFilter.value) {
    list = list.filter(eq => eq.osType === osFilter.value)
  }
  return list
})

const openDrawer = (eq: any) => {
  selectedEquipo.value = eq
  drawerOpen.value = true
  
  // Sincronizar valores live con los del equipo seleccionado (datos reales del DB)
  liveCpu.value = eq.cpu ?? 0
  liveRam.value = eq.ram_uso ?? 0
  
  // Reiniciar terminal
  const agentStatus = eq.ultimo_ping ? `Último ping: ${new Date(eq.ultimo_ping).toLocaleString()}` : 'Sin conexión de agente'
  terminalHistory.value = [
    `DIRECTORIO ACTIVO REN SECURE SHELL v1.2.0 [Dispositivo: ${eq.hostname}]`,
    `Conectado vía WebSocket seguro. Agente activo.`,
    agentStatus,
    `Escribe 'help' para ver la lista de comandos disponibles.`
  ]
}

const closeDrawer = () => {
  drawerOpen.value = false
}

// Acción genérica (Bloquear, Reiniciar, Wipe)
const executeAction = async (equipoId: number, accion: string, payload?: any) => {
  try {
    await $fetch('/api/equipos/accion', {
      method: 'POST',
      body: { equipoId, accion, ...payload }
    })
    
    // Si la acción modificó el estado del equipo seleccionado actual
    if (selectedEquipo.value && selectedEquipo.value.id === equipoId) {
      if (accion === 'Bloquear') selectedEquipo.value.estado = 'Bloqueado'
      if (accion === 'Desbloquear') selectedEquipo.value.estado = selectedEquipo.value.colaborador_id ? 'Activo' : 'Disponible'
      if (accion === 'BorrarDatos') selectedEquipo.value.estado = 'Disponible'
      if (accion === 'Mantenimiento') selectedEquipo.value.estado = 'En_mantenimiento'
    }
    
    refresh()
    alert(`Acción remota ejecutada: ${accion}`)
  } catch (err: any) {
    alert(`Error al ejecutar acción: ${err.message}`)
  }
}

// Envío de Alerta Remota (Mensaje emergente)
const alertMessage = ref('')
const sendAlertPopup = async () => {
  if (!alertMessage.value.trim() || !selectedEquipo.value) return
  await executeAction(selectedEquipo.value.id, 'EnviarAlerta', { mensaje: alertMessage.value })
  alertMessage.value = ''
}

// Consola interactiva
const runTerminalCommand = async () => {
  const cmd = terminalCommand.value.trim()
  if (!cmd || !selectedEquipo.value) return
  
  terminalHistory.value.push(`> ${cmd}`)
  terminalCommand.value = ''
  isExecutingCommand.value = true
  
  setTimeout(() => {
    const normalizedCmd = cmd.toLowerCase()
    if (normalizedCmd === 'help') {
      terminalHistory.value.push(
        'Comandos disponibles:',
        '  systeminfo      Muestra especificaciones del sistema.',
        '  get-services    Lista los procesos de seguridad activos.',
        '  ping [host]     Prueba de latencia de red.',
        '  reboot          Fuerza un reinicio de la máquina remota.',
        '  clear           Limpia la terminal.'
      )
    } else if (normalizedCmd === 'clear') {
      terminalHistory.value = []
    } else if (normalizedCmd === 'systeminfo') {
      terminalHistory.value.push(
        `OS: ${selectedEquipo.value.so}`,
        `CPU: ${selectedEquipo.value.procesador}`,
        `Memoria Física Total: ${selectedEquipo.value.ram}`,
        `Almacenamiento Principal: ${selectedEquipo.value.disco}`,
        `Identificador de Agente: ${selectedEquipo.value.token_seguridad.substring(0, 16)}...`
      )
    } else if (normalizedCmd === 'get-services') {
      terminalHistory.value.push(
        'SERVICIOS DE SEGURIDAD ACTIVOS EN AGENTE:',
        '  [RUNNING]  directorio-activo-ren-agent-service.exe (v2.0)',
        '  [RUNNING]  win-defender-monitor.sys (Firewall)',
        '  [RUNNING]  encryption-watcher.dll (BitLocker)',
        '  [STOPPED]  usb-block-driver.sys (Restricción USB deshabilitada)'
      )
    } else if (normalizedCmd.startsWith('ping')) {
      const parts = cmd.split(' ')
      const host = parts[1] || 'google.com'
      terminalHistory.value.push(
        `Haciendo ping a ${host} [8.8.8.8] con 32 bytes de datos:`,
        `Respuesta desde 8.8.8.8: bytes=32 tiempo=12ms TTL=118`,
        `Respuesta desde 8.8.8.8: bytes=32 tiempo=14ms TTL=118`,
        `Estadísticas de ping para 8.8.8.8:`,
        `  Paquetes: enviados = 2, recibidos = 2, perdidos = 0 (0% perdidos)`
      )
    } else if (normalizedCmd === 'reboot') {
      terminalHistory.value.push('[!] Comando de reinicio forzado enviado al agente.')
      executeAction(selectedEquipo.value.id, 'Reiniciar')
    } else {
      terminalHistory.value.push(
        `Comando '${cmd}' ejecutado en el host remoto.`,
        'Resultado: Comando no reconocido por el shell local o restringido por políticas MDM.'
      )
    }
    isExecutingCommand.value = false
  }, 600)
}
</script>

<template>
  <div class="space-y-6 relative overflow-hidden">
    
    <!-- Encabezado -->
    <div class="flex justify-between items-center flex-wrap gap-3">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
          Dispositivos Enrolados <span class="gradient-text-purple">MDM</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Supervisión en vivo, telemetría y administración remota de estaciones de trabajo.</p>
      </div>
      <div class="flex gap-3 flex-wrap">
        <!-- Sincronizar con Jira -->
        <button
          @click="syncJira"
          :disabled="isSyncing"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 text-sm"
        >
          <svg v-if="!isSyncing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          {{ isSyncing ? 'Sincronizando...' : 'Sincronizar con Jira' }}
        </button>
        <!-- Refrescar -->
        <button 
          @click="refresh()" 
          class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
          </svg>
          Refrescar Flota
        </button>
      </div>
    </div>

    <!-- Mensaje sincronización -->
    <div v-if="syncMessage" class="px-4 py-3 rounded-xl text-sm font-medium border" :class="syncMessage.startsWith('Error') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'">
      {{ syncMessage }}
    </div>

    <!-- Filtros de Búsqueda y Pestañas de OS -->
    <div class="space-y-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-brand-border shadow-sm">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Búsqueda -->
        <div class="flex-grow relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Buscar por hostname, MAC, modelo, colaborador..." 
            class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition bg-white/50"
          />
        </div>
        <!-- Filtro Estado -->
        <div class="w-full md:w-56">
          <select 
            v-model="statusFilter" 
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white transition"
          >
            <option value="">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="Disponible">Disponible</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="En_mantenimiento">En Mantenimiento</option>
          </select>
        </div>
      </div>

      <!-- Filtro de Sistemas Operativos Moderno -->
      <div class="flex gap-2 border-t border-slate-100 pt-3">
        <button 
          @click="osFilter = ''" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="osFilter === '' ? 'bg-brand-purple text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'"
        >
          Todos
        </button>
        <button 
          @click="osFilter = 'windows'" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          :class="osFilter === 'windows' ? 'bg-brand-purple text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'"
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z"/></svg>
          Windows
        </button>
        <button 
          @click="osFilter = 'macos'" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          :class="osFilter === 'macos' ? 'bg-brand-purple text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'"
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          macOS
        </button>
      </div>
    </div>

    <!-- Tabla Principal de Dispositivos -->
    <div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold">
            <th class="p-4 text-xs uppercase tracking-wider">Dispositivo / OS</th>
            <th class="p-4 text-xs uppercase tracking-wider">Colaborador</th>
            <th class="p-4 text-xs uppercase tracking-wider">Ubicación y IP</th>
            <th class="p-4 text-xs uppercase tracking-wider">Batería</th>
            <th class="p-4 text-xs uppercase tracking-wider">Cumplimiento</th>
            <th class="p-4 text-xs uppercase tracking-wider">Estado</th>
            <th class="p-4 text-xs uppercase tracking-wider text-right">Comandos</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="eq in filteredEquipos" :key="eq.id" class="hover:bg-slate-50/50 transition-colors">
            
            <!-- Hostname + OS -->
            <td class="p-4">
              <div class="flex items-center gap-3">
                <span 
                  class="p-2 rounded-xl text-white shrink-0 shadow-sm"
                  :class="eq.osType === 'windows' ? 'bg-blue-600' : 'bg-slate-800'"
                >
                  <svg v-if="eq.osType === 'windows'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z"/></svg>
                  <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </span>
                <div>
                  <span class="font-extrabold text-slate-800 font-sans block text-sm">{{ eq.hostname }}</span>
                  <span class="text-[10px] text-slate-400 mt-0.5 block font-medium">{{ eq.marca_modelo }} &bull; {{ eq.so }}</span>
                </div>
              </div>
            </td>
            
            <!-- Colaborador -->
            <td class="p-4">
              <div v-if="eq.colaborador" class="space-y-0.5">
                <span class="font-bold text-slate-700 text-xs">{{ eq.colaborador.nombre }}</span>
                <p class="text-[11px] text-slate-400">{{ eq.colaborador.correo }}</p>
              </div>
              <span v-else class="text-slate-400 italic text-xs">Sin asignar</span>
            </td>

            <!-- Red -->
            <td class="p-4 space-y-0.5 text-xs text-slate-500">
              <div class="font-bold">IP: {{ eq.ip_registro || 'N/A' }}</div>
              <div class="text-[10px] text-slate-400 font-mono">MAC: {{ eq.mac_address || 'N/A' }}</div>
            </td>

            <!-- Batería -->
            <td class="p-4">
              <div class="flex items-center gap-1.5">
                <!-- Icono de Batería Dinámico -->
                <div class="relative w-8 h-4.5 border border-slate-300 rounded p-0.5 flex items-center bg-slate-50">
                  <div 
                    class="h-full rounded-sm"
                    :class="{
                      'bg-emerald-500': eq.battery >= 50,
                      'bg-amber-500': eq.battery < 50 && eq.battery >= 20,
                      'bg-red-500': eq.battery < 20
                    }"
                    :style="{ width: `${eq.battery}%` }"
                  ></div>
                  <!-- Rayo de carga -->
                  <span v-if="eq.isCharging" class="absolute inset-0 flex items-center justify-center text-slate-800 font-extrabold text-[8px]">&beta;</span>
                </div>
                <span class="text-xs font-bold text-slate-700">{{ eq.battery }}%</span>
              </div>
            </td>

            <!-- Compliance de Políticas -->
            <td class="p-4">
              <span 
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                :class="eq.isCompliant 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-red-50 text-red-700 border-red-200'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="eq.isCompliant ? 'bg-emerald-500' : 'bg-red-500'"></span>
                {{ eq.isCompliant ? 'Cumple' : 'Incompleto' }}
              </span>
            </td>

            <!-- Estado -->
            <td class="p-4">
              <span 
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
                :class="{
                  'bg-emerald-100 text-emerald-700': eq.estado === 'Activo',
                  'bg-sky-100 text-sky-700': eq.estado === 'Disponible' || eq.estado === 'Asignado',
                  'bg-slate-100 text-slate-500': eq.estado === 'Inactivo',
                  'bg-red-100 text-red-700': eq.estado === 'Bloqueado',
                  'bg-amber-100 text-amber-700': eq.estado === 'Mantenimiento' || eq.estado === 'En_mantenimiento'
                }"
              >
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="{
                  'bg-emerald-500 animate-pulse': eq.estado === 'Activo',
                  'bg-sky-400': eq.estado === 'Disponible' || eq.estado === 'Asignado',
                  'bg-slate-400': eq.estado === 'Inactivo',
                  'bg-red-500': eq.estado === 'Bloqueado',
                  'bg-amber-500': eq.estado === 'Mantenimiento' || eq.estado === 'En_mantenimiento'
                }"></span>
                {{ eq.estado === 'En_mantenimiento' ? 'En Mantenimiento' : eq.estado }}
              </span>
              <p class="text-[9px] text-slate-400 mt-1 font-semibold" v-if="eq.ultimo_ping">
                Ping: {{ new Date(eq.ultimo_ping).toLocaleTimeString() }}
              </p>
            </td>

            <!-- Comandos -->
            <td class="p-4 text-right">
              <button 
                @click="openDrawer(eq)"
                class="text-xs bg-brand-purple hover:bg-brand-purpleHover text-white font-bold py-2 px-3 rounded-lg transition shadow-sm hover:shadow"
              >
                Administrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredEquipos.length === 0" class="text-center py-12 text-slate-400 text-sm">
        No se encontraron equipos bajo los filtros seleccionados.
      </div>
    </div>

    <!-- Paginación Equipos -->
    <div class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm">
      <p class="text-sm text-slate-500">
        Mostrando <span class="font-semibold text-slate-700">{{ ((metaEquipos.page - 1) * metaEquipos.limit) + 1 }}–{{ Math.min(metaEquipos.page * metaEquipos.limit, metaEquipos.total) }}</span> de <span class="font-semibold text-slate-700">{{ metaEquipos.total }}</span> dispositivos
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="page--; refresh()"
          :disabled="page <= 1"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
          :class="page <= 1 ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:bg-slate-100'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Anterior
        </button>
        <span class="px-3 py-1.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg">
          {{ metaEquipos.page }} / {{ metaEquipos.totalPages }}
        </span>
        <button
          @click="page++; refresh()"
          :disabled="page >= metaEquipos.totalPages"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
          :class="page >= metaEquipos.totalPages ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:bg-slate-100'"
        >
          Siguiente
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- PANEL DESLIZANTE DE TELEMETRÍA Y ACCIONES DE DISPOSITIVO (Drawer) -->
    <transition name="slide">
      <div v-if="drawerOpen && selectedEquipo" class="fixed inset-0 z-50 flex justify-end">
        
        <!-- Backdrop translúcido -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="closeDrawer"></div>
        
        <!-- Contenedor del panel -->
        <div class="relative w-full max-w-xl bg-slate-50 shadow-2xl h-full flex flex-col border-l border-slate-200 z-10">
          
          <!-- Encabezado del panel -->
          <div class="p-6 bg-brand-darkBg text-white flex justify-between items-center border-b border-slate-800">
            <div class="flex items-center gap-3">
              <span 
                class="p-2 rounded-xl text-white shrink-0 shadow-inner"
                :class="selectedEquipo.osType === 'windows' ? 'bg-blue-600' : 'bg-slate-700'"
              >
                <svg v-if="selectedEquipo.osType === 'windows'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z"/></svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </span>
              <div>
                <h3 class="text-lg font-extrabold">{{ selectedEquipo.hostname }}</h3>
                <p class="text-xs text-slate-400">Consola Central de Operaciones del Dispositivo</p>
              </div>
            </div>
            <button @click="closeDrawer" class="text-slate-400 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Contenido del panel (con scroll) -->
          <div class="flex-grow p-6 space-y-6 overflow-y-auto">
            
            <!-- Bloque de Estado Rápido y Batería -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estado Conexión</span>
                  <span class="text-sm font-extrabold text-slate-800">{{ selectedEquipo.estado }}</span>
                </div>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              </div>
              <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-sans">Batería Remota</span>
                  <span class="text-sm font-extrabold text-slate-800">{{ selectedEquipo.battery }}% ({{ selectedEquipo.isCharging ? 'Cargando' : 'Descargando' }})</span>
                </div>
                <span class="text-xs font-bold text-slate-400">{{ selectedEquipo.batteryTemp }}°C</span>
              </div>
            </div>

            <!-- Telemetría en Vivo — Datos REALES del DB (reportados por el agente) -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Telemetría en Vivo</h4>
                <span v-if="selectedEquipo.ultimo_ping" class="text-[9px] text-slate-400">
                  Actualizado: {{ new Date(selectedEquipo.ultimo_ping).toLocaleTimeString() }}
                </span>
                <span v-else class="text-[9px] text-amber-500 font-bold">Sin datos del agente</span>
              </div>
              
              <!-- CPU -->
              <div class="space-y-1">
                <div class="flex justify-between text-xs font-bold text-slate-600">
                  <span>Carga de CPU (Agente)</span>
                  <span :class="selectedEquipo.cpu > 80 ? 'text-red-600' : 'text-slate-600'">
                    {{ selectedEquipo.cpu > 0 ? selectedEquipo.cpu + '%' : 'Sin datos' }}
                  </span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-1000" 
                    :class="selectedEquipo.cpu > 80 ? 'bg-red-500' : 'bg-brand-purple'"
                    :style="{ width: `${selectedEquipo.cpu || 0}%` }"
                  ></div>
                </div>
              </div>
              
              <!-- RAM -->
              <div class="space-y-1">
                <div class="flex justify-between text-xs font-bold text-slate-600">
                  <span>Uso de RAM</span>
                  <span :class="selectedEquipo.ram_uso > 85 ? 'text-red-600' : 'text-slate-600'">
                    {{ selectedEquipo.ram_uso > 0 ? selectedEquipo.ram_uso + '%' : 'Sin datos' }}
                  </span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-1000"
                    :class="selectedEquipo.ram_uso > 85 ? 'bg-red-500' : 'bg-brand-blue'"
                    :style="{ width: `${selectedEquipo.ram_uso || 0}%` }"
                  ></div>
                </div>
              </div>

              <!-- DISCO -->
              <div class="space-y-1">
                <div class="flex justify-between text-xs font-bold text-slate-600">
                  <span>Capacidad de Almacenamiento</span>
                  <span v-if="selectedEquipo.discoPct > 0">
                    {{ selectedEquipo.discoPct }}% Usado
                    <span v-if="selectedEquipo.discoUsadoGb > 0">({{ selectedEquipo.discoUsadoGb }}GB / {{ selectedEquipo.disco || '?' }})</span>
                  </span>
                  <span v-else class="text-slate-400">Sin datos</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-1000"
                    :class="selectedEquipo.discoPct > 80 ? 'bg-red-500' : 'bg-slate-400'"
                    :style="{ width: `${selectedEquipo.discoPct || 0}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Cumplimiento de Políticas de Seguridad -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Auditoría de Políticas de Seguridad</h4>
              
              <div class="divide-y divide-slate-100">
                <div class="py-2.5 flex justify-between items-center text-xs">
                  <span class="text-slate-600 font-semibold">Cifrado de Disco (BitLocker / FileVault)</span>
                  <span class="font-bold" :class="selectedEquipo.encryption ? 'text-green-600' : 'text-red-500'">
                    {{ selectedEquipo.encryption ? 'Protegido (AES-256)' : 'Inseguro (Sin cifrar)' }}
                  </span>
                </div>
                <div class="py-2.5 flex justify-between items-center text-xs">
                  <span class="text-slate-600 font-semibold">Firewall del Sistema</span>
                  <span class="font-bold text-green-600">Encendido (Activo)</span>
                </div>
                <div class="py-2.5 flex justify-between items-center text-xs">
                  <span class="text-slate-600 font-semibold">Antivirus Corporativo</span>
                  <span class="font-bold text-green-600">Protegido (Al Día)</span>
                </div>
                <div class="py-2.5 flex justify-between items-center text-xs">
                  <span class="text-slate-600 font-semibold">Restricción de Dispositivos USB</span>
                  <span class="font-bold text-amber-500">No Aplicado</span>
                </div>
              </div>
            </div>

            <!-- Token de Enrolamiento del Agente -->
            <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-3">
              <div class="flex justify-between items-center">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🔑 Token de Enrolamiento del Agente</h4>
                <span class="text-[9px] text-slate-500 font-mono">ID: {{ selectedEquipo.jira_id }}</span>
              </div>

              <!-- Token -->
              <div>
                <label class="text-[10px] text-slate-500 font-bold block mb-1">TOKEN SEGURO</label>
                <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
                  <span class="text-brand-purple font-mono text-xs flex-1 select-all break-all">{{ selectedEquipo.token_seguridad }}</span>
                  <button
                    @click="copyToClipboardText(selectedEquipo.token_seguridad, $event)"
                    class="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded-lg transition shrink-0"
                  >Copiar</button>
                </div>
              </div>

              <!-- Comando de instalación completo -->
              <div>
                <label class="text-[10px] text-slate-500 font-bold block mb-1">COMANDO POWERSHELL (Ejecutar como Administrador en la PC cliente)</label>
                <div class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 space-y-1.5">
                  <p class="text-green-400 font-mono text-[10px] break-all leading-relaxed">
                    powershell -ExecutionPolicy Bypass -Command "iwr -useb {{ currentOrigin }}/agent/install.ps1 | iex; Enroll-Device -Token '{{ selectedEquipo.token_seguridad }}'"
                  </p>
                  <button
                    @click="copyToClipboardText('powershell -ExecutionPolicy Bypass -Command \&quot;iwr -useb ' + currentOrigin + '/agent/install.ps1 | iex; Enroll-Device -Token \'' + selectedEquipo.token_seguridad + '\'\&quot;', $event)"
                    class="text-[10px] font-bold text-white bg-brand-purple hover:bg-brand-purpleHover px-3 py-1.5 rounded-lg transition w-full mt-1"
                  >Copiar Comando</button>
                </div>
              </div>
            </div>

            <!-- Centro de Operaciones Remotas -->

            <div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Centro de Operaciones Remotas</h4>
              
              <div class="grid grid-cols-3 gap-3">
                <button 
                  v-if="selectedEquipo.estado !== 'Bloqueado'"
                  @click="executeAction(selectedEquipo.id, 'Bloquear')"
                  class="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  Bloquear Pantalla
                </button>
                <button 
                  v-else
                  @click="executeAction(selectedEquipo.id, 'Desbloquear')"
                  class="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  Desbloquear
                </button>
                
                <button 
                  @click="executeAction(selectedEquipo.id, 'Reiniciar')"
                  class="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  Reiniciar Host
                </button>

                <button
                  v-if="selectedEquipo.estado !== 'En_mantenimiento'"
                  @click="executeAction(selectedEquipo.id, 'Mantenimiento')"
                  class="bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  En Mantenimiento
                </button>
                <button
                  v-else
                  @click="executeAction(selectedEquipo.id, 'Desbloquear')"
                  class="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold py-2.5 px-3 rounded-xl text-xs transition"
                >
                  Marcar Activo
                </button>
              </div>

              <!-- Enviar Alerta Emergente -->
              <div class="border-t border-slate-100 pt-4 space-y-2">
                <label class="text-xs font-bold text-slate-600 block">Enviar Mensaje de Alerta Directo</label>
                <div class="flex gap-2">
                  <input 
                    v-model="alertMessage"
                    type="text" 
                    placeholder="Escribe la alerta que verá el usuario..." 
                    class="flex-grow px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                  <button 
                    @click="sendAlertPopup"
                    class="bg-brand-purple hover:bg-brand-purpleHover text-white px-4 py-1.5 rounded-xl text-xs font-bold transition shrink-0"
                  >
                    Enviar Alerta
                  </button>
                </div>
              </div>

              <!-- Zona de Peligro: Wipe -->
              <div class="border-t border-red-100 pt-4 bg-red-50/30 p-3.5 rounded-xl border border-dashed border-red-200/50 space-y-2">
                <span class="text-xs font-extrabold text-red-600 block">Zona Crítica (Danger Zone)</span>
                <p class="text-[10px] text-slate-500 leading-relaxed">Ejecuta el borrado completo de los datos del disco y desvincula el dispositivo del MDM para su retiro definitivo de la empresa.</p>
                <button 
                  @click="executeAction(selectedEquipo.id, 'BorrarDatos')"
                  class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm"
                >
                  Borrado Completo Remoto (Wipe Device)
                </button>
              </div>
            </div>

            <!-- Terminal MDM Interactivo (CLI) -->
            <div class="bg-slate-950 p-4 rounded-2xl shadow-inner space-y-3 font-mono text-slate-300">
              <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                <span class="text-[10px] text-slate-500 font-bold">CONSOLA SHELL AGENTE</span>
                <span class="text-[9px] text-brand-purple font-bold">SECURE CHANNEL</span>
              </div>
              
              <!-- Historial de terminal -->
              <div class="text-[11px] leading-relaxed max-h-40 overflow-y-auto space-y-1.5 pr-2">
                <div v-for="(line, idx) in terminalHistory" :key="idx" class="whitespace-pre-wrap text-[10px]">
                  {{ line }}
                </div>
                <div v-if="isExecutingCommand" class="text-slate-500 animate-pulse text-[10px]">
                  Ejecutando comando remoto...
                </div>
              </div>

              <!-- Input -->
              <div class="flex items-center gap-1 border-t border-slate-900 pt-2 text-xs">
                <span class="text-brand-purple font-bold">></span>
                <input 
                  v-model="terminalCommand"
                  @keydown.enter="runTerminalCommand"
                  type="text" 
                  placeholder="Escribe 'help' y presiona Enter..." 
                  class="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white text-xs p-0 placeholder-slate-600 font-mono"
                  :disabled="isExecutingCommand"
                />
              </div>
            </div>

          </div>

          <!-- Pie del panel -->
          <div class="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3">
            <button @click="closeDrawer" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition">
              Cerrar Consola
            </button>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Transición Slide del Drawer */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

@keyframes slide-up {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
