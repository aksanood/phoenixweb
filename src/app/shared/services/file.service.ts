import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Upload } from 'shared/models/upload';
import * as firebase from 'firebase';
import { ImageService } from 'shared/services/image.service';
import { Image } from 'shared/models/image';


@Injectable()
export class FileService {

  uploadTask: any;
  displayMessage;
  image: Image;

  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase, private imageService: ImageService) { }

  deleteFile (file: any) {
    const storageRef = firebase.storage().ref();
    const desertRef = storageRef.child('/uploads/' + file.name);
    
    desertRef.delete().then(result => {
      this.deleteFileData(file.$key);
      console.log('File deleted succesfully' + result);
    }).catch(error => {
      console.log(error);
    })
  }

  uploadImageFiles (upload: Upload, imageCategory: number) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child('/uploads/' + upload.file.name).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // three observers
      // 1.) state_changed observer
      (snapshot) => {
        // upload in progress
        upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
        upload.message = 'Uploading';
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
          upload.message = 'Uploading paused';
          break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
          upload.message = 'Uploading';
          break;
        }
      },
      // 2.) error observer
      (error) => {

        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            upload.message = 'User doesnt have permission to access the object ' + error.code;
            break;
      
          case 'storage/canceled':
              upload.message = 'Upload canceled by the user.';
            break;
      
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            upload.message = 'Unknown error occurred, inspect error.serverResponse ' + error.code;
            break;
        }

      },
      // 3.) success observer
      (): any => {
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
            this.image = new Image (upload);
            switch (imageCategory) {
              case 0:
                this.imageService.saveProfileImage(this.image);
                upload.message = 'Successfully uploaded the file and saved to the profile pictures !';
              break; 

              case 1:
                this.imageService.saveBlogImage(this.image);
                upload.message = 'Successfully uploaded the file and saved to the blog pictures !';
              break; 

              case 2:
                this.imageService.saveTutorialImage(this.image);
                upload.message = 'Successfully uploaded the file and saved to the tutorial pictures !';
              break; 

              case 3:
                this.imageService.savePortfolioImage(this.image);
                upload.message = 'Successfully uploaded the file and saved to the portfolio pictures !';
                upload.successfull = true;
              break; 
            }
            
      });
  }

  cancelUpload () {
    this.uploadTask.cancel();
  }
  pauseUpload () {
    this.uploadTask.pause();
  }
  resumelUpload () {
    this.uploadTask.resume();
  }

  private saveFileData(upload: Upload) {
    this.db.list('/uploads/').push({
      name: upload.name,
      url: upload.url
    });
    console.log('File saved: ' + upload.url);
  }

  private deleteFileData(fileId) {
    return this.db.object('/uploads/' + fileId).remove();
  }

}
