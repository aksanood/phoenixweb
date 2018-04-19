import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProfileInformationService} from "shared/services/profile-information.service";

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  onSubmit = new EventEmitter();
  education: any = {};
  eid;
  uid;

  constructor(public dialogRef: MatDialogRef<AddEducationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private profileService: ProfileInformationService) {

    this.eid = data.eid;
    this.uid = data.uid;
    if (this.eid) this.profileService.getEducationItem(this.uid, this.eid).take(1).subscribe(e => this.education = e);
    console.log(this.education);
  }

  closeDialog (): void {
    this.dialogRef.close();
  }

  submitEducation() {
    this.onSubmit.emit(this.education);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
