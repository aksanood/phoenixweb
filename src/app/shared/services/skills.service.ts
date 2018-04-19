import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()
export class SkillsService {

  constructor(private db: AngularFireDatabase) { }

  getSkills() {
    return this.db.list('/skills');
  }

  searchSkills(start, end) {
    return this.db.list('/skills/', {
      query: {
        orderByChild: 'name',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }
}
