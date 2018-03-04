import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppUser} from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import {ProfileInformationService} from "shared/services/profile-information.service";
import {Profile} from "shared/models/profile";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UploadFilesComponent} from "shared/components/upload-files/upload-files.component";
import {ImageGalleryComponent} from "shared/components/image-gallery/image-gallery.component";

@Component({
  selector: 'app-dashboard-user-profile',
  templateUrl: './dashboard-user-profile.component.html',
  styleUrls: ['./dashboard-user-profile.component.css']
})
export class DashboardUserProfileComponent implements OnInit , OnDestroy {

  user: AppUser;
  subscription: Subscription;
  profileInfo: any = {};
  profile;
  dialogData: string = 'profilePic';

  constructor(private auth: AuthService,
              private profileService: ProfileInformationService,
              public dialog: MatDialog) {
    this.profile = {};

    this.user = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.subscription = auth.appUser$.subscribe(user => {
      this.user = user;
      profileService.getProfileByID(user.$key).subscribe(p => {
        this.profile = p;
      });
    });
  }

  submitProfile() {
    console.log(this.profileInfo);
    this.profileService.updateProfile(this.user.$key, this.profileInfo);

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
    dialogRef.componentInstance.data = this.dialogData;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
  }

   ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
