import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/membership/components/login/login.component';
import { SignupComponent } from 'app/membership/components/signup/signup.component';
import { SharedModule } from 'shared/shared.module';
import { EmailLoginComponent } from 'app/membership/components/email-login/email-login.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'email-login', component: EmailLoginComponent},
    ])
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    EmailLoginComponent
  ]
})
export class MembershipModule { }
