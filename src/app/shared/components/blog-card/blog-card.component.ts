import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'shared/models/blog-post';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input('blogPost') blogPost: BlogPost;

  constructor() { }

  ngOnInit() {
  }

}
