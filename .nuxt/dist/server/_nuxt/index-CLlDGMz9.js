import { _ as __nuxt_component_0 } from "./SciFiInspector-DCguDYyV.js";
import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "../server.mjs";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/hookable/dist/index.mjs";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/unctx/dist/index.mjs";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/defu/dist/defu.mjs";
import "D:/Documents/GitHub/Directorio-Activo/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("ous");
    const isLoading = ref(true);
    const adData = ref(null);
    const selectedNode = ref(null);
    const isInspectorOpen = ref(false);
    const selectedDeviceForInspector = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SciFiInspector = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 sm:space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SciFiInspector, {
        "is-open": isInspectorOpen.value,
        device: selectedDeviceForInspector.value,
        onClose: ($event) => isInspectorOpen.value = false
      }, null, _parent));
      _push(`<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/10 pb-5"><div><div class="flex flex-wrap items-center gap-3"><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"> Active Directory <span class="gradient-text-cyan">Nodos &amp; Servicios</span></h1><span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 flex items-center gap-1.5 shadow-glow-cyan"><span class="w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span> Bosque Active Directory (renova.local) </span></div><p class="text-slate-400 text-xs sm:text-sm mt-1"> Visualización de mapa de nodos interactivo para OUs, GPOs en 3D, Servicios DNS/DHCP y Matriz RBAC. </p></div>`);
      if (adData.value) {
        _push(`<div class="flex flex-wrap gap-2 w-full lg:w-auto"><!--[-->`);
        ssrRenderList(adData.value.domain.domainControllers, (dc) => {
          _push(`<div class="bento-card px-3.5 py-2 flex items-center gap-2.5 text-xs font-mono border-white/10 flex-1 sm:flex-none"><div class="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-glow-cyan"></div><div><div class="font-bold text-white">${ssrInterpolate(dc.name.split(".")[0])}</div><div class="text-[10px] text-slate-400 font-mono">${ssrInterpolate(dc.ip)} • ${ssrInterpolate(dc.latencyMs)}ms</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto custom-scrollbar"><button class="${ssrRenderClass([activeTab.value === "ous" ? "border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan" : "border-transparent text-slate-400 hover:text-white font-medium", "px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg> 1. Visualizador de Nodos OUs </button><button class="${ssrRenderClass([activeTab.value === "gpos" ? "border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan" : "border-transparent text-slate-400 hover:text-white font-medium", "px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> 2. Políticas GPOs </button><button class="${ssrRenderClass([activeTab.value === "network" ? "border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan" : "border-transparent text-slate-400 hover:text-white font-medium", "px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"></path></svg> 3. Servicios DNS / DHCP </button><button class="${ssrRenderClass([activeTab.value === "rbac" ? "border-neon-cyan text-neon-cyan font-bold bg-neon-cyan/10 shadow-glow-cyan" : "border-transparent text-slate-400 hover:text-white font-medium", "px-4 py-2.5 rounded-xl border-b-2 text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 font-mono"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> 4. Esquema RBAC Delegado </button></div>`);
      if (isLoading.value) {
        _push(`<div class="p-12 text-center"><div class="inline-block w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div><p class="text-xs font-mono text-slate-400 mt-2">Cargando mapa de nodos Active Directory...</p></div>`);
      } else if (adData.value) {
        _push(`<div>`);
        if (activeTab.value === "ous") {
          _push(`<div class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="bento-card p-5"><span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Total Objetos AD</span><span class="text-3xl font-extrabold text-white font-mono mt-1 block">450 Objetos</span><span class="text-xs text-neon-cyan font-mono flex items-center gap-1 mt-1"> ✓ Bosque renova.local Sincronizado </span></div><div class="bento-card p-5"><span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Dispositivos Conectados</span><span class="text-3xl font-extrabold text-neon-emerald font-mono mt-1 block">180 Equipos</span><span class="text-xs text-slate-400 font-mono block mt-1"> 145 Workstations • 25 Servidores • 10 Kioskos </span></div><div class="bento-card p-5"><span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Nivel Funcional</span><span class="text-3xl font-extrabold text-neon-purple font-mono mt-1 block">Win Server 2022</span><span class="text-xs text-slate-400 font-mono block mt-1"> Active Directory Domain Services (AD DS) </span></div></div><div class="bento-card p-5 sm:p-6 space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><div><h2 class="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2"><span>🌐</span> Mapa Interactivo de Nodos de Unidades Organizativas (OUs) </h2><p class="text-xs text-slate-400 mt-0.5">Haz clic en cualquier nodo para expandir la ficha Sci-Fi Inspector o inspeccionar el DistinguishedName (DN).</p></div><span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"> Modo Árbol Táctico 2026 </span></div><div class="p-6 bg-[#070A12] border border-white/10 rounded-2xl relative overflow-x-auto custom-scrollbar min-h-[380px] flex flex-col justify-center"><div class="flex justify-center mb-8"><div class="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 border border-white/30 text-white font-mono font-bold text-sm shadow-glow-cyan cursor-pointer hover:scale-105 transition-all text-center flex items-center gap-3"><span class="w-3 h-3 rounded-full bg-white animate-ping"></span> 🌳 REN Corporativo (DC=ren,DC=local) <span class="px-2 py-0.5 rounded-full bg-black/40 text-xs">450 Objetos</span></div></div><div class="w-full flex justify-around border-t-2 border-dashed border-cyan-500/30 pt-8 relative"><div class="flex flex-col items-center space-y-4 max-w-xs"><div class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"><span class="font-bold text-neon-cyan block">📍 Sede Bogotá</span><span class="text-[10px] text-slate-400 block font-mono">OU=Sede Bogota</span><span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">280 Objetos</span></div><div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20"><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>💻 TI (24 Users / 32 PCs)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>📈 Finanzas (45 Users / 50 PCs)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>👥 RRHH (18 Users / 20 PCs)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div></div></div><div class="flex flex-col items-center space-y-4 max-w-xs"><div class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"><span class="font-bold text-neon-cyan block">📍 Sede Medellín</span><span class="text-[10px] text-slate-400 block font-mono">OU=Sede Medellin</span><span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">120 Objetos</span></div><div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20"><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>📦 Operaciones (65 Users / 70 PCs)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div></div></div><div class="flex flex-col items-center space-y-4 max-w-xs"><div class="p-4 rounded-2xl bg-slate-900 border border-neon-cyan/40 hover:border-neon-cyan text-white font-mono text-xs shadow-glow-cyan cursor-pointer transition-all text-center space-y-1"><span class="font-bold text-neon-cyan block">🖥️ Dispositivos Flota</span><span class="text-[10px] text-slate-400 block font-mono">OU=Dispositivos</span><span class="inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold mt-1">180 Equipos</span></div><div class="space-y-2 w-full pl-4 border-l-2 border-cyan-500/20"><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>💻 Workstations (145 Equipos)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div><div class="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-neon-cyan/50 text-[11px] font-mono text-slate-300 cursor-pointer flex justify-between items-center group"><span>🖥️ Servidores (25 Equipos)</span><span class="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">HUD ➔</span></div></div></div></div></div>`);
          if (selectedNode.value) {
            _push(`<div class="p-4 rounded-2xl bg-slate-900/90 border border-neon-cyan/40 text-xs font-mono space-y-2 shadow-glow-cyan"><div class="flex justify-between items-center text-neon-cyan font-bold"><span>NODO SELECCIONADO: ${ssrInterpolate(selectedNode.value.nodeName)}</span><span>${ssrInterpolate(selectedNode.value.count)} Objetos</span></div><p class="text-slate-400">DistinguishedName: <code class="text-white">${ssrInterpolate(selectedNode.value.dn)}</code></p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "gpos") {
          _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          ssrRenderList(adData.value.gpos, (gpo) => {
            _push(`<div class="bento-card p-5 space-y-3 flex flex-col justify-between"><div><div class="flex justify-between items-start gap-2"><div><span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">${ssrInterpolate(gpo.category)}</span><h3 class="font-bold text-white text-base mt-2 font-mono">${ssrInterpolate(gpo.name)}</h3></div><span class="${ssrRenderClass([gpo.status === "Enforced" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30", "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0"])}">${ssrInterpolate(gpo.status)}</span></div><p class="text-xs text-slate-400 mt-2 font-mono">${ssrInterpolate(gpo.description)}</p><div class="mt-3 p-3 rounded-xl bg-[#080C14] border border-white/10 text-xs font-mono"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ámbito: ${ssrInterpolate(gpo.scope)}</div>`);
            if (gpo.settings.drives) {
              _push(`<div class="space-y-1 mt-2 text-neon-cyan"><!--[-->`);
              ssrRenderList(gpo.settings.drives, (drive) => {
                _push(`<div> 📂 Mapeo ${ssrInterpolate(drive.letter)} ➔ ${ssrInterpolate(drive.path)} (${ssrInterpolate(drive.label)}) </div>`);
              });
              _push(`<!--]--></div>`);
            } else if (gpo.settings.passwordMinLength) {
              _push(`<div class="space-y-1 text-slate-300"><div>🔒 Mín. Contraseña: ${ssrInterpolate(gpo.settings.passwordMinLength)} Caracteres</div><div>🛡️ LAPS Activado: ${ssrInterpolate(gpo.settings.lapsEnabled ? "Sí (Local Admin Pass)" : "No")}</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="flex justify-between items-center pt-2 border-t border-white/10 text-xs font-mono"><span class="text-slate-500 text-[10px]">ID: ${ssrInterpolate(gpo.id)}</span><button class="text-neon-cyan font-bold hover:underline">Editar Reglas ➔</button></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "network") {
          _push(`<div class="space-y-6"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bento-card p-6 space-y-4"><h3 class="font-bold text-white text-base font-mono">DNS Interno Active Directory</h3><div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono space-y-1"><div class="text-slate-400">Servidor Principal: <span class="text-neon-cyan font-bold">${ssrInterpolate(adData.value.networkServices.dns.primaryServer)}</span></div><div class="text-slate-400">Latencia Consulta: <span class="text-emerald-400 font-bold">${ssrInterpolate(adData.value.networkServices.dns.queryResponseTimeMs)} ms</span></div></div></div><div class="bento-card p-6 space-y-4"><h3 class="font-bold text-white text-base font-mono">DHCP Centralizado &amp; Leases</h3><div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono space-y-1"><div class="text-slate-400">Modo Failover: <span class="text-neon-cyan font-bold">50/50 High Availability</span></div><div class="text-slate-400">Concesiones Activas: <span class="text-emerald-400 font-bold">134 IPs Asignadas</span></div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "rbac") {
          _push(`<div class="space-y-6"><div class="bento-card p-6"><h2 class="text-lg font-bold text-white font-mono mb-4">Esquema de Permisos Delegados RBAC</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          ssrRenderList(adData.value.rbacScheme.roles, (role) => {
            _push(`<div class="p-4 rounded-xl bg-slate-900/60 border border-white/10 font-mono text-xs space-y-2"><span class="text-neon-cyan font-bold block">${ssrInterpolate(role.name)}</span><p class="text-slate-400 text-[11px]">${ssrInterpolate(role.description)}</p></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/active-directory/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CLlDGMz9.js.map
