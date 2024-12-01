<script setup lang="ts">
const title = import.meta.env.VITE_TITLE
const subtitle = import.meta.env.VITE_SUBTITLE
</script>

<template>
  <div class="layout-footer">
    {{ title }} - {{ subtitle }}
  </div>
</template>
