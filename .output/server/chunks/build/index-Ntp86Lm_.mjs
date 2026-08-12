import { _ as __nuxt_component_0 } from './nuxt-link-CQE0urBr.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-Cqko2rmb.mjs';
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
import './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const search = ref("");
    const areaFilter = ref("");
    const statusFilter = ref("");
    const page = ref(1);
    const isSyncing = ref(false);
    const syncMessage = ref("");
    const isModalOpen = ref(false);
    const form = ref({
      nombre: "",
      correo: "",
      area: "",
      proyecto: "",
      jira_id: ""
    });
    const isEditModalOpen = ref(false);
    const editForm = ref({
      id: 0,
      nombre: "",
      correo: "",
      area: "",
      proyecto: "",
      jira_id: "",
      estado: "Activo"
    });
    const { data: resultado, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/colaboradores",
      {
        query: computed(() => ({
          search: search.value,
          area: areaFilter.value,
          estado: statusFilter.value,
          page: page.value,
          limit: limit.value,
          paginate: "true"
        }))
      },
      "$BNBNY-ZHL9"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const colaboradores = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.data) || [];
    });
    const meta = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.meta) || { total: 0, page: 1, limit, totalPages: 1 };
    });
    watch([search, areaFilter, statusFilter], () => {
      page.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center flex-wrap gap-3"><div><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">Directorio de Colaboradores</h1><p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Gesti\xF3n de usuarios internos, proyectos y desvinculaciones centralizadas.</p></div><div class="flex gap-3 flex-wrap"><button${ssrIncludeBooleanAttr(unref(isSyncing)) ? " disabled" : ""} class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md text-xs sm:text-sm">`);
      if (!unref(isSyncing)) {
        _push(`<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>`);
      }
      _push(` ${ssrInterpolate(unref(isSyncing) ? "Sincronizando..." : "Sincronizar con Jira")}</button><button class="bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md flex items-center gap-2 text-xs sm:text-sm"><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Registrar Colaborador </button></div></div>`);
      if (unref(syncMessage)) {
        _push(`<div class="${ssrRenderClass([unref(syncMessage).startsWith("Error") ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", "px-4 py-3 rounded-xl text-sm font-medium border"])}">${ssrInterpolate(unref(syncMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col md:flex-row gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-sm"><div class="flex-grow"><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Buscar por colaborador, correo o proyecto..." class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"></div><div class="w-full md:w-48"><select class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "") : ssrLooseEqual(unref(areaFilter), "")) ? " selected" : ""}>Todas las \xC1reas</option><option value="Tecnolog\xEDa"${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "Tecnolog\xEDa") : ssrLooseEqual(unref(areaFilter), "Tecnolog\xEDa")) ? " selected" : ""}>Tecnolog\xEDa</option><option value="Desarrollo"${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "Desarrollo") : ssrLooseEqual(unref(areaFilter), "Desarrollo")) ? " selected" : ""}>Desarrollo</option><option value="Finanzas"${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "Finanzas") : ssrLooseEqual(unref(areaFilter), "Finanzas")) ? " selected" : ""}>Finanzas</option><option value="Marketing"${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "Marketing") : ssrLooseEqual(unref(areaFilter), "Marketing")) ? " selected" : ""}>Marketing</option><option value="Soporte"${ssrIncludeBooleanAttr(Array.isArray(unref(areaFilter)) ? ssrLooseContain(unref(areaFilter), "Soporte") : ssrLooseEqual(unref(areaFilter), "Soporte")) ? " selected" : ""}>Soporte</option></select></div><div class="w-full md:w-48"><select class="w-full px-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>Todos los Estados</option><option value="Activo"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "Activo") : ssrLooseEqual(unref(statusFilter), "Activo")) ? " selected" : ""}>Activo</option><option value="Vacaciones"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "Vacaciones") : ssrLooseEqual(unref(statusFilter), "Vacaciones")) ? " selected" : ""}>Vacaciones</option><option value="Suspendido"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "Suspendido") : ssrLooseEqual(unref(statusFilter), "Suspendido")) ? " selected" : ""}>Suspendido</option><option value="Retirado"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "Retirado") : ssrLooseEqual(unref(statusFilter), "Retirado")) ? " selected" : ""}>Retirado</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(colaboradores), (col) => {
        var _a, _b;
        _push(`<div class="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all border border-slate-100 hover:border-slate-200"><div class="space-y-4"><div class="flex justify-between items-start"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-violet-50 text-brand-purple font-bold text-md flex items-center justify-center">${ssrInterpolate(col.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2))}</div><div><h3 class="font-bold text-slate-800 leading-tight">${ssrInterpolate(col.nombre)}</h3><p class="text-xs text-slate-400 font-mono mt-0.5">${ssrInterpolate(col.correo)}</p></div></div><div class="flex flex-col items-end gap-2"><span class="${ssrRenderClass([{
          "bg-green-50 text-green-700 border border-green-100": col.estado === "Activo",
          "bg-blue-50 text-blue-700 border border-blue-100": col.estado === "Vacaciones",
          "bg-amber-50 text-amber-700 border border-amber-100": col.estado === "Suspendido",
          "bg-rose-50 text-rose-700 border border-rose-100": col.estado === "Retirado"
        }, "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase"])}">${ssrInterpolate(col.estado)}</span><div class="flex gap-1.5 mt-0.5"><button class="p-1.5 rounded-lg text-slate-400 hover:text-brand-purple hover:bg-violet-50 border border-transparent hover:border-violet-100 transition" title="Editar Colaborador"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition" title="Eliminar Colaborador"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div class="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3 text-slate-500"><div><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">\xC1rea</p><p class="font-semibold text-slate-700 mt-0.5">${ssrInterpolate(col.area)}</p></div><div><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proyecto</p><p class="font-semibold text-slate-700 mt-0.5">${ssrInterpolate(col.proyecto)}</p></div></div><div class="text-xs border-t border-slate-50 pt-3"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Equipos Vinculados</p>`);
        if (((_a = col.equipos) == null ? void 0 : _a.length) > 0) {
          _push(`<div class="flex flex-wrap gap-1.5"><!--[-->`);
          ssrRenderList(col.equipos, (eq) => {
            _push(`<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">${ssrInterpolate(eq.hostname)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-slate-400 italic">Ning\xFAn activo tecnol\xF3gico asignado.</p>`);
        }
        _push(`</div><div class="text-xs border-t border-slate-50 pt-3"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Aplicativos Autorizados</p>`);
        if (((_b = col.accesos) == null ? void 0 : _b.filter((a) => a.estado === "Activo").length) > 0) {
          _push(`<div class="flex flex-wrap gap-1.5"><!--[-->`);
          ssrRenderList(col.accesos.filter((a) => a.estado === "Activo"), (acceso) => {
            _push(`<span class="px-2.5 py-0.5 rounded-md bg-violet-50 text-brand-purple font-semibold text-[10px] border border-violet-100 flex items-center gap-1 shadow-sm"><span class="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0"></span> ${ssrInterpolate(acceso.aplicacion.nombre)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-slate-400 italic">Sin accesos activos.</p>`);
        }
        _push(`</div></div><div class="mt-6 border-t border-slate-100 pt-4 flex gap-2">`);
        if (col.estado !== "Retirado") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/desvinculacion/wizard/${col.id}`,
            class: "w-full text-center text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl border border-red-100 transition"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Iniciar Desvinculaci\xF3n `);
              } else {
                return [
                  createTextVNode(" Iniciar Desvinculaci\xF3n ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="w-full text-center text-xs bg-slate-100 text-slate-400 font-bold py-2 rounded-xl border border-slate-200 block cursor-not-allowed"> Colaborador Desvinculado </span>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(colaboradores).length === 0) {
        _push(`<div class="col-span-full text-center py-12 text-slate-400 text-sm"> No se encontraron colaboradores que coincidan con la b\xFAsqueda. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm"><p class="text-sm text-slate-500"> Mostrando <span class="font-semibold text-slate-700">${ssrInterpolate((unref(meta).page - 1) * unref(meta).limit + 1)}\u2013${ssrInterpolate(Math.min(unref(meta).page * unref(meta).limit, unref(meta).total))}</span> de <span class="font-semibold text-slate-700">${ssrInterpolate(unref(meta).total)}</span> colaboradores </p><div class="flex items-center gap-2"><button${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} class="${ssrRenderClass([unref(page) <= 1 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Anterior </button><span class="px-3 py-1.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg">${ssrInterpolate(unref(meta).page)} / ${ssrInterpolate(unref(meta).totalPages)}</span><button${ssrIncludeBooleanAttr(unref(page) >= unref(meta).totalPages) ? " disabled" : ""} class="${ssrRenderClass([unref(page) >= unref(meta).totalPages ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}"> Siguiente <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
      if (unref(isModalOpen)) {
        _push(`<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-bold text-slate-800">Registrar Colaborador</h3><button class="text-slate-400 hover:text-slate-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-4 text-sm"><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Completo</label><input${ssrRenderAttr("value", unref(form).nombre)} required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Correo Electr\xF3nico</label><input${ssrRenderAttr("value", unref(form).correo)} required type="email" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">\xC1rea</label><select required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"><option value="Tecnolog\xEDa"${ssrIncludeBooleanAttr(Array.isArray(unref(form).area) ? ssrLooseContain(unref(form).area, "Tecnolog\xEDa") : ssrLooseEqual(unref(form).area, "Tecnolog\xEDa")) ? " selected" : ""}>Tecnolog\xEDa</option><option value="Desarrollo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).area) ? ssrLooseContain(unref(form).area, "Desarrollo") : ssrLooseEqual(unref(form).area, "Desarrollo")) ? " selected" : ""}>Desarrollo</option><option value="Finanzas"${ssrIncludeBooleanAttr(Array.isArray(unref(form).area) ? ssrLooseContain(unref(form).area, "Finanzas") : ssrLooseEqual(unref(form).area, "Finanzas")) ? " selected" : ""}>Finanzas</option><option value="Marketing"${ssrIncludeBooleanAttr(Array.isArray(unref(form).area) ? ssrLooseContain(unref(form).area, "Marketing") : ssrLooseEqual(unref(form).area, "Marketing")) ? " selected" : ""}>Marketing</option><option value="Soporte"${ssrIncludeBooleanAttr(Array.isArray(unref(form).area) ? ssrLooseContain(unref(form).area, "Soporte") : ssrLooseEqual(unref(form).area, "Soporte")) ? " selected" : ""}>Soporte</option></select></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Proyecto</label><input${ssrRenderAttr("value", unref(form).proyecto)} required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ID Jira Assets (Opcional)</label><input${ssrRenderAttr("value", unref(form).jira_id)} type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div><div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100"><button type="button" class="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200"> Cancelar </button><button type="submit" class="px-4 py-2 text-xs font-bold text-white bg-brand-purple rounded-xl hover:bg-brand-purpleHover"> Guardar Colaborador </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isEditModalOpen)) {
        _push(`<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-bold text-slate-800">Editar Colaborador</h3><button class="text-slate-400 hover:text-slate-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-4 text-sm"><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre Completo</label><input${ssrRenderAttr("value", unref(editForm).nombre)} required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Correo Electr\xF3nico</label><input${ssrRenderAttr("value", unref(editForm).correo)} required type="email" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">\xC1rea</label><select required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"><option value="Tecnolog\xEDa"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).area) ? ssrLooseContain(unref(editForm).area, "Tecnolog\xEDa") : ssrLooseEqual(unref(editForm).area, "Tecnolog\xEDa")) ? " selected" : ""}>Tecnolog\xEDa</option><option value="Desarrollo"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).area) ? ssrLooseContain(unref(editForm).area, "Desarrollo") : ssrLooseEqual(unref(editForm).area, "Desarrollo")) ? " selected" : ""}>Desarrollo</option><option value="Finanzas"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).area) ? ssrLooseContain(unref(editForm).area, "Finanzas") : ssrLooseEqual(unref(editForm).area, "Finanzas")) ? " selected" : ""}>Finanzas</option><option value="Marketing"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).area) ? ssrLooseContain(unref(editForm).area, "Marketing") : ssrLooseEqual(unref(editForm).area, "Marketing")) ? " selected" : ""}>Marketing</option><option value="Soporte"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).area) ? ssrLooseContain(unref(editForm).area, "Soporte") : ssrLooseEqual(unref(editForm).area, "Soporte")) ? " selected" : ""}>Soporte</option></select></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Proyecto</label><input${ssrRenderAttr("value", unref(editForm).proyecto)} required type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Estado</label><select required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"><option value="Activo"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).estado) ? ssrLooseContain(unref(editForm).estado, "Activo") : ssrLooseEqual(unref(editForm).estado, "Activo")) ? " selected" : ""}>Activo</option><option value="Vacaciones"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).estado) ? ssrLooseContain(unref(editForm).estado, "Vacaciones") : ssrLooseEqual(unref(editForm).estado, "Vacaciones")) ? " selected" : ""}>Vacaciones</option><option value="Suspendido"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).estado) ? ssrLooseContain(unref(editForm).estado, "Suspendido") : ssrLooseEqual(unref(editForm).estado, "Suspendido")) ? " selected" : ""}>Suspendido</option><option value="Retirado"${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).estado) ? ssrLooseContain(unref(editForm).estado, "Retirado") : ssrLooseEqual(unref(editForm).estado, "Retirado")) ? " selected" : ""}>Retirado</option></select></div><div><label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ID Jira Assets (Opcional)</label><input${ssrRenderAttr("value", unref(editForm).jira_id)} type="text" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"></div></div><div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100"><button type="button" class="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200"> Cancelar </button><button type="submit" class="px-4 py-2 text-xs font-bold text-white bg-brand-purple rounded-xl hover:bg-brand-purpleHover"> Guardar Cambios </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/colaboradores/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ntp86Lm_.mjs.map
