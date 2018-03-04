import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "firebase";
import {UserService} from "./shared/services/user.service";
import { ProfileInformationService } from 'shared/services/profile-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private userServise: UserService, 
              private auth: AuthService, 
              router: Router,
              private profileService: ProfileInformationService) {
    auth.user$.subscribe(user => {
      if (!user) return;

        // for now until the registration service is added save the user everytime user logs in
        userServise.save(user);
        profileService.createProfile(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
