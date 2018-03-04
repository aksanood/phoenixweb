import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Upload } from 'shared/models/upload';
import { FileService } from 'shared/services/file.service';
import * as _ from 'lodash'; // to help loop over files more succinctly
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  files: FileList;
  upload: Upload;
  userId: string;

  constructor(private fileService: FileService,
              public dialogRef: MatDialogRef<UploadFilesComponent>,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  handleFiles (event) {
    this.files = event.target.files;
  }

  uploadFiles () {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx => {
      this.upload = new Upload(filesToUpload[idx], this.userId);
      this.fileService.uploadImageFiles(this.upload, 0);
    }))
  }

  stopUpload () {
    this.fileService.cancelUpload();
  }
  pauseUpload () {
    this.fileService.pauseUpload();
  }
  resumeUpload () {
    this.fileService.resumelUpload();
  }

  closeDialog (): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.authService.appUser$.take(1).subscribe(user => this.userId = user.$key);
  }

}
