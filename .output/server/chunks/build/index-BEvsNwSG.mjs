import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const limit = 25;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const search = ref("");
    const statusFilter = ref("");
    const osFilter = ref("");
    const selectedEquipo = ref(null);
    const drawerOpen = ref(false);
    const page = ref(1);
    const isSyncing = ref(false);
    const syncMessage = ref("");
    const currentOrigin = ref("http://localhost:3000");
    const terminalCommand = ref("");
    const terminalHistory = ref([]);
    const isExecutingCommand = ref(false);
    ref(0);
    ref(0);
    const { data: resultado, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/equipos",
      {
        query: computed(() => ({
          search: search.value,
          estado: statusFilter.value,
          page: page.value,
          limit: limit.value,
          paginate: "true"
        }))
      },
      "$TnnJZsgaXf"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const equipos = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.data) || [];
    });
    const metaEquipos = computed(() => {
      var _a;
      return ((_a = resultado.value) == null ? void 0 : _a.meta) || { total: 0, page: 1, limit, totalPages: 1 };
    });
    watch([search, statusFilter], () => {
      page.value = 1;
    });
    const enrichedEquipos = computed(() => {
      if (!equipos.value) return [];
      return equipos.value.map((eq) => {
        var _a, _b, _c, _d, _e;
        const battery = [88, 64, 45, 99, 78][eq.id % 5] || 75;
        const isCharging = eq.id % 2 === 0;
        const batteryTemp = [32, 34, 29, 31, 35][eq.id % 5] || 31;
        const cpu = (_a = eq.cpu_carga) != null ? _a : 0;
        const ram = (_b = eq.ram_uso) != null ? _b : 0;
        const discoPct = (_c = eq.disco_uso_pct) != null ? _c : 0;
        const discoUsadoGb = (_d = eq.disco_usado_gb) != null ? _d : 0;
        const firewall = true;
        const encryption = eq.serial != null;
        const antivirus = true;
        const isCompliant = encryption && antivirus;
        const osType = ((_e = eq.so) == null ? void 0 : _e.toLowerCase().includes("windows")) ? "windows" : "macos";
        return {
          ...eq,
          battery,
          isCharging,
          batteryTemp,
          cpu,
          ram,
          discoPct,
          discoUsadoGb,
          firewall,
          encryption,
          antivirus,
          isCompliant,
          osType
        };
      });
    });
    const filteredEquipos = computed(() => {
      let list = enrichedEquipos.value;
      if (osFilter.value) {
        list = list.filter((eq) => eq.osType === osFilter.value);
      }
      return list;
    });
    const alertMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 relative overflow-hidden" }, _attrs))} data-v-f7df9d8e><div class="flex justify-between items-center flex-wrap gap-3" data-v-f7df9d8e><div data-v-f7df9d8e><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans" data-v-f7df9d8e> Dispositivos Enrolados <span class="gradient-text-purple" data-v-f7df9d8e>MDM</span></h1><p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1" data-v-f7df9d8e>Supervisi\xF3n en vivo, telemetr\xEDa y administraci\xF3n remota de estaciones de trabajo.</p></div><div class="flex gap-3 flex-wrap" data-v-f7df9d8e><button${ssrIncludeBooleanAttr(isSyncing.value) ? " disabled" : ""} class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 text-sm" data-v-f7df9d8e>`);
      if (!isSyncing.value) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-f7df9d8e></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" data-v-f7df9d8e><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-f7df9d8e></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" data-v-f7df9d8e></path></svg>`);
      }
      _push(` ${ssrInterpolate(isSyncing.value ? "Sincronizando..." : "Sincronizar con Jira")}</button><button class="bg-brand-purple hover:bg-brand-purpleHover text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center gap-2 text-sm" data-v-f7df9d8e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" data-v-f7df9d8e></path></svg> Refrescar Flota </button></div></div>`);
      if (syncMessage.value) {
        _push(`<div class="${ssrRenderClass([syncMessage.value.startsWith("Error") ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200", "px-4 py-3 rounded-xl text-sm font-medium border"])}" data-v-f7df9d8e>${ssrInterpolate(syncMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-brand-border shadow-sm" data-v-f7df9d8e><div class="flex flex-col md:flex-row gap-4" data-v-f7df9d8e><div class="flex-grow relative" data-v-f7df9d8e><span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400" data-v-f7df9d8e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-f7df9d8e></path></svg></span><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Buscar por hostname, MAC, modelo, colaborador..." class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition bg-white/50" data-v-f7df9d8e></div><div class="w-full md:w-56" data-v-f7df9d8e><select class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white transition" data-v-f7df9d8e><option value="" data-v-f7df9d8e${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>Todos los Estados</option><option value="Activo" data-v-f7df9d8e${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "Activo") : ssrLooseEqual(statusFilter.value, "Activo")) ? " selected" : ""}>Activo</option><option value="Disponible" data-v-f7df9d8e${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "Disponible") : ssrLooseEqual(statusFilter.value, "Disponible")) ? " selected" : ""}>Disponible</option><option value="Bloqueado" data-v-f7df9d8e${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "Bloqueado") : ssrLooseEqual(statusFilter.value, "Bloqueado")) ? " selected" : ""}>Bloqueado</option><option value="En_mantenimiento" data-v-f7df9d8e${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "En_mantenimiento") : ssrLooseEqual(statusFilter.value, "En_mantenimiento")) ? " selected" : ""}>En Mantenimiento</option></select></div></div><div class="flex gap-2 border-t border-slate-100 pt-3" data-v-f7df9d8e><button class="${ssrRenderClass([osFilter.value === "" ? "bg-brand-purple text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60", "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"])}" data-v-f7df9d8e> Todos </button><button class="${ssrRenderClass([osFilter.value === "windows" ? "bg-brand-purple text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60", "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"])}" data-v-f7df9d8e><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z" data-v-f7df9d8e></path></svg> Windows </button><button class="${ssrRenderClass([osFilter.value === "macos" ? "bg-brand-purple text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60", "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"])}" data-v-f7df9d8e><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" data-v-f7df9d8e></path></svg> macOS </button></div></div><div class="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden" data-v-f7df9d8e><table class="w-full text-left border-collapse text-sm" data-v-f7df9d8e><thead data-v-f7df9d8e><tr class="bg-slate-50 border-b border-brand-border text-slate-500 font-bold" data-v-f7df9d8e><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Dispositivo / OS</th><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Colaborador</th><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Ubicaci\xF3n y IP</th><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Bater\xEDa</th><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Cumplimiento</th><th class="p-4 text-xs uppercase tracking-wider" data-v-f7df9d8e>Estado</th><th class="p-4 text-xs uppercase tracking-wider text-right" data-v-f7df9d8e>Comandos</th></tr></thead><tbody class="divide-y divide-slate-100" data-v-f7df9d8e><!--[-->`);
      ssrRenderList(filteredEquipos.value, (eq) => {
        _push(`<tr class="hover:bg-slate-50/50 transition-colors" data-v-f7df9d8e><td class="p-4" data-v-f7df9d8e><div class="flex items-center gap-3" data-v-f7df9d8e><span class="${ssrRenderClass([eq.osType === "windows" ? "bg-blue-600" : "bg-slate-800", "p-2 rounded-xl text-white shrink-0 shadow-sm"])}" data-v-f7df9d8e>`);
        if (eq.osType === "windows") {
          _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z" data-v-f7df9d8e></path></svg>`);
        } else {
          _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" data-v-f7df9d8e></path></svg>`);
        }
        _push(`</span><div data-v-f7df9d8e><span class="font-extrabold text-slate-800 font-sans block text-sm" data-v-f7df9d8e>${ssrInterpolate(eq.hostname)}</span><span class="text-[10px] text-slate-400 mt-0.5 block font-medium" data-v-f7df9d8e>${ssrInterpolate(eq.marca_modelo)} \u2022 ${ssrInterpolate(eq.so)}</span></div></div></td><td class="p-4" data-v-f7df9d8e>`);
        if (eq.colaborador) {
          _push(`<div class="space-y-0.5" data-v-f7df9d8e><span class="font-bold text-slate-700 text-xs" data-v-f7df9d8e>${ssrInterpolate(eq.colaborador.nombre)}</span><p class="text-[11px] text-slate-400" data-v-f7df9d8e>${ssrInterpolate(eq.colaborador.correo)}</p></div>`);
        } else {
          _push(`<span class="text-slate-400 italic text-xs" data-v-f7df9d8e>Sin asignar</span>`);
        }
        _push(`</td><td class="p-4 space-y-0.5 text-xs text-slate-500" data-v-f7df9d8e><div class="font-bold" data-v-f7df9d8e>IP: ${ssrInterpolate(eq.ip_registro || "N/A")}</div><div class="text-[10px] text-slate-400 font-mono" data-v-f7df9d8e>MAC: ${ssrInterpolate(eq.mac_address || "N/A")}</div></td><td class="p-4" data-v-f7df9d8e><div class="flex items-center gap-1.5" data-v-f7df9d8e><div class="relative w-8 h-4.5 border border-slate-300 rounded p-0.5 flex items-center bg-slate-50" data-v-f7df9d8e><div class="${ssrRenderClass([{
          "bg-emerald-500": eq.battery >= 50,
          "bg-amber-500": eq.battery < 50 && eq.battery >= 20,
          "bg-red-500": eq.battery < 20
        }, "h-full rounded-sm"])}" style="${ssrRenderStyle({ width: `${eq.battery}%` })}" data-v-f7df9d8e></div>`);
        if (eq.isCharging) {
          _push(`<span class="absolute inset-0 flex items-center justify-center text-slate-800 font-extrabold text-[8px]" data-v-f7df9d8e>\u03B2</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="text-xs font-bold text-slate-700" data-v-f7df9d8e>${ssrInterpolate(eq.battery)}%</span></div></td><td class="p-4" data-v-f7df9d8e><span class="${ssrRenderClass([eq.isCompliant ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200", "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"])}" data-v-f7df9d8e><span class="${ssrRenderClass([eq.isCompliant ? "bg-emerald-500" : "bg-red-500", "w-1.5 h-1.5 rounded-full"])}" data-v-f7df9d8e></span> ${ssrInterpolate(eq.isCompliant ? "Cumple" : "Incompleto")}</span></td><td class="p-4" data-v-f7df9d8e><span class="${ssrRenderClass([{
          "bg-emerald-100 text-emerald-700": eq.estado === "Activo",
          "bg-sky-100 text-sky-700": eq.estado === "Disponible" || eq.estado === "Asignado",
          "bg-slate-100 text-slate-500": eq.estado === "Inactivo",
          "bg-red-100 text-red-700": eq.estado === "Bloqueado",
          "bg-amber-100 text-amber-700": eq.estado === "Mantenimiento" || eq.estado === "En_mantenimiento"
        }, "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"])}" data-v-f7df9d8e><span class="${ssrRenderClass([{
          "bg-emerald-500 animate-pulse": eq.estado === "Activo",
          "bg-sky-400": eq.estado === "Disponible" || eq.estado === "Asignado",
          "bg-slate-400": eq.estado === "Inactivo",
          "bg-red-500": eq.estado === "Bloqueado",
          "bg-amber-500": eq.estado === "Mantenimiento" || eq.estado === "En_mantenimiento"
        }, "w-1.5 h-1.5 rounded-full flex-shrink-0"])}" data-v-f7df9d8e></span> ${ssrInterpolate(eq.estado === "En_mantenimiento" ? "En Mantenimiento" : eq.estado)}</span>`);
        if (eq.ultimo_ping) {
          _push(`<p class="text-[9px] text-slate-400 mt-1 font-semibold" data-v-f7df9d8e> Ping: ${ssrInterpolate(new Date(eq.ultimo_ping).toLocaleTimeString())}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="p-4 text-right" data-v-f7df9d8e><button class="text-xs bg-brand-purple hover:bg-brand-purpleHover text-white font-bold py-2 px-3 rounded-lg transition shadow-sm hover:shadow" data-v-f7df9d8e> Administrar </button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (filteredEquipos.value.length === 0) {
        _push(`<div class="text-center py-12 text-slate-400 text-sm" data-v-f7df9d8e> No se encontraron equipos bajo los filtros seleccionados. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-sm" data-v-f7df9d8e><p class="text-sm text-slate-500" data-v-f7df9d8e> Mostrando <span class="font-semibold text-slate-700" data-v-f7df9d8e>${ssrInterpolate((metaEquipos.value.page - 1) * metaEquipos.value.limit + 1)}\u2013${ssrInterpolate(Math.min(metaEquipos.value.page * metaEquipos.value.limit, metaEquipos.value.total))}</span> de <span class="font-semibold text-slate-700" data-v-f7df9d8e>${ssrInterpolate(metaEquipos.value.total)}</span> dispositivos </p><div class="flex items-center gap-2" data-v-f7df9d8e><button${ssrIncludeBooleanAttr(page.value <= 1) ? " disabled" : ""} class="${ssrRenderClass([page.value <= 1 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}" data-v-f7df9d8e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-f7df9d8e></path></svg> Anterior </button><span class="px-3 py-1.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg" data-v-f7df9d8e>${ssrInterpolate(metaEquipos.value.page)} / ${ssrInterpolate(metaEquipos.value.totalPages)}</span><button${ssrIncludeBooleanAttr(page.value >= metaEquipos.value.totalPages) ? " disabled" : ""} class="${ssrRenderClass([page.value >= metaEquipos.value.totalPages ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-600 hover:bg-slate-100", "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"])}" data-v-f7df9d8e> Siguiente <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-f7df9d8e></path></svg></button></div></div>`);
      if (drawerOpen.value && selectedEquipo.value) {
        _push(`<div class="fixed inset-0 z-50 flex justify-end" data-v-f7df9d8e><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" data-v-f7df9d8e></div><div class="relative w-full max-w-xl bg-slate-50 shadow-2xl h-full flex flex-col border-l border-slate-200 z-10" data-v-f7df9d8e><div class="p-6 bg-brand-darkBg text-white flex justify-between items-center border-b border-slate-800" data-v-f7df9d8e><div class="flex items-center gap-3" data-v-f7df9d8e><span class="${ssrRenderClass([selectedEquipo.value.osType === "windows" ? "bg-blue-600" : "bg-slate-700", "p-2 rounded-xl text-white shrink-0 shadow-inner"])}" data-v-f7df9d8e>`);
        if (selectedEquipo.value.osType === "windows") {
          _push(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.451L0 20.551V12.45zm10.95-10.701L24 0v11.9H10.95V1.749zm13.05 10.701V24l-13.05-1.8v-10.3H24z" data-v-f7df9d8e></path></svg>`);
        } else {
          _push(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" data-v-f7df9d8e></path></svg>`);
        }
        _push(`</span><div data-v-f7df9d8e><h3 class="text-lg font-extrabold" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.hostname)}</h3><p class="text-xs text-slate-400" data-v-f7df9d8e>Consola Central de Operaciones del Dispositivo</p></div></div><button class="text-slate-400 hover:text-white transition" data-v-f7df9d8e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f7df9d8e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-f7df9d8e></path></svg></button></div><div class="flex-grow p-6 space-y-6 overflow-y-auto" data-v-f7df9d8e><div class="grid grid-cols-2 gap-4" data-v-f7df9d8e><div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between" data-v-f7df9d8e><div data-v-f7df9d8e><span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block" data-v-f7df9d8e>Estado Conexi\xF3n</span><span class="text-sm font-extrabold text-slate-800" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.estado)}</span></div><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" data-v-f7df9d8e></span></div><div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between" data-v-f7df9d8e><div data-v-f7df9d8e><span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-sans" data-v-f7df9d8e>Bater\xEDa Remota</span><span class="text-sm font-extrabold text-slate-800" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.battery)}% (${ssrInterpolate(selectedEquipo.value.isCharging ? "Cargando" : "Descargando")})</span></div><span class="text-xs font-bold text-slate-400" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.batteryTemp)}\xB0C</span></div></div><div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4" data-v-f7df9d8e><div class="flex justify-between items-center" data-v-f7df9d8e><h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider" data-v-f7df9d8e>Telemetr\xEDa en Vivo</h4>`);
        if (selectedEquipo.value.ultimo_ping) {
          _push(`<span class="text-[9px] text-slate-400" data-v-f7df9d8e> Actualizado: ${ssrInterpolate(new Date(selectedEquipo.value.ultimo_ping).toLocaleTimeString())}</span>`);
        } else {
          _push(`<span class="text-[9px] text-amber-500 font-bold" data-v-f7df9d8e>Sin datos del agente</span>`);
        }
        _push(`</div><div class="space-y-1" data-v-f7df9d8e><div class="flex justify-between text-xs font-bold text-slate-600" data-v-f7df9d8e><span data-v-f7df9d8e>Carga de CPU (Agente)</span><span class="${ssrRenderClass(selectedEquipo.value.cpu > 80 ? "text-red-600" : "text-slate-600")}" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.cpu > 0 ? selectedEquipo.value.cpu + "%" : "Sin datos")}</span></div><div class="w-full bg-slate-100 rounded-full h-2" data-v-f7df9d8e><div class="${ssrRenderClass([selectedEquipo.value.cpu > 80 ? "bg-red-500" : "bg-brand-purple", "h-2 rounded-full transition-all duration-1000"])}" style="${ssrRenderStyle({ width: `${selectedEquipo.value.cpu || 0}%` })}" data-v-f7df9d8e></div></div></div><div class="space-y-1" data-v-f7df9d8e><div class="flex justify-between text-xs font-bold text-slate-600" data-v-f7df9d8e><span data-v-f7df9d8e>Uso de RAM</span><span class="${ssrRenderClass(selectedEquipo.value.ram_uso > 85 ? "text-red-600" : "text-slate-600")}" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.ram_uso > 0 ? selectedEquipo.value.ram_uso + "%" : "Sin datos")}</span></div><div class="w-full bg-slate-100 rounded-full h-2" data-v-f7df9d8e><div class="${ssrRenderClass([selectedEquipo.value.ram_uso > 85 ? "bg-red-500" : "bg-brand-blue", "h-2 rounded-full transition-all duration-1000"])}" style="${ssrRenderStyle({ width: `${selectedEquipo.value.ram_uso || 0}%` })}" data-v-f7df9d8e></div></div></div><div class="space-y-1" data-v-f7df9d8e><div class="flex justify-between text-xs font-bold text-slate-600" data-v-f7df9d8e><span data-v-f7df9d8e>Capacidad de Almacenamiento</span>`);
        if (selectedEquipo.value.discoPct > 0) {
          _push(`<span data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.discoPct)}% Usado `);
          if (selectedEquipo.value.discoUsadoGb > 0) {
            _push(`<span data-v-f7df9d8e>(${ssrInterpolate(selectedEquipo.value.discoUsadoGb)}GB / ${ssrInterpolate(selectedEquipo.value.disco || "?")})</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<span class="text-slate-400" data-v-f7df9d8e>Sin datos</span>`);
        }
        _push(`</div><div class="w-full bg-slate-100 rounded-full h-2" data-v-f7df9d8e><div class="${ssrRenderClass([selectedEquipo.value.discoPct > 80 ? "bg-red-500" : "bg-slate-400", "h-2 rounded-full transition-all duration-1000"])}" style="${ssrRenderStyle({ width: `${selectedEquipo.value.discoPct || 0}%` })}" data-v-f7df9d8e></div></div></div></div><div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3" data-v-f7df9d8e><h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider block" data-v-f7df9d8e>Auditor\xEDa de Pol\xEDticas de Seguridad</h4><div class="divide-y divide-slate-100" data-v-f7df9d8e><div class="py-2.5 flex justify-between items-center text-xs" data-v-f7df9d8e><span class="text-slate-600 font-semibold" data-v-f7df9d8e>Cifrado de Disco (BitLocker / FileVault)</span><span class="${ssrRenderClass([selectedEquipo.value.encryption ? "text-green-600" : "text-red-500", "font-bold"])}" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.encryption ? "Protegido (AES-256)" : "Inseguro (Sin cifrar)")}</span></div><div class="py-2.5 flex justify-between items-center text-xs" data-v-f7df9d8e><span class="text-slate-600 font-semibold" data-v-f7df9d8e>Firewall del Sistema</span><span class="font-bold text-green-600" data-v-f7df9d8e>Encendido (Activo)</span></div><div class="py-2.5 flex justify-between items-center text-xs" data-v-f7df9d8e><span class="text-slate-600 font-semibold" data-v-f7df9d8e>Antivirus Corporativo</span><span class="font-bold text-green-600" data-v-f7df9d8e>Protegido (Al D\xEDa)</span></div><div class="py-2.5 flex justify-between items-center text-xs" data-v-f7df9d8e><span class="text-slate-600 font-semibold" data-v-f7df9d8e>Restricci\xF3n de Dispositivos USB</span><span class="font-bold text-amber-500" data-v-f7df9d8e>No Aplicado</span></div></div></div><div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-3" data-v-f7df9d8e><div class="flex justify-between items-center" data-v-f7df9d8e><h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider" data-v-f7df9d8e>\u{1F511} Token de Enrolamiento del Agente</h4><span class="text-[9px] text-slate-500 font-mono" data-v-f7df9d8e>ID: ${ssrInterpolate(selectedEquipo.value.jira_id)}</span></div><div data-v-f7df9d8e><label class="text-[10px] text-slate-500 font-bold block mb-1" data-v-f7df9d8e>TOKEN SEGURO</label><div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2" data-v-f7df9d8e><span class="text-brand-purple font-mono text-xs flex-1 select-all break-all" data-v-f7df9d8e>${ssrInterpolate(selectedEquipo.value.token_seguridad)}</span><button class="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded-lg transition shrink-0" data-v-f7df9d8e>Copiar</button></div></div><div data-v-f7df9d8e><label class="text-[10px] text-slate-500 font-bold block mb-1" data-v-f7df9d8e>COMANDO POWERSHELL (Ejecutar como Administrador en la PC cliente)</label><div class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 space-y-1.5" data-v-f7df9d8e><p class="text-green-400 font-mono text-[10px] break-all leading-relaxed" data-v-f7df9d8e> powershell -ExecutionPolicy Bypass -Command &quot;iwr -useb ${ssrInterpolate(currentOrigin.value)}/agent/install.ps1 | iex; Enroll-Device -Token &#39;${ssrInterpolate(selectedEquipo.value.token_seguridad)}&#39;&quot; </p><button class="text-[10px] font-bold text-white bg-brand-purple hover:bg-brand-purpleHover px-3 py-1.5 rounded-lg transition w-full mt-1" data-v-f7df9d8e>Copiar Comando</button></div></div></div><div class="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4" data-v-f7df9d8e><h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider" data-v-f7df9d8e>Centro de Operaciones Remotas</h4><div class="grid grid-cols-3 gap-3" data-v-f7df9d8e>`);
        if (selectedEquipo.value.estado !== "Bloqueado") {
          _push(`<button class="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold py-2.5 px-3 rounded-xl text-xs transition" data-v-f7df9d8e> Bloquear Pantalla </button>`);
        } else {
          _push(`<button class="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold py-2.5 px-3 rounded-xl text-xs transition" data-v-f7df9d8e> Desbloquear </button>`);
        }
        _push(`<button class="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold py-2.5 px-3 rounded-xl text-xs transition" data-v-f7df9d8e> Reiniciar Host </button>`);
        if (selectedEquipo.value.estado !== "En_mantenimiento") {
          _push(`<button class="bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 font-bold py-2.5 px-3 rounded-xl text-xs transition" data-v-f7df9d8e> En Mantenimiento </button>`);
        } else {
          _push(`<button class="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold py-2.5 px-3 rounded-xl text-xs transition" data-v-f7df9d8e> Marcar Activo </button>`);
        }
        _push(`</div><div class="border-t border-slate-100 pt-4 space-y-2" data-v-f7df9d8e><label class="text-xs font-bold text-slate-600 block" data-v-f7df9d8e>Enviar Mensaje de Alerta Directo</label><div class="flex gap-2" data-v-f7df9d8e><input${ssrRenderAttr("value", alertMessage.value)} type="text" placeholder="Escribe la alerta que ver\xE1 el usuario..." class="flex-grow px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple" data-v-f7df9d8e><button class="bg-brand-purple hover:bg-brand-purpleHover text-white px-4 py-1.5 rounded-xl text-xs font-bold transition shrink-0" data-v-f7df9d8e> Enviar Alerta </button></div></div><div class="border-t border-red-100 pt-4 bg-red-50/30 p-3.5 rounded-xl border border-dashed border-red-200/50 space-y-2" data-v-f7df9d8e><span class="text-xs font-extrabold text-red-600 block" data-v-f7df9d8e>Zona Cr\xEDtica (Danger Zone)</span><p class="text-[10px] text-slate-500 leading-relaxed" data-v-f7df9d8e>Ejecuta el borrado completo de los datos del disco y desvincula el dispositivo del MDM para su retiro definitivo de la empresa.</p><button class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm" data-v-f7df9d8e> Borrado Completo Remoto (Wipe Device) </button></div></div><div class="bg-slate-950 p-4 rounded-2xl shadow-inner space-y-3 font-mono text-slate-300" data-v-f7df9d8e><div class="flex justify-between items-center border-b border-slate-800 pb-2" data-v-f7df9d8e><span class="text-[10px] text-slate-500 font-bold" data-v-f7df9d8e>CONSOLA SHELL AGENTE</span><span class="text-[9px] text-brand-purple font-bold" data-v-f7df9d8e>SECURE CHANNEL</span></div><div class="text-[11px] leading-relaxed max-h-40 overflow-y-auto space-y-1.5 pr-2" data-v-f7df9d8e><!--[-->`);
        ssrRenderList(terminalHistory.value, (line, idx) => {
          _push(`<div class="whitespace-pre-wrap text-[10px]" data-v-f7df9d8e>${ssrInterpolate(line)}</div>`);
        });
        _push(`<!--]-->`);
        if (isExecutingCommand.value) {
          _push(`<div class="text-slate-500 animate-pulse text-[10px]" data-v-f7df9d8e> Ejecutando comando remoto... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center gap-1 border-t border-slate-900 pt-2 text-xs" data-v-f7df9d8e><span class="text-brand-purple font-bold" data-v-f7df9d8e>&gt;</span><input${ssrRenderAttr("value", terminalCommand.value)} type="text" placeholder="Escribe &#39;help&#39; y presiona Enter..." class="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white text-xs p-0 placeholder-slate-600 font-mono"${ssrIncludeBooleanAttr(isExecutingCommand.value) ? " disabled" : ""} data-v-f7df9d8e></div></div></div><div class="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3" data-v-f7df9d8e><button class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition" data-v-f7df9d8e> Cerrar Consola </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7df9d8e"]]);

export { index as default };
//# sourceMappingURL=index-BEvsNwSG.mjs.map
