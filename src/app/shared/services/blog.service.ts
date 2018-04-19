import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { ProfileInformationService } from 'shared/services/profile-information.service';
import { AuthService } from 'shared/services/auth.service';

@Injectable()
export class BlogService {

  userID: string;

  constructor(private db: AngularFireDatabase, 
              private profileService: ProfileInformationService,
              private auth: AuthService) {
              }

  createPost (post) {
    this.auth.appUser$.subscribe(user => {
      this.userID = user.$key;
    });
    return this.db.list('/blog-posts').push(post)
      .then( result => {
        this.profileService.saveBlogPost(this.userID, result.key);
      })
  }

  getAllPosts () {
    return this.db.list('/blog-posts');
  }

  getById (postID) {
    return this.db.object('/blog-posts/' + postID);
  }

  update (postID, post) {
    this.db.object('/blog-posts/' + postID).update(post);
  }

  delete(postID) {
    this.db.object('/blog-posts/' + postID).remove();
    this.profileService.deleteBlogPost(this.userID, postID);
  }
}
