<template>
  <section id="contact" class="scroll-mt-20 border-t border-neutral-200/70 dark:border-neutral-800/70" aria-labelledby="contact-heading" data-reveal="scale">
    <div class="container-site py-16 lg:py-24">
      <div class="rounded-3xl bg-gradient-to-br from-violet-500/50 via-transparent to-transparent p-px">
        <div class="relative overflow-hidden rounded-[calc(1.5rem-1px)] border border-transparent bg-white/90 p-7 backdrop-blur sm:p-10 lg:p-12 dark:bg-neutral-900/80">
          <div class="pointer-events-none absolute -top-28 left-1/2 h-56 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />

          <div class="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
            <!-- Left: info + direct channels -->
            <div>
              <p class="eyebrow">{{ $t('contact.eyebrow') }}</p>
              <h2 id="contact-heading" class="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {{ $t('contact.title') }}
              </h2>
              <p class="mt-4 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {{ lp(profile.availability, profile.availabilityId) }}
              </p>

              <p class="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {{ $t('common.available') }}
              </p>

              <ul class="mt-5 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li class="flex items-center gap-2">
                  <Icon name="lucide:map-pin" class="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                  {{ $t('contact.location') }}
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="lucide:clock" class="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                  {{ $t('contact.response') }}
                </li>
              </ul>

              <!-- Email + copy -->
              <div class="mt-6">
                <p class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{{ $t('contact.emailLabel') }}</p>
                <div class="mt-2 flex max-w-md items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/60">
                  <Icon name="lucide:mail" class="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                  <a :href="contactConfig.emailHref" class="min-w-0 flex-1 truncate text-sm font-medium underline-offset-4 hover:underline">
                    {{ contactConfig.emailDisplay }}
                  </a>
                  <button
                    type="button"
                    class="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-neutral-300 px-3 text-xs font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:hover:bg-neutral-700"
                    :aria-live="'polite'"
                    @click="copyEmail"
                  >
                    <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-3.5 w-3.5" aria-hidden="true" />
                    {{ copied ? $t('contact.copied') : $t('contact.copy') }}
                  </button>
                </div>
              </div>

              <!-- Primary: WhatsApp -->
              <a
                :href="waLink"
                target="_blank"
                rel="noopener"
                class="btn-glass-primary mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white sm:w-auto"
              >
                <Icon name="lucide:message-circle" class="h-4 w-4" aria-hidden="true" />
                {{ $t('contact.waCta') }}
              </a>
              <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                <a :href="contactConfig.phoneHref" class="font-medium underline-offset-4 hover:underline">{{ contactConfig.phoneDisplay }}</a>
              </p>

              <!-- Secondary row -->
              <div class="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  v-if="isRealUrl(profile.github)"
                  :href="profile.github"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  title="GitHub"
                  class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-violet-500 dark:hover:text-white"
                >
                  <Icon name="lucide:github" class="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  v-if="isRealUrl(profile.linkedin)"
                  :href="profile.linkedin"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-violet-500 dark:hover:text-white"
                >
                  <Icon name="lucide:linkedin" class="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  :href="profile.cvPath"
                  download
                  class="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 px-5 text-sm font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  <Icon name="lucide:download" class="h-4 w-4" aria-hidden="true" />
                  {{ $t('contact.cvCta') }}
                </a>
              </div>
            </div>

            <!-- Right: form -->
            <div class="rounded-2xl border border-neutral-200/80 bg-white/70 p-6 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900/60">
              <h3 class="font-display text-xl font-bold tracking-tight">{{ $t('contact.formTitle') }}</h3>

              <div v-if="status === 'success'" class="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center" role="status">
                <Icon name="lucide:check-circle-2" class="mx-auto h-8 w-8 text-emerald-500" aria-hidden="true" />
                <p class="mt-2 font-semibold">{{ $t('contact.successTitle') }}</p>
                <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{{ $t('contact.successMsg') }}</p>
                <button
                  type="button"
                  class="mt-4 inline-flex h-10 items-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  @click="resetForm"
                >
                  {{ $t('contact.sendAnother') }}
                </button>
              </div>

              <form v-else class="mt-5 space-y-4" novalidate @submit.prevent="onSubmit">
                <div>
                  <label :for="`${fid}-name`" class="mb-1.5 block text-sm font-semibold">{{ $t('contact.nameLabel') }}</label>
                  <input
                    :id="`${fid}-name`"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    :placeholder="$t('contact.namePh')"
                    :aria-invalid="errors.name !== null"
                    :aria-describedby="errors.name ? `${fid}-name-err` : undefined"
                    class="h-12 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800/70 dark:focus:border-violet-400"
                  >
                  <p v-if="errors.name" :id="`${fid}-name-err`" class="mt-1.5 text-sm text-red-600 dark:text-red-400">{{ errors.name }}</p>
                </div>

                <div>
                  <label :for="`${fid}-email`" class="mb-1.5 block text-sm font-semibold">{{ $t('contact.emailLabel') }}</label>
                  <input
                    :id="`${fid}-email`"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    :placeholder="$t('contact.emailPh')"
                    :aria-invalid="errors.email !== null"
                    :aria-describedby="errors.email ? `${fid}-email-err` : undefined"
                    class="h-12 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800/70 dark:focus:border-violet-400"
                  >
                  <p v-if="errors.email" :id="`${fid}-email-err`" class="mt-1.5 text-sm text-red-600 dark:text-red-400">{{ errors.email }}</p>
                </div>

                <div>
                  <label :for="`${fid}-purpose`" class="mb-1.5 block text-sm font-semibold">{{ $t('contact.purposeLabel') }}</label>
                  <select
                    :id="`${fid}-purpose`"
                    v-model="form.purpose"
                    class="h-12 w-full rounded-xl border border-neutral-300 bg-white px-3.5 text-sm outline-none transition-colors focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800/70 dark:focus:border-violet-400"
                  >
                    <option value="fulltime">{{ $t('contact.purposeFulltime') }}</option>
                    <option value="freelance">{{ $t('contact.purposeFreelance') }}</option>
                    <option value="collab">{{ $t('contact.purposeCollab') }}</option>
                  </select>
                </div>

                <div>
                  <label :for="`${fid}-message`" class="mb-1.5 block text-sm font-semibold">{{ $t('contact.messageLabel') }}</label>
                  <textarea
                    :id="`${fid}-message`"
                    v-model="form.message"
                    rows="4"
                    :placeholder="$t('contact.messagePh')"
                    :aria-invalid="errors.message !== null"
                    :aria-describedby="errors.message ? `${fid}-message-err` : undefined"
                    class="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800/70 dark:focus:border-violet-400"
                  />
                  <p v-if="errors.message" :id="`${fid}-message-err`" class="mt-1.5 text-sm text-red-600 dark:text-red-400">{{ errors.message }}</p>
                </div>

                <!-- Honeypot anti-spam: invisible to humans -->
                <div class="absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <label>Company<input v-model="form.company" type="text" tabindex="-1" autocomplete="off" name="company"></label>
                </div>

                <div v-if="status === 'error'" class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm" role="alert">
                  <p class="font-semibold">{{ $t('contact.failTitle') }}</p>
                  <p class="mt-1 text-neutral-600 dark:text-neutral-400">{{ $t('contact.failMsg') }}</p>
                  <p class="mt-2">
                    <a :href="contactConfig.emailHref" class="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400">
                      {{ $t('contact.orEmail') }}: {{ contactConfig.emailDisplay }}
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  :disabled="sending"
                  class="btn-glass-primary inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Icon v-if="sending" name="lucide:loader-2" class="h-4 w-4 animate-spin" aria-hidden="true" />
                  <Icon v-else name="lucide:send-horizontal" class="h-4 w-4" aria-hidden="true" />
                  {{ sending ? $t('contact.sending') : $t('contact.submit') }}
                </button>
                <button
                  v-if="status === 'error'"
                  type="button"
                  class="inline-flex h-11 w-full items-center justify-center rounded-xl border border-neutral-300 px-4 text-sm font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  @click="onSubmit"
                >
                  {{ $t('contact.retry') }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'
import { buildWaLink, contactConfig, isFormConfigured, WEB3FORMS_ACCESS_KEY } from '~/data/contact'

const { t, locale } = useI18n()
const { lp } = useLocaleContent()

const fid = 'contact-form'
const isRealUrl = (url: string): boolean => !url.includes('REPLACE_WITH_REAL')

const waLink = computed(() => buildWaLink(t('contact.waPrefill')))

// ── Copy email ──
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const copyEmail = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(contactConfig.emailDisplay)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = contactConfig.emailDisplay
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = true
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

// ── Contact form ──
interface FormState {
  name: string
  email: string
  purpose: string
  message: string
  company: string
}

const form = reactive<FormState>({ name: '', email: '', purpose: 'fulltime', message: '', company: '' })
const errors = reactive<{ name: string | null; email: string | null; message: string | null }>({
  name: null,
  email: null,
  message: null
})
const sending = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')

const validate = (): boolean => {
  errors.name = form.name.trim().length >= 2 ? null : t('contact.errName')
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? null : t('contact.errEmail')
  errors.message = form.message.trim().length >= 10 ? null : t('contact.errMessage')
  return errors.name === null && errors.email === null && errors.message === null
}

const onSubmit = async (): Promise<void> => {
  if (sending.value) return
  if (!validate()) return
  // Honeypot: bots fill it — pretend success without sending.
  if (form.company.trim().length > 0) {
    status.value = 'success'
    return
  }
  if (!isFormConfigured()) {
    status.value = 'error'
    return
  }
  sending.value = true
  status.value = 'idle'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: form.name.trim(),
        email: form.email.trim(),
        subject: `[Portfolio] ${form.purpose} — ${form.name.trim()}`,
        message: form.message.trim(),
        from_name: 'Zurisky Portfolio',
        reply_to: form.email.trim()
      })
    })
    const data = (await res.json()) as { success?: boolean }
    status.value = res.ok && data.success ? 'success' : 'error'
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
  }
}

const resetForm = (): void => {
  form.name = ''
  form.email = ''
  form.purpose = 'fulltime'
  form.message = ''
  form.company = ''
  errors.name = null
  errors.email = null
  errors.message = null
  status.value = 'idle'
}

// Rebuild localized WhatsApp prefill + clear stale validation on language switch.
watch(locale, () => {
  errors.name = null
  errors.email = null
  errors.message = null
})

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>
