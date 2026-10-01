/**
 * Contact configuration.
 *
 * FORM SETUP (Web3Forms, free, no backend needed):
 * 1. Get a free access key at https://web3forms.com (register with your email).
 * 2. Paste it below as WEB3FORMS_ACCESS_KEY.
 * 3. Rebuild + redeploy. Until then, the form shows a graceful error state
 *    pointing visitors to email/WhatsApp instead.
 *
 * Alternatives (require code changes in components/Contact.vue):
 * - Formspree: POST to https://formspree.io/f/{form_id}
 * - Resend: needs a Nuxt server route (server/api/contact.post.ts) to keep
 *   the API key secret — never call Resend directly from the browser.
 */
export const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_KEY'

export const contactConfig = {
  emailDisplay: 'zurizky.ayudish7@gmail.com',
  emailHref: 'mailto:zurizky.ayudish7@gmail.com',
  phoneDisplay: '+62 838-3010-4314',
  phoneHref: 'tel:+6283830104314',
  /** Digits only, no plus/spaces — for wa.me links. */
  waNumber: '6283830104314'
} as const

export const isFormConfigured = (): boolean =>
  !WEB3FORMS_ACCESS_KEY.includes('REPLACE_WITH_')

export const buildWaLink = (prefill: string): string =>
  `https://wa.me/${contactConfig.waNumber}?text=${encodeURIComponent(prefill)}`
