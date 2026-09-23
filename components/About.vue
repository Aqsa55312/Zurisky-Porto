<template>
  <section id="about" class="scroll-mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="about-heading" data-reveal="left">
    <div class="container-site py-16 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        <!-- Left Side: Bio Overview & Highlights -->
        <div class="lg:col-span-5">
          <p class="eyebrow">{{ $t('about.eyebrow') }}</p>
          <h2 id="about-heading" class="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {{ $t('about.title') }}
          </h2>
          <p class="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
            {{ $t('about.summary') }}
          </p>

          <!-- Badges & Status Chips -->
          <div class="mt-6 flex flex-wrap gap-2.5">
            <span class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300">
              <Icon name="lucide:map-pin" class="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
              {{ $t('about.location') }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300">
              <Icon name="lucide:graduation-cap" class="h-3.5 w-3.5 text-violet-500" aria-hidden="true" />
              {{ $t('about.degree') }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Icon name="lucide:check-circle-2" class="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              Open to Opportunities
            </span>
          </div>

          <!-- Quick Highlight Card -->
          <div class="card card-glass mt-8 p-6">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                <Icon name="lucide:zap" class="h-5 w-5" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-neutral-900 dark:text-white">Engineering Philosophy</h4>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">Clean architecture, scalable code & user-first experience</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Focus & Core Competencies Grid -->
        <div class="lg:col-span-7">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {{ $t('about.focusTitle') }}
          </h3>
          
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(item, i) in focusItems"
              :key="item.title"
              class="card card-hover group p-5"
            >
              <div class="flex items-center justify-between">
                <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/60 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                  <Icon :name="item.icon" class="h-5 w-5" aria-hidden="true" />
                </span>
                <span class="text-xs font-semibold text-neutral-400">0{{ i + 1 }}</span>
              </div>
              <p class="mt-4 text-base font-bold text-neutral-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {{ lp(item.title, item.titleId) }}
              </p>
              <p class="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {{ lp(item.desc, item.descId) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { focusItems } from '~/data/about'

const { lp } = useLocaleContent()
</script>

