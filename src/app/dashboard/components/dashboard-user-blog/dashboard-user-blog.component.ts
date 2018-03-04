import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BlogService } from 'shared/services/blog.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { BlogPost } from 'shared/models/blog-post';

@Component({
  selector: 'app-dashboard-user-blog',
  templateUrl: './dashboard-user-blog.component.html',
  styleUrls: ['./dashboard-user-blog.component.css']
})
export class DashboardUserBlogComponent implements OnInit, OnDestroy {

  posts: BlogPost [];
  userPosts: any [];
  appUser: AppUser;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  blogSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private router: Router, private blogService: BlogService, private auth: AuthService) { }

  ngOnInit() {

    this.appUser = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.userSubscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.blogSubscription = this.blogService.getAllPosts().subscribe(b => {
      this.posts = b;
      this.userPosts = b.filter(fb => fb.user === this.appUser.$key );
      this.dtTrigger.next();
    });
  }

  ngOnDestroy () {
    this.blogSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  addPost() {
    this.router.navigate(['dashboard/add-post']);
  }

}
