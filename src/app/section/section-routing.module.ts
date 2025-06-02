import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultSectionComponent } from './consult/consult.component';

const routes: Routes = [{path:'section', component:ConsultSectionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
