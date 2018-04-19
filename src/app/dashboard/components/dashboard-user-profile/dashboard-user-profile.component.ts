import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppUser} from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import {ProfileInformationService} from "shared/services/profile-information.service";
import {Profile} from "shared/models/profile";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UploadFilesComponent} from "shared/components/upload-files/upload-files.component";
import {ImageGalleryComponent} from "shared/components/image-gallery/image-gallery.component";
import { Image } from 'shared/models/image';
import { AddWorkComponent } from '../add-work/add-work.component';
import { AddEducationComponent } from '../add-education/add-education.component';
import {SkillsService} from "shared/services/skills.service";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-dashboard-user-profile',
  templateUrl: './dashboard-user-profile.component.html',
  styleUrls: ['./dashboard-user-profile.component.css']
})
export class DashboardUserProfileComponent implements OnInit , OnDestroy {

  user: AppUser;
  subscription: Subscription;

  personalInfo: any = {};
  externalLinks: any = {};
  skillsAndInterests: any = {};

  profile;
  education: any[];
  work: any[];

  testProfile: Profile;
  selectedImage: Image;
  step = 0;

  skills;
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress = 0;
  selectedSkills: any[] = [];
  showDorpdown = false;

  constructor(private auth: AuthService,
              private profileService: ProfileInformationService,
              private skillsService: SkillsService,
              public dialog: MatDialog) {
    this.profile = {};

    this.user = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.subscription = auth.appUser$.subscribe(user => {
      this.user = user;
      profileService.getProfileByID(user.$key).subscribe(p => {
        this.profile = p;
        this.testProfile = new Profile();
      });

      profileService.getEducationById(user.$key).subscribe(e => {
        this.education = e;
        //console.log(this.education);
      });

      profileService.getWorkInfoById(user.$key).subscribe(w => {
        this.work = w;
        //console.log(this.work);
      });

      profileService.getSkills(user.$key).subscribe(skills => {
        console.log(skills);
        if(skills.$value !== null) this.selectedSkills = skills;
      });

      skillsService.searchSkills(this.startAt, this.endAt).subscribe(skills => {
        this.skills = skills;
        console.log(this.skills);
      });
    });
  }

  //================ Searching / adding / deleting skills ====================//
  searchSkill($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      let q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q+"\uf8ff");
    }
    this.lastKeypress = $event.timeStamp;
  }

  selectSkill(skill) {
    this.selectedSkills.push(skill);
    console.log(this.selectedSkills);
    this.showDorpdown = false;
  }

  removeSkill(skill) {
    var index = this.selectedSkills.indexOf(skill, 0);
    if (index > -1) {
      this.selectedSkills.splice(index, 1);
    }
  }

  toggleDropdown() {
    this.showDorpdown = !this.showDorpdown;
  }

  //================ Submit information on this componment ====================//
  submitPersonalInfo() {
    console.log(this.personalInfo);
    if(this.selectedImage) this.personalInfo.picture = this.selectedImage.url;

    this.profileService.updatePersonalInfo(this.user.$key, this.personalInfo);
  }

  submitExternalLinks() {
    console.log(this.externalLinks);
    this.profileService.updateExternalLinks(this.user.$key, this.externalLinks);
  }

  submitSkillsAndInterests() {
    console.log(this.skillsAndInterests);
    if (this.selectedSkills.length > 0) {
      console.log(this.selectedSkills.length);
      //this.profileService.addSkills(this.user.$key, this.selectedSkills);
      this.skillsAndInterests.skills = this.selectedSkills;
    }

    this.profileService.updateSkillsAndInterests(this.user.$key, this.skillsAndInterests);
  }

  //================ Open Dialogs for image uploading and gallery ====================//
  openUploader() {
    let dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '500px',
      data: {imageType: 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openGallery() {
    let dialogRef = this.dialog.open(ImageGalleryComponent, {
      width: '500px',
      data: {imageType: 0, selectType: 'radio'}
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(image => {
      this.selectedImage = image;
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  //================ Education ====================//
  openAddEducation(id?: string) {
    let dialogRef = this.dialog.open(AddEducationComponent, {
      width: '500px',
      data: {eid : id, uid: this.user.$key}
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(education => {
      if(id) {
        console.log('545454854');
        this.updateEducation(id, education);
      }else {
        console.log('sdsdsdsdsd');
        this.addEducation(education);
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  addEducation(education) {
    this.profileService.addEducation(this.user.$key, education);
  }

  updateEducation (id: string, education) {
    this.profileService.updateEducationItem(this.user.$key, id, education);
  }

  deleteEducation(id: string) {
    this.profileService.deleteEducationItem(this.user.$key, id);
  }

  //================ work ====================//
  openAddWork(id?: string) {
    let dialogRef = this.dialog.open(AddWorkComponent, {
      width: '500px',
      data: {wid : id, uid: this.user.$key}
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(work => {
      if(id) {
        console.log('has ID');
        this.updateWork(id, work);
      }else {
        console.log('has ID');
        this.addWork(work);
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  addWork(work) {
    this.profileService.addWork(this.user.$key, work);
  }

  updateWork (id: string, work) {
    this.profileService.updateWorkItem(this.user.$key, id, work);
  }

  deleteWork(id: string) {
    this.profileService.deleteWorkItem(this.user.$key, id);
  }

  //================ Accoordian functions ====================//
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  //================ Init, Destroy ====================//
  ngOnInit() {
  }

   ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
