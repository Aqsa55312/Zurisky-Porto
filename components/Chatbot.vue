<template>
  <div>
    <!-- Launcher -->
    <button
      v-if="!open"
      type="button"
      :aria-label="$t('chat.openLabel')"
      class="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95"
      @click="toggle(true)"
    >
      <span class="absolute -right-0.5 -top-0.5 flex h-4 w-4" aria-hidden="true">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span class="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 font-mono text-[9px] font-bold text-white">
          {{ hasUnread ? '1' : '' }}
        </span>
      </span>
      <Icon name="lucide:sparkles" class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Panel -->
    <Transition name="chat-pop">
      <section
        v-if="open"
        class="fixed bottom-24 right-4 z-50 flex max-h-[68vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/85 shadow-2xl backdrop-blur-xl sm:right-6 dark:border-white/10 dark:bg-neutral-900/85"
        role="dialog"
        :aria-label="$t('chat.title')"
      >
        <!-- Header -->
        <header class="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 text-white">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 font-mono text-sm font-bold backdrop-blur" aria-hidden="true">Z</span>
          <div class="min-w-0 flex-1">
            <h2 class="text-sm font-bold leading-tight">{{ $t('chat.title') }}</h2>
            <p class="flex items-center gap-1.5 text-[11px] text-white/80">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {{ $t('chat.online') }}
            </p>
          </div>
          <button
            type="button"
            :aria-label="$t('chat.closeLabel')"
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            @click="toggle(false)"
          >
            <Icon name="lucide:x" class="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <!-- Messages -->
        <div ref="scrollBox" class="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite" :aria-label="$t('chat.title')">
          <div v-for="(m, i) in messages" :key="i" class="flex" :class="m.from === 'user' ? 'justify-end' : 'justify-start'">
            <p
              class="max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed"
              :class="m.from === 'user'
                ? 'rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white'
                : 'rounded-bl-md border border-neutral-200/80 bg-neutral-100 text-neutral-800 dark:border-white/10 dark:bg-white/10 dark:text-neutral-100'"
            >
              {{ m.text }}
            </p>
          </div>
          <div v-if="typing" class="flex justify-start">
            <p class="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200/80 bg-neutral-100 px-4 py-3 dark:border-white/10 dark:bg-white/10" :aria-label="$t('chat.typing')">
              <span class="typing-dot" aria-hidden="true" />
              <span class="typing-dot" aria-hidden="true" />
              <span class="typing-dot" aria-hidden="true" />
            </p>
          </div>
        </div>

        <!-- Quick replies -->
        <div v-if="!typing" class="flex gap-2 overflow-x-auto px-4 pb-2">
          <button
            v-for="q in quickReplies"
            :key="q.en"
            type="button"
            class="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            @click="send(pick(q))"
          >
            {{ pick(q) }}
          </button>
        </div>

        <!-- Input -->
        <form class="flex items-center gap-2 border-t border-neutral-200/70 p-3 dark:border-white/10" @submit.prevent="send(draft)">
          <label class="sr-only" :for="inputId">{{ $t('chat.inputLabel') }}</label>
          <input
            :id="inputId"
            ref="inputRef"
            v-model="draft"
            type="text"
            :placeholder="$t('chat.placeholder')"
            autocomplete="off"
            class="h-11 min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white/70 px-3.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:focus:border-indigo-500"
          >
          <button
            type="submit"
            :aria-label="$t('chat.sendLabel')"
            :disabled="draft.trim().length === 0"
            class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white transition-all hover:brightness-110 disabled:opacity-40"
          >
            <Icon name="lucide:send-horizontal" class="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { chatFallback, chatQuickReplies, chatWelcome, matchIntent, type ChatAnswer, type QuickReply } from '~/data/chatbot'

interface ChatMessage {
  from: 'bot' | 'user'
  text: string
}

const { locale } = useI18n()

const open = ref(false)
const hasUnread = ref(true)
const typing = ref(false)
const draft = ref('')
const messages = ref<ChatMessage[]>([])
const scrollBox = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const inputId = 'chatbot-input'
let greetTimer: ReturnType<typeof setTimeout> | null = null
let replyTimer: ReturnType<typeof setTimeout> | null = null

const pick = (a: ChatAnswer | QuickReply): string => (locale.value === 'id' ? a.id : a.en)
const quickReplies = computed<QuickReply[]>(() => chatQuickReplies)

const scrollDown = (): void => {
  nextTick(() => {
    const el = scrollBox.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

const botSay = (text: string, delay = 900): void => {
  typing.value = true
  if (replyTimer) clearTimeout(replyTimer)
  replyTimer = setTimeout(() => {
    typing.value = false
    messages.value.push({ from: 'bot', text })
    scrollDown()
  }, delay)
}

const send = (raw: string): void => {
  const text = raw.trim()
  if (text.length === 0 || typing.value) return
  draft.value = ''
  messages.value.push({ from: 'user', text })
  scrollDown()
  const intent = matchIntent(text)
  botSay(intent ? pick(intent.answer) : pick(chatFallback), 700 + Math.random() * 500)
}

const toggle = (state: boolean): void => {
  open.value = state
  if (state) {
    hasUnread.value = false
    nextTick(() => inputRef.value?.focus())
    if (messages.value.length === 0) {
      if (greetTimer) clearTimeout(greetTimer)
      greetTimer = setTimeout(() => {
        messages.value.push({ from: 'bot', text: pick(chatWelcome) })
        scrollDown()
      }, 400)
    }
  }
}

const onKey = (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && open.value) toggle(false)
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (greetTimer) clearTimeout(greetTimer)
  if (replyTimer) clearTimeout(replyTimer)
})
</script>

<style scoped>
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: currentColor;
  opacity: 0.4;
  animation: typing-bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

.chat-pop-enter-active,
.chat-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: bottom right;
}
.chat-pop-enter-from,
.chat-pop-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .typing-dot { animation: none; opacity: 0.7; }
}
</style>
