<script setup lang="ts">
const route = useRoute()
const deviceId = route.params.id

const { data: device, pending, error } = await useFetch(`/api/devices/${deviceId}`)

const patchStatusColor = (status: string) => {
  return status === 'UP_TO_DATE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-10 bg-white w-48 rounded-lg"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="h-64 bg-white rounded-xl"></div>
        <div class="h-64 bg-white rounded-xl col-span-2"></div>
      </div>
    </div>

    <div v-else-if="device" class="space-y-6">
      <div class="flex items-center gap-4">
        <NuxtLink to="/devices" class="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">{{ device.name }}</h1>
          <p class="text-slate-500">Administrado por: {{ device.assignedUser }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Especificaciones de Hardware -->
        <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-800 border-b pb-2">Especificaciones de Hardware</h2>
          <div class="space-y-3" v-if="device.hardware">
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase">Procesador</p>
              <p class="text-sm font-semibold text-slate-700">{{ device.hardware.cpuModel }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase">Memoria RAM</p>
              <p class="text-sm font-semibold text-slate-700">{{ device.hardware.ramGb }} GB</p>
            </div>
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase">Disco de Almacenamiento</p>
              <p class="text-sm font-semibold text-slate-700">{{ device.hardware.storageGb }} GB SSD</p>
            </div>
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase">Estado de Salud del Disco</p>
              <p class="text-sm font-semibold text-green-600">{{ device.hardware.diskHealth }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-400 text-sm">
            Ficha de telemetría no reportada por el agente local.
          </div>
        </div>

        <!-- Auditoría de Software e Instalaciones -->
        <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm lg:col-span-2 space-y-4">
          <h2 class="text-lg font-bold text-slate-800 border-b pb-2">Aplicaciones y Estado de Parches</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="text-slate-500 border-b">
                  <th class="pb-2 font-bold uppercase text-xs">Software</th>
                  <th class="pb-2 font-bold uppercase text-xs">Versión</th>
                  <th class="pb-2 font-bold uppercase text-xs">Parche de Seguridad</th>
                  <th class="pb-2 font-bold uppercase text-xs">Privilegios</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="audit in device.softwareAudits" :key="audit.id" class="hover:bg-slate-50/50">
                  <td class="py-3 font-semibold text-slate-800">{{ audit.software.name }}</td>
                  <td class="py-3 font-mono text-slate-600">{{ audit.version }}</td>
                  <td class="py-3">
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold" :class="patchStatusColor(audit.patchStatus)">
                      {{ audit.patchStatus === 'UP_TO_DATE' ? 'Al día' : 'Pendiente' }}
                    </span>
                  </td>
                  <td class="py-3 font-bold text-slate-500 text-xs">{{ audit.privilegeLevel }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Logs del Agente e Historial de Eventos -->
      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm">
        <h2 class="text-lg font-bold text-slate-800 mb-4">Registro Histórico del Dispositivo</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
          <div v-for="log in device.eventLogs" :key="log.id" class="flex gap-4 p-3 border-b border-slate-100 last:border-b-0">
            <div class="text-xs text-slate-400 font-mono w-40 shrink-0">
              {{ new Date(log.timestamp).toLocaleString() }}
            </div>
            <div class="text-xs font-bold w-24" :class="log.severity === 'CRITICAL' ? 'text-red-500' : 'text-slate-500'">
              [{{ log.severity }}]
            </div>
            <div class="text-sm text-slate-700">
              {{ log.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
