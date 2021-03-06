import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../../membership/components/login/login.component';
import { SignupComponent } from '../../../membership/components/signup/signup.component';
import {AuthService} from '../../../shared/services/auth.service';
import {AppUser} from '../../../shared/models/app-user';
import {Subscription} from 'rxjs/Subscription';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {ShoppingCartItem} from "../../../shared/models/shopping-cart-item";
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../../../shared/models/shopping-cart";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  login = false;
  show = false;
  appUser: AppUser;
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(public dialog: MatDialog,
              private auth: AuthService,
              private shoppingCartService: ShoppingCartService) {
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  // open Login
  openLogin(): void {
    this.dialog.closeAll();
    this.toggleCollapse();
    this.login = true;
      let loginRef = this.dialog.open(LoginComponent, {});
      loginRef.afterClosed().subscribe(result => {});
  }

  // open Signup
  openSignup(): void {
    this.dialog.closeAll();
    this.toggleCollapse();
      let signupRef = this.dialog.open(SignupComponent, {});
      signupRef.afterClosed().subscribe(result => {});
  }

  // Logout Method
  logOut() {
    this.auth.logOut();
  }

  async ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
