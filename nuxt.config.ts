// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  experimental: {
    appManifest: false
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Zurisky Aqsa Firmansyah | Full-Stack Developer & AI Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio of Zurisky Aqsa Firmansyah, a Full-Stack Developer and AI Developer specializing in modern web applications, APIs, dashboards, mobile applications, and AI-powered solutions.'
        },
        {
          name: 'keywords',
          content:
            'Zurisky Aqsa, Full-Stack Developer, Web Developer, AI Developer, Nuxt Developer, Vue Developer, React Developer, Indonesia Developer'
        },
        { name: 'author', content: 'Zurisky Aqsa Firmansyah' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Zurisky Aqsa Firmansyah | Full-Stack Developer & AI Developer' },
        {
          property: 'og:description',
          content:
            'I build modern web and mobile applications with a focus on scalable architecture, intuitive interfaces, APIs, databases, and AI-powered solutions.'
        },
        { property: 'og:image', content: '/images/og-cover.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Zurisky Aqsa Firmansyah | Full-Stack Developer & AI Developer' },
        {
          name: 'twitter:description',
          content:
            'Full-Stack Developer focused on modern web applications, APIs, databases, dashboards, mobile applications, and AI-powered solutions.'
        },
        { name: 'theme-color', content: '#0a0a0b' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://aqsa.my.id' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json', language: 'en-US' },
      { code: 'id', name: 'Indonesia', file: 'id.json', language: 'id-ID' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'zurisky-portfolio-theme'
  },

  image: {
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects']
    }
  }
})
