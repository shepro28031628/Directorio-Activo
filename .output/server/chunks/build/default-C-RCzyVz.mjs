import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderTeleport, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CQE0urBr.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CommandPalette",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const query = ref("");
    const quickActions = [
      { id: "act-emergency", title: "\u{1F6A8} Activar Modo Misi\xF3n Cr\xEDtica", category: "Acci\xF3n T\xE1ctica", route: null, action: "emergency" },
      { id: "act-sync", title: "\u26A1 Sincronizar Flota con Jira Assets", category: "Acci\xF3n T\xE1ctica", route: null, action: "sync" },
      { id: "nav-dashboard", title: "\u{1F4CA} Ir al Dashboard MDM", category: "Navegaci\xF3n", route: "/" },
      { id: "nav-ad", title: "\u{1F310} Ver Nodos de Active Directory & OUs", category: "Navegaci\xF3n", route: "/active-directory" },
      { id: "nav-[#equipos]", title: "\u{1F5A5}\uFE0F Administrar Dispositivos Enrolados", category: "Navegaci\xF3n", route: "/equipos" },
      { id: "nav-[#colaboradores]", title: "\u{1F465} Ver Directorio de Colaboradores", category: "Navegaci\xF3n", route: "/colaboradores" },
      { id: "nav-[#gpos]", title: "\u{1F6E1}\uFE0F Gestor de Pol\xEDticas GPO & Hardening", category: "Navegaci\xF3n", route: "/politicas" },
      { id: "nav-[#apps]", title: "\u{1F511} Matriz de Accesos y Permisos", category: "Navegaci\xF3n", route: "/aplicaciones" }
    ];
    const filteredResults = computed(() => {
      if (!query.value.trim()) return quickActions;
      const q = query.value.toLowerCase();
      return quickActions.filter(
        (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md" data-v-0ca7c274><div class="w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-scale-up" data-v-0ca7c274><div class="p-4 border-b border-slate-800 flex items-center gap-3" data-v-0ca7c274><svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0ca7c274><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-0ca7c274></path></svg><input${ssrRenderAttr("value", query.value)} type="text" placeholder="Escribe un comando o busca colaboradores, equipos, GPOs..." class="w-full bg-transparent text-white placeholder-slate-500 font-mono text-sm focus:outline-none" autofocus data-v-0ca7c274><span class="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400 shrink-0" data-v-0ca7c274>ESC para cerrar</span></div><div class="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar" data-v-0ca7c274><!--[-->`);
          ssrRenderList(filteredResults.value, (item) => {
            _push2(`<div class="p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group" data-v-0ca7c274><div class="flex items-center gap-3" data-v-0ca7c274><span class="text-sm font-medium text-slate-200 group-hover:text-violet-300 font-mono" data-v-0ca7c274>${ssrInterpolate(item.title)}</span></div><span class="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full" data-v-0ca7c274>${ssrInterpolate(item.category)}</span></div>`);
          });
          _push2(`<!--]-->`);
          if (filteredResults.value.length === 0) {
            _push2(`<div class="p-6 text-center text-xs text-slate-500 font-mono" data-v-0ca7c274> No se encontraron comandos o recursos coincidentes. </div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="p-3 border-t border-slate-800 bg-[#0B0F19] text-[10px] text-slate-400 flex justify-between items-center font-mono" data-v-0ca7c274><span data-v-0ca7c274>\u{1F4A1} Tip: Usa Cmd+K / Ctrl+K desde cualquier pantalla para acceder r\xE1pido</span><span data-v-0ca7c274>Directorio Activo Ren UX 2026</span></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommandPalette.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0ca7c274"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = ref(true);
    const isMobileMenuOpen = ref(false);
    const isEmergencyMode = ref(false);
    const isCommandPaletteOpen = ref(false);
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommandPalette = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[
          isDark.value ? "dark" : "",
          isEmergencyMode.value ? "emergency-mode" : ""
        ], "min-h-screen flex bg-[#0D1117] text-[#F0F6FC] font-sans transition-colors duration-200 relative"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommandPalette, {
        "is-open": isCommandPaletteOpen.value,
        onClose: ($event) => isCommandPaletteOpen.value = false
      }, null, _parent));
      if (isMobileMenuOpen.value) {
        _push(`<div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-30 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        isMobileMenuOpen.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64 bg-[#161B22] text-[#F0F6FC] flex flex-col fixed h-screen z-40 shadow-sm border-r border-[#30363D] transition-transform duration-200 ease-in-out"
      ])}"><div class="p-4 border-b border-[#30363D] flex items-center justify-between bg-[#161B22]"><div class="flex items-center gap-2.5"><div class="${ssrRenderClass([isEmergencyMode.value ? "bg-[#F85149]" : "bg-[#21262D] text-[#58A6FF] border border-[#30363D]", "w-8 h-8 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0"])}"><svg class="w-4 h-4 text-[#58A6FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div><div><h1 class="font-bold text-xs tracking-tight text-[#F0F6FC] flex items-center gap-1 font-mono"> ren / <span class="text-[#58A6FF]">directorio-activo</span></h1><span class="text-[10px] text-[#8B949E] block font-mono">MDM &amp; Active Directory</span></div></div><button class="lg:hidden text-[#8B949E] hover:text-[#F0F6FC] p-1 rounded-md"><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><nav class="flex-grow p-2 space-y-1 overflow-y-auto custom-scrollbar">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]",
        "exact-active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"${_scopeId}></path></svg> Dashboard MDM `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                })
              ])),
              createTextVNode(" Dashboard MDM ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/active-directory",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"${_scopeId}></path></svg> Nodos AD &amp; Core <span class="ml-auto text-[9px] bg-[#21262D] text-[#58A6FF] border border-[#30363D] px-1.5 py-0.5 rounded font-bold"${_scopeId}>AD</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                })
              ])),
              createTextVNode(" Nodos AD & Core "),
              createVNode("span", { class: "ml-auto text-[9px] bg-[#21262D] text-[#58A6FF] border border-[#30363D] px-1.5 py-0.5 rounded font-bold" }, "AD")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/colaboradores",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"${_scopeId}></path></svg> Colaboradores `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                })
              ])),
              createTextVNode(" Colaboradores ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/equipos",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> Dispositivos Enrolados `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                })
              ])),
              createTextVNode(" Dispositivos Enrolados ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/politicas",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg> Pol\xEDticas &amp; GPOs `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                })
              ])),
              createTextVNode(" Pol\xEDticas & GPOs ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/enrolamiento",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"${_scopeId}></path></svg> Centro Enrolamiento `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                })
              ])),
              createTextVNode(" Centro Enrolamiento ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/aplicaciones",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg> Matriz de Accesos `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                })
              ])),
              createTextVNode(" Matriz de Accesos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/anydesk",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> AnyDesk API <span class="ml-auto text-[9px] bg-[#21262D] text-[#58A6FF] border border-[#30363D] px-1.5 py-0.5 rounded font-bold"${_scopeId}>API</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                })
              ])),
              createTextVNode(" AnyDesk API "),
              createVNode("span", { class: "ml-auto text-[9px] bg-[#21262D] text-[#58A6FF] border border-[#30363D] px-1.5 py-0.5 rounded font-bold" }, "API")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/google/admin",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-5.625-3.75"${_scopeId}></path></svg> Google Workspace `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-5.625-3.75"
                })
              ])),
              createTextVNode(" Google Workspace ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/microsoft/admin",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"${_scopeId}></path></svg> Microsoft 365 `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                })
              ])),
              createTextVNode(" Microsoft 365 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auditorias",
        onClick: closeMobileMenu,
        class: "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-[#8B949E] hover:bg-[#21262D] hover:text-[#F0F6FC] group text-xs font-mono",
        "active-class": "bg-[#21262D] text-[#58A6FF] font-semibold border-l-2 border-[#58A6FF]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"${_scopeId}></path></svg> Bit\xE1cora Auditor\xEDa `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 shrink-0 text-[#8B949E] group-hover:text-[#58A6FF] transition-colors",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                })
              ])),
              createTextVNode(" Bit\xE1cora Auditor\xEDa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="p-3 border-t border-[#30363D] text-[10px] text-[#8B949E] text-center bg-[#0D1117] font-mono"> DIRECTORIO ACTIVO REN v3.0.0 \xA9 2026 </div></aside><div class="flex-1 lg:pl-64 flex flex-col min-h-screen w-full transition-all duration-200">`);
      if (isEmergencyMode.value) {
        _push(`<div class="bg-[#F85149] text-white py-2 px-4 text-xs font-mono font-bold flex items-center justify-between shadow-sm z-30"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-white animate-ping"></span><span>\u{1F6A8} MODO MISI\xD3N CR\xCDTICA ACTIVADO: SEGUIMIENTO EN TIEMPO REAL DE AMENAZAS &amp; DISPOSITIVOS EN RIESGO</span></div><button class="text-white hover:underline text-[10px] uppercase font-bold"> [ Desactivar ] </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="h-16 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-200"><div class="flex items-center gap-3"><button class="lg:hidden p-2 rounded-md text-[#8B949E] hover:bg-[#21262D] transition-colors"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><button class="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#0D1117] hover:bg-[#21262D] border border-[#30363D] text-[#8B949E] hover:text-[#F0F6FC] text-xs font-mono transition-colors"><svg class="w-4 h-4 shrink-0 text-[#8B949E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><span class="hidden sm:inline">Type <kbd class="px-1 py-0.5 bg-[#21262D] border border-[#30363D] rounded text-[10px] text-[#F0F6FC]">Cmd K</kbd> to search...</span></button><span class="hidden xl:flex text-xs font-semibold bg-[#3FB950]/10 text-[#3FB950] px-2.5 py-0.5 rounded-full border border-[#3FB950]/30 items-center gap-2 font-mono"><span class="w-2 h-2 rounded-full bg-[#3FB950] animate-ping"></span> AD Domain: ren.local (Online) </span></div><div class="flex items-center gap-2 sm:gap-3"><button class="${ssrRenderClass([isEmergencyMode.value ? "bg-[#F85149] text-white border-[#F85149] animate-pulse" : "gist-btn border-[#30363D] text-[#F85149] hover:bg-[#F85149]/10", "font-mono"])}"><span>\u{1F6A8}</span><span class="hidden sm:inline">Misi\xF3n Cr\xEDtica</span></button><button class="w-8 h-8 rounded-md flex items-center justify-center transition-colors border border-[#30363D] bg-[#21262D] text-[#F0F6FC] hover:bg-[#30363D]">`);
      if (!isDark.value) {
        _push(`<svg class="w-4 h-4 text-[#D29922] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4 text-[#F0F6FC] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button><div class="hidden sm:block text-right"><p class="text-xs font-bold text-[#F0F6FC] font-mono">Administrador TI</p><p class="text-[10px] text-[#8B949E] font-mono">admin@renconsultores.com.co</p></div><div class="w-8 h-8 rounded-md bg-[#21262D] text-[#58A6FF] flex items-center justify-center font-bold font-mono text-xs border border-[#30363D] shrink-0"> AD </div></div></header><main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-C-RCzyVz.mjs.map
