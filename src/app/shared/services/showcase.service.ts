import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class ShowcaseService {

  profileID: string;

  constructor(private db: AngularFireDatabase) { }

  addItem(profileID: string, info: any) {

    this.db.list('/showcase/' + profileID).push({
      title: info.title,
      description: info.description,
      date: info.date,
      coverImage: {
        name: info.coverImage.name,
        url: info.coverImage.url,
        key: info.coverImage.$key
      }
    }).then(result => {
        info.images.forEach((value) => {
          this.db.object('/showcase/' + profileID + '/' + result.key + '/images/' + value.$key).update({
           name: value.name,
           url: value.url,
         });
        });
      });
  }

  updateItem(profileID: string, itemID: string, info: any) {
    console.log(info);
    this.db.object('/showcase/' + profileID +  '/' + itemID).update({
      title: info.title,
      description: info.description,
      coverImage: {
        name: info.coverImage.name,
        url: info.coverImage.url,
        key: info.coverImage.$key
      },
      modifiedDate: info.date
    }).then(result => {
      info.images.forEach((value) => {
        this.db.object('/showcase/' + profileID + '/' + itemID + '/images/' + value.$key).update({
          name: value.name,
          url: value.url,
        });
      });
    });
  }

  deleteItem(profileID: string, itemID: string) {
    console.log(profileID);
    console.log(itemID);
    return this.db.object('/showcase/' + profileID + '/' + itemID).remove().catch(error => {
      console.log(error);
    });
  }

  deleteShowcaseImage(profileID: string, itemID: string, index) {
    return this.db.list('/showcase/' + profileID + '/' + itemID + '/' + '/images/' + index).remove();
  }

  getShowcaseImages(profileID: string, itemID: string) {
    return this.db.list('/showcase/' + profileID + '/' + itemID + '/' + '/images/');
  }

  getShowcaseCoverImage(profileID: string, itemID: string) {
    return this.db.object('/showcase/' + profileID + '/' + itemID + '/' + '/coverImage/');
  }

  getItemsById(profileID: string) {
    return this.db.list('/showcase/' + profileID);
  }

  getOneItemByID (profileID: string, itemID) {
    return this.db.object('/showcase/' + profileID + '/' + itemID);
  }
}
