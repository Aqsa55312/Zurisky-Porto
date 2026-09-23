/**
 * Helpers to pick the active-locale variant of central data content.
 * Data files hold English by default plus optional `*Id` Indonesian variants.
 * Used in templates — reactive because `locale` is read during render.
 */
export function useLocaleContent() {
  const { locale } = useI18n()

  const isIndonesian = computed(() => locale.value === 'id')

  /** Pick localized string: Indonesian variant when active, else English. */
  function lp(en: string, id?: string | null): string {
    return locale.value === 'id' ? (id ?? en) : en
  }

  /** Pick localized string array. */
  function la(en: string[], id?: string[] | null): string[] {
    return locale.value === 'id' ? (id ?? en) : en
  }

  return { locale, isIndonesian, lp, la }
}
