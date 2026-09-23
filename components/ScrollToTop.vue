<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      :aria-label="$t('common.scrollToTop')"
      class="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5 dark:border-neutral-700 dark:bg-neutral-900/90"
      @click="scrollTop"
    >
      <Icon name="lucide:arrow-up" class="h-5 w-5" aria-hidden="true" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

const onScroll = (): void => {
  visible.value = window.scrollY > 600
}

const scrollTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
