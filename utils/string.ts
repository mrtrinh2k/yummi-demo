import { OrderStatus } from '~/config'

export const getStatusText = (status: number): string => {
  return (
    (status === OrderStatus.New && 'New') ||
    (status === OrderStatus.Approved && 'Approved') ||
    (status === OrderStatus.Delivering && 'Delivering') ||
    (status === OrderStatus.Delivered && 'Delivered') ||
    ''
  )
}
