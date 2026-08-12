import { _ as __nuxt_component_0 } from './nuxt-link-CQE0urBr.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const collaboratorId = route.params.id;
    const { data: col, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/desvinculacion/wizard/${collaboratorId}`,
      "$q1GXrVQH5y"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isRunning = ref(false);
    const isFinished = ref(false);
    const progress = ref(0);
    const stepsState = ref([
      { name: "db_colaborador", label: "Actualizar colaborador en base de datos", status: "PENDING", error: null },
      { name: "google_workspace", label: "Suspender cuenta Google Workspace (Admin Directory)", status: "PENDING", error: null },
      { name: "db_equipos", label: "Actualizar equipos asociados a Bloqueado", status: "PENDING", error: null },
      { name: "ws_bloqueo", label: "Enviar se\xF1al de bloqueo local (WebSocket Agente)", status: "PENDING", error: null },
      { name: "db_accesos", label: "Revocar matriz de accesos y aplicaciones", status: "PENDING", error: null },
      { name: "ms_365", label: "Deshabilitar cuenta y revocar sesiones Microsoft 365", status: "PENDING", error: null },
      { name: "audit_log", label: "Registrar evento en bit\xE1cora de auditor\xEDa", status: "PENDING", error: null }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto space-y-6" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="animate-pulse space-y-4"><div class="h-8 bg-white w-48 rounded-xl"></div><div class="h-64 bg-white rounded-2xl"></div></div>`);
      } else if (unref(col)) {
        _push(`<div class="space-y-6"><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/colaboradores",
          class: "p-2 hover:bg-slate-200 rounded-full transition bg-white shadow-sm border border-slate-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5 text-slate-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div><h1 class="text-3xl font-bold tracking-tight text-slate-900 font-sans">Asistente de Desvinculaci\xF3n</h1><p class="text-slate-500">Proceso automatizado de offboarding de colaborador y suspensi\xF3n de accesos.</p></div></div><div class="glass-card p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="md:border-r border-slate-100 pr-4 space-y-3"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-full bg-red-50 text-red-500 font-bold text-lg flex items-center justify-center border border-red-100">${ssrInterpolate(unref(col).nombre.split(" ").map((n) => n[0]).join(""))}</div><div><h3 class="font-bold text-slate-800">${ssrInterpolate(unref(col).nombre)}</h3><span class="text-xs text-slate-400 font-mono">${ssrInterpolate(unref(col).correo)}</span></div></div><div><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proyecto / \xC1rea</p><p class="text-xs font-semibold text-slate-700 mt-0.5">${ssrInterpolate(unref(col).proyecto)} \u2014 ${ssrInterpolate(unref(col).area)}</p></div></div><div class="md:border-r border-slate-100 px-4 space-y-2"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Activos vinculados a bloquear</p>`);
        if (unref(col).equipos.length > 0) {
          _push(`<div class="space-y-1.5"><!--[-->`);
          ssrRenderList(unref(col).equipos, (eq) => {
            _push(`<div class="flex justify-between text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono"><span>${ssrInterpolate(eq.hostname)}</span><span class="text-brand-purple">GLPI Lock</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-xs text-slate-400 italic">Ning\xFAn hardware asociado.</p>`);
        }
        _push(`</div><div class="pl-4 space-y-2"><p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cuentas y aplicaciones a revocar</p>`);
        if (unref(col).accesos.length > 0) {
          _push(`<div class="flex flex-wrap gap-1.5"><!--[-->`);
          ssrRenderList(unref(col).accesos, (ac) => {
            _push(`<span class="px-2 py-1 rounded bg-violet-50 text-brand-purple font-semibold text-[10px] border border-violet-100">${ssrInterpolate(ac.aplicacion.nombre)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-xs text-slate-400 italic">No hay accesos vinculados.</p>`);
        }
        _push(`</div></div><div class="glass-card p-8 space-y-6 border border-slate-100"><div class="flex justify-between items-center"><div><h3 class="text-lg font-bold text-slate-800 font-sans">Flujo Secuencial de Seguridad</h3><p class="text-xs text-slate-400">Progreso en directo de suspensiones de APIs</p></div>`);
        if (!unref(isRunning) && !unref(isFinished)) {
          _push(`<button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-xl transition shadow-md shadow-red-200 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Iniciar Desvinculaci\xF3n </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(isRunning) || unref(isFinished)) {
          _push(`<div class="space-y-2"><div class="flex justify-between text-xs font-bold text-slate-600"><span>Progreso General</span><span>${ssrInterpolate(unref(progress))}%</span></div><div class="w-full bg-slate-100 rounded-full h-3"><div class="h-3 rounded-full transition-all duration-500 bg-brand-purple" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(stepsState), (step) => {
          _push(`<div class="${ssrRenderClass([{
            "bg-slate-50 border-slate-100 text-slate-400": step.status === "PENDING",
            "bg-violet-50/50 border-brand-purple/20 text-slate-700": step.status === "RUNNING",
            "bg-emerald-50/50 border-emerald-100 text-slate-700": step.status === "SUCCESS",
            "bg-rose-50 border-rose-100 text-slate-700": step.status === "FAILED"
          }, "flex items-center justify-between p-4 rounded-xl border transition"])}"><div class="flex items-center gap-3"><span class="shrink-0">`);
          if (step.status === "PENDING") {
            _push(`<svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
          } else if (step.status === "RUNNING") {
            _push(`<svg class="w-5 h-5 text-brand-purple animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
          } else if (step.status === "SUCCESS") {
            _push(`<svg class="w-5 h-5 text-emerald-500 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<svg class="w-5 h-5 text-red-500 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>`);
          }
          _push(`</span><span class="text-sm font-semibold">${ssrInterpolate(step.label)}</span></div><div>`);
          if (step.status === "PENDING") {
            _push(`<span class="text-xs text-slate-400 font-bold">Pendiente</span>`);
          } else if (step.status === "RUNNING") {
            _push(`<span class="text-xs text-brand-purple font-bold animate-pulse">Ejecutando...</span>`);
          } else if (step.status === "SUCCESS") {
            _push(`<span class="text-xs text-emerald-600 font-bold">Completado</span>`);
          } else {
            _push(`<span class="text-xs text-red-600 font-bold">Error</span>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(isFinished)) {
          _push(`<div class="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 text-center space-y-3"><div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-emerald-500/20"> \u2713 </div><h3 class="text-lg font-bold text-slate-800">Desvinculaci\xF3n Completada con \xC9xito</h3><p class="text-sm text-slate-600 max-w-md mx-auto"> El colaborador ha sido marcado como retirado en base de datos. Se suspendieron de manera segura todas las credenciales de Google Workspace y Microsoft 365, y se inhabilit\xF3 la pantalla de sus estaciones de trabajo. </p><div class="pt-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/colaboradores",
            class: "px-5 py-2 bg-brand-purple hover:bg-brand-purpleHover text-white font-bold rounded-xl text-xs transition inline-block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Volver al Directorio `);
              } else {
                return [
                  createTextVNode(" Volver al Directorio ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/desvinculacion/wizard/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DTOj462m.mjs.map
