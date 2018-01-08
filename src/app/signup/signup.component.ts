import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialog } from '@angular/material';
import { AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthService) { }
  nav: NavbarComponent = new NavbarComponent(this.dialog, this.auth);

  ngOnInit() {
  }

  // Hide password
  hide = true;

  openLogin() {
    this.dialog.closeAll();
    this.nav.openLogin();
  }

}
