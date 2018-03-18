import {Component, Input, OnInit} from '@angular/core';
import { Profile } from 'shared/models/profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input('profile') profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
