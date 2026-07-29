<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const search = ref('')
const selectedColaborador = ref<string>('')
const selectedAplicacion = ref<string>('')
const isSubmitting = ref(false)

const toast = ref(false)
const toastMessage = ref('')
const triggerToast = (msg: string) => {
  toastMessage.value = msg
  toast.value = true
  setTimeout(() => { toast.value = false }, 3000)
}

// Fetch accesses
const { data: accesos, refresh: refreshAccesos } = await useFetch<any[]>('/api/aplicaciones/accesos', {
  query: { search }
})

// Fetch collaborators for the dropdown
const { data: _colabsResult } = await useFetch<any>('/api/colaboradores', {
  query: { limit: 10000, page: 1 }
})
const colaboradores = computed(() => {
  const raw = _colabsResult.value
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : (raw.data || [])
  return list.filter((c: any) => !c.eliminado_en && c.estado !== 'Retirado')
})

// Fetch applications for the dropdown
const { data: aplicaciones } = await useFetch<any[]>('/api/aplicaciones')

// Watch search to refresh access list automatically
watch(search, () => {
  refreshAccesos()
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const handleToggleAcceso = async (acceso: any) => {
  try {
    await $fetch('/api/aplicaciones/toggle-acceso', {
      method: 'POST',
      body: { accesoId: acceso.id }
    })
    const actionMsg = acceso.estado === 'Activo' ? 'acceso revocado' : 'acceso otorgado'
    triggerToast(`Acceso para ${acceso.colaborador.nombre} actualizado (${actionMsg}).`)
    refreshAccesos()
  } catch (err: any) {
    triggerToast(`Error al actualizar acceso: ${err.message}`)
  }
}

const handleConcederAcceso = async () => {
  if (!selectedColaborador.value || !selectedAplicacion.value) {
    triggerToast('Por favor selecciona un colaborador y una aplicación.')
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/aplicaciones/conceder', {
      method: 'POST',
      body: {
        colaboradorId: Number(selectedColaborador.value),
        aplicacionId: Number(selectedAplicacion.value)
      }
    })
    triggerToast('Acceso concedido exitosamente.')
    selectedColaborador.value = ''
    selectedAplicacion.value = ''
    refreshAccesos()
  } catch (err: any) {
    triggerToast(`Error al otorgar acceso: ${err.message}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header principal -->
    <div class="flex justify-between items-center flex-wrap gap-3">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
          Matriz de Accesos <span class="text-brand-purple">& Aplicaciones</span>
        </h1>
        <p class="text-slate-500 text-sm">Auditoría centralizada de permisos y licencias asignadas por colaborador.</p>
      </div>
      <button 
        @click="refreshAccesos" 
        class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
        </svg>
        Actualizar Accesos
      </button>
    </div>

    <!-- Buscador -->
    <div class="flex flex-col md:flex-row gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="flex-grow">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por colaborador, correo o aplicación..." 
          class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200"
        />
      </div>
    </div>

    <!-- Layout principal: Dos columnas -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Panel de Control de Accesos Activos (Tabla) -->
      <div class="lg:col-span-8 glass-card overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <span class="text-xl">🔑</span>
          <h2 class="text-base font-extrabold text-brand-purple dark:text-violet-400 font-sans tracking-wide uppercase">
            Control de Accesos Activos
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider">
                <th class="px-6 py-3.5">Colaborador</th>
                <th class="px-6 py-3.5">Aplicación</th>
                <th class="px-6 py-3.5">Estado Permiso</th>
                <th class="px-6 py-3.5">Última Actualización</th>
                <th class="px-6 py-3.5 text-center">Acción Directa</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
              <tr 
                v-for="acceso in accesos" 
                :key="acceso.id"
                class="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors"
              >
                <!-- Colaborador -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-sm leading-snug">
                      {{ acceso.colaborador.nombre }}
                    </span>
                    <span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                      {{ acceso.colaborador.correo }}
                    </span>
                  </div>
                </td>

                <!-- Aplicación -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-bold text-brand-purple dark:text-violet-400 text-sm leading-snug">
                      {{ acceso.aplicacion.nombre }}
                    </span>
                    <span class="text-xs text-slate-450 dark:text-slate-500 mt-0.5 max-w-xs leading-normal">
                      {{ acceso.aplicacion.descripcion }}
                    </span>
                  </div>
                </td>

                <!-- Estado Permiso -->
                <td class="px-6 py-4">
                  <span 
                    class="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-center shadow-sm"
                    :class="acceso.estado === 'Activo' 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                      : 'bg-red-500 text-white shadow-red-500/10'"
                  >
                    {{ acceso.estado === 'Activo' ? 'Habilitado' : 'Revocado' }}
                  </span>
                </td>

                <!-- Última Actualización -->
                <td class="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400 font-mono">
                  {{ formatDate(acceso.actualizado_en) }}
                </td>

                <!-- Acción Directa -->
                <td class="px-6 py-4 text-center">
                  <button 
                    @click="handleToggleAcceso(acceso)"
                    class="px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all shadow-sm"
                    :class="acceso.estado === 'Activo' 
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/10' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/10'"
                  >
                    {{ acceso.estado === 'Activo' ? 'Revocar Acceso' : 'Otorgar Acceso' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="accesos?.length === 0" class="text-center py-12 text-slate-400 dark:text-slate-500 text-sm italic">
            Ningún permiso o acceso coincide con el filtro de búsqueda.
          </div>
        </div>
      </div>

      <!-- Panel de Conceder Acceso (Formulario) -->
      <div class="lg:col-span-4 glass-card p-6 bg-indigo-50/20 dark:bg-slate-900/20 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <span class="text-lg">➕</span>
          <h2 class="text-base font-extrabold text-brand-purple dark:text-violet-400 font-sans tracking-wide uppercase">
            Conceder Acceso
          </h2>
        </div>

        <form @submit.prevent="handleConcederAcceso" class="space-y-5">
          <!-- Campo Colaborador -->
          <div>
            <label class="block text-[10px] font-extrabold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider mb-2">
              Colaborador
            </label>
            <select 
              v-model="selectedColaborador"
              class="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-250 shadow-sm"
            >
              <option value="">-- Seleccionar Colaborador --</option>
              <option v-for="c in colaboradores" :key="c.id" :value="c.id">
                {{ c.nombre }} ({{ c.correo }})
              </option>
            </select>
          </div>

          <!-- Campo Aplicación Corporativa -->
          <div>
            <label class="block text-[10px] font-extrabold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider mb-2">
              Aplicación Corporativa
            </label>
            <select 
              v-model="selectedAplicacion"
              class="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-250 shadow-sm"
            >
              <option value="">-- Seleccionar Aplicación --</option>
              <option v-for="app in aplicaciones" :key="app.id" :value="app.id">
                {{ app.nombre }}
              </option>
            </select>
          </div>

          <!-- Botón de Envío -->
          <div class="pt-2">
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-55 text-white font-extrabold py-3 px-5 rounded-2xl transition-all shadow-md shadow-brand-purple/20 text-sm tracking-wide"
            >
              {{ isSubmitting ? 'Otorgando...' : 'Otorgar Acceso de Seguridad' }}
            </button>
          </div>
        </form>
      </div>

    </div>

    <!-- Toast Notification -->
    <Transition name="slide-up">
      <div v-if="toast" class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800">
        <span class="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
        <p class="text-sm font-semibold">{{ toastMessage }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
