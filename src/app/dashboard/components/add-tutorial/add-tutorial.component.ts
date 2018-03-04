import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUser} from "shared/models/app-user";
import {Subscription} from "rxjs/Subscription";
import {CategoryService} from "shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "shared/services/auth.service";
import {TutorialService} from "shared/services/tutorial.service";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit, OnDestroy {

  htmlContent;
  categories$;
  appUser: AppUser;
  id;
  tutorial;
  subscription: Subscription;
  dateCreated;
  dateModified;

  constructor(private router: Router,
              categoryService: CategoryService,
              private tutorialService: TutorialService,
              private auth: AuthService,
              private route: ActivatedRoute) {

    this.appUser = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.tutorial = [];
    this.dateCreated = new Date().getTime();
    this.dateModified = new Date().getTime();

    this.subscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.categories$ = categoryService.getAllProductCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.tutorialService.getById(this.id).take(1).subscribe(t => this.tutorial = t);

  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  save (tutorial) {
    if (this.id) this.tutorialService.update(this.id, tutorial);
    else this.tutorialService.createTutorial(tutorial);
    this.router.navigate(['/dashboard/dashboard-user-tutorials']);
  }

  delete () {
    if (!confirm('Are you sure you want to delete this tutorial ?')) return;

    this.tutorialService.delete(this.id);
    this.router.navigate(['/dashboard/dashboard-user-tutorials']);
  }

  openPreview () {
    console.log('Open Priview Works!');
  }
}
