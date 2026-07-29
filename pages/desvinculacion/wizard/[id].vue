<script setup lang="ts">
const route = useRoute()
const collaboratorId = route.params.id

const { data: col, pending, error } = await useFetch(`/api/desvinculacion/wizard/${collaboratorId}`)

const isRunning = ref(false)
const isFinished = ref(false)
const progress = ref(0)
const stepsState = ref<any>([
  { name: 'db_colaborador', label: 'Actualizar colaborador en base de datos', status: 'PENDING', error: null },
  { name: 'google_workspace', label: 'Suspender cuenta Google Workspace (Admin Directory)', status: 'PENDING', error: null },
  { name: 'db_equipos', label: 'Actualizar equipos asociados a Bloqueado', status: 'PENDING', error: null },
  { name: 'ws_bloqueo', label: 'Enviar señal de bloqueo local (WebSocket Agente)', status: 'PENDING', error: null },
  { name: 'db_accesos', label: 'Revocar matriz de accesos y aplicaciones', status: 'PENDING', error: null },
  { name: 'ms_365', label: 'Deshabilitar cuenta y revocar sesiones Microsoft 365', status: 'PENDING', error: null },
  { name: 'audit_log', label: 'Registrar evento en bitácora de auditoría', status: 'PENDING', error: null }
])

const runOffboarding = async () => {
  isRunning.value = true
  progress.value = 0
  
  // Simular progresión visual de los pasos conectando con el backend
  for (let i = 0; i < stepsState.value.length; i++) {
    stepsState.value[i].status = 'RUNNING'
  }

  try {
    const res: any = await $fetch(`/api/desvinculacion/iniciar/${collaboratorId}`, { method: 'POST' })
    
    // Simular el retraso secuencial para que el administrador pueda ver los pasos completarse con animaciones
    for (let i = 0; i < stepsState.value.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const serverStep = res.steps.find((s: any) => s.name === stepsState.value[i].name)
      if (serverStep) {
        stepsState.value[i].status = serverStep.status
        stepsState.value[i].error = serverStep.error
      }
      progress.value = Math.round(((i + 1) / stepsState.value.length) * 100)
    }

    isFinished.value = true
  } catch (err: any) {
    alert(`Error crítico al ejecutar desvinculación: ${err.message}`)
  } finally {
    isRunning.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-8 bg-white w-48 rounded-xl"></div>
      <div class="h-64 bg-white rounded-2xl"></div>
    </div>

    <div v-else-if="col" class="space-y-6">
      <!-- Encabezado -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/colaboradores" class="p-2 hover:bg-slate-200 rounded-full transition bg-white shadow-sm border border-slate-200">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Asistente de Desvinculación</h1>
          <p class="text-slate-500">Proceso automatizado de offboarding de colaborador y suspensión de accesos.</p>
        </div>
      </div>

      <!-- Resumen del Colaborador -->
      <div class="glass-card p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:border-r border-slate-100 pr-4 space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-red-50 text-red-500 font-bold text-lg flex items-center justify-center border border-red-100">
              {{ col.nombre.split(' ').map((n: string) => n[0]).join('') }}
            </div>
            <div>
              <h3 class="font-bold text-slate-800">{{ col.nombre }}</h3>
              <span class="text-xs text-slate-400 font-mono">{{ col.correo }}</span>
            </div>
          </div>
          <div>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proyecto / Área</p>
            <p class="text-xs font-semibold text-slate-700 mt-0.5">{{ col.proyecto }} — {{ col.area }}</p>
          </div>
        </div>

        <div class="md:border-r border-slate-100 px-4 space-y-2">
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Activos vinculados a bloquear</p>
          <div v-if="col.equipos.length > 0" class="space-y-1.5">
            <div v-for="eq in col.equipos" :key="eq.id" class="flex justify-between text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
              <span>{{ eq.hostname }}</span>
              <span class="text-brand-purple">GLPI Lock</span>
            </div>
          </div>
          <p v-else class="text-xs text-slate-400 italic">Ningún hardware asociado.</p>
        </div>

        <div class="pl-4 space-y-2">
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cuentas y aplicaciones a revocar</p>
          <div v-if="col.accesos.length > 0" class="flex flex-wrap gap-1.5">
            <span 
              v-for="ac in col.accesos" 
              :key="ac.id"
              class="px-2 py-1 rounded bg-violet-50 text-brand-purple font-semibold text-[10px] border border-violet-100"
            >
              {{ ac.aplicacion.nombre }}
            </span>
          </div>
          <p v-else class="text-xs text-slate-400 italic">No hay accesos vinculados.</p>
        </div>
      </div>

      <!-- Consola de Progreso de Desvinculación -->
      <div class="glass-card p-8 space-y-6 border border-slate-100">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold text-slate-800 font-sans">Flujo Secuencial de Seguridad</h3>
            <p class="text-xs text-slate-400">Progreso en directo de suspensiones de APIs</p>
          </div>
          
          <button 
            v-if="!isRunning && !isFinished"
            @click="runOffboarding"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-xl transition shadow-md shadow-red-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Iniciar Desvinculación
          </button>
        </div>

        <!-- Barra de Progreso -->
        <div v-if="isRunning || isFinished" class="space-y-2">
          <div class="flex justify-between text-xs font-bold text-slate-600">
            <span>Progreso General</span>
            <span>{{ progress }}%</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-3">
            <div 
              class="h-3 rounded-full transition-all duration-500 bg-brand-purple"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Pasos en Lista -->
        <div class="space-y-4">
          <div 
            v-for="step in stepsState" 
            :key="step.name"
            class="flex items-center justify-between p-4 rounded-xl border transition"
            :class="{
              'bg-slate-50 border-slate-100 text-slate-400': step.status === 'PENDING',
              'bg-violet-50/50 border-brand-purple/20 text-slate-700': step.status === 'RUNNING',
              'bg-emerald-50/50 border-emerald-100 text-slate-700': step.status === 'SUCCESS',
              'bg-rose-50 border-rose-100 text-slate-700': step.status === 'FAILED'
            }"
          >
            <div class="flex items-center gap-3">
              <!-- Icono dinámico según estado -->
              <span class="shrink-0">
                <svg v-if="step.status === 'PENDING'" class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <svg v-else-if="step.status === 'RUNNING'" class="w-5 h-5 text-brand-purple animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <svg v-else-if="step.status === 'SUCCESS'" class="w-5 h-5 text-emerald-500 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                <svg v-else class="w-5 h-5 text-red-500 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
              </span>
              <span class="text-sm font-semibold">{{ step.label }}</span>
            </div>

            <div>
              <span v-if="step.status === 'PENDING'" class="text-xs text-slate-400 font-bold">Pendiente</span>
              <span v-else-if="step.status === 'RUNNING'" class="text-xs text-brand-purple font-bold animate-pulse">Ejecutando...</span>
              <span v-else-if="step.status === 'SUCCESS'" class="text-xs text-emerald-600 font-bold">Completado</span>
              <span v-else class="text-xs text-red-600 font-bold">Error</span>
            </div>
          </div>
        </div>

        <!-- Pantalla Final Completado -->
        <div v-if="isFinished" class="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-emerald-500/20">
            ✓
          </div>
          <h3 class="text-lg font-bold text-slate-800">Desvinculación Completada con Éxito</h3>
          <p class="text-sm text-slate-600 max-w-md mx-auto">
            El colaborador ha sido marcado como retirado en base de datos. Se suspendieron de manera segura todas las credenciales de Google Workspace y Microsoft 365, y se inhabilitó la pantalla de sus estaciones de trabajo.
          </p>
          <div class="pt-4">
            <NuxtLink to="/colaboradores" class="px-5 py-2 bg-brand-purple hover:bg-brand-purpleHover text-white font-bold rounded-xl text-xs transition inline-block">
              Volver al Directorio
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
