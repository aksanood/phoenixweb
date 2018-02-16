import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { BlogComponent } from 'app/blog/components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { AddPostComponent } from '../dashboard/components/add-post/add-post.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'blog', component: BlogComponent},
      
    ])
  ],
  declarations: [
    BlogComponent,
  ]
})
export class BlogModule { }
