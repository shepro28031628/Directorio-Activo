import { _ as __nuxt_component_0 } from './SciFiInspector-DCguDYyV.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CQE0urBr.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useFetch, a as useRequestEvent } from './fetch-Cqko2rmb.mjs';
import { G as getRequestURL } from '../_/nitro.mjs';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'socket.io';
import 'nitropack/dist/runtime/plugin';
import 'node:url';
import '@vue/shared';

function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/dashboard/stats",
      "$UKNnROfR5n"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const activeHoverLocation = ref(null);
    const copiedToken = ref(false);
    const copiedCommand = ref(false);
    const isInspectorOpen = ref(false);
    const selectedDeviceForInspector = ref(null);
    const requestUrl = useRequestURL();
    const currentOrigin = computed(() => (requestUrl == null ? void 0 : requestUrl.origin) || "http://localhost:3000");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SciFiInspector = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 sm:space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SciFiInspector, {
        "is-open": isInspectorOpen.value,
        device: selectedDeviceForInspector.value,
        onClose: ($event) => isInspectorOpen.value = false
      }, null, _parent));
      _push(`<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5"><div><div class="flex items-center gap-3"><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"> Consola Bento Grid <span class="gradient-text-cyan">Midnight Security</span></h1><span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 uppercase tracking-widest hidden md:inline-block shadow-glow-cyan"> Vibe-Coding UX 2026 </span></div><p class="text-slate-400 text-xs sm:text-sm mt-1"> Panel modular interactivo con telemetr\xEDa en tiempo real, mapa vectorial y control t\xE1ctico de la flota. </p></div><button class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-glow-cyan flex items-center gap-2 text-xs sm:text-sm shrink-0 active:scale-95 font-mono"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Sincronizar Flota </button></div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 animate-pulse"><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="h-32 bg-slate-900/60 rounded-bento border border-white/10"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(data)) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5"><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 cursor-pointer group"><div class="flex justify-between items-start text-slate-400"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Total Enrolados</span><span class="p-2 bg-cyan-500/10 text-neon-cyan rounded-xl border border-cyan-500/20 group-hover:shadow-glow-cyan transition-all"><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold text-white font-mono">${ssrInterpolate(unref(data).kpis.totalDevices)}</p><p class="text-[11px] text-slate-400 font-mono mt-0.5">Dispositivos en flota \u2794</p></div></div><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border-neon-cyan/40 shadow-glow-cyan cursor-pointer"><div class="flex justify-between items-start text-slate-400"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">En L\xEDnea</span><span class="p-2 bg-neon-cyan/10 text-neon-cyan rounded-xl relative border border-neon-cyan/30"><span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-cyan animate-ping"></span><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold text-neon-cyan font-mono">${ssrInterpolate(unref(data).kpis.devicesOnline)}</p><p class="text-[11px] text-neon-cyan/80 font-mono mt-0.5">Transmitiendo ping \u2794</p></div></div><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"><div class="flex justify-between items-start text-slate-400"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Fuera de L\xEDnea</span><span class="p-2 bg-slate-500/10 text-slate-400 rounded-xl border border-white/10"><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M21 3L3 21M3 3l3.536 3.536M9.172 9.172a4 4 0 015.656 5.656"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold text-slate-400 font-mono">${ssrInterpolate(unref(data).kpis.devicesOffline)}</p><p class="text-[11px] text-slate-400 font-mono mt-0.5">Sin conexi\xF3n reciente</p></div></div><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border-neon-coral/40 shadow-glow-coral"><div class="flex justify-between items-start text-slate-400"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neon-coral">Bloqueados</span><span class="p-2 bg-neon-coral/10 text-neon-coral rounded-xl border border-neon-coral/30"><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold text-neon-coral font-mono">${ssrInterpolate(unref(data).kpis.blockedDevices)}</p><p class="text-[11px] text-neon-coral/80 font-mono mt-0.5">En cuarentena / Baja</p></div></div><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"><div class="flex justify-between items-start text-slate-400"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Cumplimiento</span><span class="p-2 bg-neon-purple/10 text-neon-purple rounded-xl border border-neon-purple/30"><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold text-neon-purple font-mono">${ssrInterpolate(unref(data).kpis.complianceRate)}%</p><p class="text-[11px] text-neon-purple/80 font-mono mt-0.5">Dispositivos conformes</p></div></div><div class="bento-card p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-rose-600 to-amber-600 text-white border-none shadow-glow-coral"><div class="flex justify-between items-start text-rose-100"><span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">Alertas Activas</span><span class="p-2 bg-white/20 text-white rounded-xl relative"><span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-ping"></span><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></span></div><div class="mt-3"><p class="text-2xl sm:text-3xl font-extrabold font-mono">${ssrInterpolate(unref(data).kpis.activeAlerts)}</p><p class="text-[10px] text-rose-100 font-mono mt-0.5">Requiere atenci\xF3n TI</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="bento-card p-5 sm:p-6 lg:col-span-2 flex flex-col justify-between min-h-[420px] relative overflow-hidden"><div class="flex justify-between items-start"><div><h2 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-mono"><span class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping"></span> Mapa Vectorial de la Flota (Colombia) </h2><p class="text-xs text-slate-400 mt-1">Ubicaci\xF3n y estado de agentes transmitiendo telemetr\xEDa.</p></div><div class="hidden sm:flex items-center gap-3 text-[10px] font-mono"><span class="flex items-center gap-1 text-neon-cyan"><span class="w-2 h-2 rounded-full bg-neon-cyan"></span> Bogot\xE1 / Medell\xEDn</span><span class="flex items-center gap-1 text-slate-400"><span class="w-2 h-2 rounded-full bg-slate-400"></span> Cali</span></div></div><div class="flex-grow my-4 relative bg-[#090D14] border border-white/10 rounded-2xl min-h-[280px] flex items-center justify-center overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,242,255,0.15),rgba(0,0,0,0))]"></div><svg class="w-56 h-72 sm:w-64 sm:h-80 text-slate-800 opacity-80 pointer-events-none" viewBox="0 0 100 120" fill="currentColor"><path d="M 50,5 C 53,8 54,12 55,16 C 58,18 62,17 65,19 C 68,22 66,28 69,32 C 73,35 78,33 81,37 C 84,41 82,46 80,51 C 77,54 75,58 72,61 C 67,65 63,68 60,72 C 58,76 59,82 58,87 C 56,92 53,96 50,100 C 47,105 45,110 42,115 C 39,114 36,112 34,109 C 32,106 31,102 32,98 C 33,93 35,89 36,84 C 36,80 34,76 33,72 C 31,69 29,66 28,63 C 27,58 28,52 26,47 C 23,44 20,42 18,39 C 21,37 24,38 27,36 C 30,32 33,28 36,24 C 39,21 42,17 44,13 C 46,9 47,6 50,5 Z"></path></svg><div class="absolute top-[52%] left-[49%] group cursor-pointer"><span class="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-neon-cyan/40 animate-ping"></span><div class="w-3.5 h-3.5 rounded-full bg-neon-cyan border border-white shadow-glow-cyan"></div></div><div class="absolute top-[40%] left-[38%] group cursor-pointer"><span class="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-neon-cyan/40 animate-ping"></span><div class="w-3.5 h-3.5 rounded-full bg-neon-cyan border border-white shadow-glow-cyan"></div></div><div class="absolute top-[62%] left-[32%] group cursor-pointer"><span class="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-slate-400/40 animate-ping"></span><div class="w-3.5 h-3.5 rounded-full bg-slate-400 border border-white shadow-md"></div></div>`);
        if (activeHoverLocation.value) {
          _push(`<div class="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0F172A]/90 text-white p-3 rounded-xl border border-neon-cyan/40 text-xs shadow-glow-cyan backdrop-blur-md animate-fade-in font-mono"><p class="font-bold text-neon-cyan">${ssrInterpolate(activeHoverLocation.value.ciudad)}</p><p class="text-[11px] text-slate-300">${ssrInterpolate(activeHoverLocation.value.dispositivosCount)} agentes conectados (Haz clic para inspeccionar Ficha Sci-Fi)</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bento-card p-5 sm:p-6 flex flex-col justify-between space-y-4"><div><div class="flex items-center justify-between"><h2 class="text-base sm:text-lg font-bold text-white font-mono">Actividad en Tiempo Real</h2><span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span></div><p class="text-xs text-slate-400 mt-1">Pings y logs de inicio de sesi\xF3n con resplandor ne\xF3n.</p></div><div class="space-y-3 flex-grow my-2"><!--[-->`);
        ssrRenderList(unref(data).commandQueue, (cmd) => {
          _push(`<div class="p-3 rounded-xl border border-white/10 bg-slate-900/60 hover:border-neon-cyan/40 text-xs space-y-1 transition-all cursor-pointer group"><div class="flex justify-between items-center"><span class="font-bold text-white font-mono group-hover:text-neon-cyan transition-colors">${ssrInterpolate(cmd.comando)}</span><span class="${ssrRenderClass([cmd.estado === "Completado" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" : "text-amber-400 bg-amber-400/10 border-amber-400/30", "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"])}">${ssrInterpolate(cmd.estado)}</span></div><p class="text-slate-400 text-[10px] font-mono">Agente: ${ssrInterpolate(cmd.equipo)} \u2022 WebSocket Stream</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full text-xs font-bold font-mono text-neon-cyan hover:underline flex items-center justify-between pt-2 border-t border-white/10"><span>Ficha T\xE9cnica Sci-Fi Inspector \u2794</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="bento-card p-5 sm:p-6 lg:col-span-2 border-l-4 border-l-neon-cyan"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"><div><h2 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-mono"> \u26A1 Despliegue R\xE1pido de Agente MDM v2.0 </h2><p class="text-xs text-slate-400 mt-1">Copia y ejecuta en PowerShell como Administrador en Windows.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/enrolamiento",
        class: "text-xs font-mono text-neon-cyan hover:underline shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tokens de Enrolamiento \u2794 `);
          } else {
            return [
              createTextVNode(" Tokens de Enrolamiento \u2794 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="bento-card p-3.5 flex flex-col justify-between border-white/10"><span class="text-[10px] font-mono font-bold text-slate-400 uppercase">Token Activo</span><div class="flex justify-between items-center mt-2"><span class="font-mono text-xs font-bold text-neon-cyan">token-SR-6753</span><button class="text-[10px] text-slate-400 hover:text-neon-cyan">${ssrInterpolate(copiedToken.value ? "\u2713 Copiado" : "Copiar")}</button></div></div><div class="sm:col-span-2 bg-[#080C14] text-slate-100 p-3.5 rounded-xl border border-white/10 relative group"><span class="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">PowerShell One-Liner (Administrador)</span><code class="font-mono text-[11px] block break-all text-neon-cyan select-all pr-8 custom-scrollbar"> powershell -ExecutionPolicy Bypass -Command &quot;iwr -useb ${ssrInterpolate(currentOrigin.value)}/agent/install.ps1 | iex; Enroll-Device -Token &#39;token-SR-6753&#39;&quot; </code><button class="absolute top-3 right-3 text-slate-400 hover:text-white">${ssrInterpolate(copiedCommand.value ? "\u2713" : "\u{1F4CB}")}</button></div></div></div><div class="bento-card p-5 sm:p-6 space-y-4"><h2 class="text-base sm:text-lg font-bold text-white font-mono">GPOs &amp; Hardening 3D</h2><div class="space-y-3 font-mono text-xs"><div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"><div class="flex items-center gap-2.5"><span class="text-lg">\u{1F6E1}\uFE0F</span><div><span class="font-bold text-white block text-xs">Baseline CIS 2026</span><span class="text-[10px] text-slate-400">Hardening &amp; Passwords</span></div></div><span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">Enforced</span></div><div class="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"><div class="flex items-center gap-2.5"><span class="text-lg">\u{1F4C2}</span><div><span class="font-bold text-white block text-xs">Mapeo Red Z:\\ &amp; Y:\\</span><span class="text-[10px] text-slate-400">OU=TI, OU=Finanzas</span></div></div><span class="px-2 py-0.5 rounded-full text-[10px] bg-neon-cyan/10 text-neon-cyan font-bold border border-neon-cyan/30">Activa</span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CVVRQBlC.mjs.map
