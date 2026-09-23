<template>
  <section id="experience" class="scroll-mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="exp-heading" data-reveal="up">
    <div class="container-site py-16 lg:py-24">
      <p class="eyebrow">{{ $t('experience.eyebrow') }}</p>
      <h2 id="exp-heading" class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('experience.title') }}</h2>
      <ol class="relative mt-10 space-y-6 border-l border-neutral-200 pl-6 dark:border-neutral-800 sm:pl-8">
        <li v-for="(job, i) in experience" :key="`${job.company}-${i}`" class="relative">
          <span class="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-500 to-emerald-500 dark:border-[#0a0a0b] sm:-left-[39px]" aria-hidden="true" />
          <article class="card card-hover p-5 sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">{{ job.role }}</h3>
                <p class="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {{ job.company }}<span v-if="job.location"> • {{ job.location }}</span>
                </p>
              </div>
              <span class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
                <Icon name="lucide:calendar" class="h-3 w-3" aria-hidden="true" />{{ job.period }}
              </span>
            </div>
            <p v-if="job.description" class="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(job.description, job.descriptionId) }}</p>
            <ul v-if="jobHighlights(job).length > 0" class="mt-3 space-y-2">
              <li v-for="(h, hi) in jobHighlights(job)" :key="hi" class="flex items-start gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                <Icon name="lucide:chevron-right" class="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                <span v-html="withMetrics(h)" />
              </li>
            </ul>
            <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="$t('experience.techAt', { company: job.company })">
              <li v-for="t in job.technologies" :key="t" class="rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
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
