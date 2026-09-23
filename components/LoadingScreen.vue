<template>
  <Transition name="loader">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0b]"
      role="status"
      :aria-label="$t('loading.loading')"
    >
      <div class="relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
        <span class="absolute inset-0 rounded-2xl border border-neutral-200 dark:border-neutral-800" />
        <span class="loader-ring absolute inset-0 rounded-2xl" />
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 font-mono text-2xl font-bold text-white dark:bg-white dark:text-neutral-900">
          Z
        </span>
      </div>

      <p class="mt-6 font-mono text-sm font-semibold tracking-tight">zurisky<span class="text-neutral-400">.dev</span></p>
      <p class="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{{ $t('loading.tagline') }}</p>

      <div class="mt-6 h-1 w-48 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800" aria-hidden="true">
        <div class="loader-bar h-full rounded-full bg-neutral-900 dark:bg-white" :style="{ width: `${progress}%` }" />
      </div>
      <p class="mt-3 font-mono text-[11px] tabular-nums text-neutral-400" aria-hidden="true">{{ progress }}%</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ visible?: boolean }>(), { visible: true })

const progress = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

watch(
  () => props.visible,
  (v: boolean) => {
    if (!v && timer) {
      clearInterval(timer)
      timer = null
    }
  }
)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    progress.value = 100
    return
  }
  const step = (): void => {
    // Ease toward 90% while waiting; parent completes to 100 on hide.
    if (progress.value < 90) {
      progress.value = Math.min(90, progress.value + Math.ceil(Math.random() * 14))
    }
  }
  timer = setInterval(step, 160)
  step()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

defineExpose({ progress })
</script>

<style scoped>
.loader-ring {
  border: 1px solid transparent;
  border-top-color: currentColor;
  opacity: 0.35;
  animation: loader-spin 1.1s linear infinite;
}

.loader-bar {
  transition: width 0.25s ease;
}

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s ease;
}
.loader-leave-to,
.loader-enter-from {
  opacity: 0;
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-ring {
    animation: none;
  }
}
</style>
