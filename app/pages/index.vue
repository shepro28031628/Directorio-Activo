<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/dashboard')
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Panel de Control</h1>
        <p class="text-slate-500">Métricas globales y eventos de seguridad en tiempo real.</p>
      </div>
      <button @click="refreshNuxtData()" class="bg-brand-pink text-white hover:bg-brand-pinkHover font-semibold py-2 px-4 rounded-lg transition-all shadow-sm">
        Sincronizar Datos
      </button>
    </div>

    <!-- Indicando Estados de Carga -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
      <div v-for="i in 4" :key="i" class="h-28 bg-white rounded-xl border border-slate-100"></div>
    </div>

    <!-- KPIs -->
    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase">Dispositivos Totales</p>
          <p class="text-3xl font-bold mt-1 text-slate-800">{{ data.kpis.totalDevices }}</p>
        </div>
        <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase">Equipos Activos</p>
          <p class="text-3xl font-bold mt-1 text-green-600">{{ data.kpis.onlineDevices }}</p>
        </div>
        <div class="p-3 bg-green-50 text-green-600 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase">Desconectados</p>
          <p class="text-3xl font-bold mt-1 text-red-500">{{ data.kpis.offlineDevices }}</p>
        </div>
        <div class="p-3 bg-red-50 text-red-500 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase">Vencimiento Licencias</p>
          <p class="text-3xl font-bold mt-1 text-amber-500">{{ data.kpis.expiringLicenses }}</p>
        </div>
        <div class="p-3 bg-amber-50 text-amber-500 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
      </div>
    </div>

    <!-- Alertas y Auditoría -->
    <div v-if="data" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Alertas de Seguridad -->
      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm lg:col-span-2">
        <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          Alertas de Seguridad (AD & Hardware)
        </h2>
        <div class="space-y-4">
          <div v-for="alert in data.criticalAlerts" :key="alert.id" class="flex items-start gap-4 p-3 rounded-lg bg-red-50/50 border border-red-100">
            <span class="text-red-500 mt-0.5"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
            <div class="flex-1">
              <div class="flex justify-between">
                <h4 class="font-bold text-slate-800 text-sm">{{ alert.device }}</h4>
                <span class="text-xs text-slate-400">{{ new Date(alert.timestamp).toLocaleTimeString() }}</span>
              </div>
              <p class="text-xs text-slate-600 mt-1">{{ alert.description }}</p>
            </div>
          </div>
          <div v-if="data.criticalAlerts.length === 0" class="text-center py-6 text-slate-400 text-sm">
            No se han registrado eventos críticos recientemente.
          </div>
        </div>
      </div>

      <!-- Distribución S.O. -->
      <div class="bg-white p-6 rounded-xl border border-brand-border shadow-sm">
        <h2 class="text-lg font-bold text-slate-800 mb-4">Sistemas Operativos</h2>
        <div class="space-y-4">
          <div v-for="item in data.osDistribution" :key="item.os" class="space-y-1">
            <div class="flex justify-between text-xs font-bold text-slate-600">
              <span>{{ item.os }}</span>
              <span>{{ item.count }}</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="bg-brand-pink h-2 rounded-full" :style="{ width: `${(item.count / data.kpis.totalDevices) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
