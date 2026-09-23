<template>
  <div>
    <Hero />
    <TechMarquee />

    <section class="border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="selected-heading" data-reveal="scale">
      <div class="container-site py-16 lg:py-20">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="eyebrow">{{ $t('home.portfolioEyebrow') }}</p>
            <h2 id="selected-heading" class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('home.selectedTitle') }}</h2>
            <p class="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
              {{ $t('home.selectedDescription') }}
            </p>
          </div>
          <NuxtLink to="/projects" class="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white/60 px-5 text-sm font-semibold backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/60 dark:hover:bg-neutral-800">
            {{ $t('common.allProjects') }} <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
        <ProjectGrid :projects="featured" class="mt-8" />
      </div>
    </section>

    <About />
    <TechStack />
    <ExperienceTimeline />

    <section class="border-t border-neutral-200/70 dark:border-neutral-800/70" :aria-label="$t('education.sectionLabel')" data-reveal="blur">
      <div class="container-site grid gap-6 py-16 md:grid-cols-2 lg:py-20">
        <Education />
        <Organization />
      </div>
    </section>

    <Contact />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { featuredProjects } = useProjects()
const featured = computed(() => featuredProjects.value)

useScrollReveal()

useSeoMeta({
  title: () => t('site.title'),
  description: () => t('site.description')
})
</script>
