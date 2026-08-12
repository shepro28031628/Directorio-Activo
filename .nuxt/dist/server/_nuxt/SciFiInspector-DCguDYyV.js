import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SciFiInspector",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    device: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const isActionExecuting = ref(false);
    const actionNotification = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen && __props.device) {
          _push2(`<div class="fixed inset-0 z-50 flex justify-end p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md" data-v-d2323281><div class="w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/20 text-white flex flex-col justify-between overflow-y-auto custom-scrollbar relative" data-v-d2323281><div data-v-d2323281><div class="flex justify-between items-start pb-4 border-b border-slate-800" data-v-d2323281><div class="flex items-center gap-3" data-v-d2323281><div class="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold shadow-glow-cyan" data-v-d2323281> HUD </div><div data-v-d2323281><span class="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block" data-v-d2323281>Ficha Técnica Sci-Fi • Agent v2.0</span><h2 class="text-xl font-extrabold text-white font-mono flex items-center gap-2" data-v-d2323281>${ssrInterpolate(__props.device.hostname)} <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" data-v-d2323281></span></h2></div></div><button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" data-v-d2323281> ✕ </button></div>`);
          if (actionNotification.value) {
            _push2(`<div class="mt-4 p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono animate-pulse" data-v-d2323281>${ssrInterpolate(actionNotification.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="grid grid-cols-2 gap-3 mt-5" data-v-d2323281><div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between" data-v-d2323281><span class="text-[10px] font-mono text-slate-400 uppercase" data-v-d2323281>Nivel de Seguridad</span><div class="mt-2 flex items-baseline gap-2" data-v-d2323281><span class="text-3xl font-extrabold text-cyan-400 font-mono" data-v-d2323281>98%</span><span class="text-[10px] text-emerald-400 font-bold" data-v-d2323281>Compliant</span></div><div class="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden" data-v-d2323281><div class="h-full bg-cyan-400 rounded-full" style="${ssrRenderStyle({ "width": "98%" })}" data-v-d2323281></div></div></div><div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between" data-v-d2323281><span class="text-[10px] font-mono text-slate-400 uppercase" data-v-d2323281>BitLocker Storage</span><div class="mt-2 flex items-center gap-2" data-v-d2323281><span class="text-2xl font-extrabold text-emerald-400 font-mono" data-v-d2323281>Cifrado</span><span class="text-emerald-400 text-xs" data-v-d2323281>✓ AES-256</span></div><span class="text-[10px] text-slate-400 font-mono mt-1" data-v-d2323281>LAPS Admin Password OK</span></div></div><div class="mt-5 space-y-3 font-mono text-xs" data-v-d2323281><div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2" data-v-d2323281><div class="flex justify-between text-slate-400" data-v-d2323281><span data-v-d2323281>Sistema Operativo:</span><span class="text-slate-200 font-bold" data-v-d2323281>${ssrInterpolate(__props.device.so || "Windows 11 Pro 23H2")}</span></div><div class="flex justify-between text-slate-400" data-v-d2323281><span data-v-d2323281>Usuario Windows:</span><span class="text-cyan-300 font-bold" data-v-d2323281>${ssrInterpolate(__props.device.windows_user || "REN\\admin.local")}</span></div><div class="flex justify-between text-slate-400" data-v-d2323281><span data-v-d2323281>IP Registro:</span><span class="text-slate-200 font-bold" data-v-d2323281>${ssrInterpolate(__props.device.ip_registro || "192.168.10.145")}</span></div><div class="flex justify-between text-slate-400" data-v-d2323281><span data-v-d2323281>Dirección MAC:</span><span class="text-slate-200" data-v-d2323281>${ssrInterpolate(__props.device.mac_address || "00:1A:2B:3C:4D:5E")}</span></div><div class="flex justify-between text-slate-400" data-v-d2323281><span data-v-d2323281>Serial del Fabricante:</span><span class="text-slate-200" data-v-d2323281>${ssrInterpolate(__props.device.serial || "SN-7849204-RN")}</span></div></div><div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3" data-v-d2323281><div class="flex justify-between items-center" data-v-d2323281><span class="text-slate-400" data-v-d2323281>Uso de Disco (SSD NVMe):</span><span class="text-cyan-400 font-bold" data-v-d2323281>185 GB / 512 GB (36%)</span></div><div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden" data-v-d2323281><div class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style="${ssrRenderStyle({ "width": "36%" })}" data-v-d2323281></div></div><div class="flex justify-between items-center pt-1" data-v-d2323281><span class="text-slate-400" data-v-d2323281>Memoria RAM Instalada:</span><span class="text-violet-400 font-bold" data-v-d2323281>16.0 GB DDR5</span></div></div></div></div><div class="mt-6 pt-4 border-t border-slate-800 space-y-2" data-v-d2323281><span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2" data-v-d2323281>Comandos Tácticos en Tiempo Real</span><div class="grid grid-cols-2 gap-2" data-v-d2323281><button${ssrIncludeBooleanAttr(isActionExecuting.value) ? " disabled" : ""} class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50" data-v-d2323281> ⚡ Ping de Respuesta </button><button${ssrIncludeBooleanAttr(isActionExecuting.value) ? " disabled" : ""} class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50" data-v-d2323281> 🔑 Rotar Clave LAPS </button></div><button${ssrIncludeBooleanAttr(isActionExecuting.value) ? " disabled" : ""} class="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-mono text-xs border border-rose-500/40 transition-all flex items-center justify-center gap-2 shadow-glow-coral disabled:opacity-50" data-v-d2323281> 🚨 Aislamiento de Red Sophos </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SciFiInspector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2323281"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=SciFiInspector-DCguDYyV.js.map
