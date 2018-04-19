import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {Upload} from "shared/models/upload";
import {Image} from "shared/models/image";

@Injectable()
export class ImageService {

  constructor(private db: AngularFireDatabase) { }

  saveProfileImage(image: Image) {
    // Type profile picture
    this.db.list('/images/' + image.file.userId + '/profile-pictures/').push({
      name: image.name,
      url: image.url,
    });
  }

  saveBlogImage(image: Image) {
    // Type profile picture
    this.db.list('/images/' + image.file.userId + '/blog-pictures/').push({
      name: image.name,
      url: image.url,
    });
  }

  saveTutorialImage(image: Image) {
    // Type profile picture
    this.db.list('/images/' + image.file.userId + '/tutorial-pictures/').push({
      name: image.name,
      url: image.url,
    });
  }

  savePortfolioImage(image: Image) {
    // Type portfolio picture
    this.db.list('/images/' + image.file.userId + '/portfolio-pictures/').push({
      name: image.name,
      url: image.url,
    });
  }


  getProfileImagesByUser (uid) {
    return this.db.list('/images/' + uid + '/profile-pictures/');
  }

  getBlogImagesByUser (uid) {
    return this.db.list('/images/' + uid + '/blog-pictures/');
  }

  getTutorialImagesByUser (uid) {
    return this.db.list('/images/' + uid + '/tutorial-pictures/');
  }

  getShowcaseImagesByUser (uid) {
    return this.db.list('/images/' + uid + '/portfolio-pictures/');
  }
}
