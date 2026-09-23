import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        container: '1280px'
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0a0a0b'
        }
      },
      borderRadius: {
        card: '1rem'
      }
    }
  },
  plugins: []
}
