import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "shared/models/profile";
import {Subscription} from "rxjs/Subscription";
import {ProfileInformationService} from "shared/services/profile-information.service";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit, OnDestroy {

  profiles: Profile[] = [];
  filteredProfiles: any[] = [];
  subscription: Subscription;

  constructor(profileService: ProfileInformationService) {

    this.subscription = profileService.getAllProfiles().subscribe(profiles => {
      this.filteredProfiles = this.profiles = profiles;
      console.log(this.filteredProfiles);
    });
  }

  searchProfiles (query: string) {
    //this.filteredProfiles = (query) ?
      //this.profiles.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      //this.profiles;
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
