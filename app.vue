<template>
  <div class="relative min-h-screen bg-white text-neutral-900 antialiased dark:bg-[#0a0a0b] dark:text-neutral-100">
    <LoadingScreen :visible="loading" />
    <WebGLParticles />
    <ScrollProgress />

    <!-- Global ambient background -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0 bg-grid" />
      <div class="absolute -top-32 left-1/2 h-80 w-[24rem] -translate-x-1/2 rounded-full bg-orb sm:h-96 sm:w-[42rem]" />
      <div class="absolute right-[-8rem] top-1/3 h-52 w-52 rounded-full bg-orb-secondary sm:h-72 sm:w-72" />
      <div class="absolute bottom-[-10rem] left-[-6rem] h-60 w-[20rem] rounded-full bg-orb-purple sm:h-80 sm:w-[36rem]" />
    </div>

    <!-- Main site content container placed above fixed background layer -->
    <div class="relative z-10">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-white dark:focus:text-neutral-900"
      >
        {{ $t('skipToContent') }}
      </a>
      <Navbar />
      <main id="main-content">
        <NuxtPage />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  titleTemplate: (chunk) => {
    if (!chunk) return t('site.title')
    return chunk.includes('Zurisky Aqsa') ? chunk : `${chunk} | Zurisky Aqsa Firmansyah`
  }
})

const loading = ref(true)

onMounted(() => {
  // Always play the splash on every page load/refresh.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.body.style.overflow = 'hidden'

  const done = (): void => {
    loading.value = false
    document.body.style.overflow = ''
  }

  if (reduced) {
    done()
  } else {
    window.setTimeout(done, 1500)
  }
})
</script>
