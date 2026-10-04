/**
 * Contact configuration.
 *
 * FORM DELIVERY (FormSubmit AJAX — free, no signup, no API key):
 * Messages POST directly to the inbox below. The FIRST submission ever
 * triggers a one-time activation email — open it and click "Activate",
 * afterwards every message lands straight in the inbox (check spam
 * folder for the activation mail).
 *
 * To change the destination inbox, edit FORM_INBOX below.
 * Alternatives (need extra setup, see README):
 * - Web3Forms: needs a free access key.
 * - Resend: needs a Nuxt server route to keep the API key secret —
 *   never call Resend directly from the browser.
 */
export const FORM_INBOX = 'zurizky.ayudish7@gmail.com'

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_INBOX}`

export const contactConfig = {
  emailDisplay: 'zurizky.ayudish7@gmail.com',
  emailHref: 'mailto:zurizky.ayudish7@gmail.com',
  phoneDisplay: '+62 838-3010-4314',
  phoneHref: 'tel:+6283830104314',
  /** Digits only, no plus/spaces — for wa.me links. */
  waNumber: '6283830104314'
} as const

export const buildWaLink = (prefill: string): string =>
  `https://wa.me/${contactConfig.waNumber}?text=${encodeURIComponent(prefill)}`
