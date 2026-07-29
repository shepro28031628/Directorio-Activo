<script setup lang="ts">
const { data: licenses, pending, refresh } = await useFetch('/api/licenses')
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Cumplimiento y Gestión de Licencias</h1>
        <p class="text-slate-500">Monitoreo de costes y optimizaciones automáticas de asientos de software.</p>
      </div>
    </div>

    <!-- Motor Inteligente de Sugerencias -->
    <div class="bg-gradient-to-r from-brand-pink/5 to-pink-500/5 p-6 rounded-xl border border-brand-pink/20 shadow-sm flex items-start gap-4">
      <div class="p-3 bg-brand-pink text-white rounded-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <div>
        <h3 class="text-md font-bold text-slate-800">Motor de Optimización de Licencias</h3>
        <p class="text-sm text-slate-600 mt-1">El análisis de telemetría de red estima que se pueden recuperar licencias no utilizadas por colaboradores de manera inmediata.</p>
      </div>
    </div>

    <!-- Listado de Licencias -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      <div v-for="i in 2" :key="i" class="h-44 bg-white rounded-xl border border-slate-100"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="lic in licenses" :key="lic.id" class="bg-white p-6 rounded-xl border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-bold text-slate-800">{{ lic.name }}</h3>
              <p class="text-xs text-slate-400 uppercase font-semibold">{{ lic.category }}</p>
            </div>
            <span class="text-xs font-bold text-brand-pink bg-brand-pink/10 px-2.5 py-1 rounded-full">
              ${{ lic.costPerSeat }}/Licencia
            </span>
          </div>

          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-xs font-bold text-slate-600">
              <span>Asientos Utilizados</span>
              <span>{{ lic.activeInstallations }} / {{ lic.purchasedSeats }}</span>
            </div>
            <!-- Barra de Progreso de Ocupación -->
            <div class="w-full bg-slate-100 rounded-full h-2.5">
              <div 
                class="h-2.5 rounded-full" 
                :class="lic.activeInstallations > lic.purchasedSeats ? 'bg-red-500' : 'bg-brand-pink'"
                :style="{ width: `${Math.min(100, (lic.activeInstallations / lic.purchasedSeats) * 100)}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-3 flex flex-col space-y-2">
          <div class="flex justify-between text-xs text-slate-500">
            <span>Próxima Renovación:</span>
            <span class="font-bold">{{ new Date(lic.renewalDate).toLocaleDateString() }}</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-lg text-xs font-semibold text-slate-600">
            <strong>Recomendación IA:</strong> {{ lic.recommendation }}
          </div>
          <div v-if="lic.potentialSavings > 0" class="text-xs text-green-600 font-bold flex justify-between">
            <span>Ahorro Potencial Estimado:</span>
            <span>+${{ lic.potentialSavings.toLocaleString() }} / Mes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
