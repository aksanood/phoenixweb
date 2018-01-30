import {Product} from './products';

export class ShoppingCartItem {

  constructor(public product: Product) {}

  get price(){return this.product.price;}
}
