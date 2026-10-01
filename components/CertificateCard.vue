<template>
  <article class="card card-hover group overflow-hidden" :aria-labelledby="`cert-${cert.slug}`">
    <a
      :href="cert.image"
      target="_blank"
      rel="noopener"
      class="relative block aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
      :aria-label="`${$t('cert.viewFull')}: ${cert.title}`"
    >
      <img
        :src="imgSrc"
        :alt="cert.imageAlt"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imgSrc = PLACEHOLDER"
      >
      <span class="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
        {{ cert.year }}
      </span>
      <span class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900">
          <Icon name="lucide:expand" class="h-5 w-5" aria-hidden="true" />
        </span>
      </span>
    </a>
    <div class="p-5">
      <p class="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        <Icon name="lucide:award" class="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
        {{ cert.issuer }}
      </p>
      <h3 :id="`cert-${cert.slug}`" class="mt-1.5 font-display font-semibold leading-snug tracking-tight">
        {{ lp(cert.title, cert.titleId) }}
      </h3>
      <ul v-if="cert.skills?.length" class="mt-3 flex flex-wrap gap-1.5">
        <li v-for="s in cert.skills" :key="s" class="rounded-md bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          {{ s }}
        </li>
      </ul>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <a
          v-if="cert.credentialUrl"
          :href="cert.credentialUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
        >
          {{ $t('cert.verify') }}
          <Icon name="lucide:external-link" class="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <span v-if="cert.credentialId" class="font-mono text-[11px] text-neutral-400">
          ID: {{ cert.credentialId }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Certificate } from '~/types'

const props = defineProps<{ cert: Certificate }>()
const { lp } = useLocaleContent()

const PLACEHOLDER = '/images/placeholder.svg'
const imgSrc = ref(props.cert.image)
</script>
