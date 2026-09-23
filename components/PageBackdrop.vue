<template>
  <div class="page-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden" :data-theme="theme" aria-hidden="true">
    <div class="backdrop-grid" />
    <div class="backdrop-blob backdrop-blob-a" />
    <div class="backdrop-blob backdrop-blob-b" />
    <div class="backdrop-blob backdrop-blob-c" />
  </div>
</template>

<script setup lang="ts">
export type BackdropTheme = 'nebula' | 'ocean' | 'aurora' | 'indigo'

withDefaults(defineProps<{ theme?: BackdropTheme }>(), { theme: 'nebula' })
</script>
