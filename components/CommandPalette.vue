<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const router = useRouter()

const query = ref('')

const quickActions = [
  { id: 'act-emergency', title: '🚨 Activar Modo Misión Crítica', category: 'Acción Táctica', route: null, action: 'emergency' },
  { id: 'act-sync', title: '⚡ Sincronizar Flota con Jira Assets', category: 'Acción Táctica', route: null, action: 'sync' },
  { id: 'nav-dashboard', title: '📊 Ir al Dashboard MDM', category: 'Navegación', route: '/' },
  { id: 'nav-ad', title: '🌐 Ver Nodos de Active Directory & OUs', category: 'Navegación', route: '/active-directory' },
  { id: 'nav-[#equipos]', title: '🖥️ Administrar Dispositivos Enrolados', category: 'Navegación', route: '/equipos' },
  { id: 'nav-[#colaboradores]', title: '👥 Ver Directorio de Colaboradores', category: 'Navegación', route: '/colaboradores' },
  { id: 'nav-[#gpos]', title: '🛡️ Gestor de Políticas GPO & Hardening', category: 'Navegación', route: '/politicas' },
  { id: 'nav-[#apps]', title: '🔑 Matriz de Accesos y Permisos', category: 'Navegación', route: '/aplicaciones' }
]

const filteredResults = computed(() => {
  if (!query.value.trim()) return quickActions
  const q = query.value.toLowerCase()
  return quickActions.filter(item => 
    item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  )
})

const handleSelect = (item: any) => {
  if (item.route) {
    router.push(item.route)
  } else if (item.action === 'emergency') {
    document.body.classList.toggle('emergency-mode')
  } else if (item.action === 'sync') {
    refreshNuxtData()
  }
  emit('close')
  query.value = ''
}

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (props.isOpen) {
      emit('close')
    } else {
      // Trigger toggle
    }
  } else if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-scale-up">
          
          <!-- Campo de Búsqueda Omnipresente Cmd+K -->
          <div class="p-4 border-b border-slate-800 flex items-center gap-3">
            <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="query"
              type="text" 
              placeholder="Escribe un comando o busca colaboradores, equipos, GPOs..." 
              class="w-full bg-transparent text-white placeholder-slate-500 font-mono text-sm focus:outline-none"
              autofocus
            />
            <span class="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400 shrink-0">ESC para cerrar</span>
          </div>

          <!-- Resultados de Búsqueda de Baja Carga Cognitiva -->
          <div class="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <div 
              v-for="item in filteredResults" 
              :key="item.id"
              @click="handleSelect(item)"
              class="p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
            >
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-slate-200 group-hover:text-violet-300 font-mono">{{ item.title }}</span>
              </div>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                {{ item.category }}
              </span>
            </div>

            <div v-if="filteredResults.length === 0" class="p-6 text-center text-xs text-slate-500 font-mono">
              No se encontraron comandos o recursos coincidentes.
            </div>
          </div>

          <!-- Pie de Ayuda -->
          <div class="p-3 border-t border-slate-800 bg-[#0B0F19] text-[10px] text-slate-400 flex justify-between items-center font-mono">
            <span>💡 Tip: Usa Cmd+K / Ctrl+K desde cualquier pantalla para acceder rápido</span>
            <span>Directorio Activo Ren UX 2026</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
