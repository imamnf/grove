<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout';

/**
 * Get layout composition
 * @param {() => void} onMenuToggle - Menu toggle method
 * @param {() => void} toggleDarkMode - Dark mode toggle method
 * @param {boolean} isDarkTheme - Is dark theme mode
 */
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

/**
 * Data
 *
 * @property {boolean} isOpen - Is the add dialog open?
 */
const add = reactive({
  isOpen: false
});

/**
 * Open add transaction dialog
 */
const openAddTransactionDialog = () => {
  add.isOpen = true;
};
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
        <Button label="Add New" icon="pi pi-plus" size="small" @click="openAddTransactionDialog" />

        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]" />
        </button>
      </div>

      <button class="layout-topbar-menu-button layout-topbar-action" v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-fadeout',
        hideOnOutsideClick: true
      }">
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

  <AddTransactionDialog v-model:visible="add.isOpen" />
</template>
