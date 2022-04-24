import { Context, Inject } from '@nuxt/types/app'
import { createServices, ServicesInstance } from '~/services/index'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $services: ServicesInstance
  }

  interface Context {
    $services: ServicesInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: ServicesInstance
    $message: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $services: ServicesInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $message: any
  }
}

export default (ctx: Context, inject: Inject) => {
  inject('services', createServices(ctx.$axios))
}
