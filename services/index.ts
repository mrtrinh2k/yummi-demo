// export * from "./OrderService";
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { createOrderService, OrderServiceInstance } from './OrderService'
import { AccountServiceInstance, createAccountService } from './AccountService'
import { createCommonService, CommonServiceInstance } from './CommonService'
import { createCatalogService, CatalogService } from './CatalogService'
import {
  createFileService,
  FileServiceInstance,
} from '~/core/services/FileService'

export interface ServicesInstance {
  order: OrderServiceInstance
  account: AccountServiceInstance
  common: CommonServiceInstance
  file: FileServiceInstance
  catalog: CatalogService
}

export const createServices = ($axios: NuxtAxiosInstance) => ({
  order: createOrderService($axios),
  account: createAccountService($axios),
  common: createCommonService($axios),
  file: createFileService($axios),
  catalog: createCatalogService($axios),
})
