import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll () {
    return this.db.list('/products');
  }

  get (productID) {
    return this.db.object('/products/' + productID);
  }

  update (productID, product) {
    this.db.object('/products/' + productID).update(product);
  }

  delete(productID) {
    return this.db.object('/products/' + productID).remove();
  }

}
