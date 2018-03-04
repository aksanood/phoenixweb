import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from 'shared/services/category.service';
import {BlogService} from 'shared/services/blog.service';
import {AppUser} from 'shared/models/app-user';
import {AuthService} from 'shared/services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {

  htmlContent;
  categories$;
  appUser: AppUser;
  id;
  post;
  subscription: Subscription;
  dateCreated;
  dateModified;

  constructor(
    private router: Router,
    categoryService: CategoryService,
    private blogService: BlogService,
    private auth: AuthService,
    private route: ActivatedRoute) {

    this.appUser = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.post = [];
    this.dateCreated = new Date().getTime();
    this.dateModified = new Date().getTime();

    this.subscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.categories$ = categoryService.getAllProductCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.blogService.getById(this.id).take(1).subscribe(p => this.post = p);
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  save (post) {
    if (this.id) this.blogService.update(this.id, post);
    else this.blogService.createPost(post);
    this.router.navigate(['/dashboard/dashboard-user-blog']);
  }

  delete () {
    if (!confirm('Are you sure you want to delete this post ?')) return;
  
    this.blogService.delete(this.id);
    this.router.navigate(['/dashboard/dashboard-user-blog']);
  }
  
  openPreview () {
    console.log('Open Priview Works!');
  }

}
