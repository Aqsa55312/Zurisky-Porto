<template>
  <section id="experience" class="scroll-mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="exp-heading" data-reveal="up">
    <div class="container-site py-16 lg:py-24">
      <p class="eyebrow">{{ $t('experience.eyebrow') }}</p>
      <h2 id="exp-heading" class="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('experience.title') }}</h2>
      <p class="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/60 px-4 py-1.5 text-xs font-semibold text-neutral-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
        <Icon name="lucide:briefcase" class="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
        {{ $t('experience.count', { roles: roleCount, companies: companyCount }) }}
      </p>

      <ol ref="listRef" class="relative mt-10 space-y-6 pl-8 sm:pl-10">
        <!-- Rail track + scroll progress fill -->
        <div class="absolute inset-y-2 left-[11px] w-[2px] overflow-hidden rounded-full bg-neutral-200 sm:left-[15px] dark:bg-neutral-800" aria-hidden="true">
          <div class="w-full bg-gradient-to-b from-indigo-500 via-violet-500 to-emerald-500 transition-[height] duration-150" :style="{ height: `${Math.round(fillPct * 100)}%` }" />
        </div>

        <li v-for="(job, i) in experience" :key="`${job.company}-${i}`" class="group relative">
          <span
            class="absolute -left-[29px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 ring-4 ring-white transition-shadow group-hover:shadow-[0_0_16px_2px_rgba(124,58,237,0.5)] sm:-left-[33px] dark:ring-[#0a0a0b]"
            aria-hidden="true"
          />
          <article class="card card-hover relative overflow-hidden p-5 sm:p-6">
            <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3.5">
                <span
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-sm font-bold text-white shadow-md"
                  :class="avatarClass(i)"
                  aria-hidden="true"
                >
                  {{ initialsOf(job.company) }}
                </span>
                <div class="min-w-0">
                  <h3 class="font-display font-semibold leading-snug">{{ job.role }}</h3>
                  <p class="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                    <span class="font-medium text-neutral-800 dark:text-neutral-200">{{ job.company }}</span>
                    <span v-if="job.location" class="inline-flex items-center gap-1 text-xs">
                      <Icon name="lucide:map-pin" class="h-3 w-3" aria-hidden="true" />{{ job.location }}
                    </span>
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <span v-if="isCurrent(job.period)" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {{ $t('experience.current') }}
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
                  <Icon name="lucide:calendar" class="h-3 w-3" aria-hidden="true" />{{ job.period }}
                </span>
              </div>
            </div>
            <p v-if="job.description" class="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(job.description, job.descriptionId) }}</p>
            <ul v-if="jobHighlights(job).length > 0" class="mt-3 space-y-2">
              <li v-for="(h, hi) in jobHighlights(job)" :key="hi" class="flex items-start gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                <Icon name="lucide:chevron-right" class="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                <span v-html="withMetrics(h)" />
              </li>
            </ul>
            <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="$t('experience.techAt', { company: job.company })">
              <li v-for="t in job.technologies" :key="t" class="rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-indigo-500 dark:hover:text-indigo-300">
                {{ t }}
              </li>
            </ul>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experience } from '~/data/experience'
import type { Experience } from '~/types'

const { lp, la } = useLocaleContent()

const roleCount = computed(() => experience.length)
const companyCount = computed(() => new Set(experience.map((j) => j.company)).size)

const AVATARS = [
  'from-indigo-500 to-violet-600',
  'from-teal-500 to-emerald-600',
  'from-violet-500 to-fuchsia-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-600'
]

const avatarClass = (i: number): string => AVATARS[i % AVATARS.length] ?? AVATARS[0] ?? ''

/** Monogram from company name, skipping legal prefixes like PT. */
const initialsOf = (company: string): string => {
  const words = company.replace(/^PT\s+/i, '').split(/[\s/]+/).filter(Boolean)
  const first = words[0]?.charAt(0) ?? ''
  const second = words.length > 1 ? (words[1]?.charAt(0) ?? '') : ''
  return `${first}${second}`.toUpperCase()
}

const isCurrent = (period: string): boolean => period.toLowerCase().includes('present')

const jobHighlights = (job: Experience): string[] => la(job.highlights ?? [], job.highlightsId)

/** Escape HTML, then wrap % / + suffixed numbers in an accent span. */
const withMetrics = (text: string): string => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(
    /(\d+(?:\.\d+)?%|\d+\+)/g,
    '<span class="metric">$1</span>'
  )
}

// Timeline rail fill follows scroll progress through the list.
const listRef = ref<HTMLElement | null>(null)
const fillPct = ref(0)
let scrollRaf = 0

const updateFill = (): void => {
  const el = listRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const anchor = window.innerHeight * 0.65
  fillPct.value = Math.min(1, Math.max(0, (anchor - r.top) / r.height))
}

const onScroll = (): void => {
  cancelAnimationFrame(scrollRaf)
  scrollRaf = requestAnimationFrame(updateFill)
}

onMounted(() => {
  updateFill()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(scrollRaf)
})
</script>

<style>
/* Applied to v-html content — must stay unscoped. */
.metric {
  font-weight: 700;
  color: #6d28d9;
}
.dark .metric {
  color: #a78bfa;
}
</style>
