<template>
  <div class="container-site flex min-h-[60vh] items-center justify-center py-16">
    <div class="card max-w-lg p-10 text-center">
      <p class="font-mono text-sm text-neutral-500">{{ error?.statusCode ?? 500 }}</p>
      <h1 class="mt-2 text-2xl font-bold">{{ error?.statusCode === 404 ? $t('detail.notFound') : $t('error.wrong') }}</h1>
      <p class="mt-2 text-sm text-neutral-500">
        {{ error?.statusCode === 404 ? $t('error.missingHint') : $t('error.wrongHint') }}
      </p>
      <div class="mt-6 flex justify-center gap-3">
        <NuxtLink to="/" class="inline-flex h-11 items-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">{{ $t('error.home') }}</NuxtLink>
        <NuxtLink to="/projects" class="inline-flex h-11 items-center rounded-xl border border-neutral-300 px-5 text-sm font-semibold dark:border-neutral-700">{{ $t('common.allProjects') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error?: { statusCode?: number; statusMessage?: string } }>()
</script>
