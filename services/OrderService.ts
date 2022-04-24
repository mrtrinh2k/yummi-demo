import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ListQueryObject } from '~/models/common'
import { OrderDTO, OrdersList, OrderDetail } from '~/models/order'
import { wQuery } from '~/utils'

export interface OrderServiceInstance {
  getOrders(query: ListQueryObject): Promise<OrdersList>
  getOrder(id: string): Promise<OrderDetail>
}

export const createOrderService = ($axios: NuxtAxiosInstance) => ({
  getOrders: (query: ListQueryObject) =>
    $axios.$get<OrdersList>(wQuery(`/v1/Catalog/Order?`, query)),
  getOrder: (id: string) => $axios.$get<OrderDetail>(`/v1/Catalog/Order/${id}`),
})
