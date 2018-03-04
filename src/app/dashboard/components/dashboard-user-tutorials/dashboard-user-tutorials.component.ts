import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TutorialService} from "shared/services/tutorial.service";
import {AuthService} from "shared/services/auth.service";
import {Tutorial} from "shared/models/tutorial";
import {AppUser} from "shared/models/app-user";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-dashboard-user-tutorials',
  templateUrl: './dashboard-user-tutorials.component.html',
  styleUrls: ['./dashboard-user-tutorials.component.css']
})
export class DashboardUserTutorialsComponent implements OnInit, OnDestroy {

  tutorials: Tutorial [];
  userTutorials: any [];
  appUser: AppUser;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tutorialSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private router: Router,
              private tutorialService: TutorialService,
              private auth: AuthService) { }

  ngOnInit() {
    this.appUser = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.userSubscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.tutorialSubscription = this.tutorialService.getAllTutorials().subscribe(b => {
      this.tutorials = b;
      this.userTutorials = b.filter(fb => fb.user === this.appUser.$key );
      this.dtTrigger.next();
    });
  }

  ngOnDestroy () {
    this.tutorialSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  addTutorial() {
    this.router.navigate(['dashboard/add-tutorial']);
  }


}
