<script setup lang="ts">
const search = ref('')
const areaFilter = ref('')
const statusFilter = ref('')
const page = ref(1)
const limit = 20
const isSyncing = ref(false)
const syncMessage = ref('')

const isModalOpen = ref(false)
const form = ref({
  nombre: '',
  correo: '',
  area: '',
  proyecto: '',
  jira_id: ''
})

const isEditModalOpen = ref(false)
const editForm = ref({
  id: 0,
  nombre: '',
  correo: '',
  area: '',
  proyecto: '',
  jira_id: '',
  estado: 'Activo'
})

const { data: resultado, refresh } = await useFetch('/api/colaboradores', {
  query: { search, area: areaFilter, estado: statusFilter, page, limit, paginate: 'true' }
})

const colaboradores = computed(() => (resultado.value as any)?.data || [])
const meta = computed(() => (resultado.value as any)?.meta || { total: 0, page: 1, limit, totalPages: 1 })

watch([search, areaFilter, statusFilter], () => { page.value = 1 })

const handleCreate = async () => {
  try {
    await $fetch('/api/colaboradores/create', {
      method: 'POST',
      body: form.value
    })
    isModalOpen.value = false
    form.value = { nombre: '', correo: '', area: '', proyecto: '', jira_id: '' }
    refresh()
  } catch (err: any) {
    alert(`Error al registrar colaborador: ${err.data?.statusMessage || err.message}`)
  }
}

const openEditModal = (col: any) => {
  editForm.value = {
    id: col.id,
    nombre: col.nombre,
    correo: col.correo,
    area: col.area,
    proyecto: col.proyecto,
    jira_id: col.jira_id || '',
    estado: col.estado
  }
  isEditModalOpen.value = true
}

const handleUpdate = async () => {
  try {
    await $fetch(`/api/colaboradores/${editForm.value.id}`, {
      method: 'PUT',
      body: {
        nombre: editForm.value.nombre,
        correo: editForm.value.correo,
        area: editForm.value.area,
        proyecto: editForm.value.proyecto,
        jira_id: editForm.value.jira_id,
        estado: editForm.value.estado
      }
    })
    isEditModalOpen.value = false
    refresh()
  } catch (err: any) {
    alert(`Error al actualizar colaborador: ${err.data?.statusMessage || err.message}`)
  }
}

const handleDelete = async (id: number, nombre: string) => {
  if (!confirm(`¿Estás seguro de que deseas eliminar al colaborador ${nombre}?`)) return
  try {
    await $fetch(`/api/colaboradores/${id}`, {
      method: 'DELETE'
    })
    refresh()
  } catch (err: any) {
    alert(`Error al eliminar colaborador: ${err.data?.statusMessage || err.message}`)
  }
}

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
</script>

<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <div class="flex justify-between items-center flex-wrap gap-3">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">Directorio de Colaboradores</h1>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Gestión de usuarios internos, proyectos y desvinculaciones centralizadas.</p>
      </div>
      <div class="flex gap-3 flex-wrap">
        <!-- Botón Sincronizar con Jira -->
        <button
          @click="syncJira"
          :disabled="isSyncing"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md text-xs sm:text-sm"
        >
          <svg v-if="!isSyncing" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          {{ isSyncing ? 'Sincronizando...' : 'Sincronizar con Jira' }}
        </button>

        <!-- Botón Registrar Colaborador -->
        <button 
          @click="isModalOpen = true"
          class="bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md flex items-center gap-2 text-xs sm:text-sm"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Registrar Colaborador
        </button>
      </div>
    </div>

    <!-- Mensaje de sincronización -->
    <div v-if="syncMessage" class="px-4 py-3 rounded-xl text-sm font-medium border" :class="syncMessage.startsWith('Error') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
      {{ syncMessage }}
    </div>

    <!-- Filtros de Búsqueda Dark Mode Sleek -->
    <div class="flex flex-col md:flex-row gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-sm">
      <div class="flex-grow">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por colaborador, correo o proyecto..." 
          class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>
      <div class="w-full md:w-48">
        <select 
          v-model="areaFilter" 
          class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          <option value="">Todas las Áreas</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Marketing">Marketing</option>
          <option value="Soporte">Soporte</option>
        </select>
      </div>
      <div class="w-full md:w-48">
        <select 
          v-model="statusFilter" 
          class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          <option value="">Todos los Estados</option>
          <option value="Activo">Activo</option>
          <option value="Vacaciones">Vacaciones</option>
          <option value="Suspendido">Suspendido</option>
          <option value="Retirado">Retirado</option>
        </select>
      </div>
    </div>

    <!-- Grid de Tarjetas de Colaboradores -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="col in colaboradores" 
        :key="col.id" 
        class="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-slate-100 hover:border-slate-200"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-violet-50 text-brand-purple font-bold text-md flex items-center justify-center">
                {{ col.nombre.split(' ').map((n: string) => n[0]).join('').slice(0, 2) }}
              </div>
              <div>
                <h3 class="font-bold text-slate-800 leading-tight">{{ col.nombre }}</h3>
                <p class="text-xs text-slate-400 font-mono mt-0.5">{{ col.correo }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-end gap-2">
              <span 
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase"
                :class="{
                  'bg-green-50 text-green-700 border border-green-100': col.estado === 'Activo',
                  'bg-blue-50 text-blue-700 border border-blue-100': col.estado === 'Vacaciones',
                  'bg-amber-50 text-amber-700 border border-amber-100': col.estado === 'Suspendido',
                  'bg-rose-50 text-rose-700 border border-rose-100': col.estado === 'Retirado'
                }"
              >
                {{ col.estado }}
              </span>
              
              <!-- Botones CRUD de Editar y Eliminar -->
              <div class="flex gap-1.5 mt-0.5">
                <button 
                  @click="openEditModal(col)"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-brand-purple hover:bg-violet-50 border border-transparent hover:border-violet-100 transition"
                  title="Editar Colaborador"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <button 
                  @click="handleDelete(col.id, col.nombre)"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition"
                  title="Eliminar Colaborador"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3 text-slate-500">
            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Área</p>
              <p class="font-semibold text-slate-700 mt-0.5">{{ col.area }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proyecto</p>
              <p class="font-semibold text-slate-700 mt-0.5">{{ col.proyecto }}</p>
            </div>
          </div>
          
          <div class="text-xs border-t border-slate-50 pt-3">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Equipos Vinculados</p>
            <div v-if="col.equipos?.length > 0" class="flex flex-wrap gap-1.5">
              <span 
                v-for="eq in col.equipos" 
                :key="eq.id"
                class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200"
              >
                {{ eq.hostname }}
              </span>
            </div>
            <p v-else class="text-slate-400 italic">Ningún activo tecnológico asignado.</p>
          </div>

          <!-- Aplicativos de la Matriz de Accesos -->
          <div class="text-xs border-t border-slate-50 pt-3">
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Aplicativos Autorizados</p>
            <div v-if="col.accesos?.filter((a: any) => a.estado === 'Activo').length > 0" class="flex flex-wrap gap-1.5">
              <span 
                v-for="acceso in col.accesos.filter((a: any) => a.estado === 'Activo')" 
                :key="acceso.id"
                class="px-2.5 py-0.5 rounded-md bg-violet-50 text-brand-purple font-semibold text-[10px] border border-violet-100 flex items-center gap-1 shadow-sm"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0"></span>
                {{ acceso.aplicacion.nombre }}
              </span>
            </div>
            <p v-else class="text-slate-400 italic">Sin accesos activos.</p>
          </div>
        </div>

        <div class="mt-6 border-t border-slate-100 pt-4 flex gap-2">
          <NuxtLink 
            v-if="col.estado !== 'Retirado'"
            :to="`/desvinculacion/wizard/${col.id}`"
            class="w-full text-center text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl border border-red-100 transition"
          >
            Iniciar Desvinculación
          </NuxtLink>
          <span 
            v-else
            class="w-full text-center text-xs bg-slate-100 text-slate-400 font-bold py-2 rounded-xl border border-slate-200 block cursor-not-allowed"
          >
            Colaborador Desvinculado
          </span>
        </div>
      </div>
      
      <div v-if="colaboradores.length === 0" class="col-span-full text-center py-12 text-slate-400 text-sm">
        No se encontraron colaboradores que coincidan con la búsqueda.
      </div>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm">
      <p class="text-sm text-slate-500">
        Mostrando <span class="font-semibold text-slate-700">{{ ((meta.page - 1) * meta.limit) + 1 }}–{{ Math.min(meta.page * meta.limit, meta.total) }}</span> de <span class="font-semibold text-slate-700">{{ meta.total }}</span> colaboradores
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
          {{ meta.page }} / {{ meta.totalPages }}
        </span>
        <button
          @click="page++; refresh()"
          :disabled="page >= meta.totalPages"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
          :class="page >= meta.totalPages ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:bg-slate-100'"
        >
          Siguiente
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal Formulario Creación -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-slate-800">Registrar Colaborador</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleCreate" class="space-y-4 text-sm">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Completo</label>
            <input v-model="form.nombre" required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Correo Electrónico</label>
            <input v-model="form.correo" required type="email" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Área</label>
              <select v-model="form.area" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none">
                <option value="Tecnología">Tecnología</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Marketing">Marketing</option>
                <option value="Soporte">Soporte</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Proyecto</label>
              <input v-model="form.proyecto" required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ID Jira Assets (Opcional)</label>
            <input v-model="form.jira_id" type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button @click="isModalOpen = false" type="button" class="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 text-xs font-bold text-white bg-brand-purple rounded-xl hover:bg-brand-purpleHover">
              Guardar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal Formulario Edición -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-slate-800">Editar Colaborador</h3>
          <button @click="isEditModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-4 text-sm">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Completo</label>
            <input v-model="editForm.nombre" required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Correo Electrónico</label>
            <input v-model="editForm.correo" required type="email" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Área</label>
              <select v-model="editForm.area" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none">
                <option value="Tecnología">Tecnología</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Marketing">Marketing</option>
                <option value="Soporte">Soporte</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Proyecto</label>
              <input v-model="editForm.proyecto" required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Estado</label>
              <select v-model="editForm.estado" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none">
                <option value="Activo">Activo</option>
                <option value="Vacaciones">Vacaciones</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Retirado">Retirado</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ID Jira Assets (Opcional)</label>
              <input v-model="editForm.jira_id" type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"/>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button @click="isEditModalOpen = false" type="button" class="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 text-xs font-bold text-white bg-brand-purple rounded-xl hover:bg-brand-purpleHover">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
