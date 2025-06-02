import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultQuestionComponent } from './consult/consult.component';

const routes: Routes = [{path:'question', component:ConsultQuestionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
