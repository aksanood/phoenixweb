import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {User} from "firebase";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private userServise: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (!user) return;

        // for now until the registration service is added save the user everytime user logs in
        userServise.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
