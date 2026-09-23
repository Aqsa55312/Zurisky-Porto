export interface FocusItem {
  icon: string
  title: string
  titleId?: string
  desc: string
  descId?: string
}

/**
 * Professional focus areas shown in the About section.
 * English by default + optional Indonesian (`*Id`) variants,
 * picked via `useLocaleContent().lp()`.
 */
export const focusItems: FocusItem[] = [
  {
    icon: 'lucide:layers',
    title: 'Full-Stack Web Apps',
    titleId: 'Aplikasi Web Full-Stack',
    desc: 'From database to dashboard — Nuxt, React, Laravel.',
    descId: 'Dari database hingga dashboard — Nuxt, React, Laravel.'
  },
  {
    icon: 'lucide:server',
    title: 'APIs & Databases',
    titleId: 'API & Database',
    desc: 'REST design, auth, validation, PostgreSQL & MySQL.',
    descId: 'Desain REST, autentikasi, validasi, PostgreSQL & MySQL.'
  },
  {
    icon: 'lucide:brain',
    title: 'AI Integration',
    titleId: 'Integrasi AI',
    desc: 'OCR, LLM features, and computer vision in real products.',
    descId: 'OCR, fitur LLM, dan computer vision di produk nyata.'
  },
  {
    icon: 'lucide:smartphone',
    title: 'Mobile Apps',
    titleId: 'Aplikasi Mobile',
    desc: 'Flutter & Capacitor apps from a single codebase.',
    descId: 'Aplikasi Flutter & Capacitor dari satu codebase.'
  }
]
