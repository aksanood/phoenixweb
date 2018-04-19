import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from 'app/dashboard/components/add-product/add-product.component';
import { DashboardNavigationComponent } from 'app/dashboard/components/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from 'app/dashboard/components/dashboard-overview/dashboard-overview.component';
import { DashboardUserOrdersComponent } from 'app/dashboard/components/dashboard-user-orders/dashboard-user-orders.component';
import { DashboardUserProductsComponent } from 'app/dashboard/components/dashboard-user-products/dashboard-user-products.component';
import { DashboardUserProfileComponent } from 'app/dashboard/components/dashboard-user-profile/dashboard-user-profile.component';
import { DashboardComponent } from 'app/dashboard/components/dashboard/dashboard.component';
import { EditProductsComponent } from 'app/dashboard/components/edit-products/edit-products.component';
import { MatComponentsModule } from 'app/mat-components.module';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { DashboardUserBlogComponent } from './components/dashboard-user-blog/dashboard-user-blog.component';
import { AddPostComponent } from 'app/dashboard/components/add-post/add-post.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { DashboardUserTutorialsComponent } from './components/dashboard-user-tutorials/dashboard-user-tutorials.component';
import { AddWorkComponent } from './components/add-work/add-work.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { DashboardUserShowcaseComponent } from './components/dashboard-user-showcase/dashboard-user-showcase.component';
import { AddShowcaseItemComponent } from './components/add-showcase-item/add-showcase-item.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
        children: [
          {path: '', redirectTo: 'dashboard-overview', pathMatch: 'full'},
          {path: 'dashboard-overview', component: DashboardOverviewComponent},
          {path: 'dashboard-user-profile', component: DashboardUserProfileComponent},
          {path: 'dashboard-user-showcase', component: DashboardUserShowcaseComponent},
          {path: 'dashboard-user-products', component: DashboardUserProductsComponent},
          {path: 'dashboard-user-orders', component: DashboardUserOrdersComponent},
          {path: 'add-product', component: AddProductComponent},
          {path: 'add-product/:id', component: AddProductComponent},
          {path: 'edit-products', component: EditProductsComponent},
          {path: 'dashboard-user-blog', component: DashboardUserBlogComponent},
          {path: 'add-post', component: AddPostComponent},
          {path: 'add-post/:id', component: AddPostComponent},
          {path: 'dashboard-user-tutorials', component: DashboardUserTutorialsComponent},
          {path: 'add-tutorial', component: AddTutorialComponent},
          {path: 'add-tutorial/:id', component: AddTutorialComponent},

        ]
      },
    ])
  ],
  entryComponents: [
    AddWorkComponent,
    AddEducationComponent,
    AddShowcaseItemComponent
  ],
  declarations: [
    DashboardComponent,
    DashboardNavigationComponent,
    DashboardOverviewComponent,
    DashboardUserProfileComponent,
    DashboardUserProductsComponent,
    DashboardUserOrdersComponent,
    AddProductComponent,
    EditProductsComponent,
    DashboardUserBlogComponent,
    AddPostComponent,
    AddTutorialComponent,
    DashboardUserTutorialsComponent,
    AddWorkComponent,
    AddEducationComponent,
    DashboardUserShowcaseComponent,
    AddShowcaseItemComponent
  ]
})
export class DashboardModule { }
