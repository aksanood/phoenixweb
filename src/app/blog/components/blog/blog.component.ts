import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from 'shared/services/blog.service';
import {BlogPost} from 'shared/models/blog-post';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  blogPosts: BlogPost[] = [];
  filteredPosts: any[] = [];
  subscription: Subscription;

  constructor(blogService: BlogService) {

    this.subscription = blogService.getAllPosts().subscribe(posts => {
      this.filteredPosts = this.blogPosts = posts;
    });

  }

  searchPosts (query: string) {
    this.filteredPosts = (query) ?
      this.blogPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.blogPosts;
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
