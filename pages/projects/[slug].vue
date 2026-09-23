<template>
  <div>
    <PageBackdrop :theme="backdropTheme" />
    <div class="container-site py-10 lg:py-14">
      <ProjectDetail v-if="project" :project="project" :related="related" />
      <div v-else class="card mx-auto max-w-lg p-10 text-center">
        <Icon name="lucide:folder-x" class="mx-auto h-10 w-10 text-neutral-400" aria-hidden="true" />
        <h1 class="mt-4 text-2xl font-bold">{{ $t('detail.notFound') }}</h1>
        <p class="mt-2 text-sm text-neutral-500">{{ $t('detail.notFoundHint') }}</p>
        <NuxtLink to="/projects" class="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
          <Icon name="lucide:arrow-left" class="h-4 w-4" aria-hidden="true" /> {{ $t('common.allProjects') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BackdropTheme } from '~/components/PageBackdrop.vue'

definePageMeta({
  pageTransition: { name: 'zoom', mode: 'out-in' }
})

const { t } = useI18n()
const route = useRoute()
const { getProjectBySlug, getRelatedProjects } = useProjects()
const { lp } = useLocaleContent()

const slug = computed(() => String(route.params.slug ?? ''))
const project = computed(() => getProjectBySlug(slug.value))
const related = computed(() => getRelatedProjects(slug.value, 3))

/** Ambient color theme follows the project's primary category. */
const backdropTheme = computed<BackdropTheme>(() => {
  const cats = project.value?.category ?? []
  if (cats.includes('AI')) return 'aurora'
  if (cats.includes('Mobile')) return 'nebula'
  if (cats.includes('Dashboard')) return 'ocean'
  return 'indigo'
})

if (import.meta.server && !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
}

// Getters read the active locale, so SEO meta updates on language switch.
useScrollReveal()

useSeoMeta({
  title: () => (project.value ? project.value.title : t('detail.notFound')),
  description: () =>
    project.value ? lp(project.value.description, project.value.descriptionId) : t('detail.notFoundHint'),
  ogTitle: () => (project.value ? `${project.value.title} — Zurisky Aqsa` : t('detail.notFound'))
})
</script>
