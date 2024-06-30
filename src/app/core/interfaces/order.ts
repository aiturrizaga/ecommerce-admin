import { Person } from "./person";
import { Product } from "./product";

export type OrderState = 'IN_PROGRESS' | 'ON_WAY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  person: Person;
  address: string;
  saleDate: Date;
  amountTotal: number;
  orderType: string;
  paymentMethod: string;
  paymentDate: Date;
  latitude: number;
  longitude: number;
  state: string;
  orderLines: OrderLine[];
}

export interface OrderLine {
  id: number;
  product: Product;
  quantity: number;
  priceUnit: number;
  priceTotal: number;
}

export interface SaveOrder {
  userId: number;
  address: string;
  orderType: string;
  paymentMethod: string;
  latitude?: number;
  longitude?: number;
  state: OrderState;
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
