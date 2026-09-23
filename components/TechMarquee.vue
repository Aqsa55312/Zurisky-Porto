<template>
  <div class="marquee border-y border-neutral-200/60 bg-white/40 py-4 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]" role="region" aria-label="Technologies">
    <div class="marquee-track">
      <div class="marquee-group">
        <span
          v-for="tech in techs"
          :key="tech"
          class="mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-neutral-200/80 bg-white/70 px-4 py-1.5 text-xs font-semibold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500" aria-hidden="true" />
          {{ tech }}
        </span>
      </div>
      <div class="marquee-group marquee-dup" aria-hidden="true">
        <span
          v-for="tech in techs"
          :key="tech"
          class="mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-neutral-200/80 bg-white/70 px-4 py-1.5 text-xs font-semibold text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500" aria-hidden="true" />
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills'

/** Unique tech names across all skill categories, in order. */
const techs = computed<string[]>(() => {
  const seen = new Set<string>()
  for (const cat of skills) {
    for (const t of cat.technologies) {
      if (!seen.has(t)) seen.add(t)
    }
  }
  return [...seen]
})
</script>
