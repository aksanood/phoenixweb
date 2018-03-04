import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { BlogComponent } from 'app/blog/components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { ViewPostComponent } from './components/view-post/view-post.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'blog', component: BlogComponent},
      {path: 'view-post/:id', component: ViewPostComponent},
      
    ])
  ],
  declarations: [
    BlogComponent,
    ViewPostComponent,
  ]
})
export class BlogModule { }
