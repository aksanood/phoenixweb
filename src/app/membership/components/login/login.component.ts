import { Component, HostBinding } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { MatDialog } from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
//import { moveIn } from '../router/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //animations: [moveIn()],
  //host: {'[@moveIn]': ''}
})
export class LoginComponent {

  //constructor(public dialog: MatDialog, private auth: AuthService) {
  //}
  //nav: NavbarComponent = new NavbarComponent(this.dialog, this.auth);
  // Hide password
  //hide = true;
  //openSignup() {
  //  this.dialog.closeAll();
   // this.nav.openSignup();
  //}
  //loginWithGoogle() {
  //  this.dialog.closeAll();
  //  this.auth.loginWithGoogle();
  //}

  error: any = {};
  constructor(private auth: AuthService, private router: Router) {
    
    this.auth.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/dashboard');
      }
    });
    this.error = this.auth.error;
  }

  loginWithGoogle () {
    this.auth.loginWithGoogle();
  }

  loginWithFacebook () {
    this.auth.loginWithFacebook();
  }

}
