<template>
  <div>
    <div class="grid gap-4 sm:grid-cols-2">
      <button
        v-for="(img, i) in images"
        :key="img.src"
        type="button"
        class="card group relative aspect-[16/10] overflow-hidden p-0 text-left"
        :aria-label="$t('detail.openImage', { current: i + 1, total: images.length, alt: img.alt })"
        @click="open(i)"
      >
        <img
          :src="currentSrc(img.src, i)"
          :alt="img.alt"
          :loading="i === 0 ? 'eager' : 'lazy'"
          decoding="async"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          @error="markBroken(i)"
        >
        <span class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900">
            <Icon name="lucide:expand" class="h-5 w-5" aria-hidden="true" />
          </span>
        </span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[90] flex flex-col bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('detail.galleryLabel')"
          @click.self="close"
        >
          <div class="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p class="font-mono text-sm" aria-live="polite">{{ activeIndex + 1 }} / {{ images.length }}</p>
            <button
              ref="closeBtn"
              type="button"
              :aria-label="$t('detail.closeGallery')"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              @click="close"
            >
              <Icon name="lucide:x" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div class="flex flex-1 items-center justify-center gap-2 px-2 pb-2 sm:gap-4 sm:px-6">
            <button
              type="button"
              :aria-label="$t('detail.prevImage')"
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              :disabled="images.length <= 1"
              @click="prev"
            >
              <Icon name="lucide:chevron-left" class="h-5 w-5" aria-hidden="true" />
            </button>
            <figure class="flex max-h-[75vh] max-w-5xl flex-1 items-center justify-center">
              <img
                :key="images[activeIndex]?.src"
                :src="currentSrc(images[activeIndex]?.src ?? '', activeIndex)"
                :alt="images[activeIndex]?.alt ?? ''"
                class="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                draggable="false"
              >
            </figure>
            <button
              type="button"
              :aria-label="$t('detail.nextImage')"
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              :disabled="images.length <= 1"
              @click="next"
            >
              <Icon name="lucide:chevron-right" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p class="px-6 pb-6 text-center text-sm text-neutral-300">{{ images[activeIndex]?.alt }}</p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProjectImage } from '~/types'

const props = defineProps<{ images: ProjectImage[] }>()

const PLACEHOLDER = '/images/placeholder.svg'
const broken = ref<Set<number>>(new Set())
const lightboxOpen = ref(false)
const activeIndex = ref(0)
const closeBtn = ref<HTMLButtonElement | null>(null)
const touchX = ref<number | null>(null)

const currentSrc = (src: string, i: number): string => (broken.value.has(i) ? PLACEHOLDER : src)

const markBroken = (i: number): void => {
  broken.value = new Set(broken.value).add(i)
}

const open = (i: number): void => {
  activeIndex.value = i
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => closeBtn.value?.focus())
}

const close = (): void => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const prev = (): void => {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

const next = (): void => {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

const onKey = (e: KeyboardEvent): void => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

const onTouchStart = (e: TouchEvent): void => {
  touchX.value = e.touches[0]?.clientX ?? null
}

const onTouchEnd = (e: TouchEvent): void => {
  if (touchX.value === null) return
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.value
  if (Math.abs(dx) > 40) {
    if (dx > 0) prev()
    else next()
  }
  touchX.value = null
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
