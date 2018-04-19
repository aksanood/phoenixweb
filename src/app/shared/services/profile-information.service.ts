import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class ProfileInformationService {

  profileID: string;

  constructor(private db: AngularFireDatabase) {

   }

  createProfile(user: firebase.User) {
    this.db.object('/profile/' + user.uid + '/personalInfo/').update({
      name: user.displayName,
      email: user.email,
    }).catch(error => {
      console.log(error);
    });
  }

  updatePersonalInfo(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/personalInfo/').update(info).catch(error => {
      console.log(error);
    });
  }

  updateExternalLinks(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/externalLinks/').update(info).catch(error => {
      console.log(error);
    });
  }

  //================ skills and interests ====================//
  getSkills(profileID){
    return this.db.object('/profile/' + profileID + '/skillsAndInterests/' + '/skills/');
  }

  getInterests(profileID){
    return this.db.object('/profile/' + profileID + '/skillsAndInterests/' + '/interests/');
  }

  addSkills(profileID: string, skills: any) {
    this.db.object('/profile/' + profileID + '/skillsAndInterests/' + '/skills/').update(skills);
  }

  deleteUserSkill(profileID: string, index) {
    return this.db.list('/profile/' + profileID + '/skillsAndInterests/' + '/skills/' + index).remove();
  }
  
  updateSkillsAndInterests(profileID: string, info: any) {
    this.db.object('/profile/' + profileID + '/skillsAndInterests/').update(info).catch(error => {
      console.log(error);
    });
  }

  //================ work ====================//
  addWork(profileID: string, info: any) {
    this.db.list('/profile/' + profileID + '/workInfo/').push(info);
  }

  updateWorkItem(profileID: string, id: string, info: any){
    this.db.object('/profile/' + profileID + '/workInfo/' + id).update(info);
  }

  getWorkItem(uid: string, eid: string) {
    return this.db.object('/profile/' + uid + '/workInfo/' + eid);
  }

  deleteWorkItem(uid: string, eid: string) {
    return this.db.object('/profile/' + uid + '/workInfo/' + eid).remove();
  }
  
  //================ Education ====================//
  addEducation(profileID: string, info: any) {
    this.db.list('/profile/' + profileID + '/education/').push(info);
  }

  updateEducationItem(profileID: string, id: string, info: any){
    this.db.object('/profile/' + profileID + '/education/' + id).update(info);
  }

  getEducationItem(uid: string, eid: string) {
    return this.db.object('/profile/' + uid + '/education/' + eid);
  }

  deleteEducationItem(uid: string, eid: string) {
    return this.db.object('/profile/' + uid + '/education/' + eid).remove();
  }

  //================ get / save product ====================//
  saveProduct(profileID, key, product) {
    this.db.object('/profile/' + profileID + '/products/' + key).update({
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
    });
  }

  getProducts(profileID) {
    return this.db.list('/profile/' + profileID + '/products/');
  }

  deleteProduct(profileID, productID) {
   this.db.object('/profile/' + profileID + '/products/' + productID).remove();
    
  }
  //================ get / save blog post ====================//
  saveBlogPost(profileID, key) {
    this.db.list('/profile/' + profileID + '/blogPosts/').push({
      id: key
    });
  }
  getBlogPosts(profileID) {
    return this.db.list('/profile/' + profileID + '/blogPosts/');
  }
  deleteBlogPost(profileID, key) {
    this.db.list('/profile/' + profileID + '/blogPosts/')
     .forEach(b => {
       b.filter(p => {
         if (p.id === key) {
           return this.db.object('/profile/' + profileID + '/blogPosts/' + p.$key).remove();
         } else return;
       });
     });
   }

    //================ get / save Tutorial ====================//
  saveTutorial(profileID, key) {
    this.db.list('/profile/' + profileID + '/tutorials/').push({
      id: key
    });
  }
  getTutorials(profileID) {
    return this.db.list('/profile/' + profileID + '/tutorials/');
  }
  deleteTutorial(profileID, key) {
    this.db.list('/profile/' + profileID + '/tutorials/')
     .forEach(b => {
       b.filter(p => {
         if (p.id === key) {
           return this.db.object('/profile/' + profileID + '/tutorials/' + p.$key).remove();
         } else return;
       });
     });
   }


  getAllProfiles() {
    return this.db.list('/profile');
  }

  getEducationById(uid: string) {
    return this.db.list('/profile/' + uid + '/education/');
  }

  getWorkInfoById(uid: string) {
    return this.db.list('/profile/' + uid + '/workInfo/');
  }

  getPersonalInfoById(uid: string) {
    return this.db.object('/profile/' + uid + '/personalInfo/');
  }

  getExternalLinksById(uid: string) {
    return this.db.list('/profile/' + uid + '/externalLinks/');
  }

  getSkillsAndInterestsById(uid: string) {
    return this.db.list('/profile/' + uid + '/skillsAndInterests/');
  }

  getProfileByID (id: string) {
    return this.db.object('/profile/' + id);
  }
}
