import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Product} from './models/products';
import 'rxjs/add/operator/take';
import {ShoppingCart} from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      numberOfItems: 0
    });
  }

  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  deleteItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).remove();
  }

  private getNumOfItems(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId (): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart (product: Product) {

    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    let number$ = this.getNumOfItems(cartId);
    item$.update({product: product});
    number$.take(1).subscribe(number => {
      number$.update({numberOfItems: (number.numberOfItems || 0) + 1});
    });
    // if the same item can added multiple times to the cart
    // item$.take(1).subscribe(item => {
    //
    // item$.update({product: product, quantity: (item.quantity || 0) + 1 });
    // });
  }

  async removeFromCart (product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    let number$ = this.getNumOfItems(cartId);
    this.deleteItem(cartId, product.$key);
    number$.take(1).subscribe(number => {
      number$.update({numberOfItems: number.numberOfItems - 1});
    });
  }
}
