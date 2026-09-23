<template>
  <section ref="stackSection" class="border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="stack-heading" data-reveal="right">
    <div class="container-site py-16 lg:py-24">
      <p class="eyebrow">{{ $t('stack.eyebrow') }}</p>
      <h2 id="stack-heading" class="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{{ $t('stack.title') }}</h2>
      <p class="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
        {{ $t('stack.description') }}
      </p>
      <p class="mt-2 inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
        <Icon name="lucide:info" class="h-3.5 w-3.5" aria-hidden="true" />
        {{ $t('stack.selfAssessed') }}
      </p>
      <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="cat in skills"
          :key="cat.name"
          class="card card-hover group p-6"
        >
          <div class="flex items-center gap-3">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/60 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
              <Icon :name="categoryIcon(cat.name)" class="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 class="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              {{ cat.name }}
            </h3>
          </div>
          <ul v-if="hasLevels(cat)" class="mt-5 space-y-3.5">
            <li v-for="(tech, ti) in cat.technologies" :key="tech">
              <div class="flex items-baseline justify-between gap-3 text-xs">
                <span class="font-semibold text-neutral-700 dark:text-neutral-300">{{ tech }}</span>
                <span class="font-bold tabular-nums text-indigo-600 dark:text-indigo-400">{{ levelOf(cat, tech) }}%</span>
              </div>
              <div class="skill-track mt-1.5" role="img" :aria-label="`${tech}: ${levelOf(cat, tech)}%`">
                <div
                  class="skill-fill"
                  :style="{ width: barsOn ? `${levelOf(cat, tech)}%` : '0%', transitionDelay: `${ti * 70}ms` }"
                />
              </div>
            </li>
          </ul>
          <ul v-else class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tech in cat.technologies"
              :key="tech"
              class="rounded-lg border border-neutral-200/80 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills'
import type { SkillCategory } from '~/types'

const icons: Record<string, string> = {
  Languages: 'lucide:code-2',
  Frontend: 'lucide:monitor',
  Backend: 'lucide:server',
  Mobile: 'lucide:smartphone',
  Databases: 'lucide:database',
  'API & Security': 'lucide:shield-check',
  'Architecture & Tools': 'lucide:wrench',
  'AI & Data': 'lucide:brain',
  'Soft Skills': 'lucide:users',
  Database: 'lucide:database',
  AI: 'lucide:brain',
  Tools: 'lucide:wrench'
}

const categoryIcon = (name: string): string => icons[name] ?? 'lucide:code-2'

const levelOf = (cat: SkillCategory, tech: string): number => cat.levels?.[tech] ?? 0

const hasLevels = (cat: SkillCategory): boolean =>
  cat.technologies.some((t) => (cat.levels?.[t] ?? 0) > 0)

// Animate bars when the section scrolls into view (once).
const barsOn = ref(false)
const stackSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = stackSection.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    barsOn.value = true
    return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    barsOn.value = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        barsOn.value = true
        io.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  io.observe(el)
  onUnmounted(() => io.disconnect())
})
</script>

