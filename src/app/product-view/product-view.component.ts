import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from "../models/products";
import {ShoppingCartService} from "../shopping-cart.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  product;
  id;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) {

    this.product = [];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(2).subscribe(p => this.product = p);
  }


  addToCart () {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }


  ifAdded () {
   // let added = this.cart.items[this.product.$key.addedToCart];
   // if(added) return true;
   return true;
  }

  getQuantity() {
    if(!this.cart) return 0;

    let item = this.cart.items[this.product.$key];
    console.log(item.quantity);
    return item ? item.quantity : 0;
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart);
    console.log(this.cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
