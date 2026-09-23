<template>
  <div class="flex h-full flex-col gap-6">
    <article
      v-for="org in organizations"
      :key="org.name"
      class="card card-hover flex-1 p-6 sm:p-7"
      :aria-label="org.name"
    >
      <p class="eyebrow">{{ $t('education.orgEyebrow') }}</p>
      <h2 class="mt-3 flex items-center gap-2 text-xl font-bold tracking-tight">
        <Icon name="lucide:users" class="h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
        {{ org.name }}
      </h2>
      <p class="mt-2 text-sm font-medium">{{ org.role }}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <span v-if="org.period" class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
          <Icon name="lucide:calendar" class="h-3 w-3" aria-hidden="true" />{{ org.period }}
        </span>
        <span v-if="org.location" class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
          <Icon name="lucide:map-pin" class="h-3 w-3" aria-hidden="true" />{{ org.location }}
        </span>
      </div>
      <ul class="mt-4 space-y-2">
        <li v-for="h in orgHighlights(org)" :key="h" class="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Icon name="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
          <span v-html="withMetrics(h)" />
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup lang="ts">
import { organizations } from '~/data/organization'
import type { Organization } from '~/types'

const { la } = useLocaleContent()

const orgHighlights = (org: Organization): string[] =>
  la(org.highlights ?? org.responsibilities ?? [], org.highlightsId ?? org.responsibilitiesId)

/** Escape HTML, then wrap % / + suffixed numbers in an accent span. */
const withMetrics = (text: string): string => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(/(\d+(?:\.\d+)?%|\d+\+)/g, '<span class="metric">$1</span>')
}
</script>
