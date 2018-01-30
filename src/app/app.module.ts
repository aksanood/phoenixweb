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
import { HttpModule } from '@angular/http';

// Router Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminTestComponent } from './admin-test/admin-test.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductsFormComponent } from './admin/products/products-form/products-form.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavigationComponent } from './dashboard/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardUserProfileComponent } from './dashboard/dashboard-user-profile/dashboard-user-profile.component';
import { DashboardUserProductsComponent } from './dashboard/dashboard-user-products/dashboard-user-products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { EditProductsComponent } from './dashboard/edit-products/edit-products.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

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
import {ShoppingCartService} from './shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    MarketplaceComponent,
    TestComponent,
    SignupComponent,
    UserProfileComponent,
    TutorialsComponent,

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
    ProductViewComponent,
    EditProductsComponent,
    AddProductComponent,
    ShoppingCartComponent,


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
      {path: '', redirectTo: 'home', pathMatch: 'full'}, // Change to home Component
      {path: 'test', component: TestComponent},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'about', component: AboutComponent},
      {path: 'marketplace', component: MarketplaceComponent},
      {path: 'product-view/:id', component: ProductViewComponent},
      {path: 'tutorials', component: TutorialsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},

      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
        children: [
          {path: '', redirectTo: 'dashboard-overview', pathMatch: 'full'},
          {path: 'dashboard-overview', component: DashboardOverviewComponent},
          {path: 'dashboard-user-profile', component: DashboardUserProfileComponent},
          {path: 'dashboard-user-products', component: DashboardUserProductsComponent},
          {path: 'add-product', component: AddProductComponent},
          {path: 'add-product/:id', component: AddProductComponent},
          {path: 'edit-products', component: EditProductsComponent},


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
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
