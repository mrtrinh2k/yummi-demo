import Vue from 'vue'
// @ts-ignore
import BiginUI from '@bigin/bigin-ui-vue'
import { Context } from '@nuxt/types'

export default ({ app }: Context) => {
  return Vue.use(BiginUI, {
    i18n: (key: any, value: any) => app.i18n.t(key, value),
  })
}
