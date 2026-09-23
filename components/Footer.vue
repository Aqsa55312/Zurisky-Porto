<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800">
    <div class="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        © 2026 Zurisky Aqsa Firmansyah. {{ $t('footer.rights') }}
      </p>
      <div class="flex items-center gap-2">
        <LanguageSwitcher />
        <nav :aria-label="$t('footer.navLabel')">
          <ul class="flex items-center gap-1">
            <li v-if="isRealUrl(profile.github)">
              <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li v-if="isRealUrl(profile.linkedin)">
              <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:linkedin" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li v-if="isRealUrl(profile.email)">
              <a :href="profile.email" aria-label="Email" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:mail" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a :href="profile.phoneHref" aria-label="Phone" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                <Icon name="lucide:phone" class="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const isRealUrl = (url: string): boolean => !url.includes('REPLACE_WITH_REAL')
</script>
