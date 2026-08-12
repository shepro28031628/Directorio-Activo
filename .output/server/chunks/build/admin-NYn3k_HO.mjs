import { _ as __nuxt_component_0 } from './client-only-DhLfD2Bx.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
      "/api/google/users",
      {
        query: computed(() => ({
          search: search.value,
          page: page.value,
          limit,
          paginate: "true"
        }))
      },
      "$MljfPj9O_x"
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
    const { data: status, refresh: refreshStatus } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/google/status",
      "$4RqX7Dpi1x"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isSyncing = ref(false);
    const authCode = ref("");
    const isExchanging = ref(false);
    const isModalOpen = ref(false);
    const isEditMode = ref(false);
    const form = ref({
      id: 0,
      nombre: "",
      correo: "",
      area: "Tecnolog\xEDa"
    });
    const isSaving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center flex-wrap gap-4"><div><h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Administraci\xF3n Google Workspace</h1><p class="text-slate-500">Cach\xE9 local sincronizada con el directorio corporativo de Google Admin Directory API.</p></div><div class="flex gap-3 flex-wrap"><button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg> Registrar Usuario </button><button${ssrIncludeBooleanAttr(isSyncing.value || !((_a = unref(status)) == null ? void 0 : _a.authenticated)) ? " disabled" : ""} class="bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm">`);
      if (isSyncing.value) {
        _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18"></path></svg>`);
      }
      _push(` ${ssrInterpolate(isSyncing.value ? "Sincronizando..." : "Sincronizar Directorio")}</button></div></div>`);
      if (!((_b = unref(status)) == null ? void 0 : _b.authenticated)) {
        _push(`<div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm space-y-4"><div class="flex items-start gap-4"><div class="p-3 bg-amber-100 rounded-xl text-amber-700"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div class="space-y-1"><h3 class="font-bold text-amber-900">Requiere Autenticaci\xF3n con Google Cloud</h3><p class="text-sm text-amber-700 leading-relaxed"> Se ha detectado el archivo de credenciales <code class="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">google_oauth.json</code>, pero es necesario autorizar la aplicaci\xF3n de manera segura para generar el token de comunicaci\xF3n y poder sincronizar los usuarios. </p></div></div><div class="border-t border-amber-200/60 pt-4 flex flex-col md:flex-row gap-4 items-end"><div class="flex-grow space-y-2"><label class="block text-xs font-bold text-amber-800 uppercase tracking-wider"> Paso 1: Abrir pantalla de consentimiento de Google </label><button class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl transition text-sm flex items-center gap-2"><svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> Obtener C\xF3digo de Autorizaci\xF3n </button></div><div class="w-full md:w-96 space-y-2"><label class="block text-xs font-bold text-amber-800 uppercase tracking-wider"> Paso 2: Pegar c\xF3digo obtenido </label><div class="flex gap-2"><input${ssrRenderAttr("value", authCode.value)} type="text" placeholder="Pegue el c\xF3digo de Google aqu\xED..." class="w-full px-3 py-2 border border-amber-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"><button${ssrIncludeBooleanAttr(isExchanging.value || !authCode.value.trim()) ? " disabled" : ""} class="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-xl transition text-sm shrink-0">${ssrInterpolate(isExchanging.value ? "Guardando..." : "Vincular")}</button></div></div></div></div>`);
      } else {
        _push(`<div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-sm"><div class="flex items-center gap-3 text-emerald-800"><svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span class="text-sm font-semibold">Integraci\xF3n de Google Workspace activa y autorizada de forma segura.</span></div><button class="text-xs text-emerald-700 hover:text-emerald-950 font-bold underline"> Re-autorizar cuenta </button></div>`);
      }
      _push(`<div class="flex flex-col md:flex-row gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm"><div class="flex-grow"><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Buscar por nombre o correo de Google Workspace..." class="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white"></div></div><div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden text-sm"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold"><th class="p-4 text-xs uppercase tracking-wider">Nombre del Usuario</th><th class="p-4 text-xs uppercase tracking-wider">Correo Google Workspace</th><th class="p-4 text-xs uppercase tracking-wider">Google ID</th><th class="p-4 text-xs uppercase tracking-wider">\xC1rea</th><th class="p-4 text-xs uppercase tracking-wider">Estado de Cuenta</th><th class="p-4 text-xs uppercase tracking-wider">\xDAltima Sincronizaci\xF3n</th><th class="p-4 text-xs uppercase tracking-wider text-right">Acciones</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
      ssrRenderList(usuarios.value, (user) => {
        _push(`<tr class="hover:bg-slate-50/50"><td class="p-4 flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">${ssrInterpolate(user.nombre[0])}</div><span class="font-bold text-slate-800">${ssrInterpolate(user.nombre)}</span></td><td class="p-4 text-slate-600 font-medium">${ssrInterpolate(user.correo)}</td><td class="p-4 font-mono text-xs text-slate-400">${ssrInterpolate(user.google_id)}</td><td class="p-4 text-slate-600">${ssrInterpolate(user.area || "N/A")}</td><td class="p-4"><span class="${ssrRenderClass([user.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "px-2.5 py-0.5 rounded-full text-xs font-bold"])}">${ssrInterpolate(user.activo ? "Activa Habilitada" : "Suspendida")}</span></td><td class="p-4 text-xs text-slate-400 font-medium">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</td><td class="p-4 text-right flex items-center justify-end gap-2"><button class="${ssrRenderClass([user.activo ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200", "text-xs font-bold py-1.5 px-3 rounded-lg border transition shadow-sm shrink-0"])}">${ssrInterpolate(user.activo ? "Suspender" : "Vincular")}</button><button class="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition shadow-sm shrink-0"> Editar </button><button class="text-xs font-bold py-1.5 px-3 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition shadow-sm shrink-0"> Eliminar </button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (!usuarios.value || usuarios.value.length === 0) {
        _push(`<div class="text-center py-12 text-slate-400 italic text-sm"> No se encontraron usuarios de Google Workspace. </div>`);
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
        _push(`<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl border border-brand-border max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"><div class="px-6 py-4 bg-brand-darkBg text-white flex justify-between items-center"><h3 class="font-bold text-lg font-sans">${ssrInterpolate(isEditMode.value ? "Editar Usuario Google" : "Registrar Nuevo Usuario")}</h3><button class="text-slate-400 hover:text-white transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 space-y-4"><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label><input${ssrRenderAttr("value", form.value.nombre)} type="text" placeholder="Ej: John Doe" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"></div><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Correo Electr\xF3nico</label><input${ssrRenderAttr("value", form.value.correo)} type="email" placeholder="Ej: jdoe@renconsultores.com.co"${ssrIncludeBooleanAttr(isEditMode.value) ? " disabled" : ""} class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:bg-slate-100 disabled:text-slate-400"></div><div class="space-y-1"><label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">\xC1rea / Unidad Organizacional</label><select class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white"><option value="Tecnolog\xEDa"${ssrIncludeBooleanAttr(Array.isArray(form.value.area) ? ssrLooseContain(form.value.area, "Tecnolog\xEDa") : ssrLooseEqual(form.value.area, "Tecnolog\xEDa")) ? " selected" : ""}>Tecnolog\xEDa</option><option value="Finanzas"${ssrIncludeBooleanAttr(Array.isArray(form.value.area) ? ssrLooseContain(form.value.area, "Finanzas") : ssrLooseEqual(form.value.area, "Finanzas")) ? " selected" : ""}>Finanzas</option><option value="Operaciones"${ssrIncludeBooleanAttr(Array.isArray(form.value.area) ? ssrLooseContain(form.value.area, "Operaciones") : ssrLooseEqual(form.value.area, "Operaciones")) ? " selected" : ""}>Operaciones</option><option value="Talento Humano"${ssrIncludeBooleanAttr(Array.isArray(form.value.area) ? ssrLooseContain(form.value.area, "Talento Humano") : ssrLooseEqual(form.value.area, "Talento Humano")) ? " selected" : ""}>Talento Humano</option><option value="General"${ssrIncludeBooleanAttr(Array.isArray(form.value.area) ? ssrLooseContain(form.value.area, "General") : ssrLooseEqual(form.value.area, "General")) ? " selected" : ""}>General</option></select></div></div><div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5"><button class="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-100 transition"> Cancelar </button><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="px-5 py-2 bg-brand-purple hover:bg-brand-purpleHover disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-brand-purple/20 transition flex items-center gap-1.5">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/google/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-NYn3k_HO.mjs.map
