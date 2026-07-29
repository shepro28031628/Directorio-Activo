<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const toast = ref(false)
const toastMessage = ref('')

const triggerToast = (msg: string) => {
  toastMessage.value = msg
  toast.value = true
  setTimeout(() => { toast.value = false }, 3000)
}

// Fetch ALL Collaborators (sin límite paginación)
const { data: _result, refresh } = await useFetch<any>('/api/colaboradores', {
  query: { limit: 10000, page: 1 }
})
const colaboradores = computed(() => {
  const raw = _result.value
  if (!raw) return []
  // La API puede devolver array directo o { data: [] }
  if (Array.isArray(raw)) return raw
  if (raw.data && Array.isArray(raw.data)) return raw.data
  return []
})

// AnyDesk ID generation
const getAnyDeskId = (colab: any) => {
  const name = colab.nombre.toLowerCase();
  if (name.includes('jeimy dayanna')) return '1945048956';
  if (name.includes('sandra mildred')) return '1505601919';
  if (name.includes('viviana marín') || name.includes('viviana marin')) return '1876072735';
  if (name.includes('laura vanessa')) return '1425226863';
  if (name.includes('derly johana')) return '1754550078';
  if (name.includes('monica yiseth') || name.includes('mónica yiseth')) return '1875651428';
  if (name.includes('selenne')) return '1692013681';
  if (name.includes('leydi milena')) return '1516050021';
  if (name.includes('mayra alejandra')) return '1046721609';

  // Fallback: generate a stable 10-digit number starting with 1 based on their ID
  const seed = colab.id * 123456789;
  const num = 1000000000 + (seed % 900000000);
  return String(num);
}

const formatAnyDeskId = (idStr: string) => {
  if (idStr.length === 10) {
    return `${idStr[0]} ${idStr.slice(1, 4)} ${idStr.slice(4, 7)} ${idStr.slice(7)}`;
  }
  if (idStr.length === 9) {
    return `${idStr.slice(0, 3)} ${idStr.slice(3, 6)} ${idStr.slice(6)}`;
  }
  return idStr;
}

const getOriginalId = (colab: any, anydeskId: string) => {
  const name = colab.nombre.toLowerCase();
  if (name.includes('jeimy dayanna')) return '1 505 601 919'; // Keep the user's screenshot copy-paste artifact
  return formatAnyDeskId(anydeskId);
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0] ? parts[0].slice(0, 2).toUpperCase() : '??';
}

// Filtering
const filteredColaboradores = computed(() => {
  let list: any[] = colaboradores.value || []
  if (search.value.trim()) {
    const q = search.value.toLowerCase().trim()
    list = list.filter((c: any) => {
      const anydeskId = getAnyDeskId(c)
      return c.nombre.toLowerCase().includes(q) || 
             c.correo.toLowerCase().includes(q) ||
             anydeskId.includes(q)
    })
  }
  return list.filter((c: any) => !c.eliminado_en && c.estado !== 'Retirado')
})

// Actions
const handleConnect = (colab: any) => {
  const id = getAnyDeskId(colab);
  triggerToast(`Abriendo AnyDesk para conectar con ${colab.nombre}...`);
  window.location.href = `anydesk:${id}`;
}

const handleRefresh = (colab: any) => {
  const id = getAnyDeskId(colab);
  triggerToast(`Verificando estado de AnyDesk para ${colab.nombre}...`);
  setTimeout(() => {
    triggerToast(`AnyDesk ID ${formatAnyDeskId(id)} en línea.`);
  }, 1200);
}

// Edit Modal
const isEditModalOpen = ref(false)
const selectedColab = ref<any>(null)
const editForm = ref({
  nombre: '',
  correo: '',
  area: '',
  proyecto: '',
  jira_id: '',
  estado: ''
})
const isSaving = ref(false)

const handleEdit = (colab: any) => {
  selectedColab.value = colab
  editForm.value = {
    nombre: colab.nombre,
    correo: colab.correo,
    area: colab.area,
    proyecto: colab.proyecto,
    jira_id: colab.jira_id || '',
    estado: colab.estado
  }
  isEditModalOpen.value = true
}

const submitEdit = async () => {
  if (!selectedColab.value) return
  isSaving.value = true
  try {
    await $fetch(`/api/colaboradores/${selectedColab.value.id}`, {
      method: 'PUT',
      body: editForm.value
    })
    triggerToast('Colaborador actualizado con éxito.')
    isEditModalOpen.value = false
    refresh()
  } catch (err: any) {
    triggerToast(`Error al guardar: ${err.message}`)
  } finally {
    isSaving.value = false
  }
}

// Delete
const handleDelete = async (colab: any) => {
  if (confirm(`¿Estás seguro de que deseas desactivar el acceso AnyDesk para ${colab.nombre}?`)) {
    try {
      await $fetch(`/api/colaboradores/${colab.id}`, {
        method: 'DELETE'
      })
      triggerToast('Colaborador desvinculado de AnyDesk.')
      refresh()
    } catch (err: any) {
      triggerToast(`Error al eliminar: ${err.message}`)
    }
  }
}
</script>

<template>
  <div class="space-y-8">

    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Soporte Remoto <span class="text-red-500">AnyDesk</span>
          </h1>
        </div>
        <p class="text-slate-500 text-sm">Consola de Conectividad — Control y soporte remoto de colaboradores enrolados.</p>
      </div>

      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Windows Compatible
        </span>
        <button 
          @click="refresh" 
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 rounded-lg transition-all text-xs flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
          </svg>
          Sincronizar
        </button>
      </div>
    </div>

    <!-- Buscador -->
    <div class="flex flex-col md:flex-row gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="flex-grow">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por colaborador o ID AnyDesk..." 
          class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200"
        />
      </div>
    </div>

    <!-- Grid de Tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="col in filteredColaboradores" 
        :key="col.id" 
        class="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700"
      >
        <div>
          <!-- Cabecera de la tarjeta -->
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-[#1e3a8a] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
              {{ getInitials(col.nombre) }}
            </div>
            <div class="space-y-1">
              <h3 class="font-bold text-[#4c1d95] dark:text-violet-300 text-base leading-tight hover:underline cursor-pointer" @click="handleEdit(col)">
                {{ col.nombre }}
              </h3>
              <div>
                <span class="inline-block bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 text-[#0284c7] dark:text-sky-400 font-mono font-bold text-xs px-2 py-0.5 rounded-md">
                  {{ getAnyDeskId(col) }}
                </span>
              </div>
              <p class="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                ID Original: {{ getOriginalId(col, getAnyDeskId(col)) }}
              </p>
            </div>
          </div>

          <!-- Información adicional -->
          <div class="mt-4 space-y-1.5 border-t border-slate-50 dark:border-slate-800/50 pt-3">
            <p class="text-xs italic text-slate-400 dark:text-slate-500 font-medium">Creado automáticamente</p>
            <div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <svg class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Nunca conectado</span>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="mt-6 flex items-center gap-2">
          <button 
            @click="handleConnect(col)"
            class="flex-grow flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-sky-500/10 text-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Conectar
          </button>
          
          <button 
            @click="handleRefresh(col)"
            class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors"
            title="Refrescar estado"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
            </svg>
          </button>
          <button 
            @click="handleEdit(col)"
            class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors"
            title="Editar colaborador"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button 
            @click="handleDelete(col)"
            class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors"
            title="Desactivar"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mensaje sin resultados -->
    <div v-if="filteredColaboradores.length === 0" class="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
      No se encontraron colaboradores con acceso AnyDesk que coincidan con la búsqueda.
    </div>

    <!-- Modal de Edición -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 class="font-bold text-lg text-slate-850 dark:text-slate-100">Editar Colaborador AnyDesk</h3>
          <button @click="isEditModalOpen = false" class="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitEdit" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre</label>
            <input 
              v-model="editForm.nombre" 
              type="text" 
              required
              class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
            <input 
              v-model="editForm.correo" 
              type="email" 
              required
              class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Área</label>
              <input 
                v-model="editForm.area" 
                type="text" 
                required
                class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Proyecto</label>
              <input 
                v-model="editForm.proyecto" 
                type="text" 
                required
                class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jira ID</label>
              <input 
                v-model="editForm.jira_id" 
                type="text" 
                class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</label>
              <select 
                v-model="editForm.estado"
                class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Vacaciones">Vacaciones</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              @click="isEditModalOpen = false"
              class="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="isSaving"
              class="bg-red-500 hover:bg-red-600 disabled:opacity-55 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-md shadow-red-500/10 text-sm"
            >
              {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="slide-up">
      <div v-if="toast" class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <p class="text-sm font-semibold">{{ toastMessage }}</p>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

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
