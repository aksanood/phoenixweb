import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatNativeDateModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { StarRatingModule } from 'angular-star-rating';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { MatComponentsModule } from 'app/mat-components.module';
import { CustomFormsModule } from 'ng2-validation';
import { NgxEditorModule } from 'ngx-editor';
import { BlogCardComponent } from 'shared/components/blog-card/blog-card.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { SummaryPipe } from 'shared/pipes/summary.pipe';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { BlogService } from 'shared/services/blog.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { TutorialService } from 'shared/services/tutorial.service';
import { UserService } from 'shared/services/user.service';

import { SubscribeToPhoenixComponent } from './components/subscribe-to-phoenix/subscribe-to-phoenix.component';
import { TutorialCardComponent } from './components/tutorial-card/tutorial-card.component';
import { ProfileInformationService } from './services/profile-information.service';
import { FileService } from './services/file.service';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { ImageService } from './services/image.service';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatComponentsModule,
    MatExpansionModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpModule,
    DataTablesModule,
    NgxEditorModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    BlogCardComponent,
    TutorialCardComponent,
    SubscribeToPhoenixComponent,
    UploadFilesComponent,
    ImageGalleryComponent,
    ProfileCardComponent,

    SummaryPipe,

  ],
  entryComponents: [
    UploadFilesComponent,
    ImageGalleryComponent
  ],
  exports: [
    ProductCardComponent,
    BlogCardComponent,
    TutorialCardComponent,
    SubscribeToPhoenixComponent,
    UploadFilesComponent,
    ImageGalleryComponent,
    ProfileCardComponent,

    SummaryPipe,

    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    NgxEditorModule,
    NgxPaginationModule,
    MatComponentsModule,
    MatExpansionModule,
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
    BlogService,
    TutorialService,
    ProfileInformationService,
    FileService,
    ImageService

  ]
})
export class SharedModule { }
