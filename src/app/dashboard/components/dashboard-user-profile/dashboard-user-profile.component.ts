import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppUser} from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-user-profile',
  templateUrl: './dashboard-user-profile.component.html',
  styleUrls: ['./dashboard-user-profile.component.css']
})
export class DashboardUserProfileComponent implements OnInit , OnDestroy {

  user: AppUser;
  subscription: Subscription;

  constructor(private auth: AuthService) {
    this.user = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.subscription = auth.appUser$.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

   ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
