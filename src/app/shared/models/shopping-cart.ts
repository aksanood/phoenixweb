import { ShoppingCartItem} from './shopping-cart-item';
import { Product} from './products';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
   constructor (public itemsMap: { [productId: string]: ShoppingCartItem}, public numberOfItems: number) {
     this.itemsMap = itemsMap || {};
     for (let productId in itemsMap) {
       let item = itemsMap[productId];
       this.items.push(new ShoppingCartItem({...item, $key: productId}));
     }
   }

   get totalPrice () {
     let sum = 0;
     for (let productId in this.items)
       sum += this.items[productId].price;
     return sum;
   }

    itemAdded (product: Product) {
     let item = this.itemsMap[product.$key];
     return item ? true : false;
   }

}
