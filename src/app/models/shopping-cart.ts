import { ShoppingCartItem} from './shopping-cart-item';

export interface ShoppingCart {
  items: ShoppingCartItem[];
  numberOfItems: number;
}
