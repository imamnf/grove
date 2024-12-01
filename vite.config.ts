import { fileURLToPath, URL } from 'node:url'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { getPascalCaseRouteName, VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    VueRouter({
      getRouteName: (routeNode) => {
        // Convert pascal case to kebab case
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z\d])([A-Z])/g, '$1-$2')
          .toLowerCase()
      },
    }),
    Vue(),
    Components({
      dirs: ['src/components', 'src/layouts'],
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      resolvers: [
        PrimeVueResolver(),
        (componentName) => {
          // Auto import `VueApexCharts`
          if (componentName === 'VueApexCharts') {
            return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
          }
        },
      ],
    }),
    VueDevTools(),
    ClientSideLayout({
      layoutDir: './src/layouts',
      importMode: 'async',
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'vee-validate', VueRouterAutoImports],
      dirs: ['./src/lib', './src/composables', './src/utils'],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/components/views', import.meta.url)),
      '@str': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@tp': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@tpStr': fileURLToPath(new URL('./src/types/stores', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    entries: ['./src/**/*.vue'],
    noDiscovery: true,
  },
  server: {
    port: 3000,
  },
})
