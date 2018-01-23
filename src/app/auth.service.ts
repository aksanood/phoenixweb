import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import { AppUser} from './models/app-user';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  // Login / Logout variables
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {

    this.user$ = afAuth.authState;

  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessKey;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

    //this.afAuth.auth.signInWithRedirect(provider);
    //this.afAuth.auth.getRedirectResult().then(function(result) {
    //  if (result.credential) {
    //    var token = result.credential.accessKey;
    //  }
    //  var user = result.user;
    //}).catch(function(error) {
    //  var errorCode = error.code;
    //  var errorMessage = error.message;
    //  var email = error.email;
    //  var credential = error.credential;
    //});
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user)
          return this.userService.getUserID(user.uid);
        return Observable.of(null);
      });
  }

}
