<template>
  <button
    type="button"
    :aria-label="$t('common.language')"
    :title="$t('common.language')"
    class="inline-flex h-10 items-center gap-1 rounded-xl border border-neutral-200 bg-white px-2.5 text-xs font-semibold transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
    @click="cycle"
  >
    <Icon name="lucide:languages" class="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
    <span class="flex overflow-hidden rounded-md" aria-hidden="true">
      <span
        class="px-1.5 py-0.5 transition-colors"
        :class="locale === 'id' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-400'"
      >
        ID
      </span>
      <span
        class="px-1.5 py-0.5 transition-colors"
        :class="locale === 'en' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-400'"
      >
        EN
      </span>
    </span>
    <span class="sr-only">{{ locale === 'id' ? 'Bahasa Indonesia aktif — klik untuk English' : 'English active — click for Bahasa Indonesia' }}</span>
  </button>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const cycle = async (): Promise<void> => {
  await setLocale(locale.value === 'id' ? 'en' : 'id')
}
</script>
