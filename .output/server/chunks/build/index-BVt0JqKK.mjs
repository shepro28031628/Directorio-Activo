import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useFetch } from './fetch-TGT10OSe.mjs';
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
import '@vue/shared';
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
    const search = ref("");
    const selectedColaborador = ref("");
    const selectedAplicacion = ref("");
    const isSubmitting = ref(false);
    const toast = ref(false);
    const toastMessage = ref("");
    const { data: accesos, refresh: refreshAccesos } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/aplicaciones/accesos",
      {
        query: { search }
      },
      "$M1E09USGF_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: _colabsResult } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/colaboradores",
      {
        query: { limit: 1e4, page: 1 }
      },
      "$Znk_vhVcqs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const colaboradores = computed(() => {
      const raw = _colabsResult.value;
      if (!raw) return [];
      const list = Array.isArray(raw) ? raw : raw.data || [];
      return list.filter((c) => !c.eliminado_en && c.estado !== "Retirado");
    });
    const { data: aplicaciones } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/aplicaciones",
      "$D2WItqmm6T"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    watch(search, () => {
      refreshAccesos();
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const d = new Date(dateStr);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-7af6644b><div class="flex justify-between items-center flex-wrap gap-3" data-v-7af6644b><div data-v-7af6644b><h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans" data-v-7af6644b> Matriz de Accesos <span class="text-brand-purple" data-v-7af6644b>&amp; Aplicaciones</span></h1><p class="text-slate-500 text-sm" data-v-7af6644b>Auditor\xEDa centralizada de permisos y licencias asignadas por colaborador.</p></div><button class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm" data-v-7af6644b><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7af6644b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-7af6644b></path></svg> Actualizar Accesos </button></div><div class="flex flex-col md:flex-row gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" data-v-7af6644b><div class="flex-grow" data-v-7af6644b><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Buscar por colaborador, correo o aplicaci\xF3n..." class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200" data-v-7af6644b></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" data-v-7af6644b><div class="lg:col-span-8 glass-card overflow-hidden" data-v-7af6644b><div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2" data-v-7af6644b><span class="text-xl" data-v-7af6644b>\u{1F511}</span><h2 class="text-base font-extrabold text-brand-purple dark:text-violet-400 font-sans tracking-wide uppercase" data-v-7af6644b> Control de Accesos Activos </h2></div><div class="overflow-x-auto" data-v-7af6644b><table class="w-full text-left border-collapse" data-v-7af6644b><thead data-v-7af6644b><tr class="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider" data-v-7af6644b><th class="px-6 py-3.5" data-v-7af6644b>Colaborador</th><th class="px-6 py-3.5" data-v-7af6644b>Aplicaci\xF3n</th><th class="px-6 py-3.5" data-v-7af6644b>Estado Permiso</th><th class="px-6 py-3.5" data-v-7af6644b>\xDAltima Actualizaci\xF3n</th><th class="px-6 py-3.5 text-center" data-v-7af6644b>Acci\xF3n Directa</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800/50" data-v-7af6644b><!--[-->`);
      ssrRenderList(unref(accesos), (acceso) => {
        _push(`<tr class="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors" data-v-7af6644b><td class="px-6 py-4" data-v-7af6644b><div class="flex flex-col" data-v-7af6644b><span class="font-bold text-slate-800 dark:text-slate-200 text-sm leading-snug" data-v-7af6644b>${ssrInterpolate(acceso.colaborador.nombre)}</span><span class="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5" data-v-7af6644b>${ssrInterpolate(acceso.colaborador.correo)}</span></div></td><td class="px-6 py-4" data-v-7af6644b><div class="flex flex-col" data-v-7af6644b><span class="font-bold text-brand-purple dark:text-violet-400 text-sm leading-snug" data-v-7af6644b>${ssrInterpolate(acceso.aplicacion.nombre)}</span><span class="text-xs text-slate-450 dark:text-slate-500 mt-0.5 max-w-xs leading-normal" data-v-7af6644b>${ssrInterpolate(acceso.aplicacion.descripcion)}</span></div></td><td class="px-6 py-4" data-v-7af6644b><span class="${ssrRenderClass([acceso.estado === "Activo" ? "bg-emerald-500 text-white shadow-emerald-500/10" : "bg-red-500 text-white shadow-red-500/10", "inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-center shadow-sm"])}" data-v-7af6644b>${ssrInterpolate(acceso.estado === "Activo" ? "Habilitado" : "Revocado")}</span></td><td class="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400 font-mono" data-v-7af6644b>${ssrInterpolate(formatDate(acceso.actualizado_en))}</td><td class="px-6 py-4 text-center" data-v-7af6644b><button class="${ssrRenderClass([acceso.estado === "Activo" ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/10" : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/10", "px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all shadow-sm"])}" data-v-7af6644b>${ssrInterpolate(acceso.estado === "Activo" ? "Revocar Acceso" : "Otorgar Acceso")}</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (((_a = unref(accesos)) == null ? void 0 : _a.length) === 0) {
        _push(`<div class="text-center py-12 text-slate-400 dark:text-slate-500 text-sm italic" data-v-7af6644b> Ning\xFAn permiso o acceso coincide con el filtro de b\xFAsqueda. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="lg:col-span-4 glass-card p-6 bg-indigo-50/20 dark:bg-slate-900/20 border border-slate-200/80 dark:border-slate-800 shadow-sm" data-v-7af6644b><div class="pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2" data-v-7af6644b><span class="text-lg" data-v-7af6644b>\u2795</span><h2 class="text-base font-extrabold text-brand-purple dark:text-violet-400 font-sans tracking-wide uppercase" data-v-7af6644b> Conceder Acceso </h2></div><form class="space-y-5" data-v-7af6644b><div data-v-7af6644b><label class="block text-[10px] font-extrabold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider mb-2" data-v-7af6644b> Colaborador </label><select class="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-250 shadow-sm" data-v-7af6644b><option value="" data-v-7af6644b${ssrIncludeBooleanAttr(Array.isArray(selectedColaborador.value) ? ssrLooseContain(selectedColaborador.value, "") : ssrLooseEqual(selectedColaborador.value, "")) ? " selected" : ""}>-- Seleccionar Colaborador --</option><!--[-->`);
      ssrRenderList(colaboradores.value, (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)} data-v-7af6644b${ssrIncludeBooleanAttr(Array.isArray(selectedColaborador.value) ? ssrLooseContain(selectedColaborador.value, c.id) : ssrLooseEqual(selectedColaborador.value, c.id)) ? " selected" : ""}>${ssrInterpolate(c.nombre)} (${ssrInterpolate(c.correo)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-7af6644b><label class="block text-[10px] font-extrabold text-[#7C3AED] dark:text-violet-400 uppercase tracking-wider mb-2" data-v-7af6644b> Aplicaci\xF3n Corporativa </label><select class="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-250 shadow-sm" data-v-7af6644b><option value="" data-v-7af6644b${ssrIncludeBooleanAttr(Array.isArray(selectedAplicacion.value) ? ssrLooseContain(selectedAplicacion.value, "") : ssrLooseEqual(selectedAplicacion.value, "")) ? " selected" : ""}>-- Seleccionar Aplicaci\xF3n --</option><!--[-->`);
      ssrRenderList(unref(aplicaciones), (app) => {
        _push(`<option${ssrRenderAttr("value", app.id)} data-v-7af6644b${ssrIncludeBooleanAttr(Array.isArray(selectedAplicacion.value) ? ssrLooseContain(selectedAplicacion.value, app.id) : ssrLooseEqual(selectedAplicacion.value, app.id)) ? " selected" : ""}>${ssrInterpolate(app.nombre)}</option>`);
      });
      _push(`<!--]--></select></div><div class="pt-2" data-v-7af6644b><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-55 text-white font-extrabold py-3 px-5 rounded-2xl transition-all shadow-md shadow-brand-purple/20 text-sm tracking-wide" data-v-7af6644b>${ssrInterpolate(isSubmitting.value ? "Otorgando..." : "Otorgar Acceso de Seguridad")}</button></div></form></div></div>`);
      if (toast.value) {
        _push(`<div class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800" data-v-7af6644b><span class="w-2 h-2 rounded-full bg-brand-purple animate-pulse" data-v-7af6644b></span><p class="text-sm font-semibold" data-v-7af6644b>${ssrInterpolate(toastMessage.value)}</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/aplicaciones/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7af6644b"]]);

export { index as default };
//# sourceMappingURL=index-BVt0JqKK.mjs.map
