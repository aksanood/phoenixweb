import {Component, OnInit} from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
//import { moveIn, fallIn } from '../router/animations';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
  //animations: [moveIn(), fallIn()],
  //host: {'[@moveIn]': ''}
})
export class EmailLoginComponent implements OnInit {

  state: string = '';
  error: any;
  email;
  password;
  
  constructor(public auth: AuthService, private router: Router) {
    this.auth.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/dashboard');
      }
    });
   }

   onSubmit(formData) { 
     if(formData.valid) {
       this.auth.loginWithEmail(formData.value.email, formData.value.password);
       console.log(this.error);
     }
   }

  ngOnInit() {
  }

}
