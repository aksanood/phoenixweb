import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './components/profiles/profiles.component';
import {SharedModule} from 'shared/shared.module';
import {RouterModule} from "@angular/router";
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import {ShowcaseItemViewComponent} from "./components/showcase-item-view/showcase-item-view.component";
import { ProfileViewResolve } from './resolvers/profile-view-resolve.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'profiles', component: ProfilesComponent},
      {
        path: 'profile/:id',
        component: ProfileViewComponent,
        resolve: {
          profile: ProfileViewResolve
        }
      },
    ])
  ],
  declarations: [
    ProfilesComponent,
    ProfileViewComponent,
    ShowcaseItemViewComponent
  ],
  entryComponents: [
    ShowcaseItemViewComponent
  ],
  providers: [ProfileViewResolve]
})
export class ProfilesModule { }
