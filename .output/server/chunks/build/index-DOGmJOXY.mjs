import { u as useFetch, _ as __nuxt_component_0 } from './fetch-TGT10OSe.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import '@vue/shared';
import './server.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const { data: auditorias } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/auditorias",
      "$BTafYFpz82"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Bit\xE1cora de Auditor\xEDa Forense</h1><p class="text-slate-500">Historial completo de acciones administrativas, suspensiones y elevaci\xF3n de seguridad.</p></div><div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden"><table class="w-full text-left border-collapse text-sm"><thead><tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold"><th class="p-4 text-xs uppercase tracking-wider">Fecha / Hora</th><th class="p-4 text-xs uppercase tracking-wider">Acci\xF3n Ejecutada</th><th class="p-4 text-xs uppercase tracking-wider">Detalles de la Acci\xF3n</th><th class="p-4 text-xs uppercase tracking-wider">Usuario Auditor</th><th class="p-4 text-xs uppercase tracking-wider">Direcci\xF3n IP Origen</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
      ssrRenderList(unref(auditorias), (log) => {
        _push(`<tr class="hover:bg-slate-50/50"><td class="p-4 text-xs text-slate-400 font-mono font-medium">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</td><td class="p-4"><span class="${ssrRenderClass([log.accion.includes("Desvinculaci\xF3n") ? "bg-red-50 text-red-700 border border-red-100" : "bg-violet-50 text-brand-purple border border-violet-100", "px-2.5 py-0.5 rounded-lg text-xs font-bold"])}">${ssrInterpolate(log.accion)}</span></td><td class="p-4 text-slate-600 font-medium leading-relaxed max-w-lg">${ssrInterpolate(log.detalles)}</td><td class="p-4 text-slate-700 font-semibold">${ssrInterpolate(log.usuario_auditor)}</td><td class="p-4 font-mono text-xs text-slate-400">${ssrInterpolate(log.ip_origen || "N/A")}</td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (((_a = unref(auditorias)) == null ? void 0 : _a.length) === 0) {
        _push(`<div class="text-center py-12 text-slate-400 text-sm"> No se han registrado auditor\xEDas en la bit\xE1cora. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auditorias/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DOGmJOXY.mjs.map
