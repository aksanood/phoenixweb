import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit, OnDestroy {

  blogPost: any;
  id;
  user: any;
  blogPostSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private userService: UserService) {

    this.blogPost = [];
    this.user = [];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.blogPostSubscription = this.blogService.getById(this.id).take(1).subscribe(p => {
      this.blogPost = p;
      this.userSubscription = this.userService.getUserByID(this.blogPost.user)
        .subscribe(user => this.user = user);
    });

  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.blogPostSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
