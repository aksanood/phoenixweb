import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { SidebarComponent} from '../sidebar/sidebar.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{

  // Sidebar open variables
  sidebar: SidebarComponent = new SidebarComponent();
  @Output() navToggle = new EventEmitter<boolean>();

  appUser: AppUser;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private auth: AuthService) {
    this.subscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  login = false;
  signup = false;
  show = false;
  showNav = false;
  showSideNav = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  toggleSidebar() {
    this.navToggle.emit(true);
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
