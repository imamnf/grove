<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout'

// Action
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars" />
      </button>

      <RouterLink to="/" class="layout-topbar-logo">
        <span class="text-xl font-semibold">Grove</span>
      </RouterLink>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i class="pi" :class="[{ 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]" />
        </button>
      </div>

      <button
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
        class="layout-topbar-menu-button layout-topbar-action"
      >
        <i class="pi pi-ellipsis-v" />
      </button>

      <div class="hidden layout-topbar-menu lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-user" />

            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
