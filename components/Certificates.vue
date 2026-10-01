<template>
  <section v-if="featured.length > 0" class="border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="cert-heading" data-reveal="left">
    <div class="container-site py-16 lg:py-20">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow">{{ $t('cert.eyebrow') }}</p>
          <h2 id="cert-heading" class="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('cert.title') }}</h2>
          <p class="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
            {{ $t('cert.description') }}
          </p>
        </div>
        <NuxtLink to="/certificates" class="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white/60 px-5 text-sm font-semibold backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/60 dark:hover:bg-neutral-800">
          {{ $t('cert.all') }} <Icon name="lucide:arrow-right" class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CertificateCard v-for="c in featured" :key="c.slug" :cert="c" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { featuredCertificates } from '~/data/certificates'

const featured = computed(() => featuredCertificates(3))
</script>
