<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const search = ref('')
const page = ref(1)
const limit = 20

const { data: resultado, refresh } = await useFetch('/api/microsoft/users', {
  query: computed(() => ({
    search: search.value,
    page: page.value,
    limit,
    paginate: 'true'
  }))
})

const usuarios = computed(() => (resultado.value as any)?.data || [])
const meta = computed(() => (resultado.value as any)?.meta || { total: 0, page: 1, limit, totalPages: 1 })

watch(search, () => {
  page.value = 1
})

const isSyncing = ref(false)

// Estados de los Modales CRUD
const isModalOpen = ref(false)
const isEditMode = ref(false)
const form = ref({
  id: 0,
  nombre: '',
  correo: '',
  licencias: ''
})
const isSaving = ref(false)

const triggerSync = async () => {
  isSyncing.value = true
  try {
    const res = await $fetch<any>('/api/microsoft/sincronizar', { method: 'POST' })
    alert(res.mensaje)
    refresh()
  } catch (err: any) {
    alert(`Error al sincronizar: ${err.message}`)
  } finally {
    isSyncing.value = false
  }
}

// Alternar estado de la cuenta (Deshabilitar / Vincular)
const toggleStatus = async (user: any) => {
  const suspended = user.activo // Si está activo, queremos suspenderlo
  const confirmMsg = suspended 
    ? `¿Está seguro de que desea deshabilitar la cuenta de Microsoft 365 para ${user.nombre}?`
    : `¿Desea reactivar y vincular la cuenta de Microsoft 365 para ${user.nombre}?`
  
  if (!confirm(confirmMsg)) return

  try {
    const res = await $fetch<any>('/api/microsoft/toggle-status', {
      method: 'POST',
      body: { id: user.id, suspended }
    })
    alert(res.mensaje)
    refresh()
  } catch (err: any) {
    alert(`Error al cambiar estado: ${err.data?.statusMessage || err.message}`)
  }
}

// Abrir modal de creación
const openCreateModal = () => {
  isEditMode.value = false
  form.value = {
    id: 0,
    nombre: '',
    correo: '',
    licencias: 'ENTERPRISEPACK, SPB'
  }
  isModalOpen.value = true
}

// Abrir modal de edición
const openEditModal = (user: any) => {
  isEditMode.value = true
  form.value = {
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    licencias: user.licencias || ''
  }
  isModalOpen.value = true
}

// Guardar (Crear o Editar)
const saveUser = async () => {
  if (!form.value.nombre.trim() || !form.value.correo.trim()) {
    alert('Nombre y correo son obligatorios.')
    return
  }

  isSaving.value = true
  try {
    if (isEditMode.value) {
      const res = await $fetch<any>(`/api/microsoft/${form.value.id}`, {
        method: 'PUT',
        body: {
          nombre: form.value.nombre,
          licencias: form.value.licencias
        }
      })
      alert(res.mensaje)
    } else {
      const res = await $fetch<any>('/api/microsoft/create', {
        method: 'POST',
        body: {
          nombre: form.value.nombre,
          correo: form.value.correo,
          licencias: form.value.licencias
        }
      })
      alert(res.mensaje)
    }
    isModalOpen.value = false
    refresh()
  } catch (err: any) {
    alert(`Error al guardar: ${err.data?.statusMessage || err.message}`)
  } finally {
    isSaving.value = false
  }
}

// Eliminar permanentemente
const deleteUser = async (user: any) => {
  if (!confirm(`¿Está completamente seguro de que desea eliminar permanentemente a ${user.nombre} (${user.correo}) de Microsoft 365? Esta acción no se puede deshacer.`)) {
    return
  }

  try {
    const res = await $fetch<any>(`/api/microsoft/${user.id}`, {
      method: 'DELETE'
    })
    alert(res.mensaje)
    refresh()
  } catch (err: any) {
    alert(`Error al eliminar usuario: ${err.data?.statusMessage || err.message}`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center flex-wrap gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Administración Microsoft 365 (Office)</h1>
        <p class="text-slate-500">Caché local de cuentas y licencias sincronizada con la API de Microsoft Graph (Azure AD).</p>
      </div>

      <div class="flex gap-3 flex-wrap">
        <!-- Registrar Usuario -->
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
          Registrar Usuario
        </button>

        <!-- Sincronizar Directorio -->
        <button 
          @click="triggerSync()" 
          :disabled="isSyncing"
          class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <svg class="w-4 h-4 animate-spin" v-if="isSyncing" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <svg class="w-4 h-4" v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"/>
          </svg>
          {{ isSyncing ? 'Sincronizando...' : 'Sincronizar Directorio' }}
        </button>
      </div>
    </div>

    <!-- Buscador -->
    <div class="flex flex-col md:flex-row gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm">
      <div class="flex-grow">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por nombre o correo de Microsoft 365..." 
          class="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white"
        />
      </div>
    </div>

    <!-- Directorio Microsoft 365 -->
    <div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden text-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold">
            <th class="p-4 text-xs uppercase tracking-wider">Nombre del Usuario</th>
            <th class="p-4 text-xs uppercase tracking-wider">Correo Microsoft 365</th>
            <th class="p-4 text-xs uppercase tracking-wider">User ID (Azure)</th>
            <th class="p-4 text-xs uppercase tracking-wider">Licencias Asignadas</th>
            <th class="p-4 text-xs uppercase tracking-wider">Estado de Cuenta</th>
            <th class="p-4 text-xs uppercase tracking-wider">Última Sincronización</th>
            <th class="p-4 text-xs uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in usuarios" :key="user.id" class="hover:bg-slate-50/50">
            <td class="p-4 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                {{ user.nombre[0] }}
              </div>
              <span class="font-bold text-slate-800">{{ user.nombre }}</span>
            </td>
            <td class="p-4 text-slate-600 font-medium">{{ user.correo }}</td>
            <td class="p-4 font-mono text-xs text-slate-400">{{ user.user_id }}</td>
            <td class="p-4 text-xs text-slate-500">
              <span 
                v-for="lic in (user.licencias ? user.licencias.split(',') : [])" 
                :key="lic"
                class="inline-block px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100 mr-1 mt-1 font-semibold"
              >
                {{ lic.trim() }}
              </span>
              <span v-if="!user.licencias" class="text-slate-400 italic">Ninguna licencia</span>
            </td>
            <td class="p-4">
              <span 
                class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                :class="user.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ user.activo ? 'Habilitada' : 'Deshabilitada' }}
              </span>
            </td>
            <td class="p-4 text-xs text-slate-400 font-medium">
              <ClientOnly>
                {{ new Date(user.sincronizado_en).toLocaleString() }}
              </ClientOnly>
            </td>
            <td class="p-4 text-right flex items-center justify-end gap-2">
              <!-- Botón Vincular / Suspender -->
              <button
                @click="toggleStatus(user)"
                class="text-xs font-bold py-1.5 px-3 rounded-lg border transition shadow-sm shrink-0"
                :class="user.activo 
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'"
              >
                {{ user.activo ? 'Suspender' : 'Vincular' }}
              </button>

              <!-- Botón Editar -->
              <button 
                @click="openEditModal(user)"
                class="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition shadow-sm shrink-0"
              >
                Editar
              </button>

              <!-- Botón Eliminar -->
              <button 
                @click="deleteUser(user)"
                class="text-xs font-bold py-1.5 px-3 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition shadow-sm shrink-0"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!usuarios || usuarios.length === 0" class="text-center py-12 text-slate-400 italic text-sm">
        No se encontraron usuarios de Microsoft 365.
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="usuarios.length > 0" class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm">
      <p class="text-sm text-slate-500">
        Mostrando <span class="font-semibold text-slate-700">{{ ((meta.page - 1) * meta.limit) + 1 }}–{{ Math.min(meta.page * meta.limit, meta.total) }}</span> de <span class="font-semibold text-slate-700">{{ meta.total }}</span> usuarios
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

    <!-- MODAL DE CREACIÓN / EDICIÓN -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl border border-brand-border max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <!-- Encabezado Modal -->
        <div class="px-6 py-4 bg-brand-darkBg text-white flex justify-between items-center">
          <h3 class="font-bold text-lg font-sans">
            {{ isEditMode ? 'Editar Usuario Microsoft' : 'Registrar Nuevo Usuario' }}
          </h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Formulario -->
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
            <input 
              v-model="form.nombre" 
              type="text" 
              placeholder="Ej: Jane Doe" 
              class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">User Principal Name (Correo)</label>
            <input 
              v-model="form.correo" 
              type="email" 
              placeholder="Ej: jdoe@renconsultores.onmicrosoft.com" 
              :disabled="isEditMode"
              class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:bg-slate-100 disabled:text-slate-400"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Licencias (Separadas por Comas)</label>
            <input 
              v-model="form.licencias" 
              type="text" 
              placeholder="Ej: ENTERPRISEPACK, SPB" 
              class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>
        </div>

        <!-- Acciones del Modal -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
          <button 
            @click="isModalOpen = false" 
            class="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-100 transition"
          >
            Cancelar
          </button>
          <button 
            @click="saveUser"
            :disabled="isSaving"
            class="px-5 py-2 bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-brand-purple/20 transition flex items-center gap-1.5"
          >
            <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ isSaving ? 'Guardando...' : 'Guardar Usuario' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
