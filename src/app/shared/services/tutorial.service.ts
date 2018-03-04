import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@Injectable()
export class TutorialService {

  constructor(private db: AngularFireDatabase) { }

  createTutorial (tutorial) {
    return this.db.list('/tutorials').push(tutorial);
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
    return this.db.object('/tutorials/' + tutorialID).remove();
  }

}
