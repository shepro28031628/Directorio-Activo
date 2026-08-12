import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrLooseContain } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
    const policies = ref([
      { id: "encryption", name: "Cifrado de Disco (BitLocker / FileVault)", desc: "Exige el cifrado de datos en reposo para todas las unidades de almacenamiento principal.", enabled: true, level: "Crítico" },
      { id: "firewall", name: "Cortafuegos del Sistema (Firewall)", desc: "Fuerza la activación del firewall local para bloquear tráfico de red no autorizado.", enabled: true, level: "Crítico" },
      { id: "password", name: "Complejidad de Contraseña", desc: "Fuerza reglas estrictas para el inicio de sesión del sistema operativo (mínimo 10 caracteres, caracteres especiales y números).", enabled: true, level: "Alto" },
      { id: "usb_block", name: "Bloqueo de Puertos USB de Almacenamiento", desc: "Inhabilita la lectura y escritura en unidades de almacenamiento USB externas para prevenir fugas de información corporativa.", enabled: false, level: "Medio" },
      { id: "camera_block", name: "Bloqueo de Cámara y Micrófono", desc: "Restringe el acceso de aplicaciones a la cámara web y micrófono en estaciones críticas de trabajo.", enabled: false, level: "Medio" },
      { id: "rdp_block", name: "Deshabilitar Escritorio Remoto (RDP)", desc: "Bloquea conexiones entrantes de RDP/VNC externas no autorizadas en las estaciones.", enabled: true, level: "Alto" }
    ]);
    const isDeploying = ref(false);
    const showNotification = ref(false);
    const notificationMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-4xl" }, _attrs))} data-v-6f2d0af2>`);
      if (showNotification.value) {
        _push(`<div class="fixed top-20 right-6 z-50 bg-emerald-600 text-white py-3 px-6 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-3 max-w-md animate-slide-up" data-v-6f2d0af2><span class="p-1 bg-white/20 rounded-lg" data-v-6f2d0af2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6f2d0af2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6f2d0af2></path></svg></span><div class="text-xs font-bold" data-v-6f2d0af2>${ssrInterpolate(notificationMsg.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between items-center" data-v-6f2d0af2><div data-v-6f2d0af2><h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-sans" data-v-6f2d0af2> Políticas de Seguridad y Perfiles <span class="text-brand-purple" data-v-6f2d0af2>MDM</span></h1><p class="text-slate-500 text-sm mt-1" data-v-6f2d0af2>Configura restricciones globales, estándares de cumplimiento y seguridad remota de la organización.</p></div><button${ssrIncludeBooleanAttr(isDeploying.value) ? " disabled" : ""} class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm disabled:opacity-50" data-v-6f2d0af2>`);
      if (isDeploying.value) {
        _push(`<svg class="w-4.5 h-4.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6f2d0af2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-6f2d0af2></path></svg>`);
      } else {
        _push(`<svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6f2d0af2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-11.394 6l1.99 1.99a1 1 0 001.414 0l7.99-7.99m-18 12h18" data-v-6f2d0af2></path></svg>`);
      }
      _push(` ${ssrInterpolate(isDeploying.value ? "Propagando..." : "Aplicar Políticas")}</button></div><div class="glass-card p-5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-none shadow-md shadow-violet-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-v-6f2d0af2><div class="space-y-1" data-v-6f2d0af2><h3 class="font-extrabold text-md" data-v-6f2d0af2>Agente Directorio Activo Ren Daemon</h3><p class="text-xs text-indigo-100" data-v-6f2d0af2>Las políticas aplicadas son descargadas por el agente de seguridad en Windows y macOS en intervalos de 10 segundos o forzadas vía WebSocket en tiempo real (&lt;500ms).</p></div><div class="flex gap-4 text-center shrink-0" data-v-6f2d0af2><div data-v-6f2d0af2><span class="block text-2xl font-black" data-v-6f2d0af2>4 / 6</span><span class="text-[9px] uppercase tracking-wider text-indigo-200" data-v-6f2d0af2>Activas</span></div><div class="border-l border-white/20 pl-4" data-v-6f2d0af2><span class="block text-2xl font-black" data-v-6f2d0af2>92%</span><span class="text-[9px] uppercase tracking-wider text-indigo-200" data-v-6f2d0af2>Compliance</span></div></div></div><div class="space-y-4" data-v-6f2d0af2><!--[-->`);
      ssrRenderList(policies.value, (policy) => {
        _push(`<div class="bg-white p-5 rounded-2xl border border-brand-border shadow-sm hover:border-slate-300 transition flex items-center justify-between gap-6" data-v-6f2d0af2><div class="space-y-1.5" data-v-6f2d0af2><div class="flex items-center gap-2" data-v-6f2d0af2><h3 class="font-extrabold text-slate-800 text-sm" data-v-6f2d0af2>${ssrInterpolate(policy.name)}</h3><span class="${ssrRenderClass([{
          "bg-red-50 text-red-600 border border-red-200": policy.level === "Crítico",
          "bg-amber-50 text-amber-600 border border-amber-200": policy.level === "Alto",
          "bg-blue-50 text-brand-blue border border-blue-200": policy.level === "Medio"
        }, "px-2 py-0.5 rounded text-[8px] font-bold"])}" data-v-6f2d0af2>${ssrInterpolate(policy.level)}</span></div><p class="text-xs text-slate-500 leading-relaxed max-w-2xl" data-v-6f2d0af2>${ssrInterpolate(policy.desc)}</p></div><label class="relative inline-flex items-center cursor-pointer select-none" data-v-6f2d0af2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(policy.enabled) ? ssrLooseContain(policy.enabled, null) : policy.enabled) ? " checked" : ""} class="sr-only peer" data-v-6f2d0af2><div class="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-violet-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple" data-v-6f2d0af2></div></label></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f2d0af2"]]);
export {
  index as default
};
//# sourceMappingURL=index-BJ242Bup.js.map
