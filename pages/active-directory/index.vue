<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref<'ous' | 'gpos' | 'network' | 'rbac'>('ous')
const isLoading = ref(true)
const adData = ref<any>(null)
const selectedNode = ref<any>(null)

// Sci-Fi Inspector State
const isInspectorOpen = ref(false)
const selectedDeviceForInspector = ref<any>(null)

const fetchAdData = async () => {
  isLoading.value = true
  try {
    const data = await $fetch('/api/active-directory')
    adData.value = data
  } catch (err) {
    console.error('Error al cargar datos de Active Directory:', err)
  } finally {
    isLoading.value = false
  }
}

const selectNode = (nodeName: string, dn: string, count: number) => {
  selectedNode.value = { nodeName, dn, count }
}

const inspectDeviceFromNode = (deviceName: string) => {
  selectedDeviceForInspector.value = {
    hostname: deviceName,
    so: 'Windows 11 Enterprise 23H2',
    windows_user: 'REN\\user.ad',
    ip_registro: '192.168.10.201',
    mac_address: '00:1C:42:00:00:08',
    serial: 'SN-AD-NODE-2026'
  }
  isInspectorOpen.value = true
}

onMounted(() => {
  fetchAdData()
})
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Sci-Fi Floating Inspector -->
    <SciFiInspector 
      :is-open="isInspectorOpen" 
      :device="selectedDeviceForInspector" 
      @close="isInspectorOpen = false" 
    />

    <!-- Encabezado Principal -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/10 pb-5">
      <div>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            Active Directory <span class="gradient-text-cyan">Nodos & Servicios</span>
          </h1>
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 flex items-center gap-1.5 shadow-glow-cyan">
            <span class="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span>
            Bosque Active Directory (renova.local)
          </span>
        </div>
        <p class="text-slate-400 text-xs sm:text-sm mt-1">
          Visualización de mapa de nodos interactivo para OUs, GPOs en 3D, Servicios DNS/DHCP y Matriz RBAC.
        </p>
      </div>

      <!-- Domain Controller Status -->
      <div v-if="adData" class="flex flex-wrap gap-2 w-full lg:w-auto">
        <div 
          v-for="dc in adData.domain.domainControllers" 
          :key="dc.name"
          class="bento-card px-3.5 py-2 flex items-center gap-2.5 text-xs font-mono border-white/10 flex-1 sm:flex-none"
        >
          <div class="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-glow-cyan"></div>
          <div>
            <div class="font-bold text-white">{{ dc.name.split('.')[0] }}</div>
            <div class="text-[10px] text-slate-400 font-mono">{{ dc.ip }} • {{ dc.latencyMs }}ms</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navegación por Pestañas con Píldoras Neón -->
    <div class="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto custom-scrollbar">
      <button
        @click="activeTab = 'ous'"
        :class="activeTab === 'ous' ? 'border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan' : 'border-transparent text-slate-400 hover:text-white font-medium'"
        class="px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        1. Visualizador de Nodos OUs
      </button>

      <button
        @click="activeTab = 'gpos'"
        :class="activeTab === 'gpos' ? 'border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan' : 'border-transparent text-slate-400 hover:text-white font-medium'"
        class="px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        2. Políticas GPOs
      </button>

      <button
        @click="activeTab = 'network'"
        :class="activeTab === 'network' ? 'border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan' : 'border-transparent text-slate-400 hover:text-white font-medium'"
        class="px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
        </svg>
        3. Servicios DNS / DHCP
      </button>

      <button
        @click="activeTab = 'rbac'"
        :class="activeTab === 'rbac' ? 'border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan' : 'border-transparent text-slate-400 hover:text-white font-medium'"
        class="px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        4. Esquema RBAC Delegado
      </button>
    </div>

    <!-- Indicador de Carga -->
    <div v-if="isLoading" class="p-12 text-center">
      <div class="inline-block w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs font-mono text-slate-400 mt-2">Cargando mapa de nodos Active Directory...</p>
    </div>

    <div v-else-if="adData">
      
      <!-- 1. VISUALIZADOR DE NODOS DE OUs (MINDMAP INTERACTIVO 2026) -->
      <div v-if="activeTab === 'ous'" class="space-y-6">
        
        <!-- Bento Cards de Resumen AD -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bento-card p-5">
            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Total Objetos AD</span>
            <span class="text-3xl font-extrabold text-white font-mono mt-1 block">450 Objetos</span>
            <span class="text-xs text-neon-cyan font-mono flex items-center gap-1 mt-1">
              ✓ Bosque renova.local Sincronizado
            </span>
          </div>

          <div class="bento-card p-5">
            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Dispositivos Conectados</span>
            <span class="text-3xl font-extrabold text-neon-emerald font-mono mt-1 block">180 Equipos</span>
            <span class="text-xs text-slate-400 font-mono block mt-1">
              145 Workstations • 25 Servidores • 10 Kioskos
            </span>
          </div>

          <div class="bento-card p-5">
            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Nivel Funcional</span>
            <span class="text-3xl font-extrabold text-neon-purple font-mono mt-1 block">Win Server 2022</span>
            <span class="text-xs text-slate-400 font-mono block mt-1">
              Active Directory Domain Services (AD DS)
            </span>
          </div>
        </div>

        <!-- DIAGRAMA VISUAL DE NODOS DE OUs (ESTILO MAPA MENTAL / HUD 2026) -->
        <div class="bento-card p-5 sm:p-6 space-y-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 class="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                <span>🌐</span> Mapa Interactivo de Nodos de Unidades Organizativas (OUs)
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Haz clic en cualquier nodo para expandir la ficha Sci-Fi Inspector o inspeccionar el DistinguishedName (DN).</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
              Modo Árbol Táctico 2026
            </span>
          </div>

          <!-- Contenedor del Diagrama Visual de Nodos -->
          <div class="p-6 bg-[#070A12] border border-white/10 rounded-2xl relative overflow-x-auto custom-scrollbar min-h-[380px] flex flex-col justify-center">
            
            <!-- NODO RAÍZ (DOMINIO) -->
            <div class="flex justify-center mb-8">
              <div 
                @click="selectNode('Dominio ren.local', 'DC=ren,DC=local', 450)"
                class="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 border border-white/30 text-white font-mono font-bold text-sm shadow-glow-cyan cursor-pointer hover:scale-105 transition-all text-center flex items-center gap-3"
              >
                <span class="w-3 h-3 rounded-full bg-white animate-ping"></span>
                🌳 REN Corporativo (DC=ren,DC=local)
                <span class="px-2 py-0.5 rounded-full bg-black/40 text-xs">450 Objetos</span>
              </div>
            </div>

            <!-- Líneas de Conexión Nodos Nivel 1 -->
            <div class="w-full flex justify-around border-t-2 border-dashed border-cyan-500/30 pt-8 relative">
              
              <!-- RAMA SEDE BOGOTÁ -->
              <div class="flex flex-col items-center space-y-4 max-w-xs">
                <div 
                  @click="selectNode('OU=Sede Bogota', 'OU=Sede Bogota,OU=REN Corporativo,DC=ren,DC=local', 280)"
                  class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"
                >
                  <span class="font-bold text-neon-cyan block">📍 Sede Bogotá</span>
                  <span class="text-[10px] text-slate-400 block font-mono">OU=Sede Bogota</span>
                  <span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">280 Objetos</span>
                </div>

                <!-- Hijos Bogotá -->
                <div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20">
                  <div 
                    @click="inspectDeviceFromNode('BOG-TI-SERVER-01')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>💻 TI (24 Users / 32 PCs)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>

                  <div 
                    @click="inspectDeviceFromNode('BOG-FIN-PC-12')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>📈 Finanzas (45 Users / 50 PCs)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>

                  <div 
                    @click="inspectDeviceFromNode('BOG-RRHH-PC-05')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>👥 RRHH (18 Users / 20 PCs)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>
                </div>
              </div>

              <!-- RAMA SEDE MEDELLÍN -->
              <div class="flex flex-col items-center space-y-4 max-w-xs">
                <div 
                  @click="selectNode('OU=Sede Medellin', 'OU=Sede Medellin,OU=REN Corporativo,DC=ren,DC=local', 120)"
                  class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"
                >
                  <span class="font-bold text-neon-cyan block">📍 Sede Medellín</span>
                  <span class="text-[10px] text-slate-400 block font-mono">OU=Sede Medellin</span>
                  <span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">120 Objetos</span>
                </div>

                <!-- Hijos Medellín -->
                <div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20">
                  <div 
                    @click="inspectDeviceFromNode('MED-OPS-LAPTOP-01')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>📦 Operaciones (65 Users / 70 PCs)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>
                </div>
              </div>

              <!-- RAMA DISPOSITIVOS Y EQUIPOS -->
              <div class="flex flex-col items-center space-y-4 max-w-xs">
                <div 
                  @click="selectNode('OU=Dispositivos', 'OU=Dispositivos,OU=REN Corporativo,DC=ren,DC=local', 180)"
                  class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"
                >
                  <span class="font-bold text-neon-cyan block">🖥️ Dispositivos Flota</span>
                  <span class="text-[10px] text-slate-400 block font-mono">OU=Dispositivos</span>
                  <span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">180 Equipos</span>
                </div>

                <div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20">
                  <div 
                    @click="inspectDeviceFromNode('WORKSTATION-MAIN-01')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>💻 Workstations (145 Equipos)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>

                  <div 
                    @click="inspectDeviceFromNode('SERVER-MAIN-01')"
                    class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"
                  >
                    <span>🖥️ Servidores (25 Equipos)</span>
                    <span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ficha de Inspección del Nodo Seleccionado -->
          <div v-if="selectedNode" class="p-4 rounded-2xl bg-slate-900/90 border border-neon-cyan/40 text-xs font-mono space-y-2 shadow-glow-cyan">
            <div class="flex justify-between items-center text-neon-cyan font-bold">
              <span>NODO SELECCIONADO: {{ selectedNode.nodeName }}</span>
              <span>{{ selectedNode.count }} Objetos</span>
            </div>
            <p class="text-slate-400">DistinguishedName: <code class="text-white">{{ selectedNode.dn }}</code></p>
          </div>
        </div>
      </div>

      <!-- 2. PESTAÑA POLÍTICAS GPOs -->
      <div v-if="activeTab === 'gpos'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="gpo in adData.gpos" 
            :key="gpo.id"
            class="bento-card p-5 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div class="flex justify-between items-start gap-2">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                    {{ gpo.category }}
                  </span>
                  <h3 class="font-bold text-white text-base mt-2 font-mono">{{ gpo.name }}</h3>
                </div>
                <span 
                  :class="gpo.status === 'Enforced' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30'"
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0"
                >
                  {{ gpo.status }}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-2 font-mono">{{ gpo.description }}</p>

              <div class="mt-3 p-3 rounded-xl bg-[#080C14] border border-white/10 text-xs font-mono">
                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ámbito: {{ gpo.scope }}</div>
                
                <div v-if="gpo.settings.drives" class="space-y-1 mt-2 text-neon-cyan">
                  <div v-for="drive in gpo.settings.drives" :key="drive.letter">
                    📂 Mapeo {{ drive.letter }} ➔ {{ drive.path }} ({{ drive.label }})
                  </div>
                </div>

                <div v-else-if="gpo.settings.passwordMinLength" class="space-y-1 text-slate-300">
                  <div>🔒 Mín. Contraseña: {{ gpo.settings.passwordMinLength }} Caracteres</div>
                  <div>🛡️ LAPS Activado: {{ gpo.settings.lapsEnabled ? 'Sí (Local Admin Pass)' : 'No' }}</div>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center pt-2 border-t border-white/10 text-xs font-mono">
              <span class="text-slate-500 text-[10px]">ID: {{ gpo.id }}</span>
              <button class="text-neon-cyan font-bold hover:underline">Editar Reglas ➔</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. PESTAÑA SERVICIOS DNS / DHCP -->
      <div v-if="activeTab === 'network'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bento-card p-6 space-y-4">
            <h3 class="font-bold text-white text-base font-mono">DNS Interno Active Directory</h3>
            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono space-y-1">
              <div class="text-slate-400">Servidor Principal: <span class="text-neon-cyan font-bold">{{ adData.networkServices.dns.primaryServer }}</span></div>
              <div class="text-slate-400">Latencia Consulta: <span class="text-emerald-400 font-bold">{{ adData.networkServices.dns.queryResponseTimeMs }} ms</span></div>
            </div>
          </div>

          <div class="bento-card p-6 space-y-4">
            <h3 class="font-bold text-white text-base font-mono">DHCP Centralizado & Leases</h3>
            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono space-y-1">
              <div class="text-slate-400">Modo Failover: <span class="text-neon-cyan font-bold">50/50 High Availability</span></div>
              <div class="text-slate-400">Concesiones Activas: <span class="text-emerald-400 font-bold">134 IPs Asignadas</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. PESTAÑA ESQUEMA RBAC -->
      <div v-if="activeTab === 'rbac'" class="space-y-6">
        <div class="bento-card p-6">
          <h2 class="text-lg font-bold text-white font-mono mb-4">Esquema de Permisos Delegados RBAC</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="role in adData.rbacScheme.roles" :key="role.id" class="p-4 rounded-xl bg-slate-900/60 border border-white/10 font-mono text-xs space-y-2">
              <span class="text-neon-cyan font-bold block">{{ role.name }}</span>
              <p class="text-slate-400 text-[11px]">{{ role.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
