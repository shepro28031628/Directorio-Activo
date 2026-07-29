<template>
  <div class="min-h-screen flex bg-brand-lightSurface text-slate-800 font-sans">
    <!-- Barra Lateral Oscura (Sidebar) -->
    <aside class="w-64 bg-brand-darkBg text-white flex flex-col fixed h-screen z-20 shadow-xl">
      <div class="p-6 border-b border-slate-700 flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-brand-pink flex items-center justify-center">
          <span class="text-white font-bold text-lg">A</span>
        </div>
        <h1 class="font-bold text-xl tracking-tight">Asset<span class="text-brand-pink">Control</span></h1>
      </div>
      
      <nav class="flex-grow p-4 space-y-1">
        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800"
          active-class="bg-brand-pink text-white font-semibold hover:bg-brand-pinkHover"
          exact-active-class="bg-brand-pink text-white font-semibold hover:bg-brand-pinkHover"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink 
          to="/devices" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800"
          active-class="bg-brand-pink text-white font-semibold hover:bg-brand-pinkHover"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Inventario de Activos
        </NuxtLink>

        <NuxtLink 
          to="/licenses" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800"
          active-class="bg-brand-pink text-white font-semibold hover:bg-brand-pinkHover"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Gestión de Licencias
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
        AssetControl v2.1.0 &copy; 2026
      </div>
    </aside>

    <!-- Área de Contenido Principal -->
    <div class="flex-1 pl-64 flex flex-col min-h-screen">
      <!-- Barra Superior de Utilidades -->
      <header class="h-16 bg-white border-b border-brand-border flex items-center justify-between px-8 sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <span class="text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Active Directory: Conectado
          </span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-sm font-bold">Administrador TI</p>
            <p class="text-xs text-slate-400">admin@assetcontrol.io</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </header>

      <!-- Renderizado de las Páginas -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
