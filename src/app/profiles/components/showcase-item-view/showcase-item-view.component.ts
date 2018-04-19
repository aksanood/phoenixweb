import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProfileInformationService} from "shared/services/profile-information.service";
import {ShowcaseService} from "shared/services/showcase.service";
import {Subscription} from "rxjs/Subscription";
import {isNgTemplate} from "@angular/compiler";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-showcase-item-view',
  templateUrl: './showcase-item-view.component.html',
  styleUrls: ['./showcase-item-view.component.css']
})
export class ShowcaseItemViewComponent implements OnInit, OnDestroy {

  profileID;
  itemID;

  subscription: Subscription;
  profileInfo;
  itemInfo;
  coverImage;
  itemImages: any[];
  showcaseItems: any[] = [];
  page = 1;
  pg;

  constructor(public dialogRef: MatDialogRef<ShowcaseItemViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private profileService: ProfileInformationService,
              private showcaseService: ShowcaseService,
              private config: NgbCarouselConfig) { }

  ngOnInit() {
    this.config.interval = 10000;
    this.config.wrap = false;
    this.config.keyboard = false;

    this.profileID = this.data.profileID;
    this.itemID = this.data.itemID;

    this.subscription = this.profileService.getProfileByID(this.profileID).subscribe(profileInfo => {
      this.profileInfo = profileInfo;
      });

      this.showcaseService.getOneItemByID(this.profileID, this.itemID).subscribe(itemInfo => {
        this.itemInfo = itemInfo;
        this.coverImage = itemInfo.coverImage;
      });

      this.showcaseService.getShowcaseImages(this.profileID, this.itemID).subscribe(images => {
        this.itemImages = images;
      });

      this.showcaseService.getItemsById(this.profileID).subscribe(items => {
        items.forEach(i => {
          if (i.$key !== this.itemID) {
            this.showcaseItems.push(i);
          }
        });
      });
  }

  loadItemPage(key) {
    //this.itemID = key;
    //this.ngOnInit();
  }

  ngOnDestroy () {
    console.log(this.profileInfo);
    console.log(this.itemInfo);
    console.log(this.coverImage);
    console.log(this.itemImages);
    this.subscription.unsubscribe();
  }

  closeDialog (): void {
    this.dialogRef.close();
  }

}
