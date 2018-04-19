import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUser} from "shared/models/app-user";
import {Subscription} from "rxjs/Subscription";
import {MatDialog} from "@angular/material";
import {AddShowcaseItemComponent} from "../add-showcase-item/add-showcase-item.component";
import {ShowcaseService} from "shared/services/showcase.service";
import {AuthService} from "shared/services/auth.service";

@Component({
  selector: 'app-dashboard-user-showcase',
  templateUrl: './dashboard-user-showcase.component.html',
  styleUrls: ['./dashboard-user-showcase.component.css']
})
export class DashboardUserShowcaseComponent implements OnInit, OnDestroy {

  user: AppUser;
  userSubscription: Subscription;

  showcaseItems: any[];

  itemID: string;

  constructor(private auth: AuthService,
              public dialog: MatDialog,
              private showcaseService: ShowcaseService) {

    this.userSubscription = auth.appUser$.subscribe(user => {
      this.user = user;

      this.showcaseService.getItemsById(user.$key).subscribe(items => {
        this.showcaseItems = items;
      });
    });
  }

  openAddItem(id?: string) {
    let dialogRef = this.dialog.open(AddShowcaseItemComponent, {
      width: '500px',
      data: {itemID: id, uid: this.user.$key}
    });
    const sub = dialogRef.componentInstance.onSubmit.subscribe(item => {
      if (id) {
        console.log(item);
        this.updateShowcaseItem(id, item);
      }else {
        console.log('sdsdsdsdsd');
        this.addShowcaseItem(item);
        this.itemID = item.$key;
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }

  addShowcaseItem(item) {
    this.showcaseService.addItem(this.user.$key, item);
  }

  updateShowcaseItem(id: string, item) {
    this.showcaseService.updateItem(this.user.$key, id, item);
  }

  deleteShowcaseItem(id: string) {
    this.showcaseService.deleteItem(this.user.$key, id);
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }
}
