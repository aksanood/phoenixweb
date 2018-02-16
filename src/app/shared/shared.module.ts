import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { StarRatingModule } from 'angular-star-rating';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { MatComponentsModule } from 'app/mat-components.module';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { BlogCardComponent } from 'shared/components/blog-card/blog-card.component';
import { NgxEditorModule } from 'ngx-editor';
import { BlogService } from 'shared/services/blog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatComponentsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpModule,
    DataTablesModule,
    NgxEditorModule,
    NgbModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    BlogCardComponent
  ],
  exports: [
    ProductCardComponent,
    BlogCardComponent,

    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    NgxEditorModule,
    MatComponentsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpModule,
    NgbModule.forRoot().ngModule,
    StarRatingModule.forRoot().ngModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    BlogService
  ]
})
export class SharedModule { }
