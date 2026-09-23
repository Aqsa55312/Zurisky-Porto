<template>
  <article class="card card-hover group overflow-hidden" :aria-labelledby="`project-${project.slug}`">
    <NuxtLink :to="`/projects/${project.slug}`" class="block" :aria-label="`${$t('common.viewCaseStudy')}: ${project.title}`">
      <div class="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          :src="imgSrc"
          :alt="project.coverAlt"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          @error="onImgError"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span class="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {{ project.category[0] }}
        </span>
        <span class="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-md">
          {{ project.year }}
        </span>
      </div>
    </NuxtLink>
    <div class="p-6">
      <NuxtLink :to="`/projects/${project.slug}`" class="block">
        <h3 :id="`project-${project.slug}`" class="text-lg font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {{ project.title }}
        </h3>
      </NuxtLink>
      <p class="clamp-2 mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {{ lp(project.description, project.descriptionId) }}
      </p>
      <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="`Technologies in ${project.title}`">
        <li v-for="t in project.technologies.slice(0, 4)" :key="t" class="rounded-md border border-neutral-200/60 bg-neutral-100/70 px-2.5 py-1 font-mono text-[11px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
          {{ t }}
        </li>
        <li v-if="project.technologies.length > 4" class="rounded-md border border-neutral-200/60 bg-neutral-100/70 px-2.5 py-1 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
          +{{ project.technologies.length - 4 }}
        </li>
      </ul>
      <div class="mt-5 border-t border-neutral-100 pt-4 dark:border-neutral-800/80">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition-all group-hover:gap-2.5 dark:text-indigo-400"
        >
          {{ $t('common.viewCaseStudy') }}
          <Icon name="lucide:arrow-right" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const { lp } = useLocaleContent()

const PLACEHOLDER = '/images/placeholder.svg'
const imgSrc = ref(props.project.cover)

const onImgError = (): void => {
  if (imgSrc.value !== PLACEHOLDER) imgSrc.value = PLACEHOLDER
}

watch(
  () => props.project.cover,
  (v: string) => {
    imgSrc.value = v
  }
)
</script>

