<template>
  <section id="contact" class="scroll-mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="contact-heading" data-reveal="scale">
    <div class="container-site py-16 lg:py-24">
      <div class="card relative overflow-hidden p-8 text-center sm:p-12">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" aria-hidden="true" />
        <div class="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-orb" aria-hidden="true" />
        <p class="eyebrow relative">{{ $t('contact.eyebrow') }}</p>
        <h2 id="contact-heading" class="relative mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
          {{ $t('contact.title') }}
        </h2>
        <p class="relative mx-auto mt-4 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
          {{ lp(profile.availability, profile.availabilityId) }}
        </p>
        <div class="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            v-if="isRealUrl(profile.email)"
            :href="profile.email"
            class="inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900"
          >
            <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
            {{ $t('contact.cta') }}
          </a>
          <span
            v-else
            class="inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white opacity-90 dark:bg-white dark:text-neutral-900"
            :title="$t('contact.placeholderNote')"
          >
            <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
            {{ $t('contact.cta') }}
          </span>
          <a
            v-if="isRealUrl(profile.github)"
            :href="profile.github"
            target="_blank"
            rel="noopener"
            class="inline-flex h-12 items-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" /> GitHub
          </a>
          <a
            v-if="isRealUrl(profile.linkedin)"
            :href="profile.linkedin"
            target="_blank"
            rel="noopener"
            class="inline-flex h-12 items-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <Icon name="lucide:linkedin" class="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <a
            :href="profile.phoneHref"
            class="inline-flex h-12 items-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <Icon name="lucide:phone" class="h-4 w-4" aria-hidden="true" /> {{ profile.phone }}
          </a>
        </div>
        <p v-if="!isRealUrl(profile.email)" class="relative mt-4 font-mono text-xs text-neutral-400">
          {{ $t('contact.placeholderNote') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const { lp } = useLocaleContent()
const isRealUrl = (url: string): boolean => !url.includes('REPLACE_WITH_REAL')
</script>
