import {Component, Input, OnInit} from '@angular/core';
import { Profile } from 'shared/models/profile';
import { ProfileInformationService } from 'shared/services/profile-information.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input('profileID') profileID: string;

  profileInfo;
  constructor(private profileService: ProfileInformationService) { }

  ngOnInit() {
    this.profileService.getPersonalInfoById(this.profileID).subscribe(info => {
      this.profileInfo = info;
      console.log(this.profileInfo);
    })
  }

}
