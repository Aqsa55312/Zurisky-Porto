<template>
  <Transition name="loader">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-6 dark:bg-[#0a0a0b]"
      role="status"
      :aria-label="`${$t('loading.loading')} ${progress}%`"
    >
      <div class="relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
        <span class="absolute inset-0 rounded-2xl border border-neutral-200 dark:border-neutral-800" />
        <span class="loader-ring absolute inset-0 rounded-2xl" />
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-2xl font-bold text-white dark:bg-white dark:text-neutral-900">
          Z
        </span>
      </div>

      <p class="mt-6 text-sm font-semibold tracking-tight">zurisky<span class="text-neutral-400">.dev</span></p>
      <p class="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{{ $t('loading.tagline') }}</p>

      <!-- Pixel runner track -->
      <div class="relative mt-8 w-56 max-w-full" aria-hidden="true">
        <div class="runner" :style="{ left: `calc(${progress}% - 15px)` }">
          <span class="runner-sprite" :style="{ boxShadow: spriteShadow }" />
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div class="loader-bar h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500" :style="{ width: `${progress}%` }" />
        </div>
        <div class="runner-ground" />
      </div>
      <p class="mt-3 font-mono text-sm font-bold tabular-nums text-neutral-700 dark:text-neutral-200" aria-hidden="true">
        {{ progress }}%
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ visible?: boolean }>(), { visible: true })

// Original 10x12 pixel runner (two leg frames). Not affiliated with any game character.
const PX = 3
const COLORS: Record<string, string> = {
  H: '#2b2440',
  S: '#f0c39a',
  T: '#7c5cff',
  P: '#26263a',
  W: '#f4f4f8'
}
const BODY = [
  '...HHHH...',
  '..HHHHHH..',
  '..HSSSSH..',
  '..HSSSSH..',
  '...SSSS...',
  '..TTTTTT..',
  '.STTTTTTS.',
  '.STTTTTTS.',
  '..TTTTTT..'
]
const LEGS_A = ['...PPPP...', '...PP.PP...', '..WWW.WWW.']
const LEGS_B = ['...PPPP...', '....PPPP...', '...WWW.WWW.']

function frameShadow(legs: string[]): string {
  const parts: string[] = []
  const rows = [...BODY, ...legs]
  rows.forEach((row, y) => {
    ;[...row].forEach((ch, x) => {
      const c = COLORS[ch]
      if (c) parts.push(`${x * PX}px ${y * PX}px 0 ${PX}px ${c}`)
    })
  })
  return parts.join(',')
}

const SHADOW_A = frameShadow(LEGS_A)
const SHADOW_B = frameShadow(LEGS_B)

const progress = ref(0)
const frameB = ref(false)
const spriteShadow = computed(() => (frameB.value ? SHADOW_B : SHADOW_A))

let raf = 0
let lastFrameSwitch = 0
const RUN_DURATION = 1350

const stop = (): void => {
  cancelAnimationFrame(raf)
}

watch(
  () => props.visible,
  (v: boolean) => {
    if (!v) stop()
  }
)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 100
    return
  }
  const start = performance.now()
  lastFrameSwitch = start
  const tick = (now: number): void => {
    const elapsed = now - start
    progress.value = Math.min(100, Math.round((elapsed / RUN_DURATION) * 100))
    if (now - lastFrameSwitch > 140) {
      frameB.value = !frameB.value
      lastFrameSwitch = now
    }
    if (elapsed < RUN_DURATION) {
      raf = requestAnimationFrame(tick)
    } else {
      progress.value = 100
    }
  }
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  stop()
})

defineExpose({ progress })
</script>

<style scoped>
.runner {
  position: absolute;
  bottom: 100%;
  margin-bottom: 6px;
  width: 30px;
  height: 36px;
}
.runner-sprite {
  display: block;
  width: 3px;
  height: 3px;
}

.runner-ground {
  height: 8px;
  margin-top: 10px;
  border-radius: 4px;
  background-image: repeating-linear-gradient(
    90deg,
    hsl(250 85% 65% / 0.75) 0 8px,
    transparent 8px 16px,
    hsl(0 0% 50% / 0.3) 16px 20px,
    transparent 20px 32px
  );
  animation: ground-scroll 0.5s linear infinite;
}
@keyframes ground-scroll {
  to {
    background-position-x: -32px;
  }
}

.loader-ring {
  border: 1px solid transparent;
  border-top-color: currentColor;
  opacity: 0.35;
  animation: loader-spin 1.1s linear infinite;
}

.loader-bar {
  transition: width 0.1s linear;
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
  .loader-ring,
  .runner-ground {
    animation: none;
  }
}
</style>
