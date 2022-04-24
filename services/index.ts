// export * from "./OrderService";
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { createOrderService, OrderServiceInstance } from './OrderService'
import { AccountServiceInstance, createAccountService } from './AccountService'

export interface ServicesInstance {
  order: OrderServiceInstance
  account: AccountServiceInstance
}

export const createServices = ($axios: NuxtAxiosInstance) => ({
  order: createOrderService($axios),
  account: createAccountService($axios),
})
