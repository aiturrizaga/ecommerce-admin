export type OrderType = 'IN_PROGRESS' | 'ON_WAY' | 'DELIVERED' | 'CANCELLED';

export interface SaveOrder {
  userId: number;
  address: string;
  orderType: string;
  paymentMethod: string;
  latitude?: number;
  longitude?: number;
  state: OrderType;
  items: SaveOrderItem[]
}

export interface SaveOrderItem {
  productId: number;
  quantity: number;
}

export interface SelectedOrderProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productSubtotal: number;
}
