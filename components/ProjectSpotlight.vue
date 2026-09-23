<template>
  <article class="card card-hover group grid overflow-hidden lg:grid-cols-[1.15fr_1fr]" :aria-labelledby="`spotlight-${project.slug}`">
    <NuxtLink :to="`/projects/${project.slug}`" class="relative block min-h-56 overflow-hidden bg-neutral-100 lg:min-h-full dark:bg-neutral-800" :aria-label="`${$t('common.viewCaseStudy')}: ${project.title}`">
      <img
        :src="imgSrc"
        :alt="project.coverAlt"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imgSrc = PLACEHOLDER"
      >
      <span class="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
        {{ $t('home.spotlightBadge') }}
      </span>
    </NuxtLink>
    <div class="flex flex-col justify-center p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-2">
        <span v-for="c in project.category" :key="c" class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">{{ c }}</span>
        <span class="rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs dark:bg-neutral-800">{{ project.year }}</span>
      </div>
      <NuxtLink :to="`/projects/${project.slug}`" class="mt-4 block">
        <h3 :id="`spotlight-${project.slug}`" class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {{ project.title }}
        </h3>
      </NuxtLink>
      <p class="clamp-3 mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
        {{ lp(project.description, project.descriptionId) }}
      </p>
      <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="`Technologies in ${project.title}`">
        <li v-for="t in project.technologies.slice(0, 5)" :key="t" class="rounded-md bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          {{ t }}
        </li>
      </ul>
      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="mt-6 inline-flex w-fit items-center gap-1.5 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900"
      >
        {{ $t('common.viewCaseStudy') }}
        <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const { lp } = useLocaleContent()

const PLACEHOLDER = '/images/placeholder.svg'
const imgSrc = ref(props.project.cover)
</script>
