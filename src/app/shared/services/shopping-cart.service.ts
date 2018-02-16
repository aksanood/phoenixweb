import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Product} from '../models/products';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      numberOfItems: 0
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private deleteItem(cartId: string, productId: string) {
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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items, x.numberOfItems));
  }

  async addToCart (product: Product) {

    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    let number$ = this.getNumOfItems(cartId);
    item$.update({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price
    });

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
    let number$ = this.getNumOfItems(cartId);
    this.deleteItem(cartId, product.$key);
    number$.take(1).subscribe(number => {
      number$.update({numberOfItems: number.numberOfItems - 1});
    });
  }

  async removeItem (productId: string) {
    let cartId = await this.getOrCreateCartId();
    let number$ = this.getNumOfItems(cartId);
    this.deleteItem(cartId, productId);
    number$.take(1).subscribe(number => {
      number$.update({numberOfItems: number.numberOfItems - 1});
    });
  }

  async clearAll () {
    let cartId = await this.getOrCreateCartId();
    let number$ = this.getNumOfItems(cartId);

    this.db.object('/shopping-carts/' + cartId + '/items').remove();
    number$.take(1).subscribe(number => {
      number$.update({numberOfItems: 0});
    });
  }
}
