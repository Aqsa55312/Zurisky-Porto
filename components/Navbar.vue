<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'border-b border-neutral-200/70 bg-white/80 backdrop-blur-md dark:border-neutral-800/70 dark:bg-[#0a0a0b]/80' : 'border-b border-transparent bg-transparent'"
  >
    <nav class="container-site flex h-16 items-center justify-between" :aria-label="$t('nav.mainNav')">
      <NuxtLink to="/" class="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight" aria-label="Zurisky Aqsa — home">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 font-mono text-sm font-bold text-white dark:bg-white dark:text-neutral-900">Z</span>
        <span class="hidden sm:inline">zurisky<span class="text-neutral-400">.dev</span></span>
      </NuxtLink>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="item in navItems" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white"
            active-class="text-neutral-900 dark:text-white"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="hidden items-center gap-2 md:flex">
        <a
          v-if="isRealUrl(profile.github)"
          :href="profile.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub profile"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <Icon name="lucide:github" class="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          v-if="isRealUrl(profile.linkedin)"
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn profile"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <Icon name="lucide:linkedin" class="h-5 w-5" aria-hidden="true" />
        </a>
        <LanguageSwitcher />
        <ThemeToggle />
        <a
          :href="profile.cvPath"
          download
          class="inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900"
        >
          <Icon name="lucide:download" class="h-4 w-4" aria-hidden="true" />
          CV
        </a>
      </div>

      <div class="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <div v-if="menuOpen" id="mobile-menu" class="border-t border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800 dark:bg-[#0a0a0b]/95 md:hidden">
      <ul class="container-site space-y-1 py-4">
        <li v-for="item in navItems" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="block rounded-xl px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
        <li class="flex gap-2 px-0 pt-2">
          <a
            v-if="isRealUrl(profile.github)"
            :href="profile.github"
            target="_blank"
            rel="noopener"
            class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 text-sm font-medium dark:border-neutral-800"
          >
            <Icon name="lucide:github" class="h-4 w-4" aria-hidden="true" /> GitHub
          </a>
          <a
            v-if="isRealUrl(profile.linkedin)"
            :href="profile.linkedin"
            target="_blank"
            rel="noopener"
            class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 text-sm font-medium dark:border-neutral-800"
          >
            <Icon name="lucide:linkedin" class="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <a :href="profile.cvPath" download class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">
            <Icon name="lucide:download" class="h-4 w-4" aria-hidden="true" /> CV
          </a>
        </li>
      </ul>
    </div>
  </header>
  <div class="h-16" aria-hidden="true" />
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

const navItems = computed(() => [
  { label: t('nav.home'), href: '/' },
  { label: t('nav.about'), href: '/#about' },
  { label: t('nav.projects'), href: '/projects' },
  { label: t('nav.experience'), href: '/#experience' },
  { label: t('nav.contact'), href: '/#contact' }
])

const scrolled = ref(false)
const menuOpen = ref(false)

const isRealUrl = (url: string): boolean => !url.includes('REPLACE_WITH_REAL')

const onScroll = (): void => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(menuOpen, (open: boolean) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>
