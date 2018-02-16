import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { MatDialog } from '@angular/material';
import { AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
//import { moveIn, fallIn } from '../router/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  //animations: [moveIn(), fallIn()],
  //host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  // Hide password
  //hide = true;
  //nav: NavbarComponent = new NavbarComponent(this.dialog, this.auth);
  //constructor(public dialog: MatDialog, private auth: AuthService) { }
  //openLogin() {
  //  this.dialog.closeAll();
    //this.nav.openLogin();
  //}

  state: string = '';
  error: any;
  email;
  password;

  constructor (public auth: AuthService, private router: Router) {

  }

  onSubmit (formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.auth.afAuth.auth.createUserWithEmailAndPassword(formData.value.email,formData.value.password)
      .catch(error => {
        console.log(error);
        this.error = error;
      });
    }
  }

  ngOnInit() {
  }

  

}
