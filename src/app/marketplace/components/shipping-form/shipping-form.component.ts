import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../../shared/services/order.service';
import {Order} from '../../../shared/models/order';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  payment: any = {};
  subscription: Subscription;
  userId: string;

  constructor(private router: Router,
              private orderService: OrderService,
              private authService: AuthService) { }

  async placeOrder () {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
