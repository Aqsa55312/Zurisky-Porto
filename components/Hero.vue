<template>
  <!-- Hero wrapper with its own local background layer -->
  <div
    ref="heroWrap"
    class="hero-section-wrapper relative overflow-hidden"
    @mousemove="onHeroMouseMove"
  >

    <!-- ── Background FX Layer ── -->
    <div ref="bgLayer" class="hero-bg-parallax pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <!-- Aurora gradient mesh -->
      <div class="hero-aurora" />

      <!-- Animated radial orbs -->
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="hero-orb hero-orb-3" />

      <!-- Floating frosted-glass shapes -->
      <div class="glass-shape glass-shape-1 hidden sm:block" />
      <div class="glass-shape glass-shape-2 hidden sm:block" />

      <!-- Sparse bokeh light dots -->
      <div class="bokeh-field" />

      <!-- Cursor-following glow spotlight -->
      <div class="spotlight" />

      <!-- Edge vignette to ground everything -->
      <div class="hero-vignette" />
    </div>

  <section class="container-site relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24" aria-label="Introduction" data-reveal-off>
    <!-- Left Column: Intro Text & Call to Action -->
    <div>
      <div class="reveal inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 py-1.5 pl-3 pr-4 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-indigo-300">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {{ $t('common.available') }}
      </div>

      <p class="reveal reveal-delay-1 mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">{{ $t('hero.eyebrow') }}</p>
      <h1 class="reveal reveal-delay-1 mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
        {{ profile.name }}
      </h1>
      <p class="reveal reveal-delay-1 mt-4 max-w-xl text-xl font-semibold leading-snug">
        <span class="text-shimmer" :aria-label="headlineFull" role="text"><span aria-hidden="true">{{ typedHeadline }}</span><span class="type-caret" aria-hidden="true" /></span>
      </p>
      <p class="reveal reveal-delay-2 mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ $t('hero.description') }}
      </p>

      <div class="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-3">
        <NuxtLink
          to="/projects"
          class="btn-glass-primary group inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white"
        >
          {{ $t('common.viewProjects') }}
          <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </NuxtLink>
        <a
          :href="profile.cvPath"
          download
          class="btn-glass group inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold text-neutral-800 dark:text-neutral-100"
        >
          <Icon name="lucide:download" class="h-4 w-4 text-indigo-500 transition-transform group-hover:translate-y-0.5 dark:text-indigo-300" aria-hidden="true" />
          {{ $t('common.downloadCV') }}
        </a>
      </div>

      <dl class="reveal reveal-delay-3 mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-neutral-200/80 pt-6 dark:border-white/10">
        <div class="stat-glass">
          <dd :ref="projectsTarget" class="text-2xl font-extrabold tabular-nums text-neutral-900 dark:text-white">{{ projectsDisplay }}{{ heroStats[0]?.suffix }}</dd>
          <dt class="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ $t('hero.stats.projects') }}</dt>
        </div>
        <div class="stat-glass">
          <dd :ref="techTarget" class="text-2xl font-extrabold tabular-nums text-neutral-900 dark:text-white">{{ techDisplay }}{{ heroStats[1]?.suffix }}</dd>
          <dt class="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ $t('hero.stats.technologies') }}</dt>
        </div>
        <div class="stat-glass">
          <dd :ref="rolesTarget" class="text-2xl font-extrabold tabular-nums text-neutral-900 dark:text-white">{{ rolesDisplay }}{{ heroStats[2]?.suffix }}</dd>
          <dt class="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ $t('hero.stats.roles') }}</dt>
        </div>
      </dl>
    </div>

    <!-- Right Column: Glass Photo Panel + Floating Chips -->
    <div class="reveal reveal-delay-2 relative">
      <div class="float-slower">
        <div
          ref="tiltScene"
          class="photo-tilt-scene relative"
          @mousemove="onTiltMove"
          @mouseleave="onTiltLeave"
        >
          <!-- Floating glass chips -->
          <div
            v-for="(chip, i) in chips"
            :key="chip.label"
            class="glass-chip absolute z-20 hidden items-center gap-2 rounded-full py-2 pl-2.5 pr-4 sm:flex"
            :class="[chip.position, i % 2 === 0 ? 'float-soft' : 'float-soft-delayed']"
            aria-hidden="true"
          >
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-indigo-600 dark:text-indigo-300">
              <Icon :name="chip.icon" class="h-3.5 w-3.5" />
            </span>
            <span class="text-xs font-bold text-neutral-800 dark:text-neutral-100">{{ chip.label }}</span>
          </div>

          <!-- Photo card -->
          <div ref="tiltCard" class="photo-tilt group relative mx-auto max-w-md lg:mx-0">
            <!-- Orbiting satellite rings -->
            <div class="orbit-field hidden md:block" aria-hidden="true">
              <div class="orbit-ring"><span class="orbit-dot" /></div>
              <div class="orbit-ring orbit-ring-b"><span class="orbit-dot" /><span class="orbit-dot orbit-dot-b" /></div>
            </div>
            <!-- Blurred pulsing glow behind the panel -->
            <div class="hero-card-aura absolute -inset-3 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:blur-3xl" aria-hidden="true" />

            <div class="glass-panel hero-photo-card relative">
              <!-- Profile Photo / Fallback Avatar -->
              <div class="relative aspect-[4/4.5] w-full overflow-hidden rounded-[1.4rem]">
                <!-- Studio backdrop behind the transparent cutout -->
                <div class="cutout-stage absolute inset-0 z-0" aria-hidden="true" />
                <div class="cutout-grid absolute inset-0 z-[1]" aria-hidden="true" />
                <div class="cutout-halo absolute inset-0 z-[2]" aria-hidden="true" />
                <!-- Edge-melt vignette -->
                <div class="hero-photo-bg-mask absolute inset-0 z-10" aria-hidden="true" />
                <!-- Holographic prism sheen -->
                <div class="holo-sheen absolute inset-0 z-20" aria-hidden="true" />
                <!-- Soft duotone grade -->
                <div class="hero-photo-tint absolute inset-0 z-[5]" aria-hidden="true" />
                <!-- Subtle shimmer sweep on hover -->
                <div class="hero-photo-shimmer absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
                <!-- Floor shadow grounding the subject -->
                <div class="cutout-floor absolute bottom-[3%] left-1/2 z-[2] h-[10%] w-[72%] -translate-x-1/2" aria-hidden="true" />
                <img
                  v-if="!photoBroken"
                  :src="profile.photo"
                  :alt="profile.photoAlt"
                  loading="eager"
                  decoding="async"
                  class="hero-photo-img relative z-[3] h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  @error="photoBroken = true"
                >
                <div
                  v-else
                  class="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-emerald-500/10 p-8 text-center"
                  role="img"
                  :aria-label="profile.photoAlt"
                >
                  <div class="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-4xl font-extrabold text-white shadow-2xl shadow-indigo-500/40">
                    {{ profile.initials }}
                    <div class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-neutral-900">
                      <Icon name="lucide:check" class="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-neutral-900 dark:text-white">{{ profile.shortName }}</p>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ profile.role }}</p>
                  </div>
                </div>

                <!-- Gradient overlay for text readability -->
                <div class="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 pt-16">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-xl font-bold text-white">{{ profile.name }}</h3>
                      <p class="text-xs font-medium text-neutral-300">{{ profile.role }}</p>
                    </div>
                    <span class="glass-chip inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white">
                      <Icon name="lucide:map-pin" class="h-3 w-3 text-emerald-400" />
                      {{ profile.location }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div><!-- /hero-section-wrapper -->
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const { lp } = useLocaleContent()
const photoBroken = ref(false)

// Floating glass skill chips around the photo (universal tech labels).
const chips = [
  { label: 'TypeScript', icon: 'lucide:code-2', position: '-left-4 top-8' },
  { label: 'Vue · Nuxt', icon: 'lucide:layers', position: '-right-3 top-1/3' },
  { label: 'AI · LLM', icon: 'lucide:sparkles', position: 'right-8 -bottom-5' }
]

// Stats as stated in CV — fixed showcase numbers with suffixes.
const heroStats = [
  { value: 4, suffix: '+', labelKey: 'hero.stats.projects' },
  { value: 19, suffix: '+', labelKey: 'hero.stats.technologies' },
  { value: 5, suffix: '', labelKey: 'hero.stats.roles' }
]

const { display: projectsDisplay, targetEl: projectsTarget } = useCountUp(heroStats[0]?.value ?? 0)
const { display: techDisplay, targetEl: techTarget } = useCountUp(heroStats[1]?.value ?? 0)
const { display: rolesDisplay, targetEl: rolesTarget } = useCountUp(heroStats[2]?.value ?? 0)

// ── Typewriter headline ──
const headlineFull = computed(() => lp(profile.headline, profile.headlineId))
const typedHeadline = ref(headlineFull.value)
let typeTimer: ReturnType<typeof setInterval> | null = null
let typeDelay: ReturnType<typeof setTimeout> | null = null

const stopTyping = (): void => {
  if (typeTimer) {
    clearInterval(typeTimer)
    typeTimer = null
  }
  if (typeDelay) {
    clearTimeout(typeDelay)
    typeDelay = null
  }
}

const runTyping = (): void => {
  stopTyping()
  const full = headlineFull.value
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedHeadline.value = full
    return
  }
  typedHeadline.value = ''
  let i = 0
  typeTimer = setInterval(() => {
    i += 1
    typedHeadline.value = full.slice(0, i)
    if (i >= full.length && typeTimer) {
      clearInterval(typeTimer)
      typeTimer = null
    }
  }, 30)
}

// Retype when the language changes.
watch(headlineFull, () => {
  runTyping()
})

// ── Cursor spotlight + depth parallax + photo tilt ──
const heroWrap = ref<HTMLElement | null>(null)
const bgLayer = ref<HTMLElement | null>(null)
const tiltScene = ref<HTMLElement | null>(null)
const tiltCard = ref<HTMLElement | null>(null)
let fxRaf = 0
let tiltRaf = 0
let fxDisabled = true

const onHeroMouseMove = (e: MouseEvent): void => {
  if (fxDisabled) return
  const wrap = heroWrap.value
  const bg = bgLayer.value
  if (!wrap || !bg) return
  cancelAnimationFrame(fxRaf)
  fxRaf = requestAnimationFrame(() => {
    const r = wrap.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    bg.style.setProperty('--mx', `${e.clientX - r.left}px`)
    bg.style.setProperty('--my', `${e.clientY - r.top}px`)
    bg.style.setProperty('--px', nx.toFixed(3))
    bg.style.setProperty('--py', ny.toFixed(3))
  })
}

const onTiltMove = (e: MouseEvent): void => {
  if (fxDisabled) return
  const scene = tiltScene.value
  const card = tiltCard.value
  if (!scene || !card) return
  cancelAnimationFrame(tiltRaf)
  tiltRaf = requestAnimationFrame(() => {
    const r = scene.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `rotateY(${(px * 8).toFixed(2)}deg) rotateX(${(-py * 8).toFixed(2)}deg)`
  })
}

const onTiltLeave = (): void => {
  cancelAnimationFrame(tiltRaf)
  if (tiltCard.value) tiltCard.value.style.transform = ''
}

onMounted(() => {
  fxDisabled =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches

  // Scroll parallax: hero background drifts slower than the page.
  let scrollRaf = 0
  const onScroll = (): void => {
    if (fxDisabled) return
    cancelAnimationFrame(scrollRaf)
    scrollRaf = requestAnimationFrame(() => {
      bgLayer.value?.style.setProperty('--sy', `${Math.min(window.scrollY, 900)}px`)
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Wait out the splash loader on first visit so typing isn't hidden behind it.
  let firstVisit = true
  try {
    firstVisit = sessionStorage.getItem('portfolio-loaded') !== '1'
  } catch {
    // storage unavailable — assume first visit
  }
  typeDelay = setTimeout(runTyping, firstVisit ? 1600 : 350)

  onUnmounted(() => {
    stopTyping()
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(fxRaf)
    cancelAnimationFrame(tiltRaf)
    cancelAnimationFrame(scrollRaf)
  })
})
</script>
