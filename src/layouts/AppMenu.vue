<script setup lang="ts">
import { useMenuStore } from "@str/menu.store";

// Store
const menuStore = useMenuStore()
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in menuStore.menuList" :key="index">
      <AppMenuItem :index :item />
    </template>
  </ul>
</template>
