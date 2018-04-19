import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ImageService} from "shared/services/image.service";
import {AuthService} from "shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Image} from "shared/models/image";

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {

  imageSubscription: Subscription;
  userId: string;
  images: Image [];
  selectedImage: Image;

  onSubmit = new EventEmitter();
  @Input('imageType') imageType;
  @Input('selectType') selectType;
  @Output('imageSelected') imageSelected = new EventEmitter();
  @Output('imageDeSelected') imageDeSelected = new EventEmitter();
  radioType = false;
  checkboxType = false;
  slcType;

  constructor(public dialogRef: MatDialogRef<ImageGalleryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private imageService: ImageService,
              private authService: AuthService) { }


  closeDialog (): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    console.log(this.data.selectType);
    if (this.data.selectType === 'radio') {this.radioType = true;}
    if (this.data.selectType === 'check') {this.checkboxType = true;}
    if (!this.data.selectType) {
      console.log(this.selectType);
      if (this.selectType === 'radio') {this.radioType = true;}
      if (this.selectType === 'check') {this.checkboxType = true;}
    }

    if (!this.imageType) {
      this.imageType = this.data.imageType;
    }
    console.log(this.imageType);

    this.authService.appUser$.take(1).subscribe(user => {
      this.userId = user.$key;

      switch (this.imageType) {
        case 0:
          this.imageSubscription = this.imageService.getProfileImagesByUser(this.userId)
            .subscribe(images => {
              this.images = images;
              console.log(this.images);
            });
          break;

        case 1:
          this.imageSubscription = this.imageService.getProfileImagesByUser(this.userId)
            .subscribe(images => {
              this.images = images;
              console.log(this.images);
            });
          break;

        case 2:
          this.imageSubscription = this.imageService.getProfileImagesByUser(this.userId)
            .subscribe(images => {
              this.images = images;
              console.log(this.images);
            });
          break;

        case 3:
          this.imageSubscription = this.imageService.getShowcaseImagesByUser(this.userId)
            .subscribe(images => {
              this.images = images;
              console.log(this.images);
            });
          break;
      }

      console.log(this.userId);
      console.log(this.dialogRef.componentInstance.data);
      this.dialogRef.componentInstance.data = 'asd';
    });
  }

  selectImages (image: Image, isChecked: boolean) {
    if (isChecked) {
      this.imageSelected.emit(image);
    } else {
      this.imageDeSelected.emit(image);
    }
  }

  selectImage(image: Image) {
    this.selectedImage = image;
  }

  submitImage() {
    this.onSubmit.emit(this.selectedImage);
    this.dialogRef.close();
  }

  ngOnDestroy () {
    this.imageSubscription.unsubscribe();
  }


}
