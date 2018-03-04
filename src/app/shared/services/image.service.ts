import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {Upload} from "shared/models/upload";
import {Image} from "shared/models/image";

@Injectable()
export class ImageService {

  constructor(private db: AngularFireDatabase) { }

  saveImage(image: Image) {

    switch (image.type) {
      case 0:
        // Type profile picture
        this.db.list('/images/' + image.file.userId + '/profile-pictures/').push({
          name: image.name,
          url: image.url,
        });
        break;

      case 1:
        // Type profile picture
        this.db.list('/images/' + image.file.userId + '/blog-pictures/').push({
          name: image.name,
          url: image.url,
        });
        break;

      case 2:
        // Type profile picture
        this.db.list('/images/' + image.file.userId + '/tutorial-pictures/').push({
          name: image.name,
          url: image.url,
        });
        break;
    }


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
}
