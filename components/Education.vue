<template>
  <article class="card card-hover flex h-full flex-col p-6 sm:p-7" aria-labelledby="edu-heading">
    <p class="eyebrow">{{ $t('education.eyebrow') }}</p>
    <h2 id="edu-heading" class="mt-3 flex items-center gap-2 text-xl font-bold tracking-tight">
      <Icon name="lucide:graduation-cap" class="h-5 w-5 shrink-0 text-indigo-500" aria-hidden="true" />
      {{ education.institution }}
    </h2>
    <p class="mt-2 text-sm font-medium">{{ education.degree }}</p>
    <div class="mt-3 flex flex-wrap gap-2">
      <span v-if="education.period" class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
        <Icon name="lucide:calendar" class="h-3 w-3" aria-hidden="true" />{{ education.period }}
      </span>
      <span v-if="education.gpa" class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
        <Icon name="lucide:award" class="h-3 w-3" aria-hidden="true" />GPA {{ education.gpa }}
      </span>
      <span v-if="education.location" class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">
        <Icon name="lucide:map-pin" class="h-3 w-3" aria-hidden="true" />{{ education.location }}
      </span>
    </div>
    <p class="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(education.description, education.descriptionId) }}</p>
    <div v-if="la(education.notableProjects ?? [], education.notableProjectsId).length > 0" class="mt-4">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{{ $t('education.notable') }}</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="np in la(education.notableProjects ?? [], education.notableProjectsId)" :key="np" class="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Icon name="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
          {{ np }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import { education } from '~/data/education'

const { lp, la } = useLocaleContent()
</script>
