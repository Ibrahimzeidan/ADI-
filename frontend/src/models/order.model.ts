export interface OrderItemInput {
  productId?: string;
  offerId?: string;
  quantity: number;
  priceAtPurchase: number;
  name: string;
  nameAr: string | null;
}

export interface CreateOrderInput {
  deliveryAddress: string;
  paymentMethod: "cash" | "card";
  items: OrderItemInput[];
  totalPrice: number;
}

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";
