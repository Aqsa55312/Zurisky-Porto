<template>
  <div class="relative min-h-screen">
    <LoadingScreen :visible="loading" />
    <WebGLParticles />

    <!-- Global ambient background -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0 bg-grid" />
      <div class="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-orb" />
      <div class="absolute right-[-8rem] top-1/3 h-72 w-72 rounded-full bg-orb-secondary" />
      <div class="absolute bottom-[-10rem] left-[-6rem] h-80 w-[36rem] rounded-full bg-orb-purple" />
    </div>

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
  // Show the splash only on first load per session; skip fast for reduced motion.
  try {
    if (sessionStorage.getItem('portfolio-loaded') === '1') {
      loading.value = false
      return
    }
  } catch {
    // storage unavailable — still show the loader briefly
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.body.style.overflow = 'hidden'

  const done = (): void => {
    loading.value = false
    document.body.style.overflow = ''
    try {
      sessionStorage.setItem('portfolio-loaded', '1')
    } catch {
      // ignore
    }
  }

  if (reduced) {
    done()
  } else {
    window.setTimeout(done, 1500)
  }
})
</script>
