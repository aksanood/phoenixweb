import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomFormsModule} from 'ng2-validation';
import { DataTablesModule} from 'angular-datatables';
import { StarRatingModule} from 'angular-star-rating';

// Router Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { TestComponent } from './test/test.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminTestComponent } from './admin-test/admin-test.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavigationComponent } from './dashboard/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardUserProfileComponent } from './dashboard/dashboard-user-profile/dashboard-user-profile.component';
import { DashboardUserProductsComponent } from './dashboard/dashboard-user-products/dashboard-user-products.component';

// Angular Material
import { MatComponentsModule } from './mat-components.module';
import { MatNativeDateModule } from '@angular/material';

// Services
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    MarketplaceComponent,
    TestComponent,
    SignupComponent,
    UserProfileComponent,

    DashboardComponent,
    DashboardNavigationComponent,
    DashboardOverviewComponent,
    DashboardUserProfileComponent,
    DashboardUserProductsComponent,

    AdminTestComponent,
    ProductsComponent,
    ProductsFormComponent,
    ProductFilterComponent,
    ProductCardComponent,

  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    DataTablesModule,
    StarRatingModule.forRoot(),
    MatComponentsModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'test', pathMatch: 'full'}, // Change to home Component
      {path: 'test', component: TestComponent},
      {path: 'login', component: LoginComponent},
      {path: 'about', component: AboutComponent},
      {path: 'marketplace', component: MarketplaceComponent},

      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
        children: [
          {path: '', redirectTo: 'dashboard-overview', pathMatch: 'full'},
          {path: 'dashboard-overview', component: DashboardOverviewComponent},
          {path: 'dashboard-user-profile', component: DashboardUserProfileComponent},
          {path: 'dashboard-user-products', component: DashboardUserProductsComponent},

        ]
      },

      {path: 'admin/products/new', component: ProductsFormComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductsFormComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

      {path: 'admin-test', component: AdminTestComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
