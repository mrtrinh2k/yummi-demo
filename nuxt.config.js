import biginUiEn from '@bigin/bigin-ui-vue/lib/locale/lang/en'
import biginUiVi from '@bigin/bigin-ui-vue/lib/locale/lang/vi'
import { auth, axios } from './core/config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  publicRuntimeConfig: {
    baseURL: process.env.NUXT_ENV_API_URL,
    systemId: process.env.NUXT_ENV_SYSTEM_ID,
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - Yummi Partner Portal',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
    ],
  },

  router: {
    middleware: ['auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@bigin/bigin-ui-ds'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bigin-ui',
    '~/plugins/services',
    '~/core/plugins/axios',
    '~/core/plugins/filter',
    '~/plugins/filter',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios,
  auth,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/^@bigin\/bigin-ui-vue/],
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'vi', iso: 'vi-VN' },
    ],
    defaultLocale: 'en',
    vuex: { syncLocale: true, syncMessages: true },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          greeting: 'Hello!',
          ...biginUiEn,
        },
        vi: {
          greeting: 'Xin chào!',
          ...biginUiVi,
        },
      },
    },
  },
}
