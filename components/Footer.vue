<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800">
    <div class="container-site flex flex-col gap-6 py-10 lg:flex-row lg:items-start lg:justify-between">
      <div class="max-w-sm">
        <p class="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight" aria-label="Zurisky Aqsa — home">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 font-mono text-sm font-bold text-white dark:bg-white dark:text-neutral-900">Z</span>
          <span>zurisky<span class="text-neutral-400">.dev</span></span>
        </p>
        <p class="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          © 2026 Zurisky Aqsa Firmansyah. {{ $t('footer.rights') }}
        </p>
      </div>

      <nav :aria-label="$t('footer.quickLinks')">
        <ul class="flex flex-wrap gap-x-6 gap-y-2">
          <li v-for="item in quickLinks" :key="item.href">
            <NuxtLink
              :to="item.href"
              class="rounded text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-neutral-400 dark:hover:text-white"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <LanguageSwitcher />
        <nav :aria-label="$t('footer.navLabel')">
          <ul class="flex items-center gap-1">
            <li v-if="isRealUrl(profile.github)">
              <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li v-if="isRealUrl(profile.linkedin)">
              <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:linkedin" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li v-if="isRealUrl(profile.email)">
              <a :href="profile.email" aria-label="Email" title="Email" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          :aria-label="$t('footer.backToTop')"
          :title="$t('footer.backToTop')"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all hover:-translate-y-0.5 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white"
          @click="toTop"
        >
          <Icon name="lucide:arrow-up" class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { certificates } from '~/data/certificates'
import { profile } from '~/data/profile'

const { t } = useI18n()

const quickLinks = computed(() => {
  const links = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.experience'), href: '/#experience' }
  ]
  if (certificates.length > 0) {
    links.push({ label: t('nav.certificates'), href: '/certificates' })
  }
  links.push({ label: t('nav.contact'), href: '/#contact' })
  return links
})

const isRealUrl = (url: string): boolean => !url.includes('REPLACE_WITH_REAL')

const toTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
