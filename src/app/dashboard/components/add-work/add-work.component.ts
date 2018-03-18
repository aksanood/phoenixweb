import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {

  onSubmit = new EventEmitter();
  work: any = {};

  constructor(public dialogRef: MatDialogRef<AddWorkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
