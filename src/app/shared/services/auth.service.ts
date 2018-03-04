import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import { AppUser} from '../models/app-user';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  // Login / Logout variables
  user$: Observable<firebase.User>;
  error: any;

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    
    this.user$ = afAuth.authState;

  }

  loginWithEmail (email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.error = error;
        console.log(error);
      });
  }

  loginWithFacebook () {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    let provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(result => {
      let token = result.credential.accessKey;
      let user = result.user;
    }).catch(error => {
      this.error = error;
    });
    
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function (result) {
      let token = result.credential.accessKey;
      let user = result.user;
    }).catch(error => {
      this.error = error;
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
          return this.userService.getUserByID(user.uid);
        return Observable.of(null);
      });
  }

  getErrorMessage () {
    return this.error;
  }
}
