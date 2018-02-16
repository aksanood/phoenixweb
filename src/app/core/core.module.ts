import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'app/core/components/navbar/navbar.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { FooterComponent } from 'app/core/components/footer/footer.component';
import { AboutComponent } from 'app/core/components/about/about.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MatComponentsModule } from 'app/mat-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
