import { toValue, type MaybeRefOrGetter } from 'vue'

/**
 * Animated number count-up that starts when the element scrolls into view.
 * - SSR-friendly: initial value matches server render, animates on mount.
 * - Instantly sets the final value for prefers-reduced-motion.
 * - Runs once, then disconnects the observer.
 */
export function useCountUp(target: MaybeRefOrGetter<number>, durationMs = 1400) {
  const display = ref(0)
  const targetEl = ref<HTMLElement | null>(null)
  let raf = 0
  let done = false

  const animate = (): void => {
    const end = toValue(target)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = end
      done = true
      return
    }
    const startTime = performance.now()
    const tick = (now: number): void => {
      const p = Math.min(1, (now - startTime) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      display.value = Math.round(eased * end)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        display.value = end
        done = true
      }
    }
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    display.value = toValue(target)
    const el = targetEl.value
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !done) {
          display.value = 0
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    onUnmounted(() => {
      io.disconnect()
      cancelAnimationFrame(raf)
    })
  })

  return { display, targetEl }
}
