import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultFormComponent } from './consult/consult.component';

const routes: Routes = [{path:'form', component:ConsultFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
