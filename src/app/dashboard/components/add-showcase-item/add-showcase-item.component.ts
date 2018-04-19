import { Component, OnInit, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { AddWorkComponent } from '../add-work/add-work.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UploadFilesComponent } from 'shared/components/upload-files/upload-files.component';
import { FormGroup } from '@angular/forms';
import { ShowcaseService } from 'shared/services/showcase.service';
import { Subscription } from 'rxjs/Subscription';
import { ShowcaseItem } from 'shared/models/showcase-item';
import { ImageGalleryComponent } from 'shared/components/image-gallery/image-gallery.component';
import { Image } from 'shared/models/image';

@Component({
  selector: 'app-add-showcase-item',
  templateUrl: './add-showcase-item.component.html',
  styleUrls: ['./add-showcase-item.component.css']
})
export class AddShowcaseItemComponent implements OnInit, OnDestroy {

  onSubmit = new EventEmitter();
  item: any = {};
  info: any = {};
  editorConfig = {
    "toolbar": [
       ["bold", "italic", "underline"],
       ["fontSize", "color"],
       ["orderedList", "unorderedList"],
       ["link", "unlink"],
       ["code"]
    ]
  }
  itemID: string;
  profileID: string;
  imagesSelected: any [] = [];
  subscription: Subscription;
  coverImage: any = {};

  constructor(public dialogRef: MatDialogRef<AddWorkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private showcaseService: ShowcaseService) {
                this.itemID = data.itemID;
                this.profileID = data.uid;
                
                if(this.itemID) this.subscription =  this.showcaseService.getOneItemByID(this.profileID, this.itemID).subscribe(item => {
                  this.item = item;

                  this.showcaseService.getShowcaseCoverImage(this.profileID, this.itemID).subscribe(coverImage => {
                    this.coverImage = coverImage;
                  });
                  
                  this.showcaseService.getShowcaseImages(this.profileID, this.itemID).subscribe(images => {
                    if(images){
                      this.imagesSelected = images;
                      console.log(this.imagesSelected)
                    }
                  })
                });
               }


  openImageUploader () {
    let dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '500px',
      data: {imageType: 3}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openChooseCoverImage () {
    let dialogRef = this.dialog.open(ImageGalleryComponent, {
      width: '500px',
      data: {imageType: 3, selectType: 'radio'}
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(image => {
      this.coverImage = image;
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }


  closeDialog (): void {
    this.dialogRef.close();
  }

  submitItem() {
    let date = new Date().getTime();
    console.log(this.coverImage);
    this.info.coverImage = this.coverImage;
    console.log(this.info.coverImage);
    let showcaseItem = new ShowcaseItem(this.info, this.imagesSelected, date);
    this.onSubmit.emit(showcaseItem);
  }

  addSelectedImage(image: any) {
    this.imagesSelected.push(image);
  }

  removeSelectedImages(image: any) {
    let index = this.imagesSelected.indexOf(image, 0);
    if(index > -1) {
      this.imagesSelected.splice(index, 1);
    }
  }

  saveFirstPage(value) {
    this.info = value;
  }

  deleteImage(image) {
    this.showcaseService.deleteShowcaseImage(this.profileID, this.itemID, image.$key);
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
