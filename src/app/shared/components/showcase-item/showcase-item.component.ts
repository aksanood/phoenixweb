import {Component, Input, OnInit} from '@angular/core';
import { ShowcaseService } from 'shared/services/showcase.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

import {Overlay} from '@angular/cdk/overlay';
import {ShowcaseItemViewComponent} from "../../../profiles/components/showcase-item-view/showcase-item-view.component";



@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrls: ['./showcase-item.component.css']
})
export class ShowcaseItemComponent implements OnInit {

  @Input('showcaseItem') showcaseItem: any;
  @Input('profileId') profileID: any;

  defaultDialogConfig = new MatDialogConfig();
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '1000px',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: this.defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '20px',
      bottom: '',
      left: '',
      right: ''
    }
  }

  constructor(private showcaseService: ShowcaseService,
              public dialog: MatDialog,
              private overlay: Overlay) {  }

  openShowcaseItemView() {

    let dialogRef = this.dialog.open(ShowcaseItemViewComponent, {
      width: '1000px',
      height: '96%',
      panelClass: 'custom-overlay-pane-class',
      position: {
        top: '20px'
      },
      data: {itemID: this.showcaseItem.$key, profileID: this.profileID}
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnInit() {
  }

}
