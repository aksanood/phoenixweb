import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import {ProfileInformationService} from "shared/services/profile-information.service";
import {Profile} from "shared/models/profile";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {


  profile: Profile;
  id;
  profileSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileInformationService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.profileSubscription = this.profileService.getProfileByID(this.id)
      .subscribe(profile => {
        this.profile = profile;
        console.log(this.profile);
      });
  }

  ngOnInit() {
  }

}
