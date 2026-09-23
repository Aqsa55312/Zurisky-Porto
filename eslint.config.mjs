// https://eslint.nuxt.com
import { withNuxt } from './.nuxt/eslint.config.mjs'

// Single-word names (Navbar, Hero, Footer, ...) are required by the project spec,
// so the multi-word component rule is intentionally disabled.
export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
