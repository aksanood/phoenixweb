import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tutorial} from "shared/models/tutorial";
import {Subscription} from "rxjs/Subscription";
import {TutorialService} from "shared/services/tutorial.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit, OnDestroy {

  tutorials: Tutorial[] = [];
  filteredTutorials: any[] = [];
  subscription: Subscription;
  category: string;

  constructor(tutorialService: TutorialService, route: ActivatedRoute) {
    this.subscription = tutorialService.getAllTutorials()
      .switchMap(tutorials => {
        this.tutorials = tutorials;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredTutorials = (this.category) ?
          this.tutorials.filter(t => t.category === this.category) :
          this.tutorials;
      });
  }

  searchTutorials (query: string) {
    this.filteredTutorials = (query) ?
      this.tutorials.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.tutorials;
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
