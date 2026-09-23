<template>
  <div>
    <div v-if="projects.length === 0" class="card p-10 text-center">
      <Icon name="lucide:search-x" class="mx-auto h-8 w-8 text-neutral-400" aria-hidden="true" />
      <p class="mt-3 font-medium">{{ $t('projects.found', 0) }}</p>
      <p class="mt-1 text-sm text-neutral-500">{{ $t('projects.emptyHint') }}</p>
    </div>
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="p.slug"
        :project="p"
        data-reveal="up"
        :data-reveal-delay="(i % 3) * 90"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ projects: Project[] }>()
</script>
