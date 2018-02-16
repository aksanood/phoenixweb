import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@Injectable()
export class BlogService {

  constructor(private db: AngularFireDatabase) { }

  createPost (post) {
    return this.db.list('/blog-posts').push(post);
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
    return this.db.object('/blog-posts/' + postID).remove();
  }
}
