<script setup lang="ts">
const { data: auditorias } = await useFetch('/api/auditorias')
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Bitácora de Auditoría Forense</h1>
      <p class="text-slate-500">Historial completo de acciones administrativas, suspensiones y elevación de seguridad.</p>
    </div>

    <!-- Tabla de Logs de Auditoría -->
    <div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold">
            <th class="p-4 text-xs uppercase tracking-wider">Fecha / Hora</th>
            <th class="p-4 text-xs uppercase tracking-wider">Acción Ejecutada</th>
            <th class="p-4 text-xs uppercase tracking-wider">Detalles de la Acción</th>
            <th class="p-4 text-xs uppercase tracking-wider">Usuario Auditor</th>
            <th class="p-4 text-xs uppercase tracking-wider">Dirección IP Origen</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="log in auditorias" :key="log.id" class="hover:bg-slate-50/50">
            <td class="p-4 text-xs text-slate-400 font-mono font-medium">
              <ClientOnly>
                {{ new Date(log.fecha).toLocaleString() }}
              </ClientOnly>
            </td>
            <td class="p-4">
              <span 
                class="px-2.5 py-0.5 rounded-lg text-xs font-bold"
                :class="log.accion.includes('Desvinculación') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-violet-50 text-brand-purple border border-violet-100'"
              >
                {{ log.accion }}
              </span>
            </td>
            <td class="p-4 text-slate-600 font-medium leading-relaxed max-w-lg">{{ log.detalles }}</td>
            <td class="p-4 text-slate-700 font-semibold">{{ log.usuario_auditor }}</td>
            <td class="p-4 font-mono text-xs text-slate-400">{{ log.ip_origen || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="auditorias?.length === 0" class="text-center py-12 text-slate-400 text-sm">
        No se han registrado auditorías en la bitácora.
      </div>
    </div>
  </div>
</template>
