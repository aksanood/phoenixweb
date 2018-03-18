import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class ProfileInformationService {

  profileID: string;

  constructor(private db: AngularFireDatabase) {
    this.profileID
   }

  createProfile(user: firebase.User) {
    this.db.object('/profile/' + user.uid + '/personalInfo/').update({
      name: user.displayName,
      email: user.email,
    }).catch(error => {
      console.log(error);
    });
  }

  updatePersonalInfo(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/personalInfo/').update(info).catch(error => {
      console.log(error);
    });
  }

  updateExternalLinks(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/externalLinks/').update(info).catch(error => {
      console.log(error);
    });
  }

  updateWorkInfo(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/workInfo/').update(info).catch(error => {
      console.log(error);
    });
  }

  getAllProfiles() {
    return this.db.list('/profile');
  }

  getProfileByID (id: string) {
    return this.db.object('/profile/' + id);
  }
}
