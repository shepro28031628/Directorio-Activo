<script setup lang="ts">
import { ref } from 'vue'

const policies = ref([
  { id: 'encryption', name: 'Cifrado de Disco (BitLocker / FileVault)', desc: 'Exige el cifrado de datos en reposo para todas las unidades de almacenamiento principal.', enabled: true, level: 'Crítico' },
  { id: 'firewall', name: 'Cortafuegos del Sistema (Firewall)', desc: 'Fuerza la activación del firewall local para bloquear tráfico de red no autorizado.', enabled: true, level: 'Crítico' },
  { id: 'password', name: 'Complejidad de Contraseña', desc: 'Fuerza reglas estrictas para el inicio de sesión del sistema operativo (mínimo 10 caracteres, caracteres especiales y números).', enabled: true, level: 'Alto' },
  { id: 'usb_block', name: 'Bloqueo de Puertos USB de Almacenamiento', desc: 'Inhabilita la lectura y escritura en unidades de almacenamiento USB externas para prevenir fugas de información corporativa.', enabled: false, level: 'Medio' },
  { id: 'camera_block', name: 'Bloqueo de Cámara y Micrófono', desc: 'Restringe el acceso de aplicaciones a la cámara web y micrófono en estaciones críticas de trabajo.', enabled: false, level: 'Medio' },
  { id: 'rdp_block', name: 'Deshabilitar Escritorio Remoto (RDP)', desc: 'Bloquea conexiones entrantes de RDP/VNC externas no autorizadas en las estaciones.', enabled: true, level: 'Alto' }
])

const isDeploying = ref(false)
const showNotification = ref(false)
const notificationMsg = ref('')

const deployPolicies = async () => {
  isDeploying.value = true
  
  try {
    // Registramos en auditoría a través de una llamada API
    await $fetch('/api/politicas/aplicar', {
      method: 'POST',
      body: {
        politicas: policies.value.map(p => ({ nombre: p.name, estado: p.enabled }))
      }
    })
    
    setTimeout(() => {
      isDeploying.value = false
      notificationMsg.value = '¡Perfiles de configuración MDM propagados con éxito a toda la flota de dispositivos!'
      showNotification.value = true
      
      // Cerrar notificación automáticamente
      setTimeout(() => {
        showNotification.value = false
      }, 5000)
    }, 1500)
  } catch (err: any) {
    isDeploying.value = false
    alert(`Error al guardar políticas: ${err.message}`)
  }
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    
    <!-- Notificación Flotante -->
    <transition name="fade">
      <div 
        v-if="showNotification" 
        class="fixed top-20 right-6 z-50 bg-emerald-600 text-white py-3 px-6 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-3 max-w-md animate-slide-up"
      >
        <span class="p-1 bg-white/20 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </span>
        <div class="text-xs font-bold">{{ notificationMsg }}</div>
      </div>
    </transition>

    <!-- Encabezado -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
          Políticas de Seguridad y Perfiles <span class="text-brand-purple">MDM</span>
        </h1>
        <p class="text-slate-500 text-sm mt-1">Configura restricciones globales, estándares de cumplimiento y seguridad remota de la organización.</p>
      </div>
      
      <button 
        @click="deployPolicies"
        :disabled="isDeploying"
        class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm disabled:opacity-50"
      >
        <svg v-if="isDeploying" class="w-4.5 h-4.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
        </svg>
        <svg v-else class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-11.394 6l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-18 12h18"/>
        </svg>
        {{ isDeploying ? 'Propagando...' : 'Aplicar Políticas' }}
      </button>
    </div>

    <!-- Banner Informativo -->
    <div class="glass-card p-5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-none shadow-md shadow-violet-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="space-y-1">
        <h3 class="font-extrabold text-md">Agente RENOVA MDM Daemon</h3>
        <p class="text-xs text-indigo-100">Las políticas aplicadas son descargadas por el agente de seguridad en Windows y macOS en intervalos de 10 segundos o forzadas vía WebSocket en tiempo real (&lt;500ms).</p>
      </div>
      <div class="flex gap-4 text-center shrink-0">
        <div>
          <span class="block text-2xl font-black">4 / 6</span>
          <span class="text-[9px] uppercase tracking-wider text-indigo-200">Activas</span>
        </div>
        <div class="border-l border-white/20 pl-4">
          <span class="block text-2xl font-black">92%</span>
          <span class="text-[9px] uppercase tracking-wider text-indigo-200">Compliance</span>
        </div>
      </div>
    </div>

    <!-- Lista de Políticas -->
    <div class="space-y-4">
      <div 
        v-for="policy in policies" 
        :key="policy.id"
        class="bg-white p-5 rounded-2xl border border-brand-border shadow-sm hover:border-slate-300 transition flex items-center justify-between gap-6"
      >
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <h3 class="font-extrabold text-slate-800 text-sm">{{ policy.name }}</h3>
            <span 
              class="px-2 py-0.5 rounded text-[8px] font-bold"
              :class="{
                'bg-red-50 text-red-600 border border-red-200': policy.level === 'Crítico',
                'bg-amber-50 text-amber-600 border border-amber-200': policy.level === 'Alto',
                'bg-blue-50 text-brand-blue border border-blue-200': policy.level === 'Medio'
              }"
            >
              {{ policy.level }}
            </span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed max-w-2xl">{{ policy.desc }}</p>
        </div>

        <!-- Toggle Switch -->
        <label class="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            v-model="policy.enabled" 
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-violet-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple"></div>
        </label>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
