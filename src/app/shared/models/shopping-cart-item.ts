
export class ShoppingCartItem {
  $key: string;
  title: string;
  imageUrl: string;
  price: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
}
