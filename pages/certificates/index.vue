<template>
  <div>
    <PageBackdrop theme="indigo" />
    <div class="container-site py-10 lg:py-14">
      <p class="eyebrow">{{ $t('cert.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{{ $t('cert.pageTitle') }}</h1>
      <p class="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
        {{ $t('cert.description') }}
      </p>

      <div v-if="certificates.length === 0" class="card mx-auto mt-10 max-w-lg p-10 text-center">
        <Icon name="lucide:award" class="mx-auto h-10 w-10 text-neutral-400" aria-hidden="true" />
        <p class="mt-3 font-medium">{{ $t('cert.empty') }}</p>
        <NuxtLink to="/" class="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
          <Icon name="lucide:arrow-left" class="h-4 w-4" aria-hidden="true" /> {{ $t('common.home') }}
        </NuxtLink>
      </div>
      <div v-else class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CertificateCard
          v-for="(c, i) in certificates"
          :key="c.slug"
          :cert="c"
          data-reveal="up"
          :data-reveal-delay="(i % 3) * 90"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { certificates } from '~/data/certificates'

definePageMeta({
  pageTransition: { name: 'slide', mode: 'out-in' }
})

const { t } = useI18n()

useScrollReveal()

useSeoMeta({
  title: () => t('cert.seoTitle'),
  description: () => t('cert.seoDescription')
})
</script>
