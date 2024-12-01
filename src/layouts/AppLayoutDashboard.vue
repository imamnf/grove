<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout';
import { useRoute } from 'vue-router/auto';

// State
const route = useRoute();
const outsideClickListener = ref<((event: Event) => void) | null>();

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive
  };
});

/**
 * Bind outside click listener to document. This will be used to detect outside clicks
 * to hide the sidebar when it is in overlay mode and active.
 */
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    /**
     * Function to be called when outside click is detected.
     * @param {Event} event - The event that triggered the outside click.
     */
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        resetMenu();
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};

/**
 * Unbinds the outside click listener from the document.
 */
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value);
    outsideClickListener.value = null;
  }
};

/**
 * Checks if the given event is outside the sidebar and topbar.
 * @param {Event} event - The event to check.
 * @returns {boolean} Whether the event is outside the sidebar and topbar.
 */
function isOutsideClicked(event: Event): boolean {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(
    (sidebarEl instanceof Node &&
      (sidebarEl.isSameNode(<Node>event.target) || sidebarEl.contains(<Node>event.target))) ||
    (topbarEl instanceof Node && (topbarEl.isSameNode(<Node>event.target) || topbarEl.contains(<Node>event.target)))
  );
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar />

    <AppSidebar />

    <div class="layout-main-container">
      <div class="layout-main">
        <div class="flex items-center justify-between mb-6">
          <h1 class="block text-4xl">{{ route.meta.title }}</h1>

          <!-- <DashboardAppBreadcrumb /> -->
        </div>

        <RouterView />
      </div>

      <AppFooter />
    </div>

    <div class="layout-mask" />
  </div>

  <Toast />
</template>
