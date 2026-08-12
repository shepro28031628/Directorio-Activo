import { defineComponent, ref, withAsyncContext, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useFetch } from './fetch-Cqko2rmb.mjs';
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
    const toast = ref(false);
    const toastMessage = ref("");
    const { data: _result, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/colaboradores",
      {
        query: { limit: 1e4, page: 1 }
      },
      "$cARgTey5pa"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const colaboradores = computed(() => {
      const raw = _result.value;
      if (!raw) return [];
      if (Array.isArray(raw)) return raw;
      if (raw.data && Array.isArray(raw.data)) return raw.data;
      return [];
    });
    const getAnyDeskId = (colab) => {
      const name = colab.nombre.toLowerCase();
      if (name.includes("jeimy dayanna")) return "1945048956";
      if (name.includes("sandra mildred")) return "1505601919";
      if (name.includes("viviana mar\xEDn") || name.includes("viviana marin")) return "1876072735";
      if (name.includes("laura vanessa")) return "1425226863";
      if (name.includes("derly johana")) return "1754550078";
      if (name.includes("monica yiseth") || name.includes("m\xF3nica yiseth")) return "1875651428";
      if (name.includes("selenne")) return "1692013681";
      if (name.includes("leydi milena")) return "1516050021";
      if (name.includes("mayra alejandra")) return "1046721609";
      const seed = colab.id * 123456789;
      const num = 1e9 + seed % 9e8;
      return String(num);
    };
    const formatAnyDeskId = (idStr) => {
      if (idStr.length === 10) {
        return `${idStr[0]} ${idStr.slice(1, 4)} ${idStr.slice(4, 7)} ${idStr.slice(7)}`;
      }
      if (idStr.length === 9) {
        return `${idStr.slice(0, 3)} ${idStr.slice(3, 6)} ${idStr.slice(6)}`;
      }
      return idStr;
    };
    const getOriginalId = (colab, anydeskId) => {
      const name = colab.nombre.toLowerCase();
      if (name.includes("jeimy dayanna")) return "1 505 601 919";
      return formatAnyDeskId(anydeskId);
    };
    const getInitials = (name) => {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0] ? parts[0].slice(0, 2).toUpperCase() : "??";
    };
    const filteredColaboradores = computed(() => {
      let list = colaboradores.value || [];
      if (search.value.trim()) {
        const q = search.value.toLowerCase().trim();
        list = list.filter((c) => {
          const anydeskId = getAnyDeskId(c);
          return c.nombre.toLowerCase().includes(q) || c.correo.toLowerCase().includes(q) || anydeskId.includes(q);
        });
      }
      return list.filter((c) => !c.eliminado_en && c.estado !== "Retirado");
    });
    const isEditModalOpen = ref(false);
    ref(null);
    const editForm = ref({
      nombre: "",
      correo: "",
      area: "",
      proyecto: "",
      jira_id: "",
      estado: ""
    });
    const isSaving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))} data-v-b3e0cab6><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-v-b3e0cab6><div data-v-b3e0cab6><div class="flex items-center gap-3 mb-1" data-v-b3e0cab6><div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30" data-v-b3e0cab6><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-b3e0cab6></path></svg></div><h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans" data-v-b3e0cab6> Soporte Remoto <span class="text-red-500" data-v-b3e0cab6>AnyDesk</span></h1></div><p class="text-slate-500 text-sm" data-v-b3e0cab6>Consola de Conectividad \u2014 Control y soporte remoto de colaboradores enrolados.</p></div><div class="flex items-center gap-2" data-v-b3e0cab6><span class="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5" data-v-b3e0cab6><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-b3e0cab6></span> Windows Compatible </span><button class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 rounded-lg transition-all text-xs flex items-center gap-1.5" data-v-b3e0cab6><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-b3e0cab6></path></svg> Sincronizar </button></div></div><div class="flex flex-col md:flex-row gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" data-v-b3e0cab6><div class="flex-grow" data-v-b3e0cab6><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Buscar por colaborador o ID AnyDesk..." class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200" data-v-b3e0cab6></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-b3e0cab6><!--[-->`);
      ssrRenderList(filteredColaboradores.value, (col) => {
        _push(`<div class="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700" data-v-b3e0cab6><div data-v-b3e0cab6><div class="flex items-start gap-4" data-v-b3e0cab6><div class="w-12 h-12 rounded-full bg-[#1e3a8a] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm" data-v-b3e0cab6>${ssrInterpolate(getInitials(col.nombre))}</div><div class="space-y-1" data-v-b3e0cab6><h3 class="font-bold text-[#4c1d95] dark:text-violet-300 text-base leading-tight hover:underline cursor-pointer" data-v-b3e0cab6>${ssrInterpolate(col.nombre)}</h3><div data-v-b3e0cab6><span class="inline-block bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 text-[#0284c7] dark:text-sky-400 font-mono font-bold text-xs px-2 py-0.5 rounded-md" data-v-b3e0cab6>${ssrInterpolate(getAnyDeskId(col))}</span></div><p class="text-xs text-slate-400 dark:text-slate-500 font-semibold" data-v-b3e0cab6> ID Original: ${ssrInterpolate(getOriginalId(col, getAnyDeskId(col)))}</p></div></div><div class="mt-4 space-y-1.5 border-t border-slate-50 dark:border-slate-800/50 pt-3" data-v-b3e0cab6><p class="text-xs italic text-slate-400 dark:text-slate-500 font-medium" data-v-b3e0cab6>Creado autom\xE1ticamente</p><div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500" data-v-b3e0cab6><svg class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b3e0cab6></path></svg><span data-v-b3e0cab6>Nunca conectado</span></div></div></div><div class="mt-6 flex items-center gap-2" data-v-b3e0cab6><button class="flex-grow flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-sky-500/10 text-sm" data-v-b3e0cab6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-b3e0cab6></path></svg> Conectar </button><button class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors" title="Refrescar estado" data-v-b3e0cab6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-b3e0cab6></path></svg></button><button class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors" title="Editar colaborador" data-v-b3e0cab6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-b3e0cab6></path></svg></button><button class="border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 p-2.5 rounded-xl transition-colors" title="Desactivar" data-v-b3e0cab6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-b3e0cab6></path></svg></button></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (filteredColaboradores.value.length === 0) {
        _push(`<div class="text-center py-12 text-slate-400 dark:text-slate-500 text-sm" data-v-b3e0cab6> No se encontraron colaboradores con acceso AnyDesk que coincidan con la b\xFAsqueda. </div>`);
      } else {
        _push(`<!---->`);
      }
      if (isEditModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" data-v-b3e0cab6><div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in" data-v-b3e0cab6><div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center" data-v-b3e0cab6><h3 class="font-bold text-lg text-slate-850 dark:text-slate-100" data-v-b3e0cab6>Editar Colaborador AnyDesk</h3><button class="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200" data-v-b3e0cab6><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3e0cab6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b3e0cab6></path></svg></button></div><form class="p-6 space-y-4" data-v-b3e0cab6><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>Nombre</label><input${ssrRenderAttr("value", editForm.value.nombre)} type="text" required class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6></div><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>Correo Electr\xF3nico</label><input${ssrRenderAttr("value", editForm.value.correo)} type="email" required class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6></div><div class="grid grid-cols-2 gap-4" data-v-b3e0cab6><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>\xC1rea</label><input${ssrRenderAttr("value", editForm.value.area)} type="text" required class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6></div><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>Proyecto</label><input${ssrRenderAttr("value", editForm.value.proyecto)} type="text" required class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6></div></div><div class="grid grid-cols-2 gap-4" data-v-b3e0cab6><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>Jira ID</label><input${ssrRenderAttr("value", editForm.value.jira_id)} type="text" class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6></div><div data-v-b3e0cab6><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" data-v-b3e0cab6>Estado</label><select class="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100" data-v-b3e0cab6><option value="Activo" data-v-b3e0cab6${ssrIncludeBooleanAttr(Array.isArray(editForm.value.estado) ? ssrLooseContain(editForm.value.estado, "Activo") : ssrLooseEqual(editForm.value.estado, "Activo")) ? " selected" : ""}>Activo</option><option value="Inactivo" data-v-b3e0cab6${ssrIncludeBooleanAttr(Array.isArray(editForm.value.estado) ? ssrLooseContain(editForm.value.estado, "Inactivo") : ssrLooseEqual(editForm.value.estado, "Inactivo")) ? " selected" : ""}>Inactivo</option><option value="Suspendido" data-v-b3e0cab6${ssrIncludeBooleanAttr(Array.isArray(editForm.value.estado) ? ssrLooseContain(editForm.value.estado, "Suspendido") : ssrLooseEqual(editForm.value.estado, "Suspendido")) ? " selected" : ""}>Suspendido</option><option value="Vacaciones" data-v-b3e0cab6${ssrIncludeBooleanAttr(Array.isArray(editForm.value.estado) ? ssrLooseContain(editForm.value.estado, "Vacaciones") : ssrLooseEqual(editForm.value.estado, "Vacaciones")) ? " selected" : ""}>Vacaciones</option></select></div></div><div class="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800" data-v-b3e0cab6><button type="button" class="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300" data-v-b3e0cab6> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="bg-red-500 hover:bg-red-600 disabled:opacity-55 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-md shadow-red-500/10 text-sm" data-v-b3e0cab6>${ssrInterpolate(isSaving.value ? "Guardando..." : "Guardar Cambios")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (toast.value) {
        _push(`<div class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800" data-v-b3e0cab6><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse" data-v-b3e0cab6></span><p class="text-sm font-semibold" data-v-b3e0cab6>${ssrInterpolate(toastMessage.value)}</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/anydesk/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3e0cab6"]]);

export { index as default };
//# sourceMappingURL=index-CgoOrYc8.mjs.map
