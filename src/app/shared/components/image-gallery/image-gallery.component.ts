import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ImageService} from "shared/services/image.service";
import {AuthService} from "shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Image} from "shared/models/image";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

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

  constructor(public dialogRef: MatDialogRef<ImageGalleryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private imageService: ImageService,
              private authService: AuthService) { }


  closeDialog (): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.authService.appUser$.take(1).subscribe(user => {
      this.userId = user.$key;
      this.imageSubscription = this.imageService.getProfileImagesByUser(this.userId)
        .subscribe(images => {
          this.images = images
          console.log(this.images);
        });
      console.log(this.userId);
      console.log(this.dialogRef.componentInstance.data);
      this.dialogRef.componentInstance.data = 'asd';
    });
  }

  selectImage (image: Image) {
    console.log(image);
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
