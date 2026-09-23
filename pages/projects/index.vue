<template>
  <div>
    <PageBackdrop theme="ocean" />
    <div class="container-site py-10 lg:py-14">
    <p class="eyebrow">{{ $t('projects.eyebrow') }}</p>
    <h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{{ $t('projects.title') }}</h1>
    <p class="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
      {{ $t('projects.description') }}
    </p>

    <div class="card mt-8 flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
      <label class="relative flex-1">
        <span class="sr-only">{{ $t('projects.searchLabel') }}</span>
        <Icon name="lucide:search" class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
        <input
          v-model="query"
          type="search"
          :placeholder="$t('projects.search')"
          class="h-11 w-full rounded-xl border border-neutral-200 bg-transparent pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:focus:border-neutral-600"
        >
      </label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <label class="flex items-center gap-2 text-sm">
          <span class="sr-only">{{ $t('projects.categoryLabel') }}</span>
          <Icon name="lucide:filter" class="h-4 w-4 text-neutral-400" aria-hidden="true" />
          <select v-model="category" class="h-11 rounded-xl border border-neutral-200 bg-transparent px-3 text-sm dark:border-neutral-800">
            <option v-for="c in projectCategories" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
        <label class="flex items-center gap-2 text-sm">
          <span class="sr-only">{{ $t('projects.techLabel') }}</span>
          <select v-model="tech" class="h-11 rounded-xl border border-neutral-200 bg-transparent px-3 text-sm dark:border-neutral-800">
            <option value="All">{{ $t('projects.allTech') }}</option>
            <option v-for="techOpt in allTechnologies" :key="techOpt" :value="techOpt">{{ techOpt }}</option>
          </select>
        </label>
      </div>
    </div>

    <p class="mt-6 font-mono text-xs text-neutral-500" aria-live="polite">
      {{ $t('projects.found', results.length) }}
    </p>

    <ProjectGrid :projects="results" class="mt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { projectCategories } from '~/data/projects'

definePageMeta({
  pageTransition: { name: 'slide', mode: 'out-in' }
})

const { t } = useI18n()
const { allTechnologies, filterProjects } = useProjects()

const query = ref('')
const category = ref<string>('All')
const tech = ref<string>('All')

const results = computed(() => filterProjects({ category: category.value, tech: tech.value, query: query.value }))

useScrollReveal()

useSeoMeta({
  title: () => t('projects.seoTitle'),
  description: () => t('projects.seoDescription')
})
</script>
