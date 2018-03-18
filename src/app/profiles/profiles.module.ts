import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './components/profiles/profiles.component';
import {SharedModule} from 'shared/shared.module';
import {RouterModule} from "@angular/router";
import { ProfileViewComponent } from './components/profile-view/profile-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'profiles', component: ProfilesComponent},
      {path: 'profile/:id', component: ProfileViewComponent}
    ])
  ],
  declarations: [
    ProfilesComponent,
    ProfileViewComponent
  ]
})
export class ProfilesModule { }
