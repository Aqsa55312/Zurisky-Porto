<template>
  <article>
    <nav :aria-label="$t('detail.breadcrumb')" class="mb-6">
      <ol class="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
        <li><NuxtLink to="/" class="hover:text-neutral-900 dark:hover:text-white">{{ $t('common.home') }}</NuxtLink></li>
        <li aria-hidden="true">/</li>
        <li><NuxtLink to="/projects" class="hover:text-neutral-900 dark:hover:text-white">{{ $t('nav.projects') }}</NuxtLink></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" class="font-medium text-neutral-900 dark:text-white">{{ project.title }}</li>
      </ol>
    </nav>

    <header>
      <div class="flex flex-wrap items-center gap-2">
        <span v-for="c in project.category" :key="c" class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-800">{{ c }}</span>
        <span class="rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs dark:bg-neutral-800">{{ project.year }}</span>
      </div>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{{ project.title }}</h1>
      <p class="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(project.description, project.descriptionId) }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
          <Icon name="lucide:external-link" class="h-4 w-4" aria-hidden="true" /> {{ $t('detail.liveDemo') }}
        </a>
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold dark:border-neutral-700">
          <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" /> {{ $t('detail.sourceCode') }}
        </a>
      </div>
    </header>

    <div class="card mt-8 overflow-hidden">
      <img :src="heroSrc" :alt="project.coverAlt" class="aspect-[16/8] w-full object-cover" loading="eager" decoding="async" @error="heroSrc = PLACEHOLDER">
    </div>

    <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
      <div class="min-w-0 space-y-10">
        <section v-if="lp(project.longDescription ?? '', project.longDescriptionId)" data-reveal="up" :aria-label="$t('detail.overview')">
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.overview') }}</h2>
          <p class="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(project.longDescription ?? '', project.longDescriptionId) }}</p>
        </section>

        <section v-if="project.problem" data-reveal="left" :aria-label="$t('detail.problem')">
          <h2 class="flex items-center gap-2 text-xl font-bold tracking-tight"><Icon name="lucide:circle-alert" class="h-5 w-5 text-amber-500" aria-hidden="true" /> {{ $t('detail.problem') }}</h2>
          <p class="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(project.problem, project.problemId) }}</p>
        </section>

        <section v-if="project.solution" data-reveal="right" :aria-label="$t('detail.solution')">
          <h2 class="flex items-center gap-2 text-xl font-bold tracking-tight"><Icon name="lucide:lightbulb" class="h-5 w-5 text-green-500" aria-hidden="true" /> {{ $t('detail.solution') }}</h2>
          <p class="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(project.solution, project.solutionId) }}</p>
        </section>

        <section data-reveal="scale" :aria-label="$t('detail.features')"> 
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.features') }}</h2>
          <ul class="mt-4 grid gap-2.5 sm:grid-cols-2">
            <li v-for="f in la(project.features, project.featuresId)" :key="f" class="flex items-start gap-2 rounded-xl border border-neutral-200 p-3.5 text-sm dark:border-neutral-800">
              <Icon name="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" /> {{ f }}
            </li>
          </ul>
        </section>

        <section v-if="project.architecture?.length" data-reveal="up" :aria-label="$t('detail.architecture')">
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.architecture') }}</h2>
          <ol class="mt-4 space-y-0 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <li v-for="(step, i) in la(project.architecture, project.architectureId)" :key="step" class="flex items-center gap-4 border-b border-neutral-200 p-4 text-sm last:border-0 dark:border-neutral-800">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 font-mono text-xs font-semibold dark:bg-neutral-800">{{ i + 1 }}</span>
              {{ step }}
            </li>
          </ol>
        </section>

        <section data-reveal="left" :aria-label="$t('detail.contribution')"> 
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.contribution') }}</h2>
          <p class="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{{ lp(project.contribution, project.contributionId) }}</p>
        </section>

        <section v-if="project.challenges?.length" data-reveal="right" :aria-label="$t('detail.challenges')">
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.challenges') }}</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <li v-for="c in la(project.challenges, project.challengesId)" :key="c">{{ c }}</li>
          </ul>
        </section>

        <section v-if="project.results?.length" data-reveal="up" :aria-label="$t('detail.results')">
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.results') }}</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <li v-for="r in la(project.results, project.resultsId)" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section data-reveal="blur" :aria-label="$t('detail.gallery')"> 
          <h2 class="text-xl font-bold tracking-tight">{{ $t('detail.gallery') }}</h2>
          <p class="mb-4 mt-1 text-sm text-neutral-500">{{ $t('detail.galleryHint') }}</p>
          <ProjectGallery :images="project.images" />
        </section>
      </div>

      <aside class="h-fit space-y-5 lg:sticky lg:top-24">
        <div class="card p-5">
          <h2 class="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">{{ $t('detail.techStack') }}</h2>
          <ul class="mt-3 flex flex-wrap gap-1.5">
            <li v-for="t in project.technologies" :key="t" class="rounded-lg bg-neutral-100 px-2.5 py-1.5 font-mono text-xs dark:bg-neutral-800">{{ t }}</li>
          </ul>
        </div>
        <div class="card p-5">
          <h2 class="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">{{ $t('detail.details') }}</h2>
          <dl class="mt-3 space-y-2.5 text-sm">
            <div class="flex justify-between gap-4"><dt class="text-neutral-500">{{ $t('detail.year') }}</dt><dd class="font-medium">{{ project.year }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-neutral-500">{{ $t('detail.category') }}</dt><dd class="text-right font-medium">{{ project.category.join(', ') }}</dd></div>
          </dl>
        </div>
      </aside>
    </div>

    <section v-if="related.length > 0" data-reveal="scale" :aria-label="$t('detail.related')" class="mt-16">
      <div class="flex items-end justify-between gap-4">
        <h2 class="text-2xl font-bold tracking-tight">{{ $t('detail.related') }}</h2>
        <NuxtLink to="/projects" class="inline-flex items-center gap-1.5 text-sm font-semibold">{{ $t('common.allProjects') }} <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" /></NuxtLink>
      </div>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="p in related" :key="p.slug" :project="p" />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project; related: Project[] }>()
const { lp, la } = useLocaleContent()

const PLACEHOLDER = '/images/placeholder.svg'
const heroSrc = ref(props.project.cover)

watch(
  () => props.project.cover,
  (v: string) => {
    heroSrc.value = v
  }
)
</script>
