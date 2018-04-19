import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { ProfileInformationService } from 'shared/services/profile-information.service';

@Injectable()
export class ProductService {

  userID: string;

  constructor(private db: AngularFireDatabase, 
              private auth: AuthService,
              private profileService: ProfileInformationService) {
                
              }

  create(product) {
    this.auth.appUser$.subscribe(user => {
      this.userID = user.$key;
      });

     this.db.list('/products').push(product)
     .then( result => {
      this.profileService.saveProduct(this.userID, result.key, product);
     });
    
  }

  getAll () {
    return this.db.list('/products');
  }

  get (productID) {
    return this.db.object('/products/' + productID);
  }

  update (productID, product) {
    this.db.object('/products/' + productID).update(product);
  }

  delete(productID) {
    this.db.object('/products/' + productID).remove();
    this.profileService.deleteProduct(this.userID, productID);
  }

}
