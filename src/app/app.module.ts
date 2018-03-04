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
import { TutorialsModule } from './tutorials/tutorials.module';
import {MembershipModule} from './membership/membership.module';
import { ProfilesModule } from './profiles/profiles.module';

import { environment } from '../environments/environment';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './core/components/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { TestComponent } from './test/test.component';


// Router Components
// Angular Material
// Services

@NgModule({
  declarations: [
    AppComponent,


    TestComponent,
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
    TutorialsModule,
    ProfilesModule,

    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'}, // Change to home Component

      {path: 'home', component: TestComponent},
      {path: 'about', component: AboutComponent},

      {path: 'test', component: TestComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
