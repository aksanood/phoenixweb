import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { RouterModule } from '@angular/router';
import { TutorialViewComponent } from './components/tutorial-view/tutorial-view.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'tutorial-view/:id', component: TutorialViewComponent},
      {path: 'tutorials', component: TutorialsComponent},
      
    ])
  ],
  declarations: [
    TutorialsComponent,
    TutorialViewComponent,
  ]
})
export class TutorialsModule { }
