import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../shared/services/shopping-cart.service';
import {ShoppingCartItem} from "../../../shared/models/shopping-cart-item";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  removeItem(productId: string) {
    this.shoppingCartService.removeItem(productId);
  }

  clearAllItems () {
    this.shoppingCartService.clearAll();
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
