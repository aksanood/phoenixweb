import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialog } from '@angular/material';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public dialog: MatDialog, private auth: AuthService) {
  }
  nav: NavbarComponent = new NavbarComponent(this.dialog, this.auth);

  // Hide password
  hide = true;

  openSignup() {
    this.dialog.closeAll();
    this.nav.openSignup();
  }

  loginWithGoogle() {
    this.dialog.closeAll();
    this.auth.logIn();
  }

}
