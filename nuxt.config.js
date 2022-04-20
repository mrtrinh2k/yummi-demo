import biginUiEn from '@bigin/bigin-ui-vue/lib/locale/lang/en'
import biginUiVi from '@bigin/bigin-ui-vue/lib/locale/lang/vi'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'demo-app',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@bigin/bigin-ui-ds'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/bigin-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: [/^@bigin\/bigin-ui-vue/] },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
  ],

  i18n: {
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
