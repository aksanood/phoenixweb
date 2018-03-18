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

@Component({
  selector: 'app-dashboard-user-profile',
  templateUrl: './dashboard-user-profile.component.html',
  styleUrls: ['./dashboard-user-profile.component.css']
})
export class DashboardUserProfileComponent implements OnInit , OnDestroy {

  user: AppUser;
  subscription: Subscription;
  
  profileInfo: any = {};
  personalInfo: any = {};
  externalLinks: any = {};
  workInfo: any = {};
  educationInfo: any = {};

  profile;
  testProfile: Profile;
  selectedImage: Image;
  step = 0;
  workExperience: any[3] = [];

  constructor(private auth: AuthService,
              private profileService: ProfileInformationService,
              public dialog: MatDialog) {
    this.profile = {};

    this.user = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.subscription = auth.appUser$.subscribe(user => {
      this.user = user;
      profileService.getProfileByID(user.$key).subscribe(p => {
        this.profile = p;
        this.testProfile = new Profile(p);
      });
    });
  }

  submitPersonalInfo() {
    console.log(this.personalInfo);
    if(this.selectedImage) this.personalInfo.picture = this.selectedImage.url;

    this.profileService.updatePersonalInfo(this.user.$key, this.personalInfo);
  }

  submitWorkInfo() {
    console.log(this.workInfo);
    this.profileService.updateWorkInfo(this.user.$key, this.workInfo);
  }

  submitExternalLinks() {
    console.log(this.externalLinks);
    this.profileService.updateExternalLinks(this.user.$key, this.externalLinks);
  }

  openUploader() {
    let dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openGallery() {
    let dialogRef = this.dialog.open(ImageGalleryComponent, {
      width: '500px'
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(image => {
      this.selectedImage = image;
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  openAddWork() {
    let dialogRef = this.dialog.open(AddWorkComponent, {
      width: '500px'
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(work => {
      if (!this.workExperience[0]){
        this.workExperience[0] = work;
        console.log(this.workExperience[0]);
        console.log(this.workExperience[1]);
        console.log(this.workExperience[2]);
        let work1: any = {};
        work1.work_1Position = work.position;
        work1.work_1Company = work.company;
        work1.work_1StartDate = work.startDate;
        work1.work_1EndDate = work.endDate;
        this.profileService.updateWorkInfo(this.user.$key, work1);
      }
      else if(this.workExperience[0] && !this.workExperience[1]){
        this.workExperience[1] = work;
        console.log(this.workExperience[0]);
        console.log(this.workExperience[1]);
        console.log(this.workExperience[2]);
        let work2: any = {};
        work2.work_2Position = work.position;
        work2.work_2Company = work.company;
        work2.work_2StartDate = work.startDate;
        work2.work_2EndDate = work.endDate;
        this.profileService.updateWorkInfo(this.user.$key, work2);
      }
      else if(this.workExperience[0] && this.workExperience[1] && !this.workExperience[2]){
        this.workExperience[2] = work;
        console.log(this.workExperience[0]);
        console.log(this.workExperience[1]);
        console.log(this.workExperience[2]);
        let work3: any = {};
        work3.work_3Position = work.position;
        work3.work_3Company = work.company;
        work3.work_3StartDate = work.startDate;
        work3.work_3EndDate = work.endDate;
        this.profileService.updateWorkInfo(this.user.$key, work3);
      }
      
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
  }

   ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
