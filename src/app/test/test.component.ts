import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  progress = 0;
  timer;
  constructor(public dialog: MatDialog) {
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress == 100) clearInterval(this.timer);
    }, 20);
  }
  colors = [
    {id: 1, name: 'Red'},
    {id: 2, name: 'Green'},
    {id: 3, name: 'Blue'}
  ]
  color = 2;

  categories = [
    {name: 'Beginner'},
    {name: 'Intermediate'},
    {name: 'Advanced'}
  ]

  selectCategory(category) {
    this.categories
      .filter(c => c !== category)
      .forEach(c => c['selected'] = false);
    category.selected = !category.selected;
  }

  animal: string;
  name: string;

  //openDialog(): void {
  //  let dialogRef = this.dialog.open(SidebarComponent, {
  //    width: '500px',
  //    data: { name: this.name, animal: this.animal }
  //  });
//
  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed');
  //    this.animal = result;
  //  });
  //}

  ngOnInit() {
  }

}

