import {Component, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  login = false;
  show = false;
  appUser: AppUser;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private auth: AuthService) {
    this.subscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);
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

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
