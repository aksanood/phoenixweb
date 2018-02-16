import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AdminModule } from 'app/admin/admin.module';
import { CoreModule } from 'app/core/core.module';
import { DashboardModule } from 'app/dashboard/dashboard.module';
import { MarketplaceModule } from 'app/marketplace/marketplace.module';
import { SharedModule } from 'shared/shared.module';
import { BlogModule } from './blog/blog.module';

import { environment } from '../environments/environment';
import { AdminTestComponent } from './admin-test/admin-test.component';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './core/components/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { TestComponent } from './test/test.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MembershipModule} from './membership/membership.module';


// Router Components
// Angular Material
// Services

@NgModule({
  declarations: [
    AppComponent,


    TestComponent,

    UserProfileComponent,
    TutorialsComponent,
    AdminTestComponent,
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AdminModule,
    MarketplaceModule,
    DashboardModule,
    MembershipModule,
    BlogModule,

    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'}, // Change to home Component

      {path: 'home', component: TestComponent},
      {path: 'about', component: AboutComponent},

      {path: 'test', component: TestComponent},
      {path: 'admin-test', component: AdminTestComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

      {path: 'tutorials', component: TutorialsComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
