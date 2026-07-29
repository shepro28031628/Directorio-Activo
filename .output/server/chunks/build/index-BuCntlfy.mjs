import { _ as __nuxt_component_0 } from './nuxt-link-BNU0BTVN.mjs';
import { u as useFetch, _ as __nuxt_component_0$1 } from './fetch-TGT10OSe.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/dashboard/stats",
      "$70pfh7opa9"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const activeHoverLocation = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-02dac36f><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-v-02dac36f><div data-v-02dac36f><h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-sans" data-v-02dac36f> Consola Central <span class="text-brand-purple" data-v-02dac36f>RenovaMDM</span></h1><p class="text-slate-500 text-sm mt-1" data-v-02dac36f>Supervisi\xF3n en tiempo real de telemetr\xEDa de hardware, pol\xEDticas de seguridad y ejecuci\xF3n de comandos remotos.</p></div><button class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm" data-v-02dac36f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-02dac36f></path></svg> Sincronizar Flota </button></div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-pulse" data-v-02dac36f><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="h-28 bg-white rounded-2xl border border-slate-100 shadow-sm" data-v-02dac36f></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(data)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6" data-v-02dac36f><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300" data-v-02dac36f><div class="flex justify-between items-start text-slate-400" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>Total Enrolados</span><span class="p-2 bg-indigo-50 text-indigo-600 rounded-xl" data-v-02dac36f><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold text-slate-800" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.totalDevices)}</p><p class="text-xs text-slate-500 font-medium mt-1" data-v-02dac36f>Dispositivos en flota</p></div></div><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300" data-v-02dac36f><div class="flex justify-between items-start text-slate-400" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>En L\xEDnea</span><span class="p-2 bg-emerald-50 text-emerald-600 rounded-xl relative" data-v-02dac36f><span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" data-v-02dac36f></span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold text-emerald-600" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.devicesOnline)}</p><p class="text-xs text-emerald-500 font-medium mt-1" data-v-02dac36f>Transmitiendo ping</p></div></div><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300" data-v-02dac36f><div class="flex justify-between items-start text-slate-400" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>Fuera de L\xEDnea</span><span class="p-2 bg-slate-100 text-slate-600 rounded-xl" data-v-02dac36f><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M21 3L3 21M3 3l3.536 3.536M9.172 9.172a4 4 0 015.656 5.656" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold text-slate-500" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.devicesOffline)}</p><p class="text-xs text-slate-400 font-medium mt-1" data-v-02dac36f>Sin conexi\xF3n reciente</p></div></div><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300" data-v-02dac36f><div class="flex justify-between items-start text-slate-400" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>Bloqueados</span><span class="p-2 bg-red-50 text-red-600 rounded-xl" data-v-02dac36f><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold text-red-600" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.blockedDevices)}</p><p class="text-xs text-red-500 font-medium mt-1" data-v-02dac36f>En cuarentena / Baja</p></div></div><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300" data-v-02dac36f><div class="flex justify-between items-start text-slate-400" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>Cumplimiento</span><span class="p-2 bg-violet-50 text-brand-purple rounded-xl" data-v-02dac36f><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold text-brand-purple" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.complianceRate)}%</p><p class="text-xs text-violet-500 font-medium mt-1" data-v-02dac36f>Dispositivos conformes</p></div></div><div class="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none shadow-md shadow-orange-500/10" data-v-02dac36f><div class="flex justify-between items-start text-orange-100" data-v-02dac36f><span class="text-xs font-bold uppercase tracking-wider" data-v-02dac36f>Alertas Activas</span><span class="p-2 bg-white/20 text-white rounded-xl relative" data-v-02dac36f><span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" data-v-02dac36f></span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-02dac36f></path></svg></span></div><div class="mt-4" data-v-02dac36f><p class="text-3xl font-extrabold" data-v-02dac36f>${ssrInterpolate(unref(data).kpis.activeAlerts)}</p><p class="text-[10px] text-orange-100 font-medium mt-1" data-v-02dac36f>Requiere atenci\xF3n TI</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-02dac36f><div class="glass-card p-6 lg:col-span-2 flex flex-col justify-between min-h-[400px] relative overflow-hidden" data-v-02dac36f><div data-v-02dac36f><h2 class="text-lg font-bold text-slate-800 flex items-center gap-2" data-v-02dac36f><span class="w-3 h-3 rounded-full bg-brand-purple animate-pulse" data-v-02dac36f></span> Geolocalizaci\xF3n Activa de la Flota (Colombia) </h2><p class="text-xs text-slate-400 mt-1" data-v-02dac36f>\xDAltima ubicaci\xF3n reportada por el agente de seguridad.</p></div><div class="flex-grow my-6 relative bg-slate-950/5 border border-slate-200/50 rounded-2xl min-h-[280px] flex items-center justify-center overflow-hidden" data-v-02dac36f><div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.08),rgba(255,255,255,0))]" data-v-02dac36f></div><div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" data-v-02dac36f></div><svg class="w-64 h-80 text-slate-300 opacity-60 pointer-events-none" viewBox="0 0 100 120" fill="currentColor" data-v-02dac36f><path d="M 50,5 C 53,8 54,12 55,16 C 58,18 62,17 65,19 C 68,22 66,28 69,32 C 73,35 78,33 81,37 C 84,41 82,46 80,51 C 77,54 75,58 72,61 C 67,65 63,68 60,72 C 58,76 59,82 58,87 C 56,92 53,96 50,100 C 47,105 45,110 42,115 C 39,114 36,112 34,109 C 32,106 31,102 32,98 C 33,93 35,89 36,84 C 36,80 34,76 33,72 C 31,69 29,66 28,63 C 27,58 28,52 26,47 C 23,44 20,42 18,39 C 21,37 24,38 27,36 C 30,32 33,28 36,24 C 39,21 42,17 44,13 C 46,9 47,6 50,5 Z" data-v-02dac36f></path></svg><div class="absolute top-[52%] left-[49%] group cursor-pointer" data-v-02dac36f><span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-emerald-500/30 animate-ping" data-v-02dac36f></span><div class="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-md" data-v-02dac36f></div></div><div class="absolute top-[40%] left-[38%] group cursor-pointer" data-v-02dac36f><span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-emerald-500/30 animate-ping" data-v-02dac36f></span><div class="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-md" data-v-02dac36f></div></div><div class="absolute top-[62%] left-[32%] group cursor-pointer" data-v-02dac36f><span class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-slate-400/30 animate-ping" data-v-02dac36f></span><div class="w-3 h-3 rounded-full bg-slate-400 border border-white shadow-md" data-v-02dac36f></div></div>`);
        if (unref(activeHoverLocation)) {
          _push(`<div class="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700 shadow-xl flex justify-between items-center transition-all duration-300 animate-slide-up" data-v-02dac36f><div class="space-y-1" data-v-02dac36f><div class="flex items-center gap-2" data-v-02dac36f><span class="font-extrabold text-sm text-brand-purple" data-v-02dac36f>${ssrInterpolate(unref(activeHoverLocation).hostname)}</span><span class="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700" data-v-02dac36f>${ssrInterpolate(unref(activeHoverLocation).ip)}</span></div><p class="text-xs text-slate-300" data-v-02dac36f>${ssrInterpolate(unref(activeHoverLocation).so)} \u2022 ${ssrInterpolate(unref(activeHoverLocation).ciudad)}</p></div><div class="text-right shrink-0" data-v-02dac36f><span class="${ssrRenderClass([unref(activeHoverLocation).estado === "En L\xEDnea" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-300 border border-slate-600", "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"])}" data-v-02dac36f>${ssrInterpolate(unref(activeHoverLocation).estado)}</span><p class="text-[9px] text-slate-400 mt-1" data-v-02dac36f>Ubicaci\xF3n por Telemetr\xEDa IP</p></div></div>`);
        } else {
          _push(`<div class="absolute bottom-4 left-4 right-4 text-center text-[10px] text-slate-400 italic bg-white/40 backdrop-blur-sm border border-slate-200/50 py-1 px-4 rounded-full pointer-events-none" data-v-02dac36f> Coloca el cursor sobre los pines para ver telemetr\xEDa e IP del dispositivo en vivo. </div>`);
        }
        _push(`</div><div class="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-400" data-v-02dac36f><span class="flex items-center gap-1.5" data-v-02dac36f><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" data-v-02dac36f></span> Bogot\xE1 y Medell\xEDn (Online) </span><span class="flex items-center gap-1.5" data-v-02dac36f><span class="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" data-v-02dac36f></span> Cali (Offline) </span></div></div><div class="glass-card p-6 flex flex-col justify-between" data-v-02dac36f><div class="space-y-1" data-v-02dac36f><h2 class="text-lg font-bold text-slate-800" data-v-02dac36f>Cola de Comandos</h2><p class="text-xs text-slate-400" data-v-02dac36f>Comandos transmitidos recientemente v\xEDa Socket.IO y API.</p></div><div class="flex-grow my-4 space-y-3 overflow-y-auto max-h-[300px] pr-1" data-v-02dac36f><!--[-->`);
        ssrRenderList(unref(data).commandsQueue, (cmd) => {
          _push(`<div class="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex items-start gap-3 transition-colors" data-v-02dac36f><div class="${ssrRenderClass([{
            "bg-red-50 text-red-600": cmd.tipo === "danger",
            "bg-blue-50 text-brand-blue": cmd.tipo === "info",
            "bg-emerald-50 text-emerald-600": cmd.tipo === "success",
            "bg-amber-50 text-amber-600": cmd.tipo === "warning"
          }, "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"])}" data-v-02dac36f>`);
          if (cmd.tipo === "danger") {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-02dac36f></path></svg>`);
          } else if (cmd.tipo === "info") {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-02dac36f></path></svg>`);
          } else if (cmd.tipo === "success") {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" data-v-02dac36f></path></svg>`);
          } else {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-02dac36f></path></svg>`);
          }
          _push(`</div><div class="flex-grow" data-v-02dac36f><div class="flex justify-between items-start" data-v-02dac36f><span class="font-bold text-xs text-slate-800" data-v-02dac36f>${ssrInterpolate(cmd.comando)}</span><span class="text-[9px] font-bold text-slate-400" data-v-02dac36f>${ssrInterpolate(cmd.fecha)}</span></div><p class="text-[11px] text-slate-500 mt-0.5" data-v-02dac36f>Destino: <span class="font-mono" data-v-02dac36f>${ssrInterpolate(cmd.dispositivo)}</span></p><div class="mt-2 flex justify-between items-center" data-v-02dac36f><span class="${ssrRenderClass([{
            "bg-slate-100 text-slate-600": cmd.estado === "Transmitido",
            "bg-green-100 text-green-700": cmd.estado === "Ejecutado"
          }, "inline-block px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider"])}" data-v-02dac36f>${ssrInterpolate(cmd.estado)}</span><span class="text-[8px] text-slate-400 font-mono" data-v-02dac36f>ID: CMD-00${ssrInterpolate(cmd.id)}</span></div></div></div>`);
        });
        _push(`<!--]--></div><div class="border-t border-slate-100 pt-3" data-v-02dac36f>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auditorias",
          class: "text-xs font-bold text-brand-purple hover:text-brand-purpleHover flex items-center justify-center gap-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ver todas las acciones remotas <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-02dac36f${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Ver todas las acciones remotas "),
                (openBlock(), createBlock("svg", {
                  class: "w-3.5 h-3.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-02dac36f><div class="glass-card p-6 lg:col-span-2 space-y-4" data-v-02dac36f><h2 class="text-lg font-bold text-slate-800 flex items-center gap-2" data-v-02dac36f><span class="w-2.5 h-2.5 rounded-full bg-brand-purple" data-v-02dac36f></span> Auditor\xEDa de Eventos Cr\xEDticos y Desvinculaciones </h2><div class="space-y-3" data-v-02dac36f><!--[-->`);
        ssrRenderList(unref(data).recentAudits, (log) => {
          _push(`<div class="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors" data-v-02dac36f><div class="${ssrRenderClass([log.accion.includes("Desvinculaci\xF3n") || log.accion.includes("Bloque") ? "bg-red-50 text-red-600" : "bg-violet-50 text-brand-purple", "p-2 rounded-xl shrink-0"])}" data-v-02dac36f><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-02dac36f></path></svg></div><div class="flex-grow" data-v-02dac36f><div class="flex justify-between items-start" data-v-02dac36f><h4 class="font-bold text-sm text-slate-800" data-v-02dac36f>${ssrInterpolate(log.accion)}</h4>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
          _push(`</div><p class="text-xs text-slate-500 mt-1 leading-relaxed" data-v-02dac36f>${ssrInterpolate(log.detalles)}</p><div class="flex gap-4 mt-2 text-[10px] text-slate-400 font-semibold" data-v-02dac36f><span data-v-02dac36f>Auditor: ${ssrInterpolate(log.usuario_auditor)}</span><span data-v-02dac36f>IP: ${ssrInterpolate(log.ip_origen || "127.0.0.1")}</span></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(data).recentAudits.length === 0) {
          _push(`<div class="text-center py-8 text-slate-400 text-sm" data-v-02dac36f> No hay registros de auditor\xEDa recientes. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="glass-card p-6 space-y-6" data-v-02dac36f><div data-v-02dac36f><h2 class="text-lg font-bold text-slate-800" data-v-02dac36f>Distribuci\xF3n de Flota</h2><p class="text-xs text-slate-400 mt-0.5" data-v-02dac36f>Estados de conexi\xF3n y tipos de dispositivos en Renova.</p></div><div class="space-y-4" data-v-02dac36f><!--[-->`);
        ssrRenderList(unref(data).statusDistribution, (item) => {
          _push(`<div class="space-y-1.5" data-v-02dac36f><div class="flex justify-between text-xs font-bold text-slate-600" data-v-02dac36f><span class="flex items-center gap-2" data-v-02dac36f><span class="${ssrRenderClass([{
            "bg-emerald-500": item.estado === "Asignado" || item.estado === "Disponible",
            "bg-slate-400": item.estado === "Inactivo",
            "bg-red-500": item.estado === "Bloqueado",
            "bg-amber-500": item.estado === "Mantenimiento" || item.estado === "En_mantenimiento"
          }, "w-2 h-2 rounded-full"])}" data-v-02dac36f></span> ${ssrInterpolate(item.estado.replace("_", " "))}</span><span data-v-02dac36f>${ssrInterpolate(item.count)} (${ssrInterpolate(Math.round(item.count / unref(data).kpis.totalDevices * 100))}%)</span></div><div class="w-full bg-slate-100 rounded-full h-2" data-v-02dac36f><div class="${ssrRenderClass([{
            "bg-emerald-500": item.estado === "Asignado" || item.estado === "Disponible",
            "bg-slate-400": item.estado === "Inactivo",
            "bg-red-500": item.estado === "Bloqueado",
            "bg-amber-500": item.estado === "Mantenimiento" || item.estado === "En_mantenimiento"
          }, "h-2 rounded-full transition-all duration-500"])}" style="${ssrRenderStyle({ width: `${item.count / unref(data).kpis.totalDevices * 100}%` })}" data-v-02dac36f></div></div></div>`);
        });
        _push(`<!--]--></div><div class="border-t border-slate-100 pt-5 space-y-3" data-v-02dac36f><h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-v-02dac36f>Sistemas Operativos</h3><div class="grid grid-cols-2 gap-4" data-v-02dac36f><div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5" data-v-02dac36f><span class="text-brand-blue bg-blue-50 p-1.5 rounded-lg" data-v-02dac36f><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z" data-v-02dac36f></path></svg></span><div data-v-02dac36f><p class="text-xs text-slate-400" data-v-02dac36f>Windows</p><p class="text-sm font-extrabold text-slate-800" data-v-02dac36f>100%</p></div></div><div class="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 opacity-60" data-v-02dac36f><span class="text-slate-600 bg-slate-100 p-1.5 rounded-lg" data-v-02dac36f><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-02dac36f><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" data-v-02dac36f></path></svg></span><div data-v-02dac36f><p class="text-xs text-slate-400" data-v-02dac36f>M\xF3viles / iOS</p><p class="text-sm font-extrabold text-slate-800" data-v-02dac36f>0%</p></div></div></div><p class="text-[10px] text-slate-400 text-center italic" data-v-02dac36f>Enrola dispositivos m\xF3viles desde la secci\xF3n &quot;Centro Enrolamiento&quot;.</p></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-02dac36f"]]);

export { index as default };
//# sourceMappingURL=index-BuCntlfy.mjs.map
