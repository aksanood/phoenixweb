import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { ProfileInformationService } from 'shared/services/profile-information.service';
import { AuthService } from 'shared/services/auth.service';

@Injectable()
export class TutorialService {

  userID: string;

  constructor(private db: AngularFireDatabase,
              private profileService: ProfileInformationService,
              private auth: AuthService) { 
                
              }

  createTutorial (tutorial) {
    this.auth.appUser$.subscribe(user => {
      this.userID = user.$key;
      });
    return this.db.list('/tutorials').push(tutorial)
    .then( result => {
      this.profileService.saveTutorial(this.userID, result.key);
     });
  }

  getAllTutorials () {
    return this.db.list('/tutorials');
  }

  getById (tutorialID) {
    return this.db.object('/tutorials/' + tutorialID);
  }

  update (tutorialID, tutorial) {
    this.db.object('/tutorials/' + tutorialID).update(tutorial);
  }

  delete(tutorialID) {
    this.db.object('/tutorials/' + tutorialID).remove();
    this.profileService.deleteTutorial(this.userID, tutorialID);
  }

}
