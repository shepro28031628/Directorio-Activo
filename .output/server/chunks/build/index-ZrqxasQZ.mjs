import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrLooseContain } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const policies = ref([
      { id: "encryption", name: "Cifrado de Disco (BitLocker / FileVault)", desc: "Exige el cifrado de datos en reposo para todas las unidades de almacenamiento principal.", enabled: true, level: "Cr\xEDtico" },
      { id: "firewall", name: "Cortafuegos del Sistema (Firewall)", desc: "Fuerza la activaci\xF3n del firewall local para bloquear tr\xE1fico de red no autorizado.", enabled: true, level: "Cr\xEDtico" },
      { id: "password", name: "Complejidad de Contrase\xF1a", desc: "Fuerza reglas estrictas para el inicio de sesi\xF3n del sistema operativo (m\xEDnimo 10 caracteres, caracteres especiales y n\xFAmeros).", enabled: true, level: "Alto" },
      { id: "usb_block", name: "Bloqueo de Puertos USB de Almacenamiento", desc: "Inhabilita la lectura y escritura en unidades de almacenamiento USB externas para prevenir fugas de informaci\xF3n corporativa.", enabled: false, level: "Medio" },
      { id: "camera_block", name: "Bloqueo de C\xE1mara y Micr\xF3fono", desc: "Restringe el acceso de aplicaciones a la c\xE1mara web y micr\xF3fono en estaciones cr\xEDticas de trabajo.", enabled: false, level: "Medio" },
      { id: "rdp_block", name: "Deshabilitar Escritorio Remoto (RDP)", desc: "Bloquea conexiones entrantes de RDP/VNC externas no autorizadas en las estaciones.", enabled: true, level: "Alto" }
    ]);
    const isDeploying = ref(false);
    const showNotification = ref(false);
    const notificationMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-4xl" }, _attrs))} data-v-f10f544d>`);
      if (showNotification.value) {
        _push(`<div class="fixed top-20 right-6 z-50 bg-emerald-600 text-white py-3 px-6 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-3 max-w-md animate-slide-up" data-v-f10f544d><span class="p-1 bg-white/20 rounded-lg" data-v-f10f544d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f10f544d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f10f544d></path></svg></span><div class="text-xs font-bold" data-v-f10f544d>${ssrInterpolate(notificationMsg.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between items-center" data-v-f10f544d><div data-v-f10f544d><h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-sans" data-v-f10f544d> Pol\xEDticas de Seguridad y Perfiles <span class="text-brand-purple" data-v-f10f544d>MDM</span></h1><p class="text-slate-500 text-sm mt-1" data-v-f10f544d>Configura restricciones globales, est\xE1ndares de cumplimiento y seguridad remota de la organizaci\xF3n.</p></div><button${ssrIncludeBooleanAttr(isDeploying.value) ? " disabled" : ""} class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm disabled:opacity-50" data-v-f10f544d>`);
      if (isDeploying.value) {
        _push(`<svg class="w-4.5 h-4.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f10f544d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-f10f544d></path></svg>`);
      } else {
        _push(`<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f10f544d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-11.394 6l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-18 12h18" data-v-f10f544d></path></svg>`);
      }
      _push(` ${ssrInterpolate(isDeploying.value ? "Propagando..." : "Aplicar Pol\xEDticas")}</button></div><div class="glass-card p-5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-none shadow-md shadow-violet-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-v-f10f544d><div class="space-y-1" data-v-f10f544d><h3 class="font-extrabold text-md" data-v-f10f544d>Agente RENOVA MDM Daemon</h3><p class="text-xs text-indigo-100" data-v-f10f544d>Las pol\xEDticas aplicadas son descargadas por el agente de seguridad en Windows y macOS en intervalos de 10 segundos o forzadas v\xEDa WebSocket en tiempo real (&lt;500ms).</p></div><div class="flex gap-4 text-center shrink-0" data-v-f10f544d><div data-v-f10f544d><span class="block text-2xl font-black" data-v-f10f544d>4 / 6</span><span class="text-[9px] uppercase tracking-wider text-indigo-200" data-v-f10f544d>Activas</span></div><div class="border-l border-white/20 pl-4" data-v-f10f544d><span class="block text-2xl font-black" data-v-f10f544d>92%</span><span class="text-[9px] uppercase tracking-wider text-indigo-200" data-v-f10f544d>Compliance</span></div></div></div><div class="space-y-4" data-v-f10f544d><!--[-->`);
      ssrRenderList(policies.value, (policy) => {
        _push(`<div class="bg-white p-5 rounded-2xl border border-brand-border shadow-sm hover:border-slate-300 transition flex items-center justify-between gap-6" data-v-f10f544d><div class="space-y-1.5" data-v-f10f544d><div class="flex items-center gap-2" data-v-f10f544d><h3 class="font-extrabold text-slate-800 text-sm" data-v-f10f544d>${ssrInterpolate(policy.name)}</h3><span class="${ssrRenderClass([{
          "bg-red-50 text-red-600 border border-red-200": policy.level === "Cr\xEDtico",
          "bg-amber-50 text-amber-600 border border-amber-200": policy.level === "Alto",
          "bg-blue-50 text-brand-blue border border-blue-200": policy.level === "Medio"
        }, "px-2 py-0.5 rounded text-[8px] font-bold"])}" data-v-f10f544d>${ssrInterpolate(policy.level)}</span></div><p class="text-xs text-slate-500 leading-relaxed max-w-2xl" data-v-f10f544d>${ssrInterpolate(policy.desc)}</p></div><label class="relative inline-flex items-center cursor-pointer select-none" data-v-f10f544d><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(policy.enabled) ? ssrLooseContain(policy.enabled, null) : policy.enabled) ? " checked" : ""} class="sr-only peer" data-v-f10f544d><div class="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-violet-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple" data-v-f10f544d></div></label></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/politicas/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f10f544d"]]);

export { index as default };
//# sourceMappingURL=index-ZrqxasQZ.mjs.map
