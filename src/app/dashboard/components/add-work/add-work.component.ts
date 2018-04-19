import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProfileInformationService} from 'shared/services/profile-information.service';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {

  onSubmit = new EventEmitter();
  work: any = {};
  uid;
  wid;
  currentPosition = false;

  constructor(public dialogRef: MatDialogRef<AddWorkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private profileService: ProfileInformationService) {
    this.wid = data.wid;
    this.uid = data.uid;

    if (this.wid) {
      this.profileService.getWorkItem(this.uid, this.wid).take(1).subscribe(e => {
        this.work = e;
        this.currentPosition = e.currentPosition;
      });
    }
    console.log(this.work);
  }

  closeDialog (): void {
    this.dialogRef.close();
  }

  submitWork() {
    this.onSubmit.emit(this.work);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
