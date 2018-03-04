import { Component, OnInit, OnDestroy } from '@angular/core';
import {TutorialService} from "shared/services/tutorial.service";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-tutorial-view',
  templateUrl: './tutorial-view.component.html',
  styleUrls: ['./tutorial-view.component.css']
})
export class TutorialViewComponent implements OnInit, OnDestroy {

  tutorial: any;
  id: any;
  user: any;
  tutorialSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private tutorialService: TutorialService,
              private userService: UserService) {
    
    this.tutorial = [];
    this.user = [];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.tutorialSubscription = this.tutorialService.getById(this.id).take(1).subscribe(t => {
      this.tutorial = t;
      this.userSubscription = this.userService.getUserByID(this.tutorial.user)
        .subscribe(user => this.user = user);
    });
    
}

  ngOnInit() {
  }

  ngOnDestroy () {
    this.tutorialSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  click() {
    console.log(this.tutorial.title);
    console.log(this.id);
  }
}
