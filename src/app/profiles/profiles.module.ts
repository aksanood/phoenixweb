import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './components/profiles/profiles.component';
import {SharedModule} from 'shared/shared.module';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'profiles', component: ProfilesComponent},
    ])
  ],
  declarations: [
    ProfilesComponent
  ]
})
export class ProfilesModule { }
