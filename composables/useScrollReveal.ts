/**
 * Scroll-triggered reveal for homepage sections — like slides, each section
 * can enter with its own effect via `data-reveal="up|scale|left|right|blur"`
 * (default: `up`). Classes are added via JS only, so content stays visible
 * when JS is unavailable. Runs once per section.
 *
 * Elements carrying `data-reveal-off` (e.g. the hero, which has its own
 * load entrance) are skipped. An optional `data-reveal-delay="120"` (ms)
 * staggers grouped items such as project cards.
 */
const VARIANTS = new Set(['up', 'scale', 'left', 'right', 'blur'])

export function useScrollReveal(selector = 'main section') {
  onMounted(() => {
    const els = Array.from(
      new Set([
        ...document.querySelectorAll<HTMLElement>(selector),
        ...document.querySelectorAll<HTMLElement>('main [data-reveal]')
      ])
    ).filter((el) => !el.hasAttribute('data-reveal-off'))
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return
    els.forEach((el) => {
      const variant = el.getAttribute('data-reveal') ?? 'up'
      el.classList.add('reveal-on-scroll', `reveal-${VARIANTS.has(variant) ? variant : 'up'}`)
      const delay = Number(el.getAttribute('data-reveal-delay') ?? 0)
      if (Number.isFinite(delay) && delay > 0) {
        el.style.transitionDelay = `${delay}ms`
      }
    })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.classList.add('is-visible')
            // Clear stagger delay after entrance so hover transitions stay snappy.
            window.setTimeout(() => target.style.removeProperty('transition-delay'), 900)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((el) => io.observe(el))
    onUnmounted(() => io.disconnect())
  })
}
