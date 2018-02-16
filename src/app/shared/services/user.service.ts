import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import { AppUser } from '../models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
      username: this.getUsername(user.email)
    });
  }

  getUserID(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }

  getUsername(str: string) {
    return str.replace(/@.*$/,'');
  }
}
