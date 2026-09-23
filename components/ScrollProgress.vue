<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    aria-hidden="true"
  >
    <div
      class="h-full origin-left bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)
let raf = 0

const update = (): void => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

const onScroll = (): void => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(raf)
})
</script>
