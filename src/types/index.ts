export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  email: string;
  house: string;
  street: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
}