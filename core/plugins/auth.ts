import { Context } from '@nuxt/types'

export default ({ $auth }: Context) => {
  $auth.onError((error: any) => {
    throw error
  })
}
