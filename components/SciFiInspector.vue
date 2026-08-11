<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  device: any
}>()

const emit = defineEmits(['close'])

const isActionExecuting = ref(false)
const actionNotification = ref('')

const handleAction = (actionName: string) => {
  isActionExecuting.value = true
  actionNotification.value = `Ejecutando ${actionName}...`
  
  setTimeout(() => {
    isActionExecuting.value = false
    actionNotification.value = `✓ ${actionName} completado e instrucción transmitida vía WebSocket al agente.`
    setTimeout(() => {
      actionNotification.value = ''
    }, 4000)
  }, 1200)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div 
        v-if="isOpen && device" 
        class="fixed inset-0 z-50 flex justify-end p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/20 text-white flex flex-col justify-between overflow-y-auto custom-scrollbar relative">
          
          <!-- Encabezado Sci-Fi HUD -->
          <div>
            <div class="flex justify-between items-start pb-4 border-b border-slate-800">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold shadow-glow-cyan">
                  HUD
                </div>
                <div>
                  <span class="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block">Ficha Técnica Sci-Fi • Agent v2.0</span>
                  <h2 class="text-xl font-extrabold text-white font-mono flex items-center gap-2">
                    {{ device.hostname }}
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </h2>
                </div>
              </div>
              <button 
                @click="emit('close')" 
                class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <!-- Notificación Temporal de Acción -->
            <div v-if="actionNotification" class="mt-4 p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono animate-pulse">
              {{ actionNotification }}
            </div>

            <!-- Métricas Clave de Salud & Seguridad -->
            <div class="grid grid-cols-2 gap-3 mt-5">
              <!-- Cumplimiento de Seguridad -->
              <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <span class="text-[10px] font-mono text-slate-400 uppercase">Nivel de Seguridad</span>
                <div class="mt-2 flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-cyan-400 font-mono">98%</span>
                  <span class="text-[10px] text-emerald-400 font-bold">Compliant</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                  <div class="h-full bg-cyan-400 rounded-full" style="width: 98%"></div>
                </div>
              </div>

              <!-- Cifrado BitLocker -->
              <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <span class="text-[10px] font-mono text-slate-400 uppercase">BitLocker Storage</span>
                <div class="mt-2 flex items-center gap-2">
                  <span class="text-2xl font-extrabold text-emerald-400 font-mono">Cifrado</span>
                  <span class="text-emerald-400 text-xs">✓ AES-256</span>
                </div>
                <span class="text-[10px] text-slate-400 font-mono mt-1">LAPS Admin Password OK</span>
              </div>
            </div>

            <!-- Información General y Hardware -->
            <div class="mt-5 space-y-3 font-mono text-xs">
              <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                <div class="flex justify-between text-slate-400">
                  <span>Sistema Operativo:</span>
                  <span class="text-slate-200 font-bold">{{ device.so || 'Windows 11 Pro 23H2' }}</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Usuario Windows:</span>
                  <span class="text-cyan-300 font-bold">{{ device.windows_user || 'RENOVA\\admin.local' }}</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>IP Registro:</span>
                  <span class="text-slate-200 font-bold">{{ device.ip_registro || '192.168.10.145' }}</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Dirección MAC:</span>
                  <span class="text-slate-200">{{ device.mac_address || '00:1A:2B:3C:4D:5E' }}</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Serial del Fabricante:</span>
                  <span class="text-slate-200">{{ device.serial || 'SN-7849204-RN' }}</span>
                </div>
              </div>

              <!-- Anillo de Almacenamiento & Carga -->
              <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-400">Uso de Disco (SSD NVMe):</span>
                  <span class="text-cyan-400 font-bold">185 GB / 512 GB (36%)</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style="width: 36%"></div>
                </div>

                <div class="flex justify-between items-center pt-1">
                  <span class="text-slate-400">Memoria RAM Instalada:</span>
                  <span class="text-violet-400 font-bold">16.0 GB DDR5</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones Tácticas Inmediatas -->
          <div class="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Comandos Tácticos en Tiempo Real</span>
            
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="handleAction('Ping Forzado')"
                :disabled="isActionExecuting"
                class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                ⚡ Ping de Respuesta
              </button>

              <button 
                @click="handleAction('Rotación LAPS')"
                :disabled="isActionExecuting"
                class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                🔑 Rotar Clave LAPS
              </button>
            </div>

            <button 
              @click="handleAction('Aislamiento Preventivo de Red')"
              :disabled="isActionExecuting"
              class="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-mono text-xs border border-rose-500/40 transition-all flex items-center justify-center gap-2 shadow-glow-coral disabled:opacity-50"
            >
              🚨 Aislamiento de Red Sophos
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
