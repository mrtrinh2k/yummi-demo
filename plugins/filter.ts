import Vue from 'vue'
import { formatDate } from '~/utils'
import { formatCurrency } from '~/utils/number'

Vue.filter('currency', (value: number) => formatCurrency(value))
Vue.filter('date', (value: Date | string) => formatDate(value, 'MM/dd/yyyy'))
Vue.filter('datetime', (value: Date | string) =>
  formatDate(value, 'MM/dd/yyyy — hh:mma')
)
