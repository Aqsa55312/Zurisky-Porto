<template>
  <button
    type="button"
    :aria-label="isDark ? $t('common.switchToLight') : $t('common.switchToDark')"
    :title="isDark ? $t('common.switchToLight') : $t('common.switchToDark')"
    class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
    @click="toggleTheme"
  >
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>
