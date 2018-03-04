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
    this.db.object('/profile/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    })
  }

  updateProfile(profileID: string, info: any) {
    this.db.object('/profile/' + profileID).update(info).catch(error => {
      console.log(error);
    });
  }

  getProfileByID (id: string) {
    return this.db.object('/profile/' + id);
  }
}
