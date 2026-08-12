import { _ as __nuxt_component_0 } from './client-only-DhLfD2Bx.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-Cqko2rmb.mjs';
import './server.mjs';
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
import '@vue/shared';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const search = ref("");
    const page = ref(1);
    const { data: resultado, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/microsoft/users",
      {
        query: computed(() => ({
          search: search.value,
          page: page.value,
          limit,
          paginate: "true"
        }))
      },
      "$0-jk6yiGSb"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const usuarios = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.data) || [];
    });
    const meta = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.meta) || { total: 0, page: 1, limit, totalPages: 1 };
    });
    watch(search, () => {
      page.value = 1;
    });
    const isSyncing = ref(false);
    const isModalOpen = ref(false);
    const isEditMode = ref(false);
    const form = ref({
      id: 0,
      nombre: "",
      correo: "",
      licencias: ""
    });
    const isSaving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center flex-wrap gap-4"><div><h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Administraci\xF3n Microsoft 365 (Office)</h1><p class="text-slate-500">Cach\xE9 local de cuentas y licencias sincronizada con la API de Microsoft Graph (Azure AD).</p></div><div class="flex gap-3 flex-wrap"><button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg> Registrar Usuario </button><button${ssrIncludeBooleanAttr(isSyncing.value) ? " disabled" : ""} class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">`);
      if (isSyncing.value) {
        _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"></path></svg>`);
      }
      _push(` ${ssrInterpolate(isSyncing.value ? "Sincronizando..." : "Sincronizar Directorio")}</button></div></div><div class="flex flex-col md:flex-row gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm"><div class="flex-grow"><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Buscar por nombre o correo de Microsoft 365..." class="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white"></div></div><div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden text-sm"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold"><th class="p-4 text-xs uppercase tracking-wider">Nombre del Usuario</th><th class="p-4 text-xs uppercase tracking-wider">Correo Microsoft 365</th><th class="p-4 text-xs uppercase tracking-wider">User ID (Azure)</th><th class="p-4 text-xs uppercase tracking-wider">Licencias Asignadas</th><th class="p-4 text-xs uppercase tracking-wider">Estado de Cuenta</th><th class="p-4 text-xs uppercase tracking-wider">\xDAltima Sincronizaci\xF3n</th><th class="p-4 text-xs uppercase tracking-wider text-right">Acciones</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
      ssrRenderList(usuarios.value, (user) => {
        _push(`<tr class="hover:bg-slate-50/50"><td class="p-4 flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">${ssrInterpolate(user.nombre[0])}</div><span class="font-bold text-slate-800">${ssrInterpolate(user.nombre)}</span></td><td class="p-4 text-slate-600 font-medium">${ssrInterpolate(user.correo)}</td><td class="p-4 font-mono text-xs text-slate-400">${ssrInterpolate(user.user_id)}</td><td class="p-4 text-xs text-slate-500"><!--[-->`);
        ssrRenderList(user.licencias ? user.licencias.split(",") : [], (lic) => {
          _push(`<span class="inline-block px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100 mr-1 mt-1 font-semibold">${ssrInterpolate(lic.trim())}</span>`);
        });
        _push(`<!--]-->`);
        if (!user.licencias) {
          _push(`<span class="text-slate-400 italic">Ninguna licencia</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="p-4"><span class="${ssrRenderClass([user.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "px-2.5 py-0.5 rounded-full text-xs font-bold"])}">${ssrInterpolate(user.activo ? "Habilitada" : "Deshabilitada")}</span></td><td class="p-4 text-xs text-slate-400 font-medium">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</td><td class="p-4 text-right flex items-center justify-end gap-2"><button class="${ssrRenderClass([user.activo ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200", "text-xs font-bold py-1.5 px-3 rounded-lg border transition shadow-sm shrink-0"])}">${ssrInterpolate(user.activo ? "Suspender" : "Vincular")}</button><button class="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition shadow-sm shrink-0"> Editar </button><button class="text-xs font-bold py-1.5 px-3 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition shadow-sm shrink-0"> Eliminar </button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (!usuarios.value || usuarios.value.length === 0) {
        _push(`<div class="text-center py-12 text-slate-400 italic text-sm"> No se encontraron usuarios de Microsoft 365. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (usuarios.value.length > 0) {
        _push(`<div class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm"><p class="text-sm text-slate-500"> Mostrando <span class="font-semibold text-slate-700">${ssrInterpolate((meta.value.page - 1) * meta.value.limit + 1)}\u2013${ssrInterpolate(Math.min(meta.value.page * meta.value.limit, meta.value.total))}</span> de <span class="font-semibold text-slate-700">${ssrInterpolate(meta.value.total)}</span> usuarios </p><div class="flex items-center gap-2"><button${ssrIncludeBooleanAttr(page.value <= 1) ? " disabled" : ""} class="${ssrRenderClass([page.value <= 1 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Anterior </button><span class="px-3 py-1.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg">${ssrInterpolate(meta.value.page)} / ${ssrInterpolate(meta.value.totalPages)}</span><button${ssrIncludeBooleanAttr(page.value >= meta.value.totalPages) ? " disabled" : ""} class="${ssrRenderClass([page.value >= meta.value.totalPages ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}"> Siguiente <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isModalOpen.value) {
        _push(`<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl border border-brand-border max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"><div class="px-6 py-4 bg-brand-darkBg text-white flex justify-between items-center"><h3 class="font-bold text-lg font-sans">${ssrInterpolate(isEditMode.value ? "Editar Usuario Microsoft" : "Registrar Nuevo Usuario")}</h3><button class="text-slate-400 hover:text-white transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 space-y-4"><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label><input${ssrRenderAttr("value", form.value.nombre)} type="text" placeholder="Ej: Jane Doe" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"></div><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">User Principal Name (Correo)</label><input${ssrRenderAttr("value", form.value.correo)} type="email" placeholder="Ej: jdoe@renconsultores.onmicrosoft.com"${ssrIncludeBooleanAttr(isEditMode.value) ? " disabled" : ""} class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:bg-slate-100 disabled:text-slate-400"></div><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Licencias (Separadas por Comas)</label><input${ssrRenderAttr("value", form.value.licencias)} type="text" placeholder="Ej: ENTERPRISEPACK, SPB" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"></div></div><div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5"><button class="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-100 transition"> Cancelar </button><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="px-5 py-2 bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-brand-purple/20 transition flex items-center gap-1.5">`);
        if (isSaving.value) {
          _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(isSaving.value ? "Guardando..." : "Guardar Usuario")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/microsoft/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DfNg_djC.mjs.map
