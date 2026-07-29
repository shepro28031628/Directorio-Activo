<script setup lang="ts">
const search = ref('')
const statusFilter = ref('')

const { data: devices, refresh } = await useFetch('/api/devices', {
  query: { search, status: statusFilter }
})

// Ejecutar acción de bloqueo/reinicio
const executeQuickAction = async (deviceId: string, actionType: string, details: string) => {
  const adminUser = 'admin@assetcontrol.io'
  
  try {
    await $fetch('/api/actions/audit', {
      method: 'POST',
      body: { deviceId, adminUser, actionType, details }
    })
    
    // Simular un mensaje en el sistema en vez de alert() de navegador
    alert(`Acción ${actionType} programada con éxito para el dispositivo.`);
    refresh()
  } catch (err: any) {
    alert(`Error al ejecutar acción: ${err.message}`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Directorio de Dispositivos</h1>
      <p class="text-slate-500">Gestión de activos de red con soporte y monitoreo remoto.</p>
    </div>

    <!-- Filtros -->
    <div class="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-brand-border shadow-sm">
      <div class="flex-grow">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por equipo, usuario o dirección IP..." 
          class="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
        />
      </div>
      <div class="w-full md:w-48">
        <select 
          v-model="statusFilter" 
          class="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
        >
          <option value="">Todos los Estados</option>
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
        </select>
      </div>
    </div>

    <!-- Tabla de Equipos -->
    <div class="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-brand-border">
            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Nombre</th>
            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Usuario</th>
            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Dirección IP</th>
            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
            <th class="p-4 text-xs font-bold text-slate-500 uppercase">Hardware Clave</th>
            <th class="p-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="device in devices" :key="device.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="p-4">
              <NuxtLink :to="`/devices/${device.id}`" class="font-semibold text-brand-pink hover:underline">
                {{ device.name }}
              </NuxtLink>
              <p class="text-xs text-slate-400 mt-0.5">{{ device.osName }}</p>
            </td>
            <td class="p-4 text-sm font-medium text-slate-700">{{ device.assignedUser }}</td>
            <td class="p-4 text-sm text-slate-500 font-mono">{{ device.ipAddress }}</td>
            <td class="p-4">
              <span 
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
                :class="device.status === 'ONLINE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="device.status === 'ONLINE' ? 'bg-green-500' : 'bg-slate-400'"></span>
                {{ device.status }}
              </span>
            </td>
            <td class="p-4 text-xs text-slate-600">
              <span v-if="device.hardware">
                {{ device.hardware.cpuModel.split('@')[0] }} / {{ device.hardware.ramGb }}GB RAM
              </span>
              <span v-else class="text-slate-400">Sin datos de telemetría</span>
            </td>
            <td class="p-4 text-right space-x-2">
              <button 
                @click="executeQuickAction(device.id, 'RESTART', 'Se solicitó el reinicio remoto inmediato')"
                class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-semibold transition"
              >
                Reiniciar
              </button>
              <button 
                @click="executeQuickAction(device.id, 'PRIVILEGE_ELEVATION', 'Se forzó el bloqueo total de sesión por comando')"
                class="text-xs bg-brand-pink hover:bg-brand-pinkHover text-white py-1.5 px-3 rounded-lg font-semibold transition"
              >
                Bloquear
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="devices?.length === 0" class="text-center py-12 text-slate-400 text-sm">
        No se encontraron activos que coincidan con la búsqueda.
      </div>
    </div>
  </div>
</template>
